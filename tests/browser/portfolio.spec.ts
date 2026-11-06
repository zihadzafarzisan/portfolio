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
    await expect(page.locator('#about')).toContainText(site.fullName);
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
  await expect(page.locator('#about')).toContainText(site.fullName);
  await expect(page.locator('.contact-email')).toHaveAttribute('href', `mailto:${site.contact.email}`);
  await page.locator('.hero-buttons a').first().click();
  await expect(page).toHaveURL(/\/projects\/$/);
  await expect(page.locator('.work-empty')).toBeVisible();
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
  await expect(page).toHaveURL(/#about$/);
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

test('Motion paints visible animation in every section and cleans up after playback', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  let currentRoute = '/';
  for (const { route, id } of [
    { route: '/', id: 'main' },
    { route: '/', id: 'about' },
    { route: '/', id: 'contact' },
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

test('honest empty work, education disclosure, and verified contact links', async ({ page }) => {
  await page.goto('/');
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
  await expect(page.locator('.work-empty')).toContainText('More soon.');
  await expect(page.locator('.project-card')).toHaveCount(0);
  await page.goto('/journey/');
  await page.locator('.timeline-item summary').click();
  await expect(page.locator('.timeline-content')).toBeVisible();
});

test('Work and Journey have distinct pages with active navigation and links back home', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await expect(page.locator('.work-empty, .timeline')).toHaveCount(0);
  await page.getByRole('link', { name: 'Explore my work' }).click();
  await expect(page).toHaveURL(/\/projects\/$/);
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  await expect(nav.getByRole('link')).toHaveText(['Home', 'Work', 'Journey', 'About', 'Contact']);
  await expect(nav.getByRole('link', { name: 'Work', exact: true })).toHaveAttribute('aria-current', 'page');
  await expect(page.locator('.work-empty')).toBeVisible();
  await expect(page.locator('.timeline')).toHaveCount(0);
  await nav.getByRole('link', { name: 'Journey', exact: true }).click();
  await expect(page).toHaveURL(/\/journey\/$/);
  await expect(nav.getByRole('link', { name: 'Journey', exact: true })).toHaveAttribute('aria-current', 'page');
  await expect(page.locator('.timeline')).toContainText(site.university);
  await expect(page.locator('.work-empty')).toHaveCount(0);
  await nav.getByRole('link', { name: 'About', exact: true }).click();
  await expect(page).toHaveURL(/\/#about$/);
  await expect(page.locator('#about')).toBeInViewport();
  await nav.getByRole('link', { name: 'Journey', exact: true }).click();
  await nav.getByRole('link', { name: 'Contact', exact: true }).click();
  await expect(page).toHaveURL(/\/#contact$/);
  await expect(page.locator('.contact-form')).toBeInViewport();
  await nav.getByRole('link', { name: 'Home', exact: true }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('.hero-title')).toBeInViewport();
  await expect(nav.getByRole('link', { name: 'Home', exact: true })).toHaveAttribute('aria-current', 'page');
});

test('mobile menu opens the separate Work and Journey pages and closes after navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 850 });
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Open navigation' });
  const menu = page.getByRole('dialog', { name: 'Navigation' });
  await trigger.click();
  await expect(menu.getByRole('navigation').getByRole('link')).toHaveText(['01Home', '02Work', '03Journey', '04About', '05Contact']);
  await menu.getByRole('link', { name: '02 Work' }).click();
  await expect(page).toHaveURL(/\/projects\/$/);
  await expect(menu).not.toBeVisible();
  await expect(page.locator('.work-empty')).toBeVisible();
  await trigger.click();
  await menu.getByRole('link', { name: '03 Journey' }).click();
  await expect(page).toHaveURL(/\/journey\/$/);
  await expect(menu).not.toBeVisible();
  await expect(page.locator('.timeline')).toBeVisible();
  await trigger.click();
  await expect(menu.getByRole('link', { name: '03 Journey' })).toHaveAttribute('aria-current', 'page');
  await menu.getByRole('link', { name: '04 About' }).click();
  await expect(page).toHaveURL(/\/#about$/);
  await expect(menu).not.toBeVisible();
  await expect(page.locator('#about')).toBeInViewport();
  await trigger.click();
  await menu.getByRole('link', { name: '01 Home' }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(menu).not.toBeVisible();
  await expect(page.locator('.hero-title')).toBeInViewport();
});

for (const width of [1440, 390, 320]) {
  test(`Work and Journey render without overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const route of ['projects', 'journey']) {
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
