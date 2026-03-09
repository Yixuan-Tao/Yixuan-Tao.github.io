import { useEffect, useRef } from 'react';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const posts = [
  {
    id: 1,
    title: 'Building Modern Web Applications with React',
    excerpt:
      'Explore the best practices for building scalable and maintainable React applications in 2024. From hooks to state management.',
    date: 'Jan 15, 2024',
    readTime: '8 min read',
    category: 'Development',
    image: 'bg-gradient-to-br from-blue-500/20 to-purple-500/20',
  },
  {
    id: 2,
    title: 'The Art of Minimalist Design',
    excerpt:
      'How less can be more in digital design. Discover the principles behind creating clean, effective, and beautiful user interfaces.',
    date: 'Jan 10, 2024',
    readTime: '6 min read',
    category: 'Design',
    image: 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20',
  },
  {
    id: 3,
    title: 'My Journey into Open Source',
    excerpt:
      'Sharing my experience of contributing to open-source projects and how it transformed my career as a developer.',
    date: 'Jan 5, 2024',
    readTime: '5 min read',
    category: 'Career',
    image: 'bg-gradient-to-br from-orange-500/20 to-red-500/20',
  },
  {
    id: 4,
    title: 'TypeScript Tips and Tricks',
    excerpt:
      'Advanced TypeScript patterns and techniques that will make your code more robust and maintainable.',
    date: 'Dec 28, 2023',
    readTime: '10 min read',
    category: 'Development',
    image: 'bg-gradient-to-br from-indigo-500/20 to-blue-500/20',
  },
  {
    id: 5,
    title: 'The Future of Web Development',
    excerpt:
      'A look into emerging technologies and trends that will shape the future of how we build for the web.',
    date: 'Dec 20, 2023',
    readTime: '7 min read',
    category: 'Technology',
    image: 'bg-gradient-to-br from-violet-500/20 to-purple-500/20',
  },
  {
    id: 6,
    title: 'Mastering CSS Grid and Flexbox',
    excerpt:
      'A comprehensive guide to modern CSS layout techniques with practical examples and use cases.',
    date: 'Dec 15, 2023',
    readTime: '12 min read',
    category: 'Development',
    image: 'bg-gradient-to-br from-pink-500/20 to-rose-500/20',
  },
];

export function BlogPosts() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-secondary/30"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <p className="animate-on-scroll opacity-0 text-sm text-muted-foreground tracking-widest uppercase mb-4">
              Latest Articles
            </p>
            <h2 className="animate-on-scroll opacity-0 delay-100 text-3xl sm:text-4xl lg:text-5xl font-bold">
              Thoughts & Insights
            </h2>
          </div>
          <Button
            variant="outline"
            className="animate-on-scroll opacity-0 delay-200 rounded-full group w-fit"
          >
            View All Posts
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <Card
              key={post.id}
              className={`animate-on-scroll opacity-0 delay-${(index + 3) * 100} group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card`}
            >
              {/* Image placeholder */}
              <div
                className={`h-48 w-full ${post.image} rounded-t-lg flex items-center justify-center`}
              >
                <div className="w-16 h-16 rounded-2xl bg-white/80 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-2xl font-bold text-muted-foreground">
                    {post.category[0]}
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
          ))}
        </div>
      </div>
    </section>
  );
}
