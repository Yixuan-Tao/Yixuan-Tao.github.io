import { useEffect, useRef } from 'react';
import { FileText, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { contactLinks } from '@/data/site';

const iconMap = {
  email: Mail,
  github: Github,
  linkedin: Linkedin,
  resume: FileText,
};

const profileInfo = [
  {
    icon: MapPin,
    label: 'contact.info.location',
    value: 'contact.info.locationValue',
  },
];

export function Contact() {
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
      id="contact"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-secondary/30"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="animate-on-scroll opacity-0 text-sm text-muted-foreground tracking-widest uppercase mb-4">
            {t('contact.title')}
          </p>
          <h2 className="animate-on-scroll opacity-0 delay-100 text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t('contact.heading')}
          </h2>
          <p className="animate-on-scroll opacity-0 delay-200 text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-8">
            {profileInfo.map((item, index) => (
              <div
                key={item.label}
                className={`animate-on-scroll opacity-0 delay-${(index + 3) * 100} flex items-start gap-4`}
              >
                <div className="p-3 rounded-xl bg-white dark:bg-neutral-800 shadow-md">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {t(item.label)}
                  </p>
                  <p className="font-medium">{t(item.value)}</p>
                </div>
              </div>
            ))}

            <div className="animate-on-scroll opacity-0 delay-500 hidden lg:block mt-12 p-8 rounded-3xl bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-700">
              <blockquote className="text-lg font-medium italic">
                "{t('contact.quote')}"
              </blockquote>
              <p className="text-sm text-muted-foreground mt-4">
                {t('contact.quoteAuthor')}
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="animate-on-scroll opacity-0 delay-300 p-8 rounded-3xl bg-white dark:bg-neutral-800 shadow-xl">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-3">
                  {t('contact.direct.title')}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('contact.direct.description')}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {contactLinks.map((link) => {
                  const Icon = iconMap[link.type];

                  return (
                    <Button
                      key={link.type}
                      variant={link.type === 'email' ? 'default' : 'outline'}
                      size="lg"
                      className="h-auto justify-start rounded-xl px-4 py-4"
                      asChild
                    >
                      <a
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                      >
                        <Icon className="mr-3 h-5 w-5 shrink-0" />
                        <span className="text-left">
                          <span className="block text-sm font-semibold">
                            {t(link.labelKey)}
                          </span>
                          <span className="block text-xs opacity-80">
                            {link.value}
                          </span>
                        </span>
                      </a>
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
