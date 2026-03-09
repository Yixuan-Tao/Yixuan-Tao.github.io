import { useEffect, useRef } from 'react';
import { ExternalLink, Github, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
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
    key: 'projects.items.project1',
    tags: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Socket.io'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    stars: 234,
    image: 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20',
  },
  {
    id: 2,
    key: 'projects.items.project2',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Storybook'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    stars: 567,
    image: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
  },
  {
    id: 3,
    key: 'projects.items.project3',
    tags: ['Next.js', 'MDX', 'Prisma', 'PostgreSQL'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    stars: 189,
    image: 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20',
  },
  {
    id: 4,
    key: 'projects.items.project4',
    tags: ['Vue.js', 'D3.js', 'OpenWeather API', 'PWA'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    stars: 145,
    image: 'bg-gradient-to-br from-amber-500/20 to-orange-500/20',
  },
];

type ProjectItem = {
  name: string;
  description: string;
};

export function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

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
        <div className="text-center mb-16">
          <p className="animate-on-scroll opacity-0 text-sm text-muted-foreground tracking-widest uppercase mb-4">
            {t('projects.title')}
          </p>
          <h2 className="animate-on-scroll opacity-0 delay-100 text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t('projects.heading')}
          </h2>
          <p className="animate-on-scroll opacity-0 delay-200 text-muted-foreground max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const content = t(project.key, { returnObjects: true }) as ProjectItem;

            return (
              <Card
                key={project.id}
                className={`animate-on-scroll opacity-0 delay-${(index + 3) * 100} group border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden bg-card`}
              >
                <div
                  className={`h-56 w-full ${project.image} flex items-center justify-center relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-20 h-20 rounded-3xl bg-white/90 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center shadow-xl">
                    <span className="text-3xl font-bold">{content.name[0]}</span>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl mb-2">{content.name}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {content.description}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 shrink-0">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">{project.stars}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="rounded-full">
                        {tag}
                      </Badge>
                    ))}
                  </div>

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
                        {t('projects.code')}
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
                        {t('projects.demo')}
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
