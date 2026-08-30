import { ThreeBackground } from "./components/background/ThreeBackground";
import { ContactSection } from "./components/contact/ContactSection";
import { HeroSection } from "./components/hero/HeroSection";
import { Navbar } from "./components/navigation/Navbar";
import { ProfilePillars } from "./components/profile/ProfilePillars";
import { ProjectModal } from "./components/projects/ProjectModal";
import { ProjectsGrid } from "./components/projects/ProjectsGrid";
import { SkillTree } from "./components/stack/SkillTree";

export const App = () => {
  return (
    <div className="min-h-screen relative text-slate-100 bg-[#080c14] selection:bg-cyan-400 selection:text-slate-950">
      {/* Interactive 3D WebGL Spatial Canvas (Three.js) */}
      <ThreeBackground />

      {/* Modern Top Navigation Bar */}
      <Navbar />

      {/* Main Sections */}
      <main className="relative z-10">
        <HeroSection />
        <SkillTree />
        <ProjectsGrid />
        <ProfilePillars />
        <ContactSection />
      </main>

      {/* Interactive Project Case Study Modal */}
      <ProjectModal />
    </div>
  );
};
