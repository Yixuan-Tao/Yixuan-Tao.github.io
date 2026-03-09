import { Github, Linkedin, Mail, Heart, MessageSquare } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/Yixuan-Tao', label: 'GitHub' },
  { icon: MessageSquare, href: '#', label: 'WeChat' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/yixuan-tao-y78tao', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:taoyixuan0415@outlook.com', label: 'Email' },
];

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Blog', href: '#blog' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

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
                {link.label}
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
                aria-label={link.label}
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
          <span>© {currentYear} Yixuan Tao. All rights reserved.</span>
          <span className="hidden sm:inline">·</span>
          <span className="flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> using React
          </span>
        </div>
      </div>
    </footer>
  );
}
