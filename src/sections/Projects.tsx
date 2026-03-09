import { useEffect, useRef } from 'react';
import { ExternalLink, Github, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const projects = [
  {
    id: 1,
    name: 'TaskMaster Pro',
    description:
      'A powerful task management application built with React and Node.js. Features real-time collaboration, drag-and-drop interface, and advanced filtering.',
    tags: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Socket.io'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    stars: 234,
    image: 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20',
  },
  {
    id: 2,
    name: 'DesignSystem UI',
    description:
      'A comprehensive UI component library with 50+ accessible components. Built with React, Tailwind CSS, and fully typed with TypeScript.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Storybook'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    stars: 567,
    image: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
  },
  {
    id: 3,
    name: 'DevBlog Platform',
    description:
      'A modern blogging platform designed specifically for developers. Supports Markdown, code syntax highlighting, and SEO optimization.',
    tags: ['Next.js', 'MDX', 'Prisma', 'PostgreSQL'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    stars: 189,
    image: 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20',
  },
  {
    id: 4,
    name: 'WeatherDash',
    description:
      'Beautiful weather dashboard with location-based forecasts, interactive maps, and detailed weather analytics.',
    tags: ['Vue.js', 'D3.js', 'OpenWeather API', 'PWA'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    stars: 145,
    image: 'bg-gradient-to-br from-amber-500/20 to-orange-500/20',
  },
];

export function Projects() {
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
      id="projects"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="animate-on-scroll opacity-0 text-sm text-muted-foreground tracking-widest uppercase mb-4">
            Featured Work
          </p>
          <h2 className="animate-on-scroll opacity-0 delay-100 text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Projects I'm Proud Of
          </h2>
          <p className="animate-on-scroll opacity-0 delay-200 text-muted-foreground max-w-2xl mx-auto">
            A collection of projects I've worked on, ranging from open-source 
            libraries to full-stack applications.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              className={`animate-on-scroll opacity-0 delay-${(index + 3) * 100} group border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden bg-card`}
            >
              {/* Image placeholder */}
              <div
                className={`h-56 w-full ${project.image} flex items-center justify-center relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-20 h-20 rounded-3xl bg-white/90 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center shadow-xl">
                  <span className="text-3xl font-bold">
                    {project.name[0]}
                  </span>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl mb-2">{project.name}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500 shrink-0">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{project.stars}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="rounded-full">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full flex-1 group/btn"
                    asChild
                  >
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    className="rounded-full flex-1 group/btn"
                    asChild
                  >
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
