import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

type ProjectItem = {
  name: string;
  description: string;
};

export function PlayPage() {
  const { t } = useTranslation();
  const content = t('projects.items.chronoFront', {
    returnObjects: true,
  }) as ProjectItem;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3 border-b bg-card">
        <Button variant="outline" size="sm" className="rounded-full" asChild>
          <Link to="/#projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('projects.back')}
          </Link>
        </Button>
        <span className="text-sm font-medium truncate">{content.name}</span>
      </header>
      <div className="flex-1">
        <iframe
          src="/demos/chrono-front/index.html"
          title={content.name}
          className="w-full h-[calc(100vh-57px)] border-0"
          allow="fullscreen"
        />
      </div>
    </div>
  );
}
