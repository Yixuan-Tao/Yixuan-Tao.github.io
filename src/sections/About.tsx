import { useEffect, useRef } from 'react';
import { Code, PenTool, Coffee, Globe } from 'lucide-react';

const skills = [
  { name: 'Frontend Development', icon: Code, level: 90 },
  { name: 'UI/UX Design', icon: PenTool, level: 85 },
  { name: 'Technical Writing', icon: Coffee, level: 80 },
  { name: 'Open Source', icon: Globe, level: 75 },
];

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
      id="about"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Text content */}
          <div>
            <p className="animate-on-scroll opacity-0 text-sm text-muted-foreground tracking-widest uppercase mb-4">
              About Me
            </p>
            <h2 className="animate-on-scroll opacity-0 delay-100 text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Crafting digital experiences with passion
            </h2>
            <div className="animate-on-scroll opacity-0 delay-200 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Hello! I'm a full-stack developer and designer based in Nanjing, Jiangsu, China. 
                With over 5 years of experience in the tech industry, I've had the 
                privilege of working with startups and established companies alike.
              </p>
              <p>
                My journey began with a curiosity about how things work on the web, 
                which led me to dive deep into programming. Today, I specialize in 
                building modern web applications that are both beautiful and functional.
              </p>
              <p>
                When I'm not coding, you'll find me writing about technology, 
                contributing to open-source projects, or exploring new design trends.
              </p>
            </div>
          </div>

          {/* Right column - Skills */}
          <div className="space-y-6">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className={`animate-on-scroll opacity-0 delay-${(index + 3) * 100}`}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 rounded-xl bg-secondary">
                    <skill.icon className="w-5 h-5" />
                  </div>
                  <span className="font-medium">{skill.name}</span>
                  <span className="ml-auto text-sm text-muted-foreground">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-neutral-600 to-neutral-800 dark:from-neutral-400 dark:to-neutral-200 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="animate-on-scroll opacity-0 delay-500 mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '50+', label: 'Articles Published' },
            { value: '5+', label: 'Years Experience' },
            { value: '20+', label: 'Projects Completed' },
            { value: '1K+', label: 'GitHub Stars' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
