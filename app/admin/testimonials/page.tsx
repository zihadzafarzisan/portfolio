'use client';

import React, { useState } from 'react';
import { useSiteConfig } from '@/context/SiteConfigContext';
import { Testimonial } from '@/data/testimonials';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Plus, Trash2, X } from 'lucide-react';

export default function AdminTestimonialsPage() {
  const { testimonials, addTestimonial, deleteTestimonial } = useSiteConfig();
  const [isAdding, setIsAdding] = useState(false);

  const [formData, setFormData] = useState<Testimonial>({
    name: '',
    role: '',
    company: '',
    quote: '',
    avatar: '/images/testimonials/avatar.jpg',
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.quote) return;
    addTestimonial(formData);
    setIsAdding(false);
    setFormData({
      name: '',
      role: '',
      company: '',
      quote: '',
      avatar: '/images/testimonials/avatar.jpg',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading">Client Testimonials</h1>
          <p className="text-sm text-muted-foreground">Manage testimonials displayed in the homepage auto-scrolling marquee.</p>
        </div>
        <Button onClick={() => setIsAdding(true)} className="gap-2 shrink-0">
          <Plus className="w-4 h-4" />
          Add Testimonial
        </Button>
      </div>

      {/* Grid of Testimonial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t, idx) => (
          <Card key={`${t.name}-${idx}`} className="p-6 flex flex-col justify-between relative group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">{t.name}</h3>
                    <p className="text-xs text-muted-foreground">{t.role} {t.company ? `at ${t.company}` : ''}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (confirm(`Remove testimonial from ${t.name}?`)) {
                      deleteTestimonial(idx);
                    }
                  }}
                  className="p-2 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
                  title="Delete testimonial"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <blockquote className="text-sm italic text-muted-foreground">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Modal */}
      {isAdding && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <h2 className="text-lg font-bold font-heading">Add New Testimonial</h2>
              <button onClick={() => setIsAdding(false)} className="p-1 rounded-full hover:bg-muted">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Client Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Role / Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Founder"
                    value={formData.role}
                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Company Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Makario Coffee"
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Client Quote</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Enter client review or testimonial quote..."
                  value={formData.quote}
                  onChange={e => setFormData({ ...formData, quote: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-border">
                <Button type="button" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
                <Button type="submit">Add Testimonial</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
