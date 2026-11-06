import { test, expect } from '@playwright/test';

for (const width of [1440, 390, 320]) {
  test(`Friday supports conversation, retry, and navigation at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    let attempts = 0;
    await page.route('**/api/chat/', async (route) => {
      const { messages } = route.request().postDataJSON();
      expect(messages.at(-1).role).toBe('user');
      attempts++;
      if (attempts === 2) await route.fulfill({ status: 429, json: { error: 'Free usage limit. Try again later.' } });
      else await route.fulfill({ json: { text: 'Zisan builds Python automation. Explore /projects/ for details. <script>alert(1)</script>' } });
    });
    await page.goto('/');
    const trigger = page.getByRole('button', { name: 'Chat with Friday' });
    await trigger.click();
    const chat = page.getByRole('dialog', { name: 'Friday' });
    const question = chat.getByRole('textbox', { name: 'Ask Friday a question' });
    await expect(question).toBeFocused();
    await question.fill('What does Zisan build?');
    await chat.getByRole('button', { name: 'Send message' }).click();
    await expect(chat.locator('.friday-model').last()).toContainText('<script>alert(1)</script>');
    expect(await chat.locator('script').count()).toBe(0);
    await question.fill('Tell me more.');
    await question.press('Enter');
    await expect(chat.getByRole('alert')).toContainText('Free usage limit');
    await expect(question).toHaveValue('Tell me more.');
    await expect(chat.locator('.friday-user')).toHaveCount(1);
    await question.press('Enter');
    await expect(chat.locator('.friday-user')).toHaveCount(2);
    await expect(chat.locator('.friday-model')).toHaveCount(3);
    expect(await chat.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await chat.screenshot({ path: `test-results/friday-${width}.png` });
    await question.press('Escape');
    await expect(chat).toHaveCount(0);
    await expect(trigger).toBeFocused();
    await page.getByRole('link', { name: 'Explore my work' }).click();
    await trigger.click();
    await expect(chat.locator('.friday-user')).toHaveCount(2);
    await chat.getByRole('button', { name: 'New chat' }).click();
    await expect(chat.locator('.friday-user')).toHaveCount(0);
  });
}
