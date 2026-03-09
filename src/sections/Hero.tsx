import { useEffect, useRef } from 'react';
import { ArrowDown, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

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
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-neutral-200/50 dark:bg-neutral-800/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-neutral-300/30 dark:bg-neutral-700/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Avatar */}
        <div className="animate-on-scroll opacity-0 mb-8">
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-neutral-300 to-neutral-500 dark:from-neutral-600 dark:to-neutral-800 flex items-center justify-center text-4xl font-bold text-white shadow-2xl">
            ME
          </div>
        </div>

        {/* Greeting */}
        <p className="animate-on-scroll opacity-0 delay-100 text-sm sm:text-base text-muted-foreground tracking-widest uppercase mb-4">
          Welcome to my blog
        </p>

        {/* Main heading */}
        <h1 className="animate-on-scroll opacity-0 delay-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          Hi, I'm{' '}
          <span className="bg-gradient-to-r from-neutral-700 to-neutral-900 dark:from-neutral-300 dark:to-neutral-100 bg-clip-text text-transparent">
            Your Name
          </span>
        </h1>

        {/* Subtitle */}
        <p className="animate-on-scroll opacity-0 delay-300 text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
          A passionate developer, writer, and creative thinker. 
          I share my thoughts on technology, design, and life.
        </p>

        {/* CTA Buttons */}
        <div className="animate-on-scroll opacity-0 delay-400 flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="rounded-full px-8">
            Read My Blog
          </Button>
          <Button variant="outline" size="lg" className="rounded-full px-8">
            About Me
          </Button>
        </div>

        {/* Social Links */}
        <div className="animate-on-scroll opacity-0 delay-500 flex justify-center gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white dark:bg-neutral-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white dark:bg-neutral-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white dark:bg-neutral-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:hello@example.com"
            className="p-3 rounded-full bg-white dark:bg-neutral-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  );
}
