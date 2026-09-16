import { lazy, Suspense } from "react";
import { ContactSection } from "./components/contact/ContactSection";
import { HeroSection } from "./components/hero/HeroSection";
import { Navbar } from "./components/navigation/Navbar";
import { ProfilePillars } from "./components/profile/ProfilePillars";
import { ProjectModal } from "./components/projects/ProjectModal";
import { ProjectsGrid } from "./components/projects/ProjectsGrid";
import { SkillTree } from "./components/stack/SkillTree";

const ThreeBackground = lazy(() =>
  import("./components/background/ThreeBackground").then((m) => ({
    default: m.ThreeBackground,
  })),
);

export const App = () => {
  return (
    <div className="min-h-screen relative text-slate-100 bg-[#0a0c10] selection:bg-amber-500 selection:text-slate-950">
      {/* Studio Architectural Background */}
      <Suspense
        fallback={
          <div className="fixed inset-0 pointer-events-none z-0 bg-[#0a0c10]" />
        }
      >
        <ThreeBackground />
      </Suspense>

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
