/**
 * Debug script to understand page structure
 */
import { chromium } from 'playwright';

const FRONTEND_URL = 'http://localhost:5173';

async function debug() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Go to register page
    await page.goto(`${FRONTEND_URL}/register`);
    await page.waitForLoadState('networkidle');

    // Take screenshot
    await page.screenshot({ path: '/tmp/debug_register.png', fullPage: true });
    console.log('Screenshot saved to /tmp/debug_register.png');

    // List all inputs
    const inputs = await page.locator('input').all();
    console.log(`Found ${inputs.length} input elements`);

    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      const tag = await input.evaluate(el => el.tagName);
      const type = await input.getAttribute('type');
      const placeholder = await input.getAttribute('placeholder');
      const value = await input.inputValue();
      console.log(`  Input ${i}: tag=${tag}, type=${type}, placeholder="${placeholder}", value="${value}"`);
    }

    // Now try registering
    await page.fill('input[type="email"]', 'debug@test.com');
    await page.fill('input[type="password"]', 'test123456');
    await page.click('button[type="submit"]');

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    await page.screenshot({ path: '/tmp/debug_after_register.png', fullPage: true });
    console.log('After register screenshot saved');

    // Navigate to chat
    await page.goto(`${FRONTEND_URL}/chat`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    await page.screenshot({ path: '/tmp/debug_chat.png', fullPage: true });
    console.log('Chat page screenshot saved');

    // List all inputs on chat page
    const chatInputs = await page.locator('input').all();
    console.log(`Found ${chatInputs.length} input elements on chat page`);

    for (let i = 0; i < chatInputs.length; i++) {
      const input = chatInputs[i];
      const tag = await input.evaluate(el => el.tagName);
      const type = await input.getAttribute('type');
      const placeholder = await input.getAttribute('placeholder');
      console.log(`  Input ${i}: tag=${tag}, type=${type}, placeholder="${placeholder}"`);
    }

    // Try to find the chat input
    const chatInput = page.locator('input[type="text"]').first();
    const count = await chatInput.count();
    console.log(`Found ${count} input[type="text"] elements`);

    // Try filling it
    await chatInput.fill('test message');
    await page.waitForTimeout(500);
    await page.screenshot({ path: '/tmp/debug_after_fill.png', fullPage: true });

    console.log('Fill test complete');

  } catch (e) {
    console.log('Error:', e.message);
    await page.screenshot({ path: '/tmp/debug_error.png' });
  } finally {
    await browser.close();
  }
}

debug().catch(console.error);