'use client';

import React, { useState } from 'react';
import { useSiteConfig } from '@/context/SiteConfigContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Plus, X, Check, Save } from 'lucide-react';

export default function AdminServicesPage() {
  const { services, updateServices, techStack, updateTechStack } = useSiteConfig();
  const [localServices, setLocalServices] = useState(services);
  const [localTech, setLocalTech] = useState(techStack);
  const [newTechName, setNewTechName] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleServiceChange = (index: number, field: string, value: string) => {
    const updated = [...localServices];
    updated[index] = { ...updated[index], [field]: value };
    setLocalServices(updated);
  };

  const handleAddTech = () => {
    if (newTechName.trim()) {
      const updated = [...localTech, { name: newTechName.trim(), icon: 'code' }];
      setLocalTech(updated);
      setNewTechName('');
    }
  };

  const handleRemoveTech = (index: number) => {
    setLocalTech(localTech.filter((_, i) => i !== index));
  };

  const handleSaveAll = () => {
    updateServices(localServices);
    updateTechStack(localTech);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading">Services & Tech Stack</h1>
          <p className="text-sm text-muted-foreground">Configure the 6 core services offered and skills displayed on the website.</p>
        </div>
        <Button onClick={handleSaveAll} className="gap-2 shrink-0">
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm font-semibold flex items-center gap-2">
          <Check className="w-4 h-4" />
          Services and Tech Stack updated successfully!
        </div>
      )}

      {/* Services Grid Editor */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-heading">Core Services (6 Items)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {localServices.map((service, idx) => (
            <Card key={idx} className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Service #{idx + 1}</span>
                <span className="text-xs text-muted-foreground font-mono">Icon: {service.icon}</span>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Title</label>
                <input
                  type="text"
                  value={service.title}
                  onChange={e => handleServiceChange(idx, 'title', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Lucide Icon Name</label>
                <input
                  type="text"
                  value={service.icon}
                  onChange={e => handleServiceChange(idx, 'icon', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm font-mono"
                  placeholder="e.g. Palette, Code, ShoppingCart, Smartphone, Zap, Search"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">One-Sentence Description</label>
                <textarea
                  rows={2}
                  value={service.description}
                  onChange={e => handleServiceChange(idx, 'description', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Tech Stack Skills Editor */}
      <div className="space-y-4 pt-6 border-t border-border">
        <h2 className="text-xl font-bold font-heading">Tech Stack Skills</h2>
        <Card className="p-6 space-y-4">
          <div className="flex gap-2 max-w-md">
            <input
              type="text"
              placeholder="Add skill (e.g. Docker, GraphQL)"
              value={newTechName}
              onChange={e => setNewTechName(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm"
            />
            <Button onClick={handleAddTech} size="sm" className="gap-1">
              <Plus className="w-4 h-4" /> Add
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {localTech.map((tech, i) => (
              <span
                key={`${tech.name}-${i}`}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-card border border-border text-sm font-medium shadow-sm"
              >
                <span>{tech.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTech(i)}
                  className="text-muted-foreground hover:text-red-500 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
