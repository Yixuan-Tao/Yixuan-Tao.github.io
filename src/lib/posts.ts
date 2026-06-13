export type PostFrontmatter = {
  title?: string;
  date?: string;
  readTime?: string;
  category?: string;
  excerpt?: string;
  icon?: string;
};

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  icon: string;
};

export type Post = PostMeta & {
  content: string;
};

const fallbackCategory = 'Markdown';
const frontmatterKeys = new Set<keyof PostFrontmatter>([
  'title',
  'date',
  'readTime',
  'category',
  'excerpt',
  'icon',
]);

export function getPostSlug(path: string) {
  return path.match(/([^/]+)\.md$/)?.[1] ?? '';
}

export function isVisiblePost(slug: string, meta: PostMeta) {
  return Boolean(slug) && !slug.startsWith('placeholder-') && !meta.title.includes('占位');
}

export function parseMarkdownPost(source: string, slug: string): Post {
  const normalized = source.replace(/^\uFEFF/, '');
  const match = normalized.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const frontmatter = match ? parseFrontmatter(match[1]) : {};
  const markdown = (match ? match[2] : normalized).trim();
  const { title: headingTitle, content } = extractTitleAndBody(markdown);
  const excerpt =
    frontmatter.excerpt ?? content.replace(/\s+/g, ' ').slice(0, 120).trim();
  const category = frontmatter.category ?? fallbackCategory;

  return {
    slug,
    title: frontmatter.title ?? headingTitle ?? '未命名文章',
    date: frontmatter.date ?? '',
    readTime: frontmatter.readTime ?? '',
    category,
    excerpt: excerpt ? `${excerpt}${excerpt.length >= 120 ? '...' : ''}` : '',
    icon: frontmatter.icon ?? category.slice(0, 2),
    content,
  };
}

export async function loadVisiblePosts(
  modules: Record<string, () => Promise<unknown>>
) {
  const posts = await Promise.all(
    Object.entries(modules).map(async ([path, importer]) => {
      const slug = getPostSlug(path);
      const source = await importer();
      const post = parseMarkdownPost(String(source), slug);

      return isVisiblePost(slug, post) ? post : null;
    })
  );

  return posts
    .filter((post): post is Post => post !== null)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

function parseFrontmatter(rawFrontmatter: string): PostFrontmatter {
  return rawFrontmatter.split(/\r?\n/).reduce<PostFrontmatter>((data, line) => {
    const separatorIndex = line.indexOf(':');
    if (separatorIndex === -1) return data;

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '');

    if (frontmatterKeys.has(key as keyof PostFrontmatter) && value) {
      const frontmatterKey = key as keyof PostFrontmatter;
      data[frontmatterKey] = value;
    }

    return data;
  }, {});
}

function extractTitleAndBody(markdown: string) {
  const normalized = markdown.trim();
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
