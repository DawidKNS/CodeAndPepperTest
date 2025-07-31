import { expect } from '@playwright/test';
import test from '@lib/baseTests';

let response: any;

test.beforeEach(async ({ runPage }) => {
	response = await runPage.navigateToURL();
});

test.describe('UI Test', async () => {
	test('Test1', async ({ startPage }): Promise<void> => {
	});
});

test.afterEach(async ({ runPage }) => {
	await runPage.page.close();
});