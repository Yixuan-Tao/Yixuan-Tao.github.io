import { Navigation } from '@/sections/Navigation';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { BlogPosts } from '@/sections/BlogPosts';
import { Projects } from '@/sections/Projects';
import { Contact } from '@/sections/Contact';
import { Footer } from '@/sections/Footer';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <Hero />
        <About />
        <BlogPosts />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
