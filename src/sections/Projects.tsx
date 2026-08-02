import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, FileText, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { projects, type Project } from '@/data/site';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const groups: { key: 'ai' | 'game'; labelKey: string }[] = [
  { key: 'ai', labelKey: 'projects.groupAI' },
  { key: 'game', labelKey: 'projects.groupGame' },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t } = useTranslation();
  const highlights = t(project.highlightsKey, {
    returnObjects: true,
  }) as string[];
  const isInternal = (href: string) => href.startsWith('/');

  return (
    <Card
      className={`animate-on-scroll opacity-0 delay-${(index + 3) * 100} group border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden bg-card`}
    >
      <div
        className={`h-56 w-full ${project.accentClass} flex items-center justify-center relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="w-20 h-20 rounded-3xl bg-white/90 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center shadow-xl">
          <span className="text-3xl font-bold">
            {t(project.titleKey).slice(0, 1)}
          </span>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div>
          <CardTitle className="text-xl mb-2">{t(project.titleKey)}</CardTitle>
          <CardDescription className="text-sm leading-relaxed">
            {t(project.descriptionKey)}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <p className="mb-4 text-sm font-medium text-foreground">
          {t(project.roleKey)}
        </p>
        <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
          {highlights.map((highlight) => (
            <li key={highlight} className="leading-relaxed">
              {highlight}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-full">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex gap-3">
          {project.detailPath ? (
            <Button
              variant="outline"
              size="sm"
              className="rounded-full flex-1 group/btn"
              asChild
            >
              <Link to={project.detailPath}>
                <FileText className="w-4 h-4 mr-2" />
                {t('projects.detail')}
              </Link>
            </Button>
          ) : (
            project.githubUrl && (
              <Button
                variant="outline"
                size="sm"
                className="rounded-full flex-1 group/btn"
                asChild
              >
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4 mr-2" />
                  {t('projects.code')}
                </a>
              </Button>
            )
          )}

          {project.demoUrl ? (
            <Button
              size="sm"
              className="rounded-full flex-1 group/btn"
              asChild
            >
              {isInternal(project.demoUrl) ? (
                <Link to={project.demoUrl}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t('projects.demo')}
                </Link>
              ) : (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t('projects.demo')}
                </a>
              )}
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

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

  let globalIndex = 0;

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

        {groups.map((group) => (
          <div key={group.key} className="mb-16 last:mb-0">
            <h3 className="animate-on-scroll opacity-0 text-lg sm:text-xl font-semibold mb-6 flex items-center gap-3">
              <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-neutral-600 to-neutral-400 dark:from-neutral-400 dark:to-neutral-600" />
              {t(group.labelKey)}
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {projects
                .filter((project) => project.category === group.key)
                .map((project) => {
                  const index = globalIndex++;
                  return (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                    />
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
