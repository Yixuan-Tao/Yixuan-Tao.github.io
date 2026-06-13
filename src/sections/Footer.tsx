import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import { socialLinks } from '@/data/site';

const iconMap = {
  email: Mail,
  github: Github,
  linkedin: Linkedin,
  resume: Mail,
};

const navLinks = [
  { label: 'footer.nav.home', href: '#' },
  { label: 'footer.nav.about', href: '#about' },
  { label: 'footer.nav.blog', href: '#blog' },
  { label: 'footer.nav.projects', href: '#projects' },
  { label: 'footer.nav.contact', href: '#contact' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">Yixuan Tao</h3>
            <p className="text-sm text-muted-foreground">
              {t('footer.description')}
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t(link.label)}
              </a>
            ))}
          </nav>

          <div className="flex gap-4">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.type];

              return (
                <a
                  key={link.type}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                  aria-label={t(link.labelKey)}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="my-8 border-t" />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>{t('footer.copyright', { year: currentYear })}</span>
          <span className="hidden sm:inline">·</span>
          <span className="flex items-center gap-1">
            <Trans i18nKey="footer.madeWith">
              Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> using React
            </Trans>
          </span>
        </div>
      </div>
    </footer>
  );
}
