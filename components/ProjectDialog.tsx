'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Play, X } from 'lucide-react';
import type { Project } from '@/data/projects';
import { youtubeEmbed } from '@/lib/project-utils';
import { trapDialogFocus } from '@/lib/dialog-focus';

export function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  useEffect(() => {
    if (!project) { dialog.current?.close(); return; }
    dialog.current?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [project]);
  const video = youtubeEmbed(project?.videoUrl);
  const close = () => { setPlayingId(null); onClose(); };
  return (
    <dialog className="project-dialog" ref={dialog} tabIndex={-1} onKeyDown={trapDialogFocus} onCancel={close} onClick={(event) => { if (event.target === event.currentTarget) close(); }} aria-labelledby="project-dialog-title">
      {project && (
        <div className="project-dialog-inner">
          <div className="dialog-topline">
            <span className="micro">{project.category}{project.year ? ` / ${project.year}` : ''}</span>
            <button className="icon-button" aria-label="Close project details" onClick={close}><X /></button>
          </div>
          <h2 id="project-dialog-title" className="display">{project.title}</h2>
          {project.stage && <span className="project-stage">{project.stage}</span>}
          <p className="dialog-summary">{project.summary}</p>
          <div className="dialog-links">
            {project.liveUrl && <a className="button button-primary" href={project.liveUrl} target="_blank" rel="noopener noreferrer">View live project <ArrowUpRight size={17} /></a>}
            {project.sourceUrl && <a className="button button-outline" href={project.sourceUrl} target="_blank" rel="noopener noreferrer">View source code <ArrowUpRight size={17} /></a>}
          </div>
          {project.coverImage && <Image className="dialog-cover" src={project.coverImage} alt={project.coverAlt || project.title} width={project.coverWidth || 1100} height={project.coverHeight || 700} sizes="(max-width: 900px) 100vw, 850px" />}
          <div className="project-detail-grid">
            <div>
              <h3 className="micro">ABOUT THIS PROJECT</h3>
              <p className="project-description">{project.description}</p>
            </div>
            <div>
              {project.role && <><h3 className="micro">MY ROLE</h3><p>{project.role}</p></>}
              {project.tools.length > 0 && <><h3 className="micro">TOOLS & FOCUS</h3><div className="tool-tags">{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</div></>}
            </div>
          </div>
          {Boolean(project.gallery?.length) && (
            <section className="project-gallery" aria-labelledby="project-gallery-title">
              <h3 id="project-gallery-title" className="micro">PROJECT SCREENSHOTS</h3>
              {project.gallery!.map((image) => (
                <figure key={image.src}>
                  <Image className="dialog-gallery" src={image.src} alt={image.alt} width={image.width || 1100} height={image.height || 750} sizes="(max-width: 900px) 100vw, 850px" />
                  <figcaption><span>{image.caption || image.alt}</span><a href={image.src} target="_blank" rel="noopener noreferrer" aria-label={`Open ${image.caption || image.alt} at full size`}>View full size <ArrowUpRight size={13} /></a></figcaption>
                </figure>
              ))}
            </section>
          )}
          {video && <div className="project-video">{playingId === project.id ? <iframe src={video} title={`${project.title} video`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /> : <button onClick={() => setPlayingId(project.id)} className="button button-outline"><Play size={18} /> Load project video from YouTube</button>}</div>}
        </div>
      )}
    </dialog>
  );
}
