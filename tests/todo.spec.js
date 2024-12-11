import { test, expect } from '@playwright/test';

test.describe('To-Do List App', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173');
    });

    test('should add a new task', async ({ page }) => {
        await page.fill('#task-input', 'Buy milk');
        await page.click('button[type="submit"]');
        const task = await page.locator('ul#todo-list li span').nth(0);
        await expect(task).toHaveText('Buy milk');
    });

    test('should update stats when adding a task', async ({ page }) => {
        await page.fill('#task-input', 'Buy groceries');
        await page.click('button[type="submit"]');
        const stats = await page.locator('#stats');
        await expect(stats).toHaveText('Total tasks: 1 | Completed: 0');
    });

    test('should allow marking a task as complete', async ({ page }) => {
        await page.fill('#task-input', 'Clean room');
        await page.click('button[type="submit"]');
        await page.check('input.mark-complete');
        const stats = await page.locator('#stats');
        await expect(stats).toHaveText('Total tasks: 1 | Completed: 1');
    });

    test('should delete a task', async ({ page }) => {
        await page.fill('#task-input', 'Wash dishes');
        await page.click('button[type="submit"]');
        await page.click('.delete-task');
        const tasks = await page.locator('ul#todo-list li');
        await expect(tasks).toHaveCount(0);
    });
});
