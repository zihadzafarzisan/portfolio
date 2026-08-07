'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { Lock, ShieldCheck, ArrowLeft, KeyRound } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function AdminLoginPage() {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const { login, isAuthenticated } = useAdminAuth();
  const router = useRouter();

  if (isAuthenticated) {
    router.replace('/admin');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(passcode);
    if (success) {
      router.push('/admin');
    } else {
      setError(true);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4 py-12 relative overflow-hidden">
      {/* Ambient background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="w-full max-w-md bg-card border border-border/80 rounded-2xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold font-heading text-foreground">Admin Dashboard Login</h1>
          <p className="text-sm text-muted-foreground">
            Enter your passcode to manage and configure website settings.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="passcode" className="block text-sm font-medium mb-2 text-foreground flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-muted-foreground" />
              Admin Passcode
            </label>
            <input
              type="password"
              id="passcode"
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                setError(false);
              }}
              placeholder="Enter admin passcode (Default: admin123)"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
              required
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium text-center">
              Invalid passcode. Please try again.
            </div>
          )}

          <Button type="submit" size="lg" className="w-full">
            <ShieldCheck className="w-5 h-5 mr-2" />
            Authenticate Admin
          </Button>
        </form>

        <div className="pt-4 border-t border-border/50 text-center space-y-2">
          <p className="text-xs text-muted-foreground">
            Default Passcode: <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-foreground">admin123</code>
          </p>
          <Link
            href="/"
            className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors mt-2"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            Return to Live Site
          </Link>
        </div>
      </div>
    </main>
  );
}
