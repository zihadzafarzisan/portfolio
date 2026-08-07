'use client';

import React from 'react';
import Link from 'next/link';
import { useSiteConfig } from '@/context/SiteConfigContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  FolderKanban,
  MessageSquareQuote,
  Mail,
  Wrench,
  ArrowRight,
  Download,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export default function AdminOverviewPage() {
  const {
    projects,
    testimonials,
    services,
    messages,
    settings,
    resetToDefaults,
  } = useSiteConfig();

  const unreadMessages = messages.filter((m) => !m.read);

  const exportConfigJson = () => {
    const configData = {
      settings,
      projects,
      testimonials,
      services,
    };
    const jsonStr = JSON.stringify(configData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zisan-site-config-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Header banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card border border-border p-6 rounded-2xl shadow-sm">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading mb-1">
            Welcome back, Zisan 👋
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage all website copy, case studies, testimonials, and contact inquiries in real time.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={exportConfigJson} variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export Config JSON
          </Button>

          <Button
            onClick={() => {
              if (confirm('Are you sure you want to reset all site data to default values?')) {
                resetToDefaults();
              }
            }}
            variant="ghost"
            size="sm"
            className="text-red-500 hover:bg-red-500/10 gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Defaults
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Total Projects</p>
            <p className="text-3xl font-bold font-heading">{projects.length}</p>
            <p className="text-xs text-emerald-500 mt-1">{projects.filter(p => p.featured).length} Featured on Home</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <FolderKanban className="w-6 h-6" />
          </div>
        </Card>

        <Card className="p-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Testimonials</p>
            <p className="text-3xl font-bold font-heading">{testimonials.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Active in Marquee</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
            <MessageSquareQuote className="w-6 h-6" />
          </div>
        </Card>

        <Card className="p-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Unread Messages</p>
            <p className="text-3xl font-bold font-heading">{unreadMessages.length}</p>
            <p className="text-xs text-muted-foreground mt-1">{messages.length} Total Received</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <Mail className="w-6 h-6" />
          </div>
        </Card>

        <Card className="p-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Freelance Status</p>
            <p className="text-lg font-bold font-heading flex items-center gap-2 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              {settings.availableForFreelance ? 'Available' : 'Busy'}
            </p>
            <p className="text-xs text-muted-foreground mt-1 truncate max-w-[140px]">{settings.freelanceStatusText}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
        </Card>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Messages Inbox summary */}
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                Recent Inquiries
              </h2>
              <Link href="/admin/messages" className="text-xs text-primary font-semibold flex items-center hover:underline">
                View All <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </div>

            {messages.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">No messages received yet.</p>
            ) : (
              <div className="space-y-3">
                {messages.slice(0, 3).map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-3 rounded-xl border transition-colors ${
                      !msg.read ? 'bg-primary/5 border-primary/20' : 'bg-muted/30 border-border/50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-semibold text-sm">{msg.name}</span>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{msg.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Quick Edit Links */}
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-accent" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/admin/projects"
                className="p-4 rounded-xl border border-border bg-muted/20 hover:bg-muted/60 transition-colors flex flex-col gap-2 group"
              >
                <FolderKanban className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-semibold text-sm">Manage Projects</div>
                  <div className="text-xs text-muted-foreground">Add/Edit case studies</div>
                </div>
              </Link>

              <Link
                href="/admin/settings"
                className="p-4 rounded-xl border border-border bg-muted/20 hover:bg-muted/60 transition-colors flex flex-col gap-2 group"
              >
                <Sparkles className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-semibold text-sm">Hero & Bio Copy</div>
                  <div className="text-xs text-muted-foreground">Update text & links</div>
                </div>
              </Link>

              <Link
                href="/admin/testimonials"
                className="p-4 rounded-xl border border-border bg-muted/20 hover:bg-muted/60 transition-colors flex flex-col gap-2 group"
              >
                <MessageSquareQuote className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-semibold text-sm">Testimonials</div>
                  <div className="text-xs text-muted-foreground">Client reviews</div>
                </div>
              </Link>

              <Link
                href="/admin/services"
                className="p-4 rounded-xl border border-border bg-muted/20 hover:bg-muted/60 transition-colors flex flex-col gap-2 group"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-semibold text-sm">Services & Tech</div>
                  <div className="text-xs text-muted-foreground">Skill offerings</div>
                </div>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
