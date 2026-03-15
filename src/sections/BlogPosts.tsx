import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// 生成随机的背景颜色类
const bgColors = [
  'bg-gradient-to-br from-blue-500/20 to-purple-500/20',
  'bg-gradient-to-br from-emerald-500/20 to-teal-500/20',
  'bg-gradient-to-br from-orange-500/20 to-red-500/20',
  'bg-gradient-to-br from-indigo-500/20 to-blue-500/20',
  'bg-gradient-to-br from-violet-500/20 to-purple-500/20',
  'bg-gradient-to-br from-pink-500/20 to-rose-500/20',
];

type PostItem = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  icon: string;
};

export function BlogPosts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const [posts, setPosts] = useState<PostItem[]>([]);
  
  console.log('BlogPosts component rendered');
  console.log('posts:', posts);

  useEffect(() => {
    const observer = new IntersectionObserver(
      function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach(function(el) {
      observer.observe(el);
    });

    return function() {
      observer.disconnect();
    };
  }, [posts]);

  // 添加一个状态来触发重新加载
  const [reloadKey, setReloadKey] = useState(0);

  // 监听热更新
  useEffect(() => {
    if (import.meta.hot) {
      import.meta.hot.on('vite:beforeUpdate', () => {
        // 当文件变化时，增加reloadKey来触发重新加载
        setReloadKey(prev => prev + 1);
      });
    }
  }, []);

  useEffect(() => {
    // 动态加载所有markdown文件
    const loadPosts = async () => {
      try {
        console.log('Loading posts...');
        
        // 使用Vite的import.meta.glob动态导入markdown文件
        const modules = import.meta.glob('../content/posts/*.md', { query: '?raw', import: 'default' });
        
        console.log('Modules:', modules);
        
        const loadedPosts = [];
        
        for (const [path, module] of Object.entries(modules)) {
          console.log('Processing path:', path);
          
          try {
            const content = await module();
            
            // 解析frontmatter
            const normalized = content.replace(/^\uFEFF/, '');
            const match = normalized.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
            
            let data = {};
            let markdownContent = normalized.trim();
            
            if (match) {
              const [, rawFrontmatter, contentPart] = match;
              markdownContent = contentPart.trim();
              
              rawFrontmatter.split(/\r?\n/).forEach((line) => {
                const separatorIndex = line.indexOf(':');
                if (separatorIndex === -1) return;
                
                const key = line.slice(0, separatorIndex).trim();
                const value = line.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '');
                
                if (key) {
                  data[key] = value;
                }
              });
            }
            
            // 提取标题
            const titleMatch = markdownContent.match(/^#\s+(.+?)\r?\n/);
            const title = titleMatch ? titleMatch[1].trim() : '无标题';
            
            // 提取内容
            const contentWithoutTitle = titleMatch ? markdownContent.replace(/^#\s+.+?\r?\n+/, '').trim() : markdownContent;
            
            // 优先使用frontmatter中的excerpt，如果没有则自动生成
            const excerpt = data.excerpt || contentWithoutTitle.replace(/\n/g, ' ').substring(0, 100) + '...';
            
            // 提取文件名作为slug
            const slug = path.match(/([^/]+)\.md$/)?.[1] || '';
            
            const post = {
              id: Date.now() + Math.random(),
              slug,
              title: data.title || title,
              excerpt,
              date: data.date || '未知日期',
              readTime: data.readTime || '未知阅读时间',
              category: data.category || '未分类',
              image: bgColors[Math.floor(Math.random() * bgColors.length)],
              icon: data.icon || (data.category ? data.category[0] : '文')
            };
            
            console.log('Processed post:', post);
            loadedPosts.push(post);
          } catch (error) {
            console.error('Error processing file:', path, error);
          }
        }
        
        console.log('Loaded posts:', loadedPosts);
        setPosts(loadedPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
      }
    };

    loadPosts();
  }, [reloadKey]);

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-secondary/30"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <p className="animate-on-scroll opacity-0 text-sm text-muted-foreground tracking-widest uppercase mb-4">
              {t('blog.title')}
            </p>
            <h2 className="animate-on-scroll opacity-0 delay-100 text-3xl sm:text-4xl lg:text-5xl font-bold">
              {t('blog.heading')}
            </h2>
          </div>
          <Button
            variant="outline"
            className="animate-on-scroll opacity-0 delay-200 rounded-full group w-fit"
          >
            {t('blog.viewAll')}
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(function(post, index) {
            return (
              <Link 
                to={`/post/${post.slug}`} 
                key={post.id}
                className="block"
              >
                <Card
                  className={`animate-on-scroll opacity-0 delay-${(index + 3) * 100} group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card`}
                >
                  <div
                    className={`h-48 w-full ${post.image} rounded-t-lg flex items-center justify-center`}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-white/80 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-2xl font-bold text-muted-foreground">
                        {post.icon}
                      </span>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed mb-4">
                      {post.excerpt}
                    </CardDescription>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary text-xs font-medium">
                        <Tag className="w-3 h-3" />
                        {post.category}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}