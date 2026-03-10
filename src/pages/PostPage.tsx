import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';

const markdownFiles = import.meta.glob('../content/posts/*.md', {
  query: '?raw',
  import: 'default',
});

type Post = {
  title: string;
  date: string;
  readTime: string;
  category: string;
  content: string;
  notFound: boolean;
};

const emptyPost: Post = {
  title: '',
  date: '',
  readTime: '',
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

  const [, rawFrontmatter, content] = match;
  const data: Record<string, string> = {};

  rawFrontmatter.split(/\r?\n/).forEach((line) => {
    const separatorIndex = line.indexOf(':');
    if (separatorIndex === -1) return;

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '');

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

export function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [post, setPost] = useState<Post>(emptyPost);

  useEffect(() => {
    const loadMarkdown = async () => {
      if (!slug) {
        setPost({
          ...emptyPost,
          notFound: true,
          title: '文章未找到',
          content: '当前没有可显示的文章。',
        });
        return;
      }

      const filePath = `../content/posts/${slug}.md`;
      const importer = markdownFiles[filePath] as (() => Promise<string>) | undefined;

      if (!importer) {
        setPost({
          ...emptyPost,
          notFound: true,
          title: '文章未找到',
          content: `未找到 slug 为 "${slug}" 的 Markdown 文件。`,
        });
        return;
      }

      try {
        const source = await importer();
        const { data, content } = parseFrontmatter(source);
        const extracted = extractTitleAndBody(content);

        setPost({
          title: data.title || extracted.title || '未命名文章',
          date: data.date || '',
          readTime: data.readTime || '',
          category: data.category || 'Markdown',
          content: extracted.content || content.trim(),
          notFound: false,
        });
      } catch (error) {
        console.error('Error loading markdown file:', error);
        setPost({
          ...emptyPost,
          notFound: true,
          title: '文章加载失败',
          content: 'Markdown 文件加载失败，请检查文件格式或路径。',
        });
      }
    };

    void loadMarkdown();
  }, [slug]);

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Button
          variant="outline"
          className="mb-8 rounded-full"
          onClick={() => navigate('/#blog')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('blog.viewAll')}
        </Button>

        <header className="mb-8 rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
          <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {post.date ? (
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {post.date}
              </span>
            ) : null}
            {post.readTime ? (
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            ) : null}
          </div>

          <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
            {post.title}
          </h1>

          {post.category ? (
            <div className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm font-medium">
              <Tag className="h-3 w-3" />
              {post.category}
            </div>
          ) : null}
        </header>

        <article className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
          <div className="markdown-body">
            {post.notFound ? (
              <p>{post.content}</p>
            ) : (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
