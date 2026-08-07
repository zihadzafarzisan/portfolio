'use client';

import React, { useState } from 'react';
import { useSiteConfig } from '@/context/SiteConfigContext';
import { Project } from '@/data/projects';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Plus, Edit2, Trash2, Star, X } from 'lucide-react';

export default function AdminProjectsPage() {
  const { projects, addProject, updateProject, deleteProject } = useSiteConfig();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const [formData, setFormData] = useState<Partial<Project>>({
    slug: '',
    title: '',
    description: '',
    longDescription: '',
    problem: '',
    solution: '',
    technologies: [],
    category: 'Website Design',
    liveUrl: 'https://',
    sourceUrl: '',
    imageBefore: '/images/projects/sample-before.jpg',
    imageAfter: '/images/projects/sample-after.jpg',
    thumbnail: '/images/projects/sample-thumb.jpg',
    featured: true,
  });

  const [techInput, setTechInput] = useState('');

  const openAddModal = () => {
    setFormData({
      slug: `project-${Date.now()}`,
      title: '',
      description: '',
      longDescription: '',
      problem: '',
      solution: '',
      technologies: ['Next.js', 'React', 'Tailwind CSS'],
      category: 'Website Design',
      liveUrl: 'https://',
      sourceUrl: '',
      imageBefore: '/images/projects/sample-before.jpg',
      imageAfter: '/images/projects/sample-after.jpg',
      thumbnail: '/images/projects/sample-thumb.jpg',
      featured: true,
    });
    setEditingProject(null);
    setIsAdding(true);
  };

  const openEditModal = (proj: Project) => {
    setFormData(proj);
    setEditingProject(proj);
    setIsAdding(false);
  };

  const closeModal = () => {
    setEditingProject(null);
    setIsAdding(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.slug || !formData.title) return;

    if (isAdding) {
      addProject(formData as Project);
    } else if (editingProject) {
      updateProject(editingProject.slug, formData);
    }
    closeModal();
  };

  const addTechTag = () => {
    if (techInput.trim() && !formData.technologies?.includes(techInput.trim())) {
      setFormData({
        ...formData,
        technologies: [...(formData.technologies || []), techInput.trim()],
      });
      setTechInput('');
    }
  };

  const removeTechTag = (tag: string) => {
    setFormData({
      ...formData,
      technologies: (formData.technologies || []).filter(t => t !== tag),
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading">Manage Projects & Case Studies</h1>
          <p className="text-sm text-muted-foreground">Add, edit, or delete case study pages shown on `/` and `/projects`.</p>
        </div>
        <Button onClick={openAddModal} className="gap-2 shrink-0">
          <Plus className="w-4 h-4" />
          Add New Project
        </Button>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 gap-4">
        {projects.map((project) => (
          <Card key={project.slug} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-bold">{project.title}</h3>
                <Badge variant={project.featured ? 'success' : 'outline'}>
                  {project.featured ? 'Featured' : 'Standard'}
                </Badge>
                <Badge variant="outline">{project.category}</Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.technologies.map(t => (
                  <span key={t} className="text-[11px] px-2 py-0.5 rounded bg-muted text-muted-foreground font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
              <button
                onClick={() => updateProject(project.slug, { featured: !project.featured })}
                className={`p-2.5 rounded-xl border transition-colors ${
                  project.featured
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-500'
                    : 'bg-muted border-border text-muted-foreground hover:text-foreground'
                }`}
                title={project.featured ? 'Unfeature' : 'Feature on homepage'}
              >
                <Star className="w-4 h-4 fill-current" />
              </button>

              <button
                onClick={() => openEditModal(project)}
                className="p-2.5 rounded-xl border border-border bg-muted/40 hover:bg-muted text-foreground transition-colors"
                title="Edit Project"
              >
                <Edit2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  if (confirm(`Delete project "${project.title}"?`)) {
                    deleteProject(project.slug);
                  }
                }}
                className="p-2.5 rounded-xl border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors"
                title="Delete Project"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal Form for Add / Edit */}
      {(isAdding || editingProject) && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-border">
              <h2 className="text-xl font-bold font-heading">
                {isAdding ? 'Add New Project' : `Edit "${editingProject?.title}"`}
              </h2>
              <button onClick={closeModal} className="p-2 rounded-full hover:bg-muted">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title || ''}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Slug (URL Path)</label>
                  <input
                    type="text"
                    required
                    value={formData.slug || ''}
                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Category</label>
                  <select
                    value={formData.category || 'Website Design'}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                  >
                    <option value="Website Design">Website Design</option>
                    <option value="Ecommerce">Ecommerce</option>
                    <option value="Landing Page">Landing Page</option>
                    <option value="Web Application">Web Application</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Featured on Homepage</label>
                  <div className="flex items-center gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="featured-check"
                      checked={formData.featured || false}
                      onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4 rounded text-primary"
                    />
                    <label htmlFor="featured-check" className="text-sm">Highlight as featured</label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={formData.description || ''}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Problem Statement</label>
                <textarea
                  rows={3}
                  value={formData.problem || ''}
                  onChange={e => setFormData({ ...formData, problem: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Solution Narrative</label>
                <textarea
                  rows={3}
                  value={formData.solution || ''}
                  onChange={e => setFormData({ ...formData, solution: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Technologies Used</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Add technology (e.g., Stripe, Tailwind)"
                    value={techInput}
                    onChange={e => setTechInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg border border-border bg-background text-sm"
                  />
                  <Button type="button" onClick={addTechTag} size="sm" variant="secondary">Add</Button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {formData.technologies?.map(tech => (
                    <span key={tech} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                      {tech}
                      <button type="button" onClick={() => removeTechTag(tech)} className="hover:text-red-500">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Live URL</label>
                  <input
                    type="url"
                    value={formData.liveUrl || ''}
                    onChange={e => setFormData({ ...formData, liveUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Thumbnail Image Path</label>
                  <input
                    type="text"
                    value={formData.thumbnail || ''}
                    onChange={e => setFormData({ ...formData, thumbnail: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <Button type="button" variant="ghost" onClick={closeModal}>Cancel</Button>
                <Button type="submit">Save Case Study</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
