import { test, expect } from '@playwright/test';
import { site, motionStorageKey } from '../../config/site';

for (const width of [1440, 768, 390, 320]) {
  test(`portfolio renders without overflow or browser errors at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('response', (response) => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('.build-canvas')).toHaveCount(0, { timeout: 4000 });
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.hero-intro')).toContainText(site.university);
    await expect(page.locator('.about-section, .contact-section, .skills-section')).toHaveCount(0);
    await expect(page.getByRole('img', { name: site.avatar.alt })).toBeVisible();
    expect(await page.locator('.hero-avatar-image').evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.screenshot({ path: `test-results/portfolio-${width}.png`, fullPage: true });
    expect(errors).toEqual([]);
  });
}

test('content and navigation work without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 850 } });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
  await page.getByRole('link', { name: 'MORE ABOUT ME' }).click();
  await expect(page).toHaveURL(/\/about\/$/);
  await expect(page.locator('.about-copy')).toContainText(site.fullName);
  await expect(page.locator('.skill-group')).toHaveCount(5);
  await page.getByRole('link', { name: /Back to home/ }).click();
  await page.getByRole('link', { name: 'Explore my work' }).click();
  await expect(page).toHaveURL(/\/projects\/$/);
  await expect(page.locator('.project-card')).toHaveCount(4);
  await page.goto('/contact/');
  await expect(page.locator('.contact-email')).toHaveAttribute('href', `mailto:${site.contact.email}`);
  await expect(page.getByLabel('Your email')).toBeVisible();
  await context.close();
});

test('mobile dialog traps focus, closes with Escape, and restores its trigger', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 850 });
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Open navigation' });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Navigation' });
  await expect(dialog).toBeVisible();
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => Boolean(document.activeElement?.closest('dialog')))).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole('link', { name: '04 About' }).click();
  await expect(page).toHaveURL(/\/about\/$/);
  await expect(dialog).not.toBeVisible();
});

test('motion defaults on and autoplays each visit, while system reduced motion wins', async ({ page }) => {
  await page.addInitScript((key) => localStorage.setItem(key, 'off'), motionStorageKey);
  await page.goto('/');
  const toggle = page.getByRole('switch', { name: 'Enable animations' });
  await expect(toggle).toBeChecked();
  await expect(page.locator('.build-canvas')).toBeVisible();
  await toggle.click();
  await expect(toggle).not.toBeChecked();
  await expect(page.locator('.build-canvas')).toHaveCount(0);
  await page.reload();
  await expect(toggle).toBeChecked();
  await expect(page.locator('.build-canvas')).toBeVisible();
  await page.getByRole('button', { name: 'Play build animation' }).click();
  await expect(page.locator('.build-canvas')).toBeVisible();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(toggle).not.toBeChecked();
  await expect(page.locator('.build-canvas')).toHaveCount(0);
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
  await page.getByRole('button', { name: 'Play build animation' }).click();
  await expect(page.getByRole('status')).toContainText('reduced-motion setting is on');
  await expect(page.locator('.build-canvas')).toHaveCount(0);
});

test('Motion paints visible animation on every page and cleans up after playback', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  let currentRoute = '/';
  for (const { route, id } of [
    { route: '/', id: 'main' },
    { route: '/about/', id: 'main' },
    { route: '/contact/', id: 'main' },
    { route: '/projects/', id: 'main' },
    { route: '/journey/', id: 'main' },
  ]) {
    if (route !== currentRoute) { await page.goto(route); currentRoute = route; }
    await page.evaluate((target) => {
      window.scrollTo({ top: document.getElementById(target)!.offsetTop - 110, behavior: 'instant' });
    }, id);
    await page.waitForFunction(() => document.fonts.status === 'loaded');
    await page.getByRole('button', { name: 'Play build animation' }).click();
    await expect.poll(async () => page.locator('.build-canvas').evaluateAll((canvases) => {
      const canvas = canvases[0] as HTMLCanvasElement | undefined;
      if (!canvas) return 0;
      const pixels = canvas.getContext('2d')!.getImageData(0, 0, canvas.width, canvas.height).data;
      let drawn = 0;
      for (let i = 3; i < pixels.length; i += 4) if (pixels[i] > 0) drawn++;
      return drawn;
    }), { message: `Motion must draw visible pixels in ${route}#${id}`, timeout: 2500 }).toBeGreaterThan(100);
    await page.keyboard.press('Escape');
    await expect(page.locator('.build-canvas')).toHaveCount(0);
  }
  await page.getByRole('button', { name: 'Play build animation' }).click();
  await expect(page.locator('.build-canvas')).toBeVisible();
  await expect(page.locator('.build-canvas')).toHaveCount(0, { timeout: 4000 });
});

for (const width of [1440, 390]) {
  test(`Motion autoplays on page navigation and browser history at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('/');
    await expect(page.locator('.build-canvas')).toHaveCount(0, { timeout: 4000 });
    // A marker on window proves these are client navigations, not full reloads.
    await page.evaluate(() => Object.assign(window, { motionNavigationTest: true }));
    async function navigate(label: string) {
      if (width < 800) {
        await page.getByRole('button', { name: 'Open navigation' }).click();
        await page.getByRole('dialog', { name: 'Navigation' }).getByRole('link', { name: new RegExp(label) }).click();
      } else {
        await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: label, exact: true }).click();
      }
    }
    async function expectAutoplay() {
      await expect.poll(async () => page.locator('.build-canvas').evaluateAll((canvases) => {
        const canvas = canvases[0] as HTMLCanvasElement | undefined;
        if (!canvas) return false;
        const pixels = canvas.getContext('2d')!.getImageData(0, 0, canvas.width, canvas.height).data;
        return pixels.some((value, index) => index % 4 === 3 && value > 0);
      }), { timeout: 2500 }).toBe(true);
      expect(await page.evaluate(() => 'motionNavigationTest' in window)).toBe(true);
      await page.keyboard.press('Escape');
      await expect(page.locator('.build-canvas')).toHaveCount(0);
    }
    for (const label of ['Work', 'Journey', 'About', 'Contact', 'Home']) {
      await navigate(label);
      await expectAutoplay();
    }
    await page.goBack();
    await expect(page).toHaveURL(/\/contact\/$/);
    await expectAutoplay();
    await page.goForward();
    await expect(page).toHaveURL(/\/$/);
    await expectAutoplay();
    await page.getByRole('switch', { name: 'Enable animations' }).click();
    await navigate('About');
    await expect(page.locator('.build-canvas')).toHaveCount(0);
    await expect(page.getByRole('switch', { name: 'Enable animations' })).not.toBeChecked();
    await page.getByRole('switch', { name: 'Enable animations' }).click();
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await navigate('Contact');
    await expect(page.locator('.build-canvas')).toHaveCount(0);
    expect(errors).toEqual([]);
  });
}

test('Motion works in the project archive and with blocked localStorage', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(Storage.prototype, 'getItem', { value: () => { throw new DOMException('Storage blocked', 'SecurityError'); } });
    Object.defineProperty(Storage.prototype, 'setItem', { value: () => { throw new DOMException('Storage blocked', 'SecurityError'); } });
  });
  await page.goto('/projects/');
  const toggle = page.getByRole('switch', { name: 'Enable animations' });
  await expect(toggle).toBeChecked();
  await toggle.click();
  await expect(toggle).not.toBeChecked();
  await page.getByRole('button', { name: 'Play build animation' }).click();
  await expect(toggle).toBeChecked();
  await expect(page.locator('.build-canvas')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('.build-canvas')).toHaveCount(0);
});

test('CV projects, education disclosure, and verified contact links', async ({ page }) => {
  await page.goto('/contact/');
  await expect(page.getByRole('link', { name: 'WhatsApp', exact: false })).toHaveAttribute('href', /^https:\/\/wa\.me\/8801781205471\?text=/);
  await expect(page.getByRole('link', { name: site.contact.phoneDisplay })).toHaveAttribute('href', `tel:${site.contact.phone}`);
  const form = page.locator('.contact-form');
  expect(await form.evaluate((element) => (element as HTMLFormElement).checkValidity())).toBe(false);
  await form.getByLabel('Your name').fill('Test Person');
  await form.getByLabel('Your email').fill('test@example.com');
  await form.getByLabel('What’s on your mind?').fill('A meaningful test message.');
  expect(await form.evaluate((element) => (element as HTMLFormElement).checkValidity())).toBe(true);
  await expect(form.getByRole('button')).toHaveText('Open email draft');
  await page.goto('/projects/');
  await expect(page.locator('h1')).toHaveText('SELECTEDWORK.');
  await expect(page.locator('.project-card')).toHaveCount(4);
  await expect(page.locator('.project-card').filter({ hasText: 'Student OS' })).toContainText('Concept & exploration');
  await page.goto('/journey/');
  await page.locator('.timeline-item summary').click();
  await expect(page.locator('.timeline-content')).toBeVisible();
});

test('CV skills and project details support category filters, search, and keyboard use', async ({ page }) => {
  await page.goto('/about/');
  const skills = page.getByRole('region', { name: 'TECHNICAL SKILLS' });
  await expect(skills.locator('.skill-group')).toHaveCount(5);
  for (const skill of ['Python', 'Java', 'JavaScript', 'Pandas', 'NumPy', 'MySQL', 'PostgreSQL', 'FastAPI', 'Docker', 'SSH']) {
    await expect(skills.getByRole('listitem').filter({ hasText: new RegExp(`^${skill}$`) })).toHaveCount(1);
  }
  await page.goto('/projects/');
  const cards = page.locator('.project-card');
  await expect(cards).toHaveCount(4);
  await expect(page.locator('.work-empty')).toHaveCount(0);
  await page.getByRole('button', { name: 'Automation', exact: true }).click();
  await expect(cards).toHaveCount(2);
  const search = page.getByRole('searchbox', { name: 'Search projects' });
  await search.fill('academic deadlines');
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toContainText('University Reminder Bot');
  const reminder = cards.first();
  await reminder.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('heading', { name: 'FRIDAY — University Reminder Bot' })).toBeVisible();
  await expect(dialog.getByRole('link', { name: 'View source code' })).toHaveAttribute('href', 'https://github.com/zihadzafarzisan/friday-reminder-bot');
  await expect(dialog.getByRole('link', { name: 'View live project' })).toHaveAttribute('href', 'https://friday.alwaysdata.net');
  for (let i = 0; i < 4; i++) {
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => Boolean(document.activeElement?.closest('dialog')))).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(reminder).toBeFocused();
  await search.fill('no matching project');
  await expect(cards).toHaveCount(0);
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await expect(cards).toHaveCount(4);
  await page.getByRole('button', { name: 'Quantitative research', exact: true }).click();
  await expect(cards).toHaveCount(1);
  await cards.first().click();
  await expect(dialog).toContainText('Monte Carlo');
  await expect(dialog.getByRole('link', { name: 'View source code' })).toHaveAttribute('href', 'https://github.com/zihadzafarzisan/Ai-Trading-Bot');
  await dialog.getByRole('button', { name: 'Close project details' }).click();
  await page.getByRole('button', { name: 'Web application', exact: true }).click();
  await expect(cards).toHaveCount(1);
  await cards.first().click();
  await expect(dialog).toContainText('Concept & exploration');
  await expect(dialog).toContainText('Explored a centralized student platform');
  await expect(dialog.getByRole('link', { name: 'View live project' })).toHaveCount(0);
  await dialog.getByRole('button', { name: 'Close project details' }).click();
});

for (const width of [1440, 390]) {
  test(`Friday Reminder Bot shows all eight screenshots and its site link at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('response', (response) => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
    await page.goto('/projects/');
    const reminder = page.locator('.project-card').filter({ hasText: 'FRIDAY — University Reminder Bot' });
    await expect(reminder.locator('img')).toHaveAttribute('src', '/assets/projects/friday-reminder/Fr7.png');
    await reminder.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('link', { name: 'View live project' })).toHaveAttribute('href', 'https://friday.alwaysdata.net');
    const pictures = dialog.getByRole('img');
    await expect(pictures).toHaveCount(8);
    await pictures.first().evaluate((image) => (image as HTMLImageElement).decode());
    await dialog.screenshot({ path: `test-results/friday-reminder-dialog-${width}.png` });
    const filenames = await pictures.evaluateAll((images) => images.map((image) => new URL((image as HTMLImageElement).src).pathname.split('/').at(-1)).sort());
    expect(filenames).toEqual(['Fr1.jpg', 'Fr2.jpg', 'Fr3.jpg', 'Fr4.jpg', 'Fr5.jpg', 'Fr6.png', 'Fr7.png', 'Fr8.png']);
    for (let index = 0; index < 8; index++) {
      const picture = pictures.nth(index);
      await picture.scrollIntoViewIfNeeded();
      await picture.evaluate((image) => (image as HTMLImageElement).decode());
      expect(await picture.evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    }
    expect(await dialog.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
    await expect(dialog.getByRole('button', { name: 'Close project details' })).toBeInViewport();
    await dialog.getByRole('button', { name: 'Close project details' }).click();
    await expect(dialog).not.toBeVisible();
    await expect(reminder).toBeFocused();
    expect(errors).toEqual([]);
  });
}

test('All navigation items open separate pages with active navigation and links home', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await expect(page.locator('.project-card, .timeline, .about-section, .contact-section')).toHaveCount(0);
  await page.getByRole('link', { name: 'Explore my work' }).click();
  await expect(page).toHaveURL(/\/projects\/$/);
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  await expect(nav.getByRole('link')).toHaveText(['Home', 'Work', 'Journey', 'About', 'Contact']);
  await expect(nav.getByRole('link', { name: 'Work', exact: true })).toHaveAttribute('aria-current', 'page');
  await expect(page.locator('.project-card')).toHaveCount(4);
  await expect(page.locator('.timeline')).toHaveCount(0);
  await nav.getByRole('link', { name: 'Journey', exact: true }).click();
  await expect(page).toHaveURL(/\/journey\/$/);
  await expect(nav.getByRole('link', { name: 'Journey', exact: true })).toHaveAttribute('aria-current', 'page');
  await expect(page.locator('.timeline')).toContainText(site.university);
  await expect(page.locator('.project-card')).toHaveCount(0);
  await nav.getByRole('link', { name: 'About', exact: true }).click();
  await expect(page).toHaveURL(/\/about\/$/);
  await expect(page.locator('.about-section')).toBeInViewport();
  await nav.getByRole('link', { name: 'Journey', exact: true }).click();
  await nav.getByRole('link', { name: 'Contact', exact: true }).click();
  await expect(page).toHaveURL(/\/contact\/$/);
  await expect(page.locator('.contact-form')).toBeInViewport();
  await nav.getByRole('link', { name: 'Home', exact: true }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('.hero-title')).toBeInViewport();
  await expect(nav.getByRole('link', { name: 'Home', exact: true })).toHaveAttribute('aria-current', 'page');
});

test('mobile menu opens separate pages and closes after navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 850 });
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Open navigation' });
  const menu = page.getByRole('dialog', { name: 'Navigation' });
  await trigger.click();
  await expect(menu.getByRole('navigation').getByRole('link')).toHaveText(['01Home', '02Work', '03Journey', '04About', '05Contact']);
  await menu.getByRole('link', { name: '02 Work' }).click();
  await expect(page).toHaveURL(/\/projects\/$/);
  await expect(menu).not.toBeVisible();
  await expect(page.locator('.project-card')).toHaveCount(4);
  await trigger.click();
  await menu.getByRole('link', { name: '03 Journey' }).click();
  await expect(page).toHaveURL(/\/journey\/$/);
  await expect(menu).not.toBeVisible();
  await expect(page.locator('.timeline')).toBeVisible();
  await trigger.click();
  await expect(menu.getByRole('link', { name: '03 Journey' })).toHaveAttribute('aria-current', 'page');
  await menu.getByRole('link', { name: '04 About' }).click();
  await expect(page).toHaveURL(/\/about\/$/);
  await expect(menu).not.toBeVisible();
  await expect(page.locator('.about-section')).toBeInViewport();
  await trigger.click();
  await menu.getByRole('link', { name: '05 Contact' }).click();
  await expect(page).toHaveURL(/\/contact\/$/);
  await expect(menu).not.toBeVisible();
  await expect(page.locator('.contact-form')).toBeVisible();
  await trigger.click();
  await menu.getByRole('link', { name: '01 Home' }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(menu).not.toBeVisible();
  await expect(page.locator('.hero-title')).toBeInViewport();
});

for (const width of [1440, 390, 320]) {
  test(`Separate pages render without overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const route of ['projects', 'journey', 'about', 'contact']) {
      const response = await page.goto(`/${route}/`);
      expect(response?.status()).toBe(200);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('main')).toHaveCount(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.screenshot({ path: `test-results/${route}-${width}.png`, fullPage: true });
    }
  });
}
