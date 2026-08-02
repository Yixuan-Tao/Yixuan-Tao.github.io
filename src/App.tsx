import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from '@/sections/Navigation';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { BlogPosts } from '@/sections/BlogPosts';
import { Projects } from '@/sections/Projects';
import { Contact } from '@/sections/Contact';
import { Footer } from '@/sections/Footer';
import { PostPage } from '@/pages/PostPage';
import { ProjectPage } from '@/pages/ProjectPage';
import { PlayPage } from '@/pages/PlayPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
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
          </div>
        } />
        <Route path="/post/:slug" element={<PostPage />} />
        <Route path="/project/:slug" element={<ProjectPage />} />
        <Route path="/play/chrono-front" element={<PlayPage />} />
      </Routes>
    </Router>
  );
}

export default App;
