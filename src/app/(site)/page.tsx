import About from "@/components/sections/About";
import Benefits from "@/components/sections/Benefits";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import PortfolioProjects from "@/components/sections/PortfolioProjects";
import Services from "@/components/sections/Services";
import StudyAbroad from "@/components/sections/StudyAbroad";
import VideoShowcase from "@/components/sections/VideoShowcase";
import WorkingProcess from "@/components/sections/WorkingProcess";
import { getBlogPosts, getProjects, getServices, getVideos } from "@/lib/data/content";
import { getHomeContent, getSiteSettings } from "@/lib/data/settings";

export default async function HomePage() {
  const [settings, home, services, projects, videos, posts] = await Promise.all([
    getSiteSettings(),
    getHomeContent(),
    getServices(),
    getProjects(),
    getVideos(),
    getBlogPosts(),
  ]);

  // Every section can be hidden from the admin; listing sections also hide when empty.
  return (
    <>
      {home.hero.enabled && <Hero content={home.hero} />}
      {home.services.enabled && services.length > 0 && (
        <Services heading={home.services} services={services} limit={3} viewAllHref="/services" />
      )}
      {home.about.enabled && <About content={home.about} phone={settings.contact.phone} />}
      {home.portfolio.enabled && projects.length > 0 && (
        <PortfolioProjects heading={home.portfolio} data={projects} viewAllHref="/projects" />
      )}
      {home.process.enabled && <WorkingProcess content={home.process} />}
      {home.benefits.enabled && <Benefits content={home.benefits} />}
      {home.videos.enabled && videos.length > 0 && (
        <VideoShowcase
          heading={home.videos}
          videos={videos}
          youtubeChannelUrl={settings.social.youtube}
          viewAllHref="/videos"
        />
      )}
      {home.studyAbroad.enabled && <StudyAbroad content={home.studyAbroad} />}
      {home.blog.enabled && posts.length > 0 && (
        <Blog heading={home.blog} posts={posts.slice(0, 3)} viewAllHref="/blog" />
      )}
      {home.contact.enabled && <Contact content={home.contact} contact={settings.contact} />}
    </>
  );
}
