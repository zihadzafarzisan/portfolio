import { writeFile, mkdir } from 'node:fs/promises';
import { Resvg } from '@resvg/resvg-js';
import { site } from '../config/site.ts';

const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const initial = escape(site.name[0]);
const name = escape(site.name);
const font = { fontFiles: ['public/fonts/Anton-Regular.ttf', 'public/fonts/Manrope-Variable.ttf'], loadSystemFonts: false, defaultFontFamily: 'Manrope', sansSerifFamily: 'Manrope' };
const png = (svg) => new Resvg(svg, { font }).render().asPng();
await mkdir('public', { recursive: true });
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180"><rect width="180" height="180" rx="32" fill="${site.appearance.background}"/><text x="90" y="127" fill="${site.appearance.text}" font-family="Anton" font-size="115" text-anchor="middle">${initial}</text><rect x="41" y="146" width="98" height="7" fill="${site.appearance.accent}"/></svg>`;
await writeFile('public/icon.svg', icon);
await writeFile('public/apple-icon.png', png(icon));
const social = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="${site.appearance.background}"/><path d="M60 80h1080M60 550h1080" stroke="#ffffff25"/><text x="65" y="63" fill="${site.appearance.muted}" font-family="Manrope" font-size="15" letter-spacing="4">THE PORTFOLIO OF ${name}</text><text x="55" y="330" font-family="Anton" font-size="240" fill="${site.appearance.text}">${name}<tspan fill="${site.appearance.accent}">.</tspan></text><text x="65" y="415" font-family="Manrope" font-size="30" fill="${site.appearance.accent}">Curious mind. Builder at heart.</text><text x="65" y="515" font-family="Manrope" font-size="20" fill="${site.appearance.muted}">${escape(site.profession)} / ${escape(site.university)}</text></svg>`;
await writeFile('public/social-card.svg', social);
await writeFile('public/social-card.png', png(social));
console.log('Generated brand icons and social preview from config/site.ts.');
