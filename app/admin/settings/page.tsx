'use client';

import React, { useState } from 'react';
import { useSiteConfig } from '@/context/SiteConfigContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Save, Check, Sparkles, User, Link as LinkIcon, Calendar } from 'lucide-react';

export default function AdminSettingsPage() {
  const { settings, updateSettings } = useSiteConfig();
  const [formData, setFormData] = useState(settings);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading">Hero, Bio & Links Copy</h1>
          <p className="text-sm text-muted-foreground">Live edit hero headline, subhead, bio text, booking URL, and social links.</p>
        </div>
        <Button onClick={handleSave} className="gap-2 shrink-0">
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm font-semibold flex items-center gap-2">
          <Check className="w-4 h-4" />
          Site copy & settings updated live across all pages!
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Hero Section Copy */}
        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-bold font-heading flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Hero Section Settings
          </h2>

          <div>
            <label className="block text-xs font-semibold mb-1">Hero Main Headline</label>
            <input
              type="text"
              required
              value={formData.heroHeadline}
              onChange={e => setFormData({ ...formData, heroHeadline: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-base font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Hero Subheadline</label>
            <textarea
              rows={3}
              required
              value={formData.heroSubhead}
              onChange={e => setFormData({ ...formData, heroSubhead: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Status Badge Text</label>
              <input
                type="text"
                value={formData.freelanceStatusText}
                onChange={e => setFormData({ ...formData, freelanceStatusText: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Freelance Availability</label>
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="avail-check"
                  checked={formData.availableForFreelance}
                  onChange={e => setFormData({ ...formData, availableForFreelance: e.target.checked })}
                  className="w-4 h-4 rounded text-primary"
                />
                <label htmlFor="avail-check" className="text-sm font-medium">Show green &quot;Available&quot; dot</label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              Calendly Booking URL (for &quot;Book a Call&quot; CTA)
            </label>
            <input
              type="url"
              value={formData.calendlyUrl}
              onChange={e => setFormData({ ...formData, calendlyUrl: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm font-mono"
            />
          </div>
        </Card>

        {/* About Me Copy */}
        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-bold font-heading flex items-center gap-2">
            <User className="w-5 h-5 text-accent" />
            About Me Paragraphs
          </h2>

          <div>
            <label className="block text-xs font-semibold mb-1">Bio Paragraph 1 (Home & About Page)</label>
            <textarea
              rows={3}
              value={formData.aboutBio1}
              onChange={e => setFormData({ ...formData, aboutBio1: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Bio Paragraph 2</label>
            <textarea
              rows={3}
              value={formData.aboutBio2}
              onChange={e => setFormData({ ...formData, aboutBio2: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">GitHub Username (for Contribution Graph Embed)</label>
            <input
              type="text"
              value={formData.githubUsername}
              onChange={e => setFormData({ ...formData, githubUsername: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm font-mono"
            />
          </div>
        </Card>

        {/* Social Media & Contact Links */}
        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-bold font-heading flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-blue-500" />
            Social Media & Direct Links
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">WhatsApp URL</label>
              <input
                type="url"
                value={formData.whatsapp}
                onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">LinkedIn Profile URL</label>
              <input
                type="url"
                value={formData.linkedin}
                onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">GitHub Profile URL</label>
              <input
                type="url"
                value={formData.github}
                onChange={e => setFormData({ ...formData, github: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm font-mono"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold mb-1">Instagram Profile URL</label>
              <input
                type="url"
                value={formData.instagram}
                onChange={e => setFormData({ ...formData, instagram: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm font-mono"
              />
            </div>
          </div>
        </Card>

        <div className="flex justify-end pt-4">
          <Button type="submit" size="lg" className="gap-2">
            <Save className="w-5 h-5" /> Save All Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
