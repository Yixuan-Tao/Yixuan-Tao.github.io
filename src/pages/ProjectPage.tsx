import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Tag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';

const markdownFiles = import.meta.glob('../content/projects/*.md', {
  query: '?raw',
  import: 'default',
});

type ProjectDoc = {
  title: string;
  category: string;
  content: string;
  notFound: boolean;
};

const emptyProject: ProjectDoc = {
  title: '',
  category: '',
  content: '',
  notFound: false,
};

function parseFrontmatter(source: string) {
  const normalized = source.replace(/^\uFEFF/, '');
  const match = normalized.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

  if (!match) {
    return {
      data: {} as Record<string, string>,
      content: normalized.trim(),
    };
  }

  const data: Record<string, string> = {};
  const rawFrontmatter = match[1] ?? '';
  const content = match[2] ?? '';

  rawFrontmatter.split(/\r?\n/).forEach((line) => {
    const separatorIndex = line.indexOf(':');
    if (separatorIndex === -1) return;

    const key = line.slice(0, separatorIndex).trim();
    const value = line
      .slice(separatorIndex + 1)
      .trim()
      .replace(/^['"]|['"]$/g, '');

    if (key) {
      data[key] = value;
    }
  });

  return {
    data,
    content: content.trim(),
  };
}

function extractTitleAndBody(markdown: string) {
  const normalized = markdown.replace(/^\uFEFF/, '').trim();
  const titleMatch = normalized.match(/^#\s+(.+?)\r?\n/);

  if (!titleMatch) {
    return {
      title: '',
      content: normalized,
    };
  }

  return {
    title: titleMatch[1].trim(),
    content: normalized.replace(/^#\s+.+?\r?\n+/, '').trim(),
  };
}

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const [project, setProject] = useState<ProjectDoc>(emptyProject);

  useEffect(() => {
    const loadMarkdown = async () => {
      if (!slug) {
        setProject({
          ...emptyProject,
          notFound: true,
          title: t('projectPage.notFound'),
          content: '',
        });
        return;
      }

      const filePath = `../content/projects/${slug}.md`;
      const importer = markdownFiles[filePath] as
        | (() => Promise<string>)
        | undefined;

      if (!importer) {
        setProject({
          ...emptyProject,
          notFound: true,
          title: t('projectPage.notFound'),
          content: '',
        });
        return;
      }

      try {
        const source = (await importer()) as string;
        const { data, content } = parseFrontmatter(source);
        const extracted = extractTitleAndBody(content);

        setProject({
          title: data.title || extracted.title || '',
          category: data.category || '',
          content: extracted.content || content.trim(),
          notFound: false,
        });
      } catch (error) {
        console.error('Error loading project markdown:', error);
        setProject({
          ...emptyProject,
          notFound: true,
          title: t('projectPage.notFound'),
          content: '',
        });
      }
    };

    void loadMarkdown();
  }, [slug, t]);

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Button variant="outline" className="mb-8 rounded-full" asChild>
          <Link to="/#projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('projects.back')}
          </Link>
        </Button>

        <header className="mb-8 rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
          <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
            {project.title}
          </h1>

          {project.category ? (
            <div className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm font-medium">
              <Tag className="h-3 w-3" />
              {project.category}
            </div>
          ) : null}
        </header>

        <article className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
          <div className="markdown-body">
            {project.notFound ? (
              <p>{t('projectPage.notFound')}</p>
            ) : (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {project.content}
              </ReactMarkdown>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
