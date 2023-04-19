import { expect, test } from '@playwright/test';

function screenshotDelay(sec: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, sec * 1000);
	});
}

test('ファイルAPIからの画像の適用', async ({ page }) => {
	await page.goto('/');
	await page.locator('.CrtStartUp__startup-button:not(.--change)').click();
	await page.setInputFiles(
		'.CrtStartUp__startup-button:not(.--change) input[type="file"]',
		'tests/example-local.gif'
	);
	await expect(page.locator('.CrtScreen__image-main')).toHaveAttribute('src', /^blob:/);
	await screenshotDelay(1);
});

test('お試し用画像の適用', async ({ page }) => {
	await page.goto('/');
	await page.locator('.CrtStartUp__start-example').click();
	await expect(page.locator('.CrtScreen__image-main')).toHaveAttribute('src', '/example.gif');
	await screenshotDelay(1);
});

test('画像の変更', async ({ page }) => {
	await page.goto('/');
	await page.locator('.CrtStartUp__start-example').click();
	await page.locator('.CrtScreen').hover();
	await page.locator('.CrtStartUp__startup-button.--change').click();
	await page.setInputFiles(
		'.CrtStartUp__startup-button.--change input[type="file"]',
		'tests/example-local.gif'
	);
	await expect(page.locator('.CrtScreen__image-main')).toHaveAttribute('src', /^blob:/);
	await screenshotDelay(1);
});
