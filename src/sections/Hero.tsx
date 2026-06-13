import { useEffect, useRef } from 'react';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { socialLinks } from '@/data/site';

const iconMap = {
  email: Mail,
  github: Github,
  linkedin: Linkedin,
  resume: Mail,
};

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
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

    const elements = heroRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Avatar */}
        <div className="animate-on-scroll opacity-0 mb-8">
          <div className="w-32 h-32 mx-auto rounded-full bg-neutral-900 dark:bg-neutral-100 flex items-center justify-center text-4xl font-bold text-white dark:text-neutral-950 shadow-2xl">
            YT
          </div>
        </div>

        {/* Greeting */}
        <p className="animate-on-scroll opacity-0 delay-100 text-sm sm:text-base text-muted-foreground tracking-widest uppercase mb-4">
          {t('hero.greeting')}
        </p>

        {/* Main heading */}
        <h1 className="animate-on-scroll opacity-0 delay-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          {t('hero.title')}{' '}
          <span className="bg-gradient-to-r from-neutral-700 to-neutral-900 dark:from-neutral-300 dark:to-neutral-100 bg-clip-text text-transparent">
            {t('hero.name')}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="animate-on-scroll opacity-0 delay-300 text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
          {t('hero.subtitle')}
        </p>

        {/* CTA Buttons */}
        <div className="animate-on-scroll opacity-0 delay-400 flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="rounded-full px-8" asChild>
            <a href="#projects">{t('hero.ctaProjects')}</a>
          </Button>
          <Button variant="outline" size="lg" className="rounded-full px-8" asChild>
            <a href="#blog">{t('hero.ctaBlog')}</a>
          </Button>
          <Button variant="ghost" size="lg" className="rounded-full px-8" asChild>
            <a href="#contact">{t('hero.ctaContact')}</a>
          </Button>
        </div>

        {/* Social Links */}
        <div className="animate-on-scroll opacity-0 delay-500 flex justify-center gap-6">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.type];

            return (
              <a
                key={link.type}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                aria-label={t(link.labelKey)}
                className="p-3 rounded-full bg-white dark:bg-neutral-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  );
}
