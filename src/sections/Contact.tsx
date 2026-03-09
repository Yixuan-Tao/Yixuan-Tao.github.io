import { useEffect, useRef, useState } from 'react';
import { Send, MapPin, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

const contactInfo = [
  {
    icon: MapPin,
    label: 'contact.info.location',
    value: 'contact.info.locationValue',
  },
  {
    icon: Mail,
    label: 'contact.info.email',
    value: 'taoyixuan0415@outlook.com',
    href: 'mailto:taoyixuan0415@outlook.com',
  },
  {
    icon: Phone,
    label: 'contact.info.phone',
    value: '+86 17751006875',
    href: 'tel:+8617751006875',
  },
];

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: t('contact.form.success'),
      description: t('contact.form.successDesc'),
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

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
            {contactInfo.map((item, index) => {
              const value = item.href ? item.value : t(item.value);

              return (
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
                    {item.href ? (
                      <a
                        href={item.href}
                        className="font-medium hover:text-primary transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="font-medium">{value}</p>
                    )}
                  </div>
                </div>
              );
            })}

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
            <form
              onSubmit={handleSubmit}
              className="animate-on-scroll opacity-0 delay-300 space-y-6 p-8 rounded-3xl bg-white dark:bg-neutral-800 shadow-xl"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('contact.form.name')}</Label>
                  <Input
                    id="name"
                    placeholder={t('contact.form.namePlaceholder')}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t('contact.form.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('contact.form.emailPlaceholder')}
                    required
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">{t('contact.form.subject')}</Label>
                <Input
                  id="subject"
                  placeholder={t('contact.form.subjectPlaceholder')}
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">{t('contact.form.message')}</Label>
                <Textarea
                  id="message"
                  placeholder={t('contact.form.messagePlaceholder')}
                  required
                  rows={5}
                  className="rounded-xl resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full rounded-xl"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t('contact.form.submitting')}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    {t('contact.form.submit')}
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
