import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Save, RotateCcw, Plus, Trash2, Edit3, Image, Video, Award,
  Sliders, Link2, BookOpen, MessageSquare, ShieldAlert, Sparkles,
  Layers, CheckCircle, FileText, Check, ExternalLink, HelpCircle, Eye,
  User, RefreshCw, Briefcase, Mail, Phone, MapPin, Hash, Globe, Code,
  Upload, Cloud
} from "lucide-react";
import { loadCMSData, saveCMSData, resetCMSData } from "../../lib/cmsState";
import { CMSData, StatItem, Skill, Service, Project, VideoItem, BlogPost, Testimonial } from "../../types";

interface FileUploaderProps {
  accept: "image/*" | "video/*";
  onUpload: (dataUrl: string) => void;
  label?: string;
}

function FileUploader({ accept, onUpload, label }: FileUploaderProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (accept.includes("video") && file.size > 15 * 1024 * 1024) {
      setErrorText("File size is > 15MB. Best as YouTube link to save space!");
    } else {
      setErrorText("");
    }

    setLoading(true);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onUpload(reader.result);
      }
      setLoading(false);
    };
    reader.onerror = () => {
      setLoading(false);
      alert("Failed to read file.");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col gap-1 items-start mt-1">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={loading}
        className="flex items-center gap-1.5 px-3 py-1.5 border border-white/10 bg-[#0d3329] hover:bg-[#0d3329] text-zinc-300 text-[10px] md:text-[11px] font-bold rounded-xl cursor-pointer transition-colors shadow-3xs"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#cbf341] shrink-0" />
        <span>{loading ? "Reading..." : label || `Upload ${accept.includes("image") ? "Image" : "Video"}`}</span>
      </button>
      {errorText && (
        <span className="text-[10px] text-amber-500 font-medium">
          {errorText}
        </span>
      )}
    </div>
  );
}

interface PortfolioCMSProps {
  onToggleViewMode?: () => void; // Trigger callback to toggle public/admin view to admire changes
  activeCategory?: "hero" | "stats" | "about" | "skills" | "services" | "projects" | "videos" | "blogs" | "contact" | "settings";
  setActiveCategory?: (category: "hero" | "stats" | "about" | "skills" | "services" | "projects" | "videos" | "blogs" | "contact" | "settings") => void;
}

export default function PortfolioCMS({ 
  onToggleViewMode,
  activeCategory: propActiveCategory,
  setActiveCategory: propSetActiveCategory
}: PortfolioCMSProps) {
  // Load current CMS payload
  const [data, setData] = useState<CMSData>(() => loadCMSData());
  const [localCategory, setLocalCategory] = useState<"hero" | "stats" | "about" | "skills" | "services" | "projects" | "videos" | "blogs" | "contact" | "settings">("hero");

  const activeCategory = propActiveCategory || localCategory;
  const setActiveCategory = propSetActiveCategory || setLocalCategory;
  const [isSaved, setIsSaved] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Lists edit modals or current line states
  const [newDeliverable, setNewDeliverable] = useState<string>("");
  const [activeServiceId, setActiveServiceId] = useState<string>("");
  const [newTechnology, setNewTechnology] = useState<string>("");
  const [activeProjectId, setActiveProjectId] = useState<string>("");
  const [newFeature, setNewFeature] = useState<string>("");

  // States for Biography About Image configuration and uploads
  const [isUploadingAbout, setIsUploadingAbout] = useState(false);
  const [uploadAboutError, setUploadAboutError] = useState("");
  const [uploadAboutSuccess, setUploadAboutSuccess] = useState(false);
  const aboutImageInputRef = React.useRef<HTMLInputElement>(null);

  // Sync state to local storage updates
  const handleSave = () => {
    saveCMSData(data);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleReset = () => {
    const defaultData = resetCMSData();
    setData(defaultData);
    setShowResetConfirm(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  // Safe field editors
  const updateHero = (field: keyof CMSData["hero"], value: string) => {
    setData((prev) => ({
      ...prev,
      hero: { ...prev.hero, [field]: value },
    }));
  };

  const updateAbout = (field: keyof CMSData["about"], value: any) => {
    setData((prev) => ({
      ...prev,
      about: { ...prev.about, [field]: value },
    }));
  };

  const handleAboutFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      console.log("[CMS Upload About Image] Cancelled or no file selected.");
      return;
    }

    console.log("[CMS Upload About Image] Selected file name:", file.name, "size:", (file.size / 1024).toFixed(2), "KB", "type:", file.type);

    // Validate type (JPG, PNG, WEBP)
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      console.warn("[CMS Upload About Image] Unsupported file format selected:", file.type);
      setUploadAboutError("Supported formats are JPG, PNG, and WEBP.");
      return;
    }

    // Validate size (5MB maximum)
    if (file.size > 5 * 1024 * 1024) {
      console.warn("[CMS Upload About Image] Selected file is larger than 5MB limit:", file.size);
      setUploadAboutError("File is too large. Choose an image smaller than 5MB.");
      return;
    }

    setUploadAboutError("");
    setIsUploadingAbout(true);

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      const cloudName = data.settings.cloudinaryCloudName?.trim();
      const uploadPreset = data.settings.cloudinaryUploadPreset?.trim();

      if (cloudName && uploadPreset) {
        console.log("[CMS Upload About Image] Cloudinary configuration detected. Cloud Name:", cloudName, "Upload Preset:", uploadPreset, "- Initializing network request...");
        try {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", uploadPreset);

          const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: "POST",
            body: formData
          });

          if (!response.ok) {
            const errorMsg = await response.text();
            throw new Error(errorMsg || `HTTP ${response.status}`);
          }

          const responseJson = await response.json();
          if (responseJson.secure_url) {
            console.log("[CMS Upload About Image] Cloudinary CDN upload success! Active URL:", responseJson.secure_url);
            updateAbout("profileImage", responseJson.secure_url);
            // Auto-save to localStorage so homepage reflects the change immediately
            const updatedDataCdn = { ...data, about: { ...data.about, profileImage: responseJson.secure_url } };
            saveCMSData(updatedDataCdn);
            console.log("[CMS Auto-Save] About profile image (Cloudinary) auto-saved to localStorage.");
            setUploadAboutSuccess(true);
            setTimeout(() => setUploadAboutSuccess(false), 3000);
          } else {
            throw new Error("Secure URL not found in Cloudinary response");
          }
        } catch (err: any) {
          console.error("[CMS Upload About Image] Cloudinary CDN upload failed:", err);
          setUploadAboutError(`Cloudinary CDN upload failed (${err.message || err}). Safe-saved image locally as Base64 format instead.`);
          
          console.log("[CMS Upload About Image] Safe-saving locally as Base64 string fallback...");
          updateAbout("profileImage", dataUrl);
          // Auto-save fallback to localStorage
          const updatedDataFallback = { ...data, about: { ...data.about, profileImage: dataUrl } };
          saveCMSData(updatedDataFallback);
          console.log("[CMS Auto-Save] About profile image (base64 fallback) auto-saved to localStorage.");
        } finally {
          setIsUploadingAbout(false);
          if (aboutImageInputRef.current) aboutImageInputRef.current.value = "";
        }
      } else {
        console.log("[CMS Upload About Image] Cloudinary config missing or empty (using Local Session Storage mode). Storing raw base64 string...");
        updateAbout("profileImage", dataUrl);
        // Auto-save to localStorage so homepage reflects the change immediately
        const updatedDataLocal = { ...data, about: { ...data.about, profileImage: dataUrl } };
        saveCMSData(updatedDataLocal);
        console.log("[CMS Auto-Save] About profile image (base64 local) auto-saved to localStorage. Length:", dataUrl.length);
        setIsUploadingAbout(false);
        setUploadAboutSuccess(true);
        setTimeout(() => setUploadAboutSuccess(false), 3000);
        if (aboutImageInputRef.current) aboutImageInputRef.current.value = "";
      }
    };

    reader.onerror = () => {
      console.error("[CMS Upload About Image] Selected file reader encounter read error.");
      setUploadAboutError("Failed to read user selected file from local device.");
      setIsUploadingAbout(false);
    };

    reader.readAsDataURL(file);
  };

  const updateContact = (field: keyof CMSData["contact"], value: string) => {
    setData((prev) => ({
      ...prev,
      contact: { ...prev.contact, [field]: value },
    }));
  };

  const updateFooter = (field: keyof CMSData["footer"], value: string) => {
    setData((prev) => ({
      ...prev,
      footer: { ...prev.footer, [field]: value },
    }));
  };

  const updateSettings = (field: keyof CMSData["settings"], value: string) => {
    setData((prev) => ({
      ...prev,
      settings: { ...prev.settings, [field]: value },
    }));
  };

  // --- Sub-Entities Handlers ---

  // 1. STATS
  const handleStatChange = (id: string, field: keyof StatItem, value: any) => {
    setData((prev) => ({
      ...prev,
      stats: prev.stats.map((stat) => (stat.id === id ? { ...stat, [field]: value } : stat)),
    }));
  };

  // 2. SKILLS
  const handleSkillChange = (idx: number, field: keyof Skill, value: any) => {
    setData((prev) => {
      const nextSkills = [...prev.skills];
      nextSkills[idx] = { ...nextSkills[idx], [field]: value };
      return { ...prev, skills: nextSkills };
    });
  };

  const removeSkill = (idx: number) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== idx),
    }));
  };

  const addSkill = () => {
    const newSkill: Skill = { name: "New Skill", level: 80, category: "Frontend" };
    setData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
  };

  // 3. SERVICES
  const handleServiceChange = (id: string, field: keyof Service, value: any) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.map((srv) => (srv.id === id ? { ...srv, [field]: value } : srv)),
    }));
  };

  const removeService = (id: string) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.filter((srv) => srv.id !== id),
    }));
    if (activeServiceId === id) setActiveServiceId("");
  };

  const addService = () => {
    const id = `service-${Date.now()}`;
    const newSrv: Service = {
      id,
      title: "New Service Description",
      description: "Custom freelance assistance focusing on visual branding elements and systems consistency.",
      iconName: "Sliders",
      deliverables: ["Asset Delivery Mapping", "Response Validation Tests"]
    };
    setData((prev) => ({
      ...prev,
      services: [...prev.services, newSrv],
    }));
    setActiveServiceId(id);
  };

  const addDeliverable = (serviceId: string) => {
    if (!newDeliverable.trim()) return;
    setData((prev) => ({
      ...prev,
      services: prev.services.map((srv) =>
        srv.id === serviceId
          ? { ...srv, deliverables: [...srv.deliverables, newDeliverable.trim()] }
          : srv
      ),
    }));
    setNewDeliverable("");
  };

  const removeDeliverable = (serviceId: string, idx: number) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.map((srv) =>
        srv.id === serviceId
          ? { ...srv, deliverables: srv.deliverables.filter((_, i) => i !== idx) }
          : srv
      ),
    }));
  };

  // 4. TESTIMONIALS
  const handleTestimonialChange = (id: string, field: keyof Testimonial, value: string) => {
    setData((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        testimonials: prev.about.testimonials.map((t) => (t.id === id ? { ...t, [field]: value } : t)),
      },
    }));
  };

  const removeTestimonial = (id: string) => {
    setData((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        testimonials: prev.about.testimonials.filter((t) => t.id !== id),
      },
    }));
  };

  const addTestimonial = () => {
    const newT: Testimonial = {
      id: `testimonial-${Date.now()}`,
      name: "Client Name",
      role: "CEO, Innovate Ltd",
      feedback: "Working with Humayan Rashid completely transformed our online sales pipeline. Exceptional visuals.",
      avatar: "https://picsum.photos/seed/avatar" + Math.floor(Math.random() * 100) + "/100/100"
    };
    setData((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        testimonials: [...prev.about.testimonials, newT]
      }
    }));
  };

  // 5. PROJECTS
  const handleProjectChange = (id: string, field: keyof Project, value: any) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj)),
    }));
  };

  const removeProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((proj) => proj.id !== id),
    }));
    if (activeProjectId === id) setActiveProjectId("");
  };

  const addProject = () => {
    const id = `project-${Date.now()}`;
    const newProj: Project = {
      id,
      title: "New Digital Initiative",
      description: "Interactive visual responsive utility showcasing deep client optimization parameters.",
      image: "https://picsum.photos/seed/project" + Math.floor(Math.random() * 100) + "/600/400",
      category: "Systems",
      technologies: ["React", "CSS"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com"
    };
    setData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProj],
    }));
    setActiveProjectId(id);
  };

  const addProjTech = (projId: string) => {
    if (!newTechnology.trim()) return;
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj) =>
        proj.id === projId
          ? { ...proj, technologies: [...proj.technologies, newTechnology.trim()] }
          : proj
      ),
    }));
    setNewTechnology("");
  };

  const removeProjTech = (projId: string, idx: number) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj) =>
        proj.id === projId
          ? { ...proj, technologies: proj.technologies.filter((_, i) => i !== idx) }
          : proj
      ),
    }));
  };

  // 6. VIDEO SHOWCASE
  const handleVideoChange = (id: string, field: keyof VideoItem, value: any) => {
    setData((prev) => ({
      ...prev,
      videos: prev.videos.map((vid) => (vid.id === id ? { ...vid, [field]: value } : vid)),
    }));
  };

  const removeVideo = (id: string) => {
    setData((prev) => ({
      ...prev,
      videos: prev.videos.filter((vid) => vid.id !== id),
    }));
  };

  const addVideo = () => {
    const newVid: VideoItem = {
      id: `vid-${Date.now()}`,
      title: "Step-by-Step UI Design Optimization Breakdown",
      duration: "5:12",
      views: "1.5K views",
      youtubeId: "dQw4w9WgXcQ",
      category: "tutorials",
      thumbnail: "https://picsum.photos/seed/vid" + Math.floor(Math.random() * 100) + "/640/360"
    };
    setData((prev) => ({
      ...prev,
      videos: [...prev.videos, newVid],
    }));
  };

  // 7. BLOG MANAGEMENT
  const handleBlogChange = (id: string, field: keyof BlogPost, value: any) => {
    setData((prev) => ({
      ...prev,
      blogs: prev.blogs.map((b) => (b.id === id ? { ...b, [field]: value } : b)),
    }));
  };

  const removeBlog = (id: string) => {
    setData((prev) => ({
      ...prev,
      blogs: prev.blogs.filter((b) => b.id !== id),
    }));
  };

  const addBlog = () => {
    const newB: BlogPost = {
      id: `blog-${Date.now()}`,
      title: "How to Design Multi-Level Theme Controls on Client Modules",
      excerpt: "Explaining direct storage synchronizer workflows to preserve system themes across multiple browser viewport sessions smoothly.",
      category: "Systems Engineering",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      readTime: "4 min read",
      image: "https://picsum.photos/seed/blog" + Math.floor(Math.random() * 100) + "/800/600",
      likes: 42,
      body: "## A Modern Approach to Theme Toggling\n\nPreserving light and dark coordinates doesn't have to require giant heavy state providers...",
      seoTitle: "Modern Theme Engineering Breakdown | Humayan Rashid Portfolio",
      seoDescription: "An advanced look on theme states layouts.",
      tags: ["TypeScript", "Theme Design"]
    };
    setData((prev) => ({
      ...prev,
      blogs: [...prev.blogs, newB],
    }));
  };

  // 8. FEATURES ABOUT CHECKLIST
  const addFeature = () => {
    if (!newFeature.trim()) return;
    setData((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        featuresList: [...prev.about.featuresList, newFeature.trim()]
      }
    }));
    setNewFeature("");
  };

  const removeFeature = (idx: number) => {
    setData((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        featuresList: prev.about.featuresList.filter((_, i) => i !== idx)
      }
    }));
  };

  // Quick photo generator helper to make user interaction extremely immersive
  const assignRandomPhoto = (category: string, callback: (url: string) => void) => {
    const id = Math.floor(Math.random() * 1000);
    const mockImages: Record<string, string> = {
      profile: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&fit=crop`,
      avatar: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&fit=crop`,
      project: `https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&fit=crop`,
      blog: `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&fit=crop`,
    };
    const randomUrl = mockImages[category] || `https://picsum.photos/seed/${id}/800/600`;
    callback(randomUrl);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 800);
  };

  return (
    <div className="space-y-6">
      {/* CMS Header panel control */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#061910]/60 border-white/10 pb-5">
        <div>
          <span className="font-mono text-[10px] text-[#cbf341] font-bold uppercase tracking-widest block">ADMIN PORTFOLIO ENGINE v4.2</span>
          <h2 className="font-sans font-bold text-xl sm:text-2xl text-[#061910] text-[#061910] tracking-tight mt-1">Portfolio CMS Controller</h2>
          <p className="font-sans text-xs text-[#cbf341] mt-1">Modifies and translates homepage copy, hero content files, skills tables, and contact indices in real-time.</p>
        </div>

        {/* Global Control Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          {onToggleViewMode && (
            <button
              id="cms-toggle-view"
              onClick={onToggleViewMode}
              className="flex items-center gap-1.5 px-3 py-2 font-sans font-semibold text-xs border border-white/10 hover:bg-[#0d3329] rounded-xl text-zinc-700 text-zinc-300 transition-colors cursor-pointer shadow-3xs"
            >
              <Eye size={13} className="text-[#cbf341]" />
              <span>🌐 View Live Site</span>
            </button>
          )}

          <button
            id="cms-reset-trigger"
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center gap-1.5 px-3 py-2 font-sans font-semibold text-xs border border-zinc-205 border-rose-950/40 hover:bg-rose-50 hover:bg-rose-950/20 text-rose-600 text-rose-400 rounded-xl transition-colors cursor-pointer"
          >
            <RotateCcw size={13} />
            <span>Restore Default Data</span>
          </button>

          <button
            id="cms-save-trigger"
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 font-sans font-bold text-xs bg-[#cbf341] text-[#061910] hover:bg-[#b2d932] rounded-xl transition-all cursor-pointer shadow-md shadow-[#cbf341]/15"
          >
            <Save size={13} />
            <span>Save CMS Changes</span>
          </button>
        </div>
      </div>

      {/* Real-time Save Confirm Alert */}
      <AnimatePresence>
        {isSaved && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-emerald-400 text-xs font-sans font-semibold rounded-xl flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <CheckCircle size={14} className="animate-pulse" />
              <span>CMS Data synchronized successfully! Visually reload the public view to see immediate results.</span>
            </div>
            <button onClick={() => setIsSaved(false)} className="text-[10px] font-bold underline hover:no-underline">Dismiss</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Interactive Form Panel (controlled by left sidebar navigation) */}
      <div className="w-full bg-[#0b2e24] border border-white/10 rounded-2xl p-6 shadow-sm min-h-[480px]">
          
          {/* CATEGORY: HERO */}
          {activeCategory === "hero" && (
            <div className="space-y-5">
              <div className="border-b border-white/10 pb-3">
                <h3 className="font-sans font-bold text-sm text-[#061910] text-zinc-100">Hero Section Content</h3>
                <p className="text-[11px] text-[#cbf341] mt-1">Configure name accents, main roles, titles, call-to-actions, and welcoming multimedia assets.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-[#cbf341] tracking-wider">Full Display Name</label>
                  <input
                    type="text"
                    value={data.hero.name}
                    onChange={(e) => updateHero("name", e.target.value)}
                    className="w-full bg-[#0a2219] border border-white/10 text-xs rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-[#cbf341] focus:bg-white transition-all text-zinc-100"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-[#cbf341] tracking-wider">Professional Title / Subtitle</label>
                  <input
                    type="text"
                    value={data.hero.title}
                    onChange={(e) => updateHero("title", e.target.value)}
                    className="w-full bg-[#0a2219] border border-white/10 text-xs rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-[#cbf341] focus:bg-white transition-all text-zinc-100"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-[#cbf341] tracking-wider">Short Tagline Description</label>
                <textarea
                  rows={2}
                  value={data.hero.description}
                  onChange={(e) => updateHero("description", e.target.value)}
                  className="w-full bg-[#0a2219] border border-white/10 text-xs rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-[#cbf341] focus:bg-white transition-all text-zinc-100 leading-relaxed"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-[#cbf341] tracking-wider">detailed mini-bio (hero text)</label>
                <textarea
                  rows={2}
                  value={data.hero.shortDesc}
                  onChange={(e) => updateHero("shortDesc", e.target.value)}
                  className="w-full bg-[#0a2219] border border-white/10 text-xs rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-[#cbf341] focus:bg-white transition-all text-zinc-100 leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10 pt-4 mt-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-[#cbf341] tracking-wider">Availability Text</label>
                  <input
                    type="text"
                    value={data.hero.availabilityText || "Available globally"}
                    onChange={(e) => updateHero("availabilityText", e.target.value)}
                    className="w-full bg-[#0a2219] border border-white/10 text-xs rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-[#cbf341] text-zinc-805 text-zinc-100"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-[#cbf341] tracking-wider">Client Rating</label>
                  <input
                    type="text"
                    value={data.hero.clientRating || "5.0"}
                    onChange={(e) => updateHero("clientRating", e.target.value)}
                    className="w-full bg-[#0a2219] border border-white/10 text-xs rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-[#cbf341] text-zinc-805 text-zinc-100"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-[#cbf341] tracking-wider">Rating Label</label>
                  <input
                    type="text"
                    value={data.hero.ratingLabel || "Client Rating"}
                    onChange={(e) => updateHero("ratingLabel", e.target.value)}
                    className="w-full bg-[#0a2219] border border-white/10 text-xs rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-[#cbf341] text-zinc-805 text-zinc-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-[#cbf341] tracking-wider">Primary CTA button text</label>
                  <input
                    type="text"
                    value={data.hero.ctaPrimaryText}
                    onChange={(e) => updateHero("ctaPrimaryText", e.target.value)}
                    className="w-full bg-[#0a2219] border border-white/10 text-xs rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-[#cbf341] text-zinc-805 text-zinc-100"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-[#cbf341] tracking-wider">Secondary CTA button text</label>
                  <input
                    type="text"
                    value={data.hero.ctaSecondaryText}
                    onChange={(e) => updateHero("ctaSecondaryText", e.target.value)}
                    className="w-full bg-[#0a2219] border border-white/10 text-xs rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-[#cbf341] text-zinc-805 text-zinc-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 border-t border-white/10 pt-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-[#cbf341] tracking-wider block">Hero Image Source URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={data.hero.avatar}
                      onChange={(e) => updateHero("avatar", e.target.value)}
                      className="flex-1 bg-[#0a2219] border border-white/10 text-[11px] font-mono rounded-xl p-2 focus:outline-none text-zinc-700 text-zinc-300"
                    />
                    <button
                      onClick={() => assignRandomPhoto("profile", (url) => updateHero("avatar", url))}
                      className="p-2 border border-white/10 bg-[#0d3329] hover:bg-[#0d3329] text-zinc-300 text-xs font-semibold rounded-xl transition-colors cursor-pointer shrink-0"
                    >
                      Use Mock
                    </button>
                  </div>
                  <FileUploader
                    accept="image/*"
                    onUpload={(url) => {
                      updateHero("avatar", url);
                      // Auto-save to localStorage so homepage reflects the change immediately
                      const updatedData = { ...data, hero: { ...data.hero, avatar: url } };
                      saveCMSData(updatedData);
                      console.log("[CMS Auto-Save] Hero avatar uploaded and auto-saved to localStorage.");
                    }}
                    label="Upload Hero Image from PC"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-[#cbf341] tracking-wider block">Greeting Video YouTube ID or Local File</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="YouTube Link / ID or direct file"
                      value={data.hero.introVideoUrl}
                      onChange={(e) => updateHero("introVideoUrl", e.target.value)}
                      className="flex-1 bg-[#0a2219] border border-white/10 text-[11px] font-mono rounded-xl p-2 focus:outline-none text-zinc-700 text-zinc-300"
                    />
                    <div className="px-2 py-1.5 text-[10px] font-mono font-bold text-[#cbf341] bg-[#cbf341]/10 rounded-xl flex items-center shrink-0">
                      ID/URL
                    </div>
                  </div>
                  <FileUploader
                    accept="video/*"
                    onUpload={(url) => {
                      updateHero("introVideoUrl", url);
                      // Auto-save to localStorage so homepage reflects the change immediately
                      const updatedData = { ...data, hero: { ...data.hero, introVideoUrl: url } };
                      saveCMSData(updatedData);
                      console.log("[CMS Auto-Save] Hero video uploaded and auto-saved to localStorage.");
                    }}
                    label="Upload Video from PC"
                  />
                </div>
              </div>
            </div>
          )}

          {/* CATEGORY: STATS */}
          {activeCategory === "stats" && (
            <div className="space-y-5">
              <div className="border-b border-white/10 pb-3">
                <h3 className="font-sans font-bold text-sm text-[#061910] text-zinc-100">Statistics Section Management</h3>
                <p className="text-[11px] text-zinc-455 mt-1 font-sans">Configure high-impact metrics boxes to establish credit and freelance authority immediately on load.</p>
              </div>

              <div className="space-y-4">
                {data.stats.map((stat) => (
                  <div key={stat.id} className="border border-white/10 bg-[#0b2e24]/10 bg-[#0a2219]/45 rounded-xl p-4 space-y-3.5">
                    <div className="flex items-center justify-between border-b border-[#061910] border-white/5 pb-2">
                      <span className="font-mono text-[9px] font-black uppercase text-[#cbf341] tracking-wider">Item ID: {stat.id}</span>
                      <span className="text-[11px] font-semibold text-[#cbf341]">Active Block</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                      <div className="sm:col-span-5 space-y-1">
                        <label className="text-[9px] uppercase font-bold text-[#cbf341] tracking-wide">Stat Label</label>
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) => handleStatChange(stat.id, "label", e.target.value)}
                          className="w-full bg-[#0b2e24] border border-white/10 text-xs rounded-lg p-2 focus:outline-none font-sans text-zinc-100"
                        />
                      </div>

                      <div className="sm:col-span-3 space-y-1">
                        <label className="text-[9px] uppercase font-bold text-[#cbf341] tracking-wide">Number</label>
                        <input
                          type="number"
                          value={stat.number}
                          onChange={(e) => handleStatChange(stat.id, "number", Number(e.target.value))}
                          className="w-full bg-[#0b2e24] border border-white/10 text-xs rounded-lg p-2 focus:outline-none font-mono text-zinc-100"
                        />
                      </div>

                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-[9px] uppercase font-bold text-[#cbf341] tracking-wide">Suffix</label>
                        <input
                          type="text"
                          value={stat.suffix}
                          onChange={(e) => handleStatChange(stat.id, "suffix", e.target.value)}
                          className="w-full bg-[#0b2e24] border border-white/10 text-xs rounded-lg p-2 focus:outline-none font-mono text-zinc-100"
                        />
                      </div>

                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-[9px] uppercase font-bold text-[#cbf341] tracking-wide">Display Value</label>
                        <input
                          type="text"
                          value={stat.value}
                          onChange={(e) => handleStatChange(stat.id, "value", e.target.value)}
                          className="w-full bg-[#0b2e24] border border-white/10 text-xs rounded-lg p-2 focus:outline-none font-bold font-mono text-zinc-100"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-[#cbf341] tracking-wide">Statistic Short Description</label>
                      <input
                        type="text"
                        value={stat.description}
                        onChange={(e) => handleStatChange(stat.id, "description", e.target.value)}
                        className="w-full bg-[#0b2e24] border border-white/10 text-xs rounded-lg p-2 focus:outline-none text-zinc-300 font-sans"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CATEGORY: ABOUT & TESTIMONIALS */}
          {activeCategory === "about" && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-3">
                <h3 className="font-sans font-bold text-sm text-[#061910] text-zinc-100">About Section Biography & Testimonials</h3>
                <p className="text-[11px] text-zinc-455 mt-1 font-sans">Manage profile portrait links, deep experience stories, core checklists, and client feedback sliders.</p>
              </div>

              {/* Sub Biography block */}
              <div className="space-y-4">
                {/* ADVANCED BIOGRAPHY PORTRAIT MANAGER WIDGET */}
                <div className="space-y-3 bg-[#0a2219]/40 border border-[#061910]/50 border-white/10/80 p-5 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <span className="text-[10.5px] uppercase font-bold text-[#cbf341] tracking-wider block">Biography Portrait / About Image</span>
                    <span className="text-[9px] font-mono font-bold uppercase text-[#cbf341]">
                      Formats: JPG, PNG, WEBP (Max 5MB)
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-5 items-start">
                    {/* Live Image Frame Preview Container */}
                    <div className="w-28 h-36 rounded-xl border border-white/10/80 bg-[#072418] bg-[#0b2e24] overflow-hidden relative group shrink-0 flex items-center justify-center">
                      {data.about.profileImage ? (
                        <img
                          src={data.about.profileImage}
                          alt="Real-time About Portrait"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center p-2 text-center h-full">
                          <Image className="text-[#061910]0 mb-1" size={24} />
                          <span className="text-[8px] uppercase font-bold text-[#cbf341] block px-1">No custom uploaded image</span>
                        </div>
                      )}
                      
                      {/* Falling back notice overlay */}
                      <div className="absolute bottom-0 inset-x-0 bg-black/70 py-1 text-center select-none text-[8px] font-mono text-zinc-300">
                        {data.about.profileImage ? "Custom Active" : "Fallback (Original)"}
                      </div>
                    </div>

                    {/* Operational controls panel */}
                    <div className="flex-1 space-y-3 w-full">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] uppercase font-bold text-zinc-455 block">Current Portrait URL/Base64 Path</label>
                        <input
                          type="text"
                          placeholder="Empty (Using default profile avatar fallback)"
                          value={data.about.profileImage || ""}
                          onChange={(e) => updateAbout("profileImage", e.target.value)}
                          className="w-full bg-white bg-[#0a2219] border border-white/10 text-[10px] font-mono rounded-xl p-2.5 focus:outline-none text-[#cbf341]"
                        />
                      </div>

                      {/* Control buttons list */}
                      <div className="flex flex-wrap gap-2">
                        {/* Native upload button */}
                        <input
                          type="file"
                          ref={aboutImageInputRef}
                          onChange={handleAboutFileChange}
                          accept="image/png, image/jpeg, image/webp"
                          className="hidden"
                        />
                        <button
                          type="button"
                          disabled={isUploadingAbout}
                          onClick={() => aboutImageInputRef.current?.click()}
                          className="px-3.5 py-2 select-none border border-white/10 bg-[#0b2e24] hover:bg-[#0d3329] text-zinc-200 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition-colors"
                        >
                          <Upload size={13} className={isUploadingAbout ? "animate-spin" : ""} />
                          <span>{isUploadingAbout ? "Uploading..." : "Change Image"}</span>
                        </button>

                        {/* Reset / Remove image to force fallback */}
                        {data.about.profileImage && (
                          <button
                            type="button"
                            onClick={() => updateAbout("profileImage", "")}
                            className="px-3.5 py-2 select-none border border-rose-200/50 hover:bg-rose-50 border-rose-950/40 hover:bg-rose-950/20 text-rose-600 text-rose-400 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
                            title="Restore default fallback portrait"
                          >
                            <Trash2 size={13} />
                            <span>Remove Image</span>
                          </button>
                        )}

                        {/* Assign Random photo utility */}
                        <button
                          type="button"
                          onClick={() => assignRandomPhoto("profile", (url) => updateAbout("profileImage", url))}
                          className="px-3.5 py-2 select-none border border-white/10 bg-[#0b2e24] hover:bg-[#0d3329] text-[#cbf341] text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <RefreshCw size={12} />
                          <span>Assign Random</span>
                        </button>
                      </div>

                      {/* Display uploading feedback, errors, or custom success notifications */}
                      {uploadAboutError && (
                        <div className="p-2 border border-amber-250/50 bg-amber-500/10 text-amber-600 text-amber-400 rounded-xl text-[10px] font-sans leading-relaxed">
                          {uploadAboutError}
                        </div>
                      )}
                      
                      {uploadAboutSuccess && (
                        <div className="p-2 border border-emerald-250 bg-emerald-500/10 text-emerald-600 text-emerald-400 rounded-xl text-[10px] font-sans flex items-center gap-1">
                          <CheckCircle className="shrink-0" size={12} />
                          <span>Image uploaded successfully! Remember to click the "Publish CMS Changes & Save" button above to persist.</span>
                        </div>
                      )}

                      {/* Current active storage system status badge */}
                      <div className="flex items-center gap-1.5 text-[9.5px] font-sans text-[#cbf341] select-none">
                        {data.settings.cloudinaryCloudName?.trim() && data.settings.cloudinaryUploadPreset?.trim() ? (
                          <>
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <Cloud size={10.5} className="text-emerald-500" />
                            <span>Cloudinary CDN active (Cloud Name: <strong className="font-mono">{data.settings.cloudinaryCloudName}</strong>)</span>
                          </>
                        ) : (
                          <>
                            <div className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                            <span>Local Storage base64 mode active. Configure Cloudinary CDN in the Settings panel below to save space.</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-[#cbf341] tracking-wider">Detailed Personal Biography</label>
                  <textarea
                    rows={4}
                    value={data.about.detailedBio}
                    onChange={(e) => updateAbout("detailedBio", e.target.value)}
                    className="w-full bg-[#0a2219] border border-white/10 text-xs rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-[#cbf341] focus:bg-white text-zinc-100 leading-relaxed"
                  />
                </div>

                {/* About Features List tags */}
                <div className="space-y-2 border-t border-white/10 pt-4">
                  <label className="text-[10px] uppercase font-bold text-[#cbf341] tracking-wider block">Credentials List Checkbox Tags</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add credential point e.g. Vetted by 50+ Global Startups"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      className="flex-1 bg-[#0a2219] border border-white/10 text-xs rounded-xl p-2 focus:outline-none text-zinc-200"
                    />
                    <button
                      onClick={addFeature}
                      className="p-2 px-3 bg-[#0b2e24] hover:bg-[#0a2219] bg-[#cbf341] hover:bg-[#b2d932] text-[#061910] text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Add Point
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {data.about.featuresList.map((f, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-sans font-bold bg-[#0d3329] border border-white/10 text-zinc-700 text-zinc-300 rounded-lg">
                        <span>{f}</span>
                        <button
                          type="button"
                          onClick={() => removeFeature(idx)}
                          className="hover:text-rose-500 font-black cursor-pointer text-[9px] ml-1"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Testimonials List Block */}
                <div className="space-y-4 border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-extrabold uppercase text-zinc-455 tracking-wider">Client Testimonials Editor ({data.about.testimonials.length})</h4>
                    <button
                      onClick={addTestimonial}
                      className="flex items-center gap-1 px-3 py-1 bg-[#cbf341]/10 hover:bg-[#cbf341]/20 text-[#cbf341] text-[10px] font-bold rounded-lg border border-[#cbf341]/10 cursor-pointer"
                    >
                      <Plus size={11} />
                      <span>Add Testimonial</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {data.about.testimonials.map((t) => (
                      <div key={t.id} className="border border-white/10 bg-[#0a2219]/40 rounded-xl p-4.5 space-y-3">
                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                          <span className="font-mono text-[9px] text-zinc-455">ID: {t.id}</span>
                          <button
                            onClick={() => removeTestimonial(t.id)}
                            className="text-rose-600 hover:text-rose-500 flex items-center gap-1 text-[10px] font-bold cursor-pointer"
                          >
                            <Trash2 size={11} />
                            <span>Remove</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[9px] uppercase font-bold text-[#cbf341]">Reviewer Name</label>
                            <input
                              type="text"
                              value={t.name}
                              onChange={(e) => handleTestimonialChange(t.id, "name", e.target.value)}
                              className="w-full bg-[#0b2e24] border border-white/10 text-xs rounded-lg p-2 focus:outline-none font-sans text-zinc-100"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] uppercase font-bold text-[#cbf341]">Reviewer Role / Company</label>
                            <input
                              type="text"
                              value={t.role}
                              onChange={(e) => handleTestimonialChange(t.id, "role", e.target.value)}
                              className="w-full bg-[#0b2e24] border border-white/10 text-xs rounded-lg p-2 focus:outline-none font-sans text-zinc-100"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] uppercase font-bold text-[#cbf341]">Feedback text</label>
                          <textarea
                            rows={2}
                            value={t.feedback}
                            onChange={(e) => handleTestimonialChange(t.id, "feedback", e.target.value)}
                            className="w-full bg-[#0b2e24] border border-white/10 text-xs rounded-lg p-2 focus:outline-none font-sans text-zinc-200"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] uppercase font-bold text-[#cbf341]">Avatar Source Link</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={t.avatar}
                              onChange={(e) => handleTestimonialChange(t.id, "avatar", e.target.value)}
                              className="flex-1 bg-[#0b2e24] border border-white/10 text-[11px] font-mono rounded-lg p-1.5 focus:outline-none text-zinc-700 text-zinc-300"
                            />
                            <button
                              onClick={() => assignRandomPhoto("avatar", (url) => handleTestimonialChange(t.id, "avatar", url))}
                              className="p-1 px-2 border border-white/10 bg-[#0d3329] text-zinc-650 text-zinc-350 text-[10px] font-bold rounded hover:bg-zinc-200 cursor-pointer shrink-0"
                            >
                              Mock Pic
                            </button>
                          </div>
                          <FileUploader
                            accept="image/*"
                            onUpload={(url) => {
                              handleTestimonialChange(t.id, "avatar", url);
                              // Auto-save to localStorage so homepage reflects the change immediately
                              const updatedData = {
                                ...data,
                                about: {
                                  ...data.about,
                                  testimonials: data.about.testimonials.map((test) =>
                                    test.id === t.id ? { ...test, avatar: url } : test
                                  ),
                                },
                              };
                              saveCMSData(updatedData);
                              console.log("[CMS Auto-Save] Testimonial avatar uploaded and auto-saved.");
                            }}
                            label="Upload Avatar from PC"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CATEGORY: SKILLS */}
          {activeCategory === "skills" && (
            <div className="space-y-5">
              <div className="border-b border-white/10 pb-3">
                <h3 className="font-sans font-bold text-sm text-[#061910] text-zinc-100">Technical Skills Matrix</h3>
                <p className="text-[11px] text-zinc-455 mt-1 font-sans">Manage structural proficiency indices, adjust skill levels, and allocate categories.</p>
              </div>

              <div className="flex justify-between items-center bg-[#0a2219] p-3 rounded-xl border border-white/10">
                <span className="text-[11px] font-bold text-zinc-655 text-[#cbf341]">Add new item skills rows directly into database.</span>
                <button
                  type="button"
                  onClick={addSkill}
                  className="flex items-center gap-1 bg-[#cbf341] hover:bg-[#b2d932] text-[#061910] text-[11px] font-bold px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
                >
                  <Plus size={12} />
                  <span>Add New Skill</span>
                </button>
              </div>

              <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
                {data.skills.map((skill, idx) => (
                  <div key={idx} className="border border-white/10 bg-zinc-50/20 bg-[#0a2219]/25 p-4.5 rounded-xl flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-3.5">
                      <div className="md:col-span-5 space-y-1">
                        <label className="text-[9px] uppercase font-bold text-[#cbf341] tracking-wider">Skill Name</label>
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => handleSkillChange(idx, "name", e.target.value)}
                          className="w-full bg-[#0b2e24] border border-zinc-180 border-white/10 text-xs rounded-lg p-2 focus:outline-none block text-[#061910]"
                        />
                      </div>

                      <div className="md:col-span-4 space-y-1">
                        <label className="text-[9px] uppercase font-bold text-[#cbf341] tracking-wider">Matrix Category</label>
                        <select
                          value={skill.category}
                          onChange={(e) => handleSkillChange(idx, "category", e.target.value)}
                          className="w-full bg-[#0b2e24] border border-zinc-180 border-white/10 text-xs rounded-lg p-2 focus:outline-none block text-zinc-855 text-[#061910]"
                        >
                          <option value="Frontend">Frontend Tools</option>
                          <option value="Backend">Backend / API</option>
                          <option value="Design">Design Systems</option>
                          <option value="Strategy">Strategy / SEO</option>
                          <option value="Marketing">Marketing / Biz</option>
                        </select>
                      </div>

                      <div className="md:col-span-3 space-y-1">
                        <div className="flex items-center justify-between text-[#cbf341] text-[9px] font-bold uppercase tracking-wider">
                          <span>Level</span>
                          <span className="text-[#cbf341] font-mono">{skill.level}%</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          value={skill.level}
                          onChange={(e) => handleSkillChange(idx, "level", Number(e.target.value))}
                          className="w-full h-1 bg-zinc-200 bg-[#0d3329] rounded-lg appearance-none cursor-pointer accent-[#cbf341] mt-2.5"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeSkill(idx)}
                      className="text-rose-600 hover:text-rose-500 hover:bg-rose-50 hover:bg-rose-950/20 p-2 rounded-lg self-end md:self-center transition-colors cursor-pointer shrink-0"
                      title="Delete skill item row"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CATEGORY: SERVICES */}
          {activeCategory === "services" && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-3">
                <h3 className="font-sans font-bold text-sm text-[#061910] text-zinc-100">Services Catalog Management</h3>
                <p className="text-[11px] text-zinc-455 mt-1 font-sans">Register and edit consultancy deliverables, configure icons, and descriptions.</p>
              </div>

              {/* Toolbar */}
              <div className="flex items-center justify-between bg-[#0a2219] p-3 rounded-xl border border-white/10">
                <span className="text-[11px] font-bold text-[#061910]0">Service deliverable packages list ({data.services.length} registered)</span>
                <button
                  onClick={addService}
                  className="flex items-center gap-1 bg-[#cbf341] hover:bg-[#b2d932] text-[#061910] text-[11px] font-bold px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
                >
                  <Plus size={11} />
                  <span>Add Service Option</span>
                </button>
              </div>

              {/* Main List */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                {/* Left Mini List */}
                <div className="md:col-span-5 space-y-2 border-r border-white/10 pr-1 max-h-[350px] overflow-y-auto">
                  {data.services.map((srv) => (
                    <button
                      key={srv.id}
                      onClick={() => setActiveServiceId(srv.id)}
                      className={`w-full text-left p-3 rounded-xl text-xs flex items-center justify-between gap-2 border cursor-pointer select-none transition-all ${
                        activeServiceId === srv.id || (!activeServiceId && data.services[0]?.id === srv.id)
                          ? "bg-[#072418]/80 bg-[#0d3329]/60 text-zinc-950 text-[#cbf341] font-bold border-[#cbf341]/55"
                          : "border-transparent text-zinc-550 hover:bg-[#072418]/40 hover:bg-[#0a2219]/30"
                      }`}
                    >
                      <span className="truncate">{srv.title}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 bg-zinc-200 bg-[#0d3329] rounded font-bold">{srv.id.slice(0, 8)}</span>
                    </button>
                  ))}
                </div>

                {/* Right Form Editor Block */}
                <div className="md:col-span-7 space-y-4">
                  {data.services.filter(s => s.id === activeServiceId || (!activeServiceId && data.services[0]?.id === s.id)).map((srv) => (
                    <div key={srv.id} className="space-y-4">
                      <div className="flex items-center justify-between border-b border-[#061910] border-white/10 pb-2">
                        <span className="font-mono text-[9px] text-zinc-445">ID VALUE: {srv.id}</span>
                        <button
                          onClick={() => removeService(srv.id)}
                          className="text-rose-600 hover:text-rose-500 flex items-center gap-1 text-[10.5px] font-bold cursor-pointer"
                        >
                          <Trash2 size={11} />
                          <span>Delete Service Option</span>
                        </button>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-[#cbf341] block">Service Title</label>
                        <input
                          type="text"
                          value={srv.title}
                          onChange={(e) => handleServiceChange(srv.id, "title", e.target.value)}
                          className="w-full bg-[#0a2219] border border-white/10 text-xs rounded-xl p-2.5 focus:outline-none text-zinc-100"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase font-bold text-[#cbf341] block">Lucide Icon Class</label>
                          <select
                            value={srv.iconName}
                            onChange={(e) => handleServiceChange(srv.id, "iconName", e.target.value)}
                            className="w-full bg-[#0a2219] border border-white/10 text-xs rounded-xl p-2.5 focus:outline-none text-zinc-100"
                          >
                            <option value="Code">Code (Markup)</option>
                            <option value="Palette">Palette (UX/UI Design)</option>
                            <option value="Search">Search (SEO Strategy)</option>
                            <option value="ShoppingBag">ShoppingBag (Stripe)</option>
                            <option value="Compass">Compass (Consulting)</option>
                            <option value="Activity">Activity (Diagnostics)</option>
                            <option value="Sliders">Sliders (General Configuration)</option>
                          </select>
                        </div>

                        <div className="p-2 bg-[#0a2219]/40 rounded-xl border border-white/10 flex items-center gap-2">
                          <span className="p-1.5 bg-[#cbf341]/10 rounded-lg text-[#cbf341] shrink-0">
                            <Sliders size={13} />
                          </span>
                          <span className="text-[9.5px] font-bold text-[#061910]0 leading-normal">Interactive indicator displays instantly in custom portfolio catalog drawer.</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-[#cbf341] block">Service Description</label>
                        <textarea
                          rows={3}
                          value={srv.description}
                          onChange={(e) => handleServiceChange(srv.id, "description", e.target.value)}
                          className="w-full bg-[#0a2219] border border-white/10 text-xs rounded-xl p-2.5 focus:outline-none text-zinc-300 leading-relaxed"
                        />
                      </div>

                      {/* Deliverables sub lists array */}
                      <div className="space-y-2 pt-2 border-t border-white/10">
                        <span className="text-[9px] uppercase font-semibold text-zinc-455 block">Deliverable Bullet Points Checklist</span>
                        
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Add point e.g. Responsive Design Skeletons"
                            value={newDeliverable}
                            onChange={(e) => setNewDeliverable(e.target.value)}
                            className="flex-1 bg-[#0a2219] border border-white/10 text-xs rounded-xl p-2 focus:outline-none text-zinc-800 text-zinc-100"
                          />
                          <button
                            onClick={() => addDeliverable(srv.id)}
                            className="p-2 px-3 bg-[#0b2e24] hover:bg-[#0a2219] bg-[#cbf341] hover:bg-[#b2d932] text-[#061910] text-xs font-bold rounded-xl cursor-pointer"
                          >
                            Add
                          </button>
                        </div>

                        <div className="space-y-1 max-h-[120px] overflow-y-auto pr-1">
                          {srv.deliverables.map((del, idx) => (
                            <div key={idx} className="flex justify-between items-center text-xs p-1.5 hover:bg-[#072418]/60 hover:bg-[#0d3329]/40 rounded-lg">
                              <span className="text-zinc-705 text-zinc-300 font-medium font-sans truncate">{del}</span>
                              <button
                                onClick={() => removeDeliverable(srv.id, idx)}
                                className="text-rose-500 hover:text-rose-400 font-bold text-base px-1.5 focus:outline-none cursor-pointer"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CATEGORY: PORTFOLIO PROJECTS */}
          {activeCategory === "projects" && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-3">
                <h3 className="font-sans font-bold text-sm text-[#061910] text-zinc-100">Portfolio Projects Management</h3>
                <p className="text-[11px] text-zinc-455 mt-1 font-sans">Upload images, configure categories, specify technologies, and direct URLs logs.</p>
              </div>

              {/* Toolbar */}
              <div className="flex items-center justify-between bg-[#0a2219] p-3 rounded-xl border border-white/10">
                <span className="text-[11px] font-bold text-[#061910]0">Portfolio project collection list ({data.projects.length} total)</span>
                <button
                  onClick={addProject}
                  className="flex items-center gap-1 bg-[#cbf341] hover:bg-[#b2d932] text-[#061910] text-[11px] font-bold px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
                >
                  <Plus size={11} />
                  <span>Add Project</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                {/* Left list */}
                <div className="md:col-span-5 space-y-2 border-r border-white/10 pr-1 max-h-[350px] overflow-y-auto">
                  {data.projects.map((proj) => (
                    <button
                      key={proj.id}
                      onClick={() => setActiveProjectId(proj.id)}
                      className={`w-full text-left p-3 rounded-xl text-xs flex items-center justify-between gap-2 border cursor-pointer select-none transition-all ${
                        activeProjectId === proj.id || (!activeProjectId && data.projects[0]?.id === proj.id)
                          ? "bg-[#072418]/80 bg-[#0d3329]/60 text-zinc-950 text-[#cbf341] font-bold border-[#cbf341]/55"
                          : "border-transparent text-zinc-550 hover:bg-[#072418]/40 hover:bg-[#0a2219]/30"
                      }`}
                    >
                      <span className="truncate">{proj.title}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 bg-zinc-200 bg-[#0d3329] rounded font-bold">{proj.category}</span>
                    </button>
                  ))}
                </div>

                {/* Right Form Editor */}
                <div className="md:col-span-7 space-y-4">
                  {data.projects.filter(p => p.id === activeProjectId || (!activeProjectId && data.projects[0]?.id === p.id)).map((proj) => (
                    <div key={proj.id} className="space-y-4">
                      <div className="flex items-center justify-between border-b pb-2 border-white/10">
                        <span className="font-mono text-[9px] text-zinc-445">PROJECT ID: {proj.id}</span>
                        <button
                          onClick={() => removeProject(proj.id)}
                          className="text-rose-600 hover:text-rose-505 flex items-center gap-1 text-[10.5px] font-bold cursor-pointer"
                        >
                          <Trash2 size={11} />
                          <span>Delete project record</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase font-bold text-[#cbf341] block">Project Title</label>
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => handleProjectChange(proj.id, "title", e.target.value)}
                            className="w-full bg-[#0a2219] border border-white/10 text-xs rounded-xl p-2.5 focus:outline-none text-zinc-100"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] uppercase font-bold text-[#cbf341] block">Category Label</label>
                          <input
                            type="text"
                            value={proj.category}
                            onChange={(e) => handleProjectChange(proj.id, "category", e.target.value)}
                            className="w-full bg-[#0a2219] border border-white/10 text-xs rounded-xl p-2.5 focus:outline-none text-zinc-100"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-[#cbf341] block">Project Description</label>
                        <textarea
                          rows={2.5}
                          value={proj.description}
                          onChange={(e) => handleProjectChange(proj.id, "description", e.target.value)}
                          className="w-full bg-[#0a2219] border border-white/10 text-xs rounded-xl p-2.5 focus:outline-none text-zinc-650 text-zinc-350 leading-relaxed"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase font-bold text-[#cbf341] block">Project Poster Image URL</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={proj.image}
                            onChange={(e) => handleProjectChange(proj.id, "image", e.target.value)}
                            className="flex-1 bg-[#0a2219] border border-white/10 text-[11px] font-mono rounded-xl p-2 focus:outline-none text-zinc-700 text-zinc-300"
                          />
                          <button
                            type="button"
                            onClick={() => assignRandomPhoto("project", (url) => handleProjectChange(proj.id, "image", url))}
                            className="p-1 px-2.5 border border-white/10 bg-[#0d3329] text-zinc-650 text-zinc-350 text-[10px] font-bold rounded-lg hover:bg-zinc-200 cursor-pointer shrink-0"
                          >
                            Mock Cover
                          </button>
                        </div>
                        <FileUploader
                          accept="image/*"
                          onUpload={(url) => handleProjectChange(proj.id, "image", url)}
                          label="Upload Poster Cover from PC"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase font-bold text-[#cbf341] block">Live Demo Link URL</label>
                          <input
                            type="text"
                            value={proj.liveUrl}
                            onChange={(e) => handleProjectChange(proj.id, "liveUrl", e.target.value)}
                            className="w-full bg-[#0a2219] border border-white/10 text-xs rounded-xl p-2 focus:outline-none text-zinc-750 text-zinc-300"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] uppercase font-bold text-[#cbf341] block">GitHub Source Link URL</label>
                          <input
                            type="text"
                            value={proj.githubUrl}
                            onChange={(e) => handleProjectChange(proj.id, "githubUrl", e.target.value)}
                            className="w-full bg-[#0a2219] border border-white/10 text-xs rounded-xl p-2 focus:outline-none text-zinc-750 text-zinc-300"
                          />
                        </div>
                      </div>

                      {/* Technologies sub list tag array */}
                      <div className="space-y-2 pt-2 border-t border-white/10">
                        <span className="text-[9px] uppercase font-semibold text-zinc-455 block font-mono">Technologies Pack / Stack tags</span>
                        
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Add tag e.g. Framer Motion"
                            value={newTechnology}
                            onChange={(e) => setNewTechnology(e.target.value)}
                            className="flex-1 bg-[#0a2219] border border-white/10 text-xs rounded-xl p-2 focus:outline-none text-zinc-800 text-zinc-100"
                          />
                          <button
                            onClick={() => addProjTech(proj.id)}
                            className="p-2 px-3 bg-[#0b2e24] hover:bg-[#0a2219] bg-[#cbf341] hover:bg-[#b2d932] text-[#061910] text-xs font-bold rounded-xl cursor-pointer"
                          >
                            Add Tag
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-1.5">
                          {proj.technologies.map((t, idx) => (
                            <span key={idx} className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10.5px] font-mono bg-[#0d3329] text-zinc-700 text-zinc-350 rounded-md font-semibold">
                              <span>{t}</span>
                              <button
                                onClick={() => removeProjTech(proj.id, idx)}
                                className="text-[#061910]0 hover:text-rose-500 font-bold text-xs"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CATEGORY: VIDEOS */}
          {activeCategory === "videos" && (
            <div className="space-y-5">
              <div className="border-b border-white/10 pb-3">
                <h3 className="font-sans font-bold text-sm text-[#061910] text-zinc-100">Video Showcase Management</h3>
                <p className="text-[11px] text-zinc-455 mt-1 font-sans">Manage Youtube links, duration parameters, views details, and showcase thumbnail graphics assets.</p>
              </div>

              <div className="flex items-center justify-between bg-[#0a2219] p-3 rounded-xl border border-white/10">
                <span className="text-[11px] font-semibold text-[#cbf341]">Active video articles lists ({data.videos.length} uploaded)</span>
                <button
                  onClick={addVideo}
                  className="flex items-center gap-1 bg-[#cbf341] hover:bg-[#b2d932] text-[#061910] text-[11px] font-bold px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
                >
                  <Plus size={11} />
                  <span>Upload Video Profile</span>
                </button>
              </div>

              <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                {data.videos.map((vid) => (
                  <div key={vid.id} className="border border-white/10 bg-[#0a2219]/40 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="font-mono text-[9px] text-zinc-455">VIDEO ID: {vid.id} / CATEGORY: {vid.category}</span>
                      <button
                        onClick={() => removeVideo(vid.id)}
                        className="text-rose-600 hover:text-rose-500 flex items-center gap-1 text-[10px] font-bold cursor-pointer"
                      >
                        <Trash2 size={11} />
                        <span>Delete Video</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                      <div className="md:col-span-8 space-y-1">
                        <label className="text-[9px] uppercase font-bold text-[#cbf341]">Video Title</label>
                        <input
                          type="text"
                          value={vid.title}
                          onChange={(e) => handleVideoChange(vid.id, "title", e.target.value)}
                          className="w-full bg-[#0b2e24] border border-white/10 text-xs rounded-lg p-2 focus:outline-none"
                        />
                      </div>

                      <div className="md:col-span-4 space-y-1">
                        <label className="text-[9px] uppercase font-bold text-[#cbf341]">Sub Category</label>
                        <select
                          value={vid.category}
                          onChange={(e) => handleVideoChange(vid.id, "category", e.target.value)}
                          className="w-full bg-[#0b2e24] border border-white/10 text-xs rounded-lg p-2 focus:outline-none text-zinc-200"
                        >
                          <option value="tutorials">tutorials</option>
                          <option value="vlogs">vlogs</option>
                          <option value="reviews">reviews</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-[#cbf341]">YouTube Video ID / URL or Local File</label>
                        <input
                          type="text"
                          value={vid.youtubeId}
                          onChange={(e) => handleVideoChange(vid.id, "youtubeId", e.target.value)}
                          className="w-full bg-[#0b2e24] border border-white/10 text-xs rounded-lg p-2 focus:outline-none font-mono"
                        />
                        <FileUploader
                          accept="video/*"
                          onUpload={(url) => handleVideoChange(vid.id, "youtubeId", url)}
                          label="Upload Video from PC"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-[#cbf341]">Duration (MM:SS)</label>
                        <input
                          type="text"
                          value={vid.duration}
                          onChange={(e) => handleVideoChange(vid.id, "duration", e.target.value)}
                          className="w-full bg-[#0b2e24] border border-white/10 text-xs rounded-lg p-2 focus:outline-none font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-[#cbf341]">Display Views</label>
                        <input
                          type="text"
                          value={vid.views}
                          onChange={(e) => handleVideoChange(vid.id, "views", e.target.value)}
                          className="w-full bg-[#0b2e24] border border-white/10 text-xs rounded-lg p-2 focus:outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-[#cbf341]">Thumbnail Image Src URL</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={vid.thumbnail}
                          onChange={(e) => handleVideoChange(vid.id, "thumbnail", e.target.value)}
                          className="flex-1 bg-[#0b2e24] border border-white/10 text-[11px] font-mono rounded-lg p-1.5 focus:outline-none text-zinc-700 text-zinc-300"
                        />
                        <button
                          onClick={() => assignRandomPhoto("project", (url) => handleVideoChange(vid.id, "thumbnail", url))}
                          className="p-1 px-2 border border-white/10 bg-[#0d3329] text-zinc-650 text-[10px] font-bold rounded hover:bg-zinc-200 cursor-pointer shrink-0"
                        >
                          Mock Pic
                        </button>
                      </div>
                      <FileUploader
                        accept="image/*"
                        onUpload={(url) => handleVideoChange(vid.id, "thumbnail", url)}
                        label="Upload Thumbnail Image from PC"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CATEGORY: BLOG ARTICLES */}
          {activeCategory === "blogs" && (
            <div className="space-y-5">
              <div className="border-b border-white/10 pb-3">
                <h3 className="font-sans font-bold text-sm text-[#061910] text-zinc-100">CMS Article Blog Management</h3>
                <p className="text-[11px] text-zinc-455 mt-1 font-sans">Draft, edit and publish markdown posts, configure custom SEO tags, and visual snippets.</p>
              </div>

              <div className="flex items-center justify-between bg-[#0a2219] p-3 rounded-xl border border-white/10">
                <span className="text-[11px] font-bold text-[#061910]0">CMS Articles database: {data.blogs.length} items online</span>
                <button
                  onClick={addBlog}
                  className="flex items-center gap-1 bg-[#cbf341] hover:bg-[#b2d932] text-[#061910] text-[11px] font-bold px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
                >
                  <Plus size={11} />
                  <span>Create New Article</span>
                </button>
              </div>

              <div className="space-y-4.5 max-h-[385px] overflow-y-auto pr-1">
                {data.blogs.map((b) => (
                  <div key={b.id} className="border border-white/10 bg-zinc-50/10 bg-[#0a2219]/20 p-5 rounded-xl space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-[#cbf341]/10 rounded text-[#cbf341] text-[10px] font-bold font-mono uppercase tracking-wide">{b.category}</span>
                        <span className="font-mono text-[9px] text-[#061910]0">ID: {b.id}</span>
                      </div>
                      
                      <button
                        onClick={() => removeBlog(b.id)}
                        className="text-rose-600 hover:text-rose-500 flex items-center gap-1 text-[10.5px] font-bold cursor-pointer"
                      >
                        <Trash2 size={11} />
                        <span>Delete Article</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
                      <div className="md:col-span-8 space-y-1">
                        <label className="text-[9px] uppercase font-bold text-[#cbf341] block">Article Title</label>
                        <input
                          type="text"
                          value={b.title}
                          onChange={(e) => handleBlogChange(b.id, "title", e.target.value)}
                          className="w-full bg-[#0b2e24] border border-white/10 text-xs rounded-xl p-2.5 focus:outline-none text-[#061910]"
                        />
                      </div>

                      <div className="md:col-span-4 space-y-1">
                        <label className="text-[9px] uppercase font-bold text-[#cbf341] block">Category Label</label>
                        <input
                          type="text"
                          value={b.category}
                          onChange={(e) => handleBlogChange(b.id, "category", e.target.value)}
                          className="w-full bg-[#0b2e24] border border-white/10 text-xs rounded-xl p-2.5 focus:outline-none text-[#061910]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-[#cbf341] block">Article Brief / Excerpt</label>
                      <textarea
                        rows={2}
                        value={b.excerpt}
                        onChange={(e) => handleBlogChange(b.id, "excerpt", e.target.value)}
                        className="w-full bg-[#0b2e24] border border-white/10 text-xs rounded-xl p-2.5 focus:outline-none text-zinc-300 leading-relaxed"
                      />
                    </div>

                    {/* Markdown Body text */}
                    <div className="space-y-1 border-t border-white/10 pt-3">
                      <div className="flex items-center justify-between">
                        <label className="text-[9px] uppercase font-bold text-[#cbf341] block">Article Main Content (Markdown Supported)</label>
                        <span className="text-[9px] font-mono text-[#cbf341]">### for Headings, - for bullets</span>
                      </div>
                      <textarea
                        rows={4}
                        placeholder="Type standard markdown copy..."
                        value={b.body || ""}
                        onChange={(e) => handleBlogChange(b.id, "body", e.target.value)}
                        className="w-full bg-[#0b2e24] border border-white/10 text-xs rounded-xl p-2.5 focus:outline-none font-mono text-zinc-200 leading-relaxed"
                      />
                    </div>

                    {/* SEO Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-white/5 pt-3">
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-[#cbf341] block">SEO Meta Article Title</label>
                        <input
                          type="text"
                          value={b.seoTitle || ""}
                          onChange={(e) => handleBlogChange(b.id, "seoTitle", e.target.value)}
                          className="w-full bg-[#0b2e24] border border-white/10 text-xs rounded-lg p-2 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-[#cbf341] block">SEO Meta Description</label>
                        <input
                          type="text"
                          value={b.seoDescription || ""}
                          onChange={(e) => handleBlogChange(b.id, "seoDescription", e.target.value)}
                          className="w-full bg-[#0b2e24] border border-white/10 text-xs rounded-lg p-2 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-white/5 pt-3">
                      <div className="space-y-1 text-xs">
                        <label className="text-[9px] uppercase font-bold text-[#cbf341] block">Display Date</label>
                        <input
                          type="text"
                          value={b.date}
                          onChange={(e) => handleBlogChange(b.id, "date", e.target.value)}
                          className="w-full bg-[#0b2e24] border border-zinc-205 border-white/10 text-xs rounded-lg p-2"
                        />
                      </div>

                      <div className="space-y-1 text-xs">
                        <label className="text-[9px] uppercase font-bold text-[#cbf341] block">Read Time</label>
                        <input
                          type="text"
                          value={b.readTime}
                          onChange={(e) => handleBlogChange(b.id, "readTime", e.target.value)}
                          className="w-full bg-[#0b2e24] border border-zinc-205 border-white/10 text-xs rounded-lg p-2"
                        />
                      </div>

                      <div className="space-y-1 text-xs">
                        <label className="text-[9px] uppercase font-bold text-zinc-455 block">Cover image Src URL</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={b.image}
                            onChange={(e) => handleBlogChange(b.id, "image", e.target.value)}
                            className="flex-1 bg-[#0b2e24] border border-zinc-205 border-white/10 text-[11px] font-mono rounded-lg p-1.5 text-zinc-700"
                          />
                          <button
                            type="button"
                            onClick={() => assignRandomPhoto("blog", (url) => handleBlogChange(b.id, "image", url))}
                            className="p-1 px-1.5 border border-white/10 bg-[#0d3329] text-zinc-650 text-[9px] font-bold rounded hover:bg-zinc-200 cursor-pointer shrink-0"
                          >
                            Mock
                          </button>
                        </div>
                        <FileUploader
                          accept="image/*"
                          onUpload={(url) => handleBlogChange(b.id, "image", url)}
                          label="Upload Image from PC"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CATEGORY: CONTACT SECTION */}
          {activeCategory === "contact" && (
            <div className="space-y-5">
              <div className="border-b border-white/10 pb-3">
                <h3 className="font-sans font-bold text-sm text-[#061910] text-zinc-100">Contact Details & Social Coordinates</h3>
                <p className="text-[11px] text-zinc-455 mt-1 font-sans">Adjust primary support email address, locations, social channels handles mapping, and direct sync channels.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-[#cbf341] tracking-wide flex items-center gap-1">
                    <Mail size={12} className="text-[#cbf341]" />
                    <span>Contact Email Address</span>
                  </label>
                  <input
                    type="text"
                    value={data.contact.email}
                    onChange={(e) => updateContact("email", e.target.value)}
                    className="w-full bg-[#0a2219] border border-white/10 text-xs rounded-xl p-2.5"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-zinc-455 tracking-wide flex items-center gap-1">
                    <Phone size={12} className="text-[#cbf341]" />
                    <span>Contact Phone Details</span>
                  </label>
                  <input
                    type="text"
                    value={data.contact.phone}
                    onChange={(e) => updateContact("phone", e.target.value)}
                    className="w-full bg-[#0a2219] border border-white/10 text-xs rounded-xl p-2.5"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-zinc-455 tracking-wide flex items-center gap-1">
                    <MapPin size={12} className="text-[#cbf341]" />
                    <span>Location details coordinate</span>
                  </label>
                  <input
                    type="text"
                    value={data.contact.address}
                    onChange={(e) => updateContact("address", e.target.value)}
                    className="w-full bg-[#0a2219] border border-white/10 text-xs rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-4">
                <h4 className="text-xs font-bold uppercase text-zinc-455 tracking-widest block">Social Media Handles Mapping Links</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-[#cbf341]">GitHub Profile URL</label>
                    <input
                      type="text"
                      value={data.contact.github}
                      onChange={(e) => updateContact("github", e.target.value)}
                      className="w-full bg-[#0a2219] border border-[#061910] text-xs rounded-xl p-2 focus:outline-none text-zinc-700 text-zinc-300 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-zinc-455">LinkedIn Profile URL</label>
                    <input
                      type="text"
                      value={data.contact.linkedin}
                      onChange={(e) => updateContact("linkedin", e.target.value)}
                      className="w-full bg-[#0a2219] border border-[#061910] text-xs rounded-xl p-2 focus:outline-none text-zinc-700 text-zinc-300 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-zinc-455">Twitter Profile URL</label>
                    <input
                      type="text"
                      value={data.contact.twitter}
                      onChange={(e) => updateContact("twitter", e.target.value)}
                      className="w-full bg-[#0a2219] border border-[#061910] text-xs rounded-xl p-2 focus:outline-none text-zinc-700 text-zinc-300 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-zinc-455">YouTube Channel Link</label>
                    <input
                      type="text"
                      value={data.contact.youtube}
                      onChange={(e) => updateContact("youtube", e.target.value)}
                      className="w-full bg-[#0a2219] border border-[#061910] text-xs rounded-xl p-2 focus:outline-none text-zinc-700 text-zinc-300 font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CATEGORY: SITE SETTINGS & FOOTER */}
          {activeCategory === "settings" && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-3">
                <h3 className="font-sans font-bold text-sm text-[#061910] text-zinc-100">Site Settings, SEO & Footer Controls</h3>
                <p className="text-[11px] text-zinc-455 mt-1 font-sans">Configure default themes, index keywords metadata, copyright information, and Google telemetry IDs.</p>
              </div>

              {/* Theme Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-[#cbf341] font-mono block">Default Site Theme Presets</label>
                  <select
                    value={data.settings.defaultTheme}
                    onChange={(e) => updateSettings("defaultTheme", e.target.value as any)}
                    className="w-full bg-[#0a2219] border border-white/10 text-xs p-2.5 rounded-xl text-zinc-200 font-bold"
                  >
                    <option value="dark">Immersive Studio Dark Theme</option>
                    <option value="light">High-Contrast Office Light Theme</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-[#cbf341] block">Google Analytics G-ID</label>
                  <input
                    type="text"
                    value={data.settings.googleAnalyticsId}
                    onChange={(e) => updateSettings("googleAnalyticsId", e.target.value)}
                    className="w-full bg-[#0a2219] border border-white/10 text-xs p-2.5 rounded-xl font-mono text-zinc-850 text-zinc-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-[#cbf341] block">Site Favicon URL</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={data.settings.faviconUrl || ""}
                      onChange={(e) => updateSettings("faviconUrl", e.target.value)}
                      className="w-full bg-[#0a2219] border border-white/10 text-xs p-2.5 rounded-xl font-mono text-zinc-850 text-zinc-200"
                    />
                  </div>
                  <FileUploader
                    accept="image/*"
                    onUpload={(url) => updateSettings("faviconUrl", url)}
                    label="Upload Favicon from PC"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-[#cbf341] block">Site Logo Image URL</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={data.settings.logoUrl || ""}
                      onChange={(e) => updateSettings("logoUrl", e.target.value)}
                      className="w-full bg-[#0a2219] border border-white/10 text-xs p-2.5 rounded-xl font-mono text-zinc-850 text-zinc-200"
                    />
                  </div>
                  <FileUploader
                    accept="image/*"
                    onUpload={(url) => updateSettings("logoUrl", url)}
                    label="Upload Logo from PC"
                  />
                </div>
              </div>

              {/* Cloudinary Configuration */}
              <div className="border-t border-white/10 pt-4 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-1 px-2 rounded bg-[#cbf341]/10 text-[#cbf341] text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 font-mono">
                    <Cloud size={11} />
                    <span>Cloudinary CDN</span>
                  </div>
                  <h4 className="text-xs font-bold uppercase text-zinc-700 text-zinc-300">Cloudinary Asset Injection Setup</h4>
                </div>
                <p className="text-[11px] text-[#cbf341] leading-relaxed font-sans mt-1">
                  Provide your public Cloudinary unsigned configuration elements below. High-precision image streams will instantly utilize the Cloudinary network instead of large local memory strings.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-[#cbf341] block">Cloud Name</label>
                    <input
                      type="text"
                      placeholder="e.g. dxyz-cloud"
                      value={data.settings.cloudinaryCloudName || ""}
                      onChange={(e) => updateSettings("cloudinaryCloudName", e.target.value)}
                      className="w-full bg-[#0a2219] border border-white/10 text-xs p-2.5 rounded-xl text-zinc-200 font-mono focus:outline-none focus:ring-1 focus:ring-[#cbf341]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-[#cbf341] block">Unsigned Upload Preset</label>
                    <input
                      type="text"
                      placeholder="e.g. portfolio_presets"
                      value={data.settings.cloudinaryUploadPreset || ""}
                      onChange={(e) => updateSettings("cloudinaryUploadPreset", e.target.value)}
                      className="w-full bg-[#0a2219] border border-white/10 text-xs p-2.5 rounded-xl text-zinc-200 font-mono focus:outline-none focus:ring-1 focus:ring-[#cbf341]"
                    />
                  </div>
                </div>
              </div>

              {/* SEO Mappings */}
              <div className="border-t border-white/10 pt-4 space-y-4">
                <h4 className="text-xs font-bold uppercase text-zinc-455 tracking-wider block">SEO indexing credentials rules</h4>
                
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold text-[#cbf341] block">Standard Search Meta Title</label>
                  <input
                    type="text"
                    value={data.settings.seoTitle}
                    onChange={(e) => updateSettings("seoTitle", e.target.value)}
                    className="w-full bg-[#0a2219] border border-[#061910] text-xs p-2 focus:outline-none text-zinc-200 font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold text-[#cbf341] block">Standard Search Meta Description</label>
                  <textarea
                    rows={2}
                    value={data.settings.seoDescription}
                    onChange={(e) => updateSettings("seoDescription", e.target.value)}
                    className="w-full bg-[#0a2219] border border-[#061910] text-xs p-2 focus:outline-none text-zinc-650 text-zinc-350"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold text-[#cbf341] block">Search Indices Keywords List</label>
                  <input
                    type="text"
                    value={data.settings.seoKeywords}
                    onChange={(e) => updateSettings("seoKeywords", e.target.value)}
                    className="w-full bg-[#0a2219] border border-[#061910] text-xs p-2 focus:outline-none text-zinc-550 text-[#cbf341] font-mono text-[11px]"
                  />
                </div>
              </div>

              {/* Footer Section controls */}
              <div className="border-t border-white/10 pt-4 space-y-4">
                <h4 className="text-xs font-bold uppercase text-zinc-455 tracking-wider block">Footer content files copy management</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-[#cbf341] block">Footer brand logo text</label>
                    <input
                      type="text"
                      value={data.footer.logoText}
                      onChange={(e) => updateFooter("logoText", e.target.value)}
                      className="w-full bg-[#0a2219] border border-[#061910] text-xs p-2 focus:outline-none text-[#061910] text-[#061910] font-bold font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-[#cbf341] block">Copyright label notice</label>
                    <input
                      type="text"
                      value={data.footer.copyrightText}
                      onChange={(e) => updateFooter("copyrightText", e.target.value)}
                      className="w-full bg-[#0a2219] border border-[#061910] text-xs p-2 focus:outline-none text-[#cbf341]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <label className="text-[9px] uppercase font-bold text-[#cbf341] block">Newsletter Title Copy</label>
                  <input
                    type="text"
                    value={data.footer.newsletterTitle}
                    onChange={(e) => updateFooter("newsletterTitle", e.target.value)}
                    className="w-full bg-[#0a2219] border border-[#061910] text-xs p-2 focus:outline-none text-zinc-200 font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-bold text-[#cbf341] block">Newsletter Tagline Content Description</label>
                  <textarea
                    rows={2}
                    value={data.footer.newsletterSubtitle}
                    onChange={(e) => updateFooter("newsletterSubtitle", e.target.value)}
                    className="w-full bg-[#0a2219] border border-[#061910] text-xs p-2 focus:outline-none text-[#cbf341] leading-relaxed"
                  />
                </div>
              </div>
            </div>
          )}

        </div>

      {/* Confirm Reset Modal Dialog */}
      <AnimatePresence>
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowResetConfirm(false)}
              className="absolute inset-0 bg-zinc-950/60 backdrop-blur-xs cursor-pointer"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#0b2e24] border border-white/10 rounded-2xl p-6 max-w-sm w-full mx-auto relative z-10 space-y-4 shadow-2xl"
            >
              <div className="flex items-center gap-2.5 text-rose-600 text-rose-400">
                <ShieldAlert size={22} className="shrink-0" />
                <h3 className="font-sans font-bold text-sm tracking-tight">Confirm CMS Restore</h3>
              </div>
              <p className="font-sans text-xs text-[#cbf341] leading-normal">This will clear your local storage modifications, restoring the portfolio content back to the original developer static templates. This action is irreversible.</p>
              
              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(false)}
                  className="px-3 py-1.5 border border-white/10 text-[#cbf341] hover:bg-zinc-50 hover:bg-[#0d3329] text-xs font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Confirm Restore
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
