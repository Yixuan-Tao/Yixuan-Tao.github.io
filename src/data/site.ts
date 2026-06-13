export type ContactLinkType = 'email' | 'github' | 'linkedin' | 'resume';

export type ContactLink = {
  type: ContactLinkType;
  labelKey: string;
  value: string;
  href: string;
  external?: boolean;
};

export type Project = {
  id: string;
  titleKey: string;
  descriptionKey: string;
  roleKey: string;
  techStack: string[];
  githubUrl: string;
  demoUrl?: string;
  highlightsKey: string;
  accentClass: string;
};

export const contactLinks: ContactLink[] = [
  {
    type: 'email',
    labelKey: 'contact.links.email',
    value: 'taoyixuan0415@outlook.com',
    href: 'mailto:taoyixuan0415@outlook.com',
  },
  {
    type: 'linkedin',
    labelKey: 'contact.links.linkedin',
    value: 'LinkedIn',
    href: 'https://www.linkedin.com/in/yixuan-tao-y78tao',
    external: true,
  },
  {
    type: 'github',
    labelKey: 'contact.links.github',
    value: 'GitHub',
    href: 'https://github.com/Yixuan-Tao',
    external: true,
  },
  {
    type: 'resume',
    labelKey: 'contact.links.resume',
    value: 'Resume',
    href: 'mailto:taoyixuan0415@outlook.com?subject=Resume%20request',
  },
];

export const socialLinks: ContactLink[] = contactLinks.filter((link) =>
  ['email', 'github', 'linkedin'].includes(link.type)
);

export const projects: Project[] = [
  {
    id: 'airstrike',
    titleKey: 'projects.items.airstrike.name',
    descriptionKey: 'projects.items.airstrike.description',
    roleKey: 'projects.items.airstrike.role',
    techStack: ['Godot', 'GDScript', '2D Gameplay', 'Enemy AI'],
    githubUrl: 'https://github.com/Yixuan-Tao/Airstrike',
    highlightsKey: 'projects.items.airstrike.highlights',
    accentClass: 'bg-gradient-to-br from-cyan-500/20 via-sky-500/20 to-blue-500/20',
  },
];
