'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, projects as initialProjects } from '@/data/projects';
import { Testimonial, testimonials as initialTestimonials } from '@/data/testimonials';
import { Service, services as initialServices } from '@/data/services';
import { TechItem, techStack as initialTechStack } from '@/data/tech-stack';

export interface SiteSettings {
  heroHeadline: string;
  heroSubhead: string;
  availableForFreelance: boolean;
  freelanceStatusText: string;
  calendlyUrl: string;
  aboutBio1: string;
  aboutBio2: string;
  githubUsername: string;
  email: string;
  whatsapp: string;
  linkedin: string;
  github: string;
  instagram: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}

interface SiteConfigContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (slug: string, updatedProject: Partial<Project>) => void;
  deleteProject: (slug: string) => void;
  testimonials: Testimonial[];
  addTestimonial: (testimonial: Testimonial) => void;
  deleteTestimonial: (index: number) => void;
  services: Service[];
  updateServices: (newServices: Service[]) => void;
  techStack: TechItem[];
  updateTechStack: (newTechStack: TechItem[]) => void;
  messages: ContactMessage[];
  addMessage: (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>) => void;
  markMessageAsRead: (id: string) => void;
  deleteMessage: (id: string) => void;
  resetToDefaults: () => void;
}

const defaultSettings: SiteSettings = {
  heroHeadline: "Hi, I'm Zihad.",
  heroSubhead: "I design high-converting websites that help businesses look premium and get more customers.",
  availableForFreelance: true,
  freelanceStatusText: "Available for freelance",
  calendlyUrl: "https://calendly.com/zisan",
  aboutBio1: "I'm a web designer and developer who enjoys building fast, modern websites that help businesses stand out online. My focus is on creating clean interfaces, responsive layouts, and user experiences that turn visitors into customers.",
  aboutBio2: "With a strong foundation in modern web technologies, I bridge the gap between design and engineering, ensuring that every project looks great and performs flawlessly under the hood.",
  githubUsername: "zisan",
  email: "hello@zisan.dev",
  whatsapp: "https://wa.me/1234567890",
  linkedin: "https://linkedin.com/in/zisan",
  github: "https://github.com/zisan",
  instagram: "https://instagram.com/zisan",
};

const initialMessages: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Alex Rivera',
    email: 'alex@innovate.co',
    message: 'Hi Zisan, loved your work on Makario Coffee! We are looking to redesign our SaaS landing page. Are you available for a project next month?',
    createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    read: false,
  },
  {
    id: 'msg-2',
    name: 'Sarah Connor',
    email: 'sarah@techfuturists.com',
    message: 'Hey Zihad, we need a mobile-first e-commerce app prototype built in Next.js. What is your standard project timeline?',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    read: true,
  }
];

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

const STORAGE_KEY = 'zisan_site_config_v1';

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [techStack, setTechStack] = useState<TechItem[]>(initialTechStack);
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.settings) setSettings(parsed.settings);
        if (parsed.projects) setProjects(parsed.projects);
        if (parsed.testimonials) setTestimonials(parsed.testimonials);
        if (parsed.services) setServices(parsed.services);
        if (parsed.techStack) setTechStack(parsed.techStack);
        if (parsed.messages) setMessages(parsed.messages);
      }
    } catch {
      console.warn('Failed to load site config from localStorage');
    }
  }, []);

  const saveConfig = (data: {
    settings: SiteSettings;
    projects: Project[];
    testimonials: Testimonial[];
    services: Service[];
    techStack: TechItem[];
    messages: ContactMessage[];
  }) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      console.warn('Failed to save site config to localStorage');
    }
  };

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    saveConfig({ settings: updated, projects, testimonials, services, techStack, messages });
  };

  const addProject = (newProj: Project) => {
    const updated = [newProj, ...projects];
    setProjects(updated);
    saveConfig({ settings, projects: updated, testimonials, services, techStack, messages });
  };

  const updateProject = (slug: string, updatedFields: Partial<Project>) => {
    const updated = projects.map(p => (p.slug === slug ? { ...p, ...updatedFields } : p));
    setProjects(updated);
    saveConfig({ settings, projects: updated, testimonials, services, techStack, messages });
  };

  const deleteProject = (slug: string) => {
    const updated = projects.filter(p => p.slug !== slug);
    setProjects(updated);
    saveConfig({ settings, projects: updated, testimonials, services, techStack, messages });
  };

  const addTestimonial = (newTestimonial: Testimonial) => {
    const updated = [newTestimonial, ...testimonials];
    setTestimonials(updated);
    saveConfig({ settings, projects, testimonials: updated, services, techStack, messages });
  };

  const deleteTestimonial = (index: number) => {
    const updated = testimonials.filter((_, i) => i !== index);
    setTestimonials(updated);
    saveConfig({ settings, projects, testimonials: updated, services, techStack, messages });
  };

  const updateServices = (newServices: Service[]) => {
    setServices(newServices);
    saveConfig({ settings, projects, testimonials, services: newServices, techStack, messages });
  };

  const updateTechStack = (newTech: TechItem[]) => {
    setTechStack(newTech);
    saveConfig({ settings, projects, testimonials, services, techStack: newTech, messages });
  };

  const addMessage = (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      createdAt: new Date().toISOString(),
      read: false,
    };
    const updated = [newMsg, ...messages];
    setMessages(updated);
    saveConfig({ settings, projects, testimonials, services, techStack, messages: updated });
  };

  const markMessageAsRead = (id: string) => {
    const updated = messages.map(m => (m.id === id ? { ...m, read: true } : m));
    setMessages(updated);
    saveConfig({ settings, projects, testimonials, services, techStack, messages: updated });
  };

  const deleteMessage = (id: string) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    saveConfig({ settings, projects, testimonials, services, techStack, messages: updated });
  };

  const resetToDefaults = () => {
    setSettings(defaultSettings);
    setProjects(initialProjects);
    setTestimonials(initialTestimonials);
    setServices(initialServices);
    setTechStack(initialTechStack);
    setMessages(initialMessages);
    localStorage.removeItem(STORAGE_KEY);
  };

  if (!mounted) {
    return null;
  }

  return (
    <SiteConfigContext.Provider
      value={{
        settings,
        updateSettings,
        projects,
        addProject,
        updateProject,
        deleteProject,
        testimonials,
        addTestimonial,
        deleteTestimonial,
        services,
        updateServices,
        techStack,
        updateTechStack,
        messages,
        addMessage,
        markMessageAsRead,
        deleteMessage,
        resetToDefaults,
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error('useSiteConfig must be used within a SiteConfigProvider');
  }
  return context;
}
