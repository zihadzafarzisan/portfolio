'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { MotionConfig } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { BuildAnimation } from './BuildAnimation';

const eventName = 'portfolio-motion-change';
// Start each visit with motion on; the toggle still applies until the page reloads.
let memoryPreference = true;
function subscribe(listener: () => void) {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  window.addEventListener(eventName, listener);
  media.addEventListener('change', listener);
  return () => {
    window.removeEventListener(eventName, listener);
    media.removeEventListener('change', listener);
  };
}
function snapshot() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  return memoryPreference;
}
const systemSnapshot = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function savePreference(enabled: boolean) {
  memoryPreference = enabled;
  window.dispatchEvent(new Event(eventName));
}

const MotionContext = createContext({ enabled: false, reducedMotion: false, replay: () => {}, toggle: () => {} });

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const enabled = useSyncExternalStore(subscribe, snapshot, () => false);
  const reducedMotion = useSyncExternalStore(subscribe, systemSnapshot, () => false);
  const [sequence, setSequence] = useState(1);
  const nextSequence = useRef(1);
  const replay = useCallback(() => {
    if (systemSnapshot()) return;
    savePreference(true);
    setSequence(++nextSequence.current);
  }, []);
  const toggle = useCallback(() => {
    if (systemSnapshot()) return;
    if (enabled) savePreference(false);
    else replay();
  }, [enabled, replay]);
  useEffect(() => { document.documentElement.dataset.motion = enabled ? 'on' : 'off'; }, [enabled]);
  return (
    <MotionContext.Provider value={{ enabled, reducedMotion, replay, toggle }}>
      <MotionConfig reducedMotion={enabled ? 'user' : 'always'} transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.65 }}>
        {children}
        <BuildAnimation key={pathname} enabled={enabled} sequence={sequence} />
      </MotionConfig>
    </MotionContext.Provider>
  );
}

export const useMotion = () => useContext(MotionContext);
