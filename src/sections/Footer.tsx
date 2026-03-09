import { Github, Linkedin, Mail, Heart, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const socialLinks = [
  { icon: Github, href: 'https://github.com/Yixuan-Tao', label: 'footer.social.github' },
  { icon: MessageSquare, href: '#', label: 'footer.social.wechat' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/yixuan-tao-y78tao', label: 'footer.social.linkedin' },
  { icon: Mail, href: 'mailto:taoyixuan0415@outlook.com', label: 'footer.social.email' },
];

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
          {/* Logo/Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">Yixuan Tao</h3>
            <p className="text-sm text-muted-foreground">
              Building digital experiences with passion.
            </p>
          </div>

          {/* Navigation */}
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

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                aria-label={t(link.label)}
              >
                <link.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>{t('footer.copyright', { year: currentYear })}</span>
          <span className="hidden sm:inline">·</span>
          <span className="flex items-center gap-1">
            {t('footer.madeWith', { heart: <Heart className="w-4 h-4 text-red-500 fill-current" /> })}
          </span>
        </div>
      </div>
    </footer>
  );
}
