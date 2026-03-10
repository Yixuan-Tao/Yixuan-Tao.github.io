import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from 'react';

// 直接导入markdown文件
import stormHeroesContent from '../content/posts/storm-heroes-experience-system.md?raw';

// 简单的frontmatter解析函数
function parseFrontmatter(content: string) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content };
  }
  
  const frontmatter = match[1];
  const markdownContent = match[2];
  
  const data: any = {};
  frontmatter.split('\n').forEach(line => {
    const [key, ...value] = line.split(': ');
    if (key && value.length > 0) {
      data[key] = value.join(': ').replace(/^"|"$/g, '');
    }
  });
  
  return { data, content: markdownContent };
}

export function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [post, setPost] = useState({
    title: "风暴英雄经验系统拆解",
    date: "2026 年 3 月 1 日",
    readTime: "8 分钟阅读",
    category: "拆解",
    content: ""
  });

  useEffect(() => {
    // 加载markdown文件
    const loadMarkdown = () => {
      try {
        // 根据slug选择对应的内容
        let fileContent = '';
        if (slug === 'storm-heroes-experience-system') {
          fileContent = stormHeroesContent;
        }
        
        // 解析frontmatter和内容
        const { data, content } = parseFrontmatter(fileContent);
        
        // 更新post对象
        setPost({
          title: data.title || post.title,
          date: data.date || post.date,
          readTime: data.readTime || post.readTime,
          category: data.category || post.category,
          content: content
        });
      } catch (error) {
        console.error('Error loading markdown file:', error);
      }
    };

    loadMarkdown();
  }, [slug]);

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Button 
          variant="outline" 
          className="mb-8" 
          onClick={() => navigate('/#blog')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('blog.viewAll')}
        </Button>
        
        <div className="mb-8">
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-6">{post.title}</h1>
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary text-sm font-medium mb-8">
            <Tag className="w-3 h-3" />
            {post.category}
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}