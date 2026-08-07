'use client';

import React from 'react';
import { useSiteConfig } from '@/context/SiteConfigContext';
import { Card } from '@/components/ui/Card';
import { Mail, CheckCircle2, Trash2, Clock } from 'lucide-react';

export default function AdminMessagesPage() {
  const { messages, markMessageAsRead, deleteMessage } = useSiteConfig();

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading">Messages Inbox</h1>
          <p className="text-sm text-muted-foreground">
            View inquiries submitted via the website contact form ({unreadCount} unread).
          </p>
        </div>
      </div>

      {messages.length === 0 ? (
        <Card className="p-12 text-center space-y-3">
          <Mail className="w-12 h-12 text-muted-foreground mx-auto" />
          <h3 className="text-lg font-bold">No Messages Yet</h3>
          <p className="text-sm text-muted-foreground">Submissions from your contact form will appear here.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <Card
              key={msg.id}
              className={`p-6 transition-all border ${
                !msg.read ? 'border-primary/40 bg-primary/5 shadow-md' : 'border-border/60 bg-card'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border/50 mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    !msg.read ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {msg.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base">{msg.name}</h3>
                      {!msg.read && (
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
                          New
                        </span>
                      )}
                    </div>
                    <a href={`mailto:${msg.email}`} className="text-xs text-primary hover:underline">
                      {msg.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-auto">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>

                  {!msg.read && (
                    <button
                      onClick={() => markMessageAsRead(msg.id)}
                      className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-xs font-semibold flex items-center gap-1"
                      title="Mark as read"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Mark Read</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      if (confirm('Delete this message?')) {
                        deleteMessage(msg.id);
                      }
                    }}
                    className="p-2 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
                    title="Delete message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-background/80 p-4 rounded-xl border border-border/40 text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                {msg.message}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
