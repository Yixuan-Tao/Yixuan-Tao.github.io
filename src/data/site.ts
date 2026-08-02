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
  category: 'ai' | 'game';
  titleKey: string;
  descriptionKey: string;
  roleKey: string;
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  detailPath?: string;
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
    id: 'platform',
    category: 'ai',
    titleKey: 'projects.items.platform.name',
    descriptionKey: 'projects.items.platform.description',
    roleKey: 'projects.items.platform.role',
    techStack: ['FastAPI', 'Next.js', 'LangGraph', 'RAG', 'SSE'],
    detailPath: '/project/agent-platform',
    highlightsKey: 'projects.items.platform.highlights',
    accentClass: 'bg-gradient-to-br from-indigo-500/20 via-blue-500/20 to-cyan-500/20',
  },
  {
    id: 'itAgent',
    category: 'ai',
    titleKey: 'projects.items.itAgent.name',
    descriptionKey: 'projects.items.itAgent.description',
    roleKey: 'projects.items.itAgent.role',
    techStack: ['FastAPI', 'LangGraph', 'RAG', 'Jira'],
    githubUrl: 'https://github.com/Yixuan-Tao/ITSupportService',
    highlightsKey: 'projects.items.itAgent.highlights',
    accentClass: 'bg-gradient-to-br from-purple-500/20 via-fuchsia-500/20 to-pink-500/20',
  },
  {
    id: 'airstrike',
    category: 'game',
    titleKey: 'projects.items.airstrike.name',
    descriptionKey: 'projects.items.airstrike.description',
    roleKey: 'projects.items.airstrike.role',
    techStack: ['Godot', 'GDScript', '2D Gameplay', 'Enemy AI'],
    githubUrl: 'https://github.com/Yixuan-Tao/Airstrike',
    highlightsKey: 'projects.items.airstrike.highlights',
    accentClass: 'bg-gradient-to-br from-cyan-500/20 via-sky-500/20 to-blue-500/20',
  },
  {
    id: 'chronoFront',
    category: 'game',
    titleKey: 'projects.items.chronoFront.name',
    descriptionKey: 'projects.items.chronoFront.description',
    roleKey: 'projects.items.chronoFront.role',
    techStack: ['Godot', 'Roguelite', 'Card Game', 'Systems Design'],
    githubUrl: 'https://github.com/Yixuan-Tao/chrono-front',
    demoUrl: '/play/chrono-front',
    highlightsKey: 'projects.items.chronoFront.highlights',
    accentClass: 'bg-gradient-to-br from-amber-500/20 via-orange-500/20 to-rose-500/20',
  },
];
