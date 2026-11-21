// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Mini Checkout & Browser Test Suite', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to checkout app before each test
    await page.goto('/');
  });

  test('Objective 1: Page structure and initial catalog load correctly', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Mini Checkout/i);

    // Verify header branding and cart summary
    await expect(page.locator('.brand-title')).toContainText('MiniStore Checkout');
    await expect(page.getByTestId('header-cart-count')).toHaveText('0');
    await expect(page.getByTestId('header-cart-total')).toHaveText('$0.00');

    // Verify catalog contains 12 items (Electronics, Kitchen, Furniture, etc.)
    const products = page.locator('.product-card');
    await expect(products).toHaveCount(12);

    // Verify empty cart state is visible initially
    await expect(page.getByTestId('cart-empty-message')).toBeVisible();
    await expect(page.getByTestId('cart-items-list')).toBeHidden();
  });

  test('Objective 2: Add and remove products from shopping cart', async ({ page }) => {
    // Add first product (Wireless Headphones Pro - $59.99)
    const addBtn1 = page.getByTestId('add-to-cart-prod-1');
    await addBtn1.click();

    // Verify cart reflects 1 item
    await expect(page.getByTestId('header-cart-count')).toHaveText('1');
    await expect(page.getByTestId('cart-empty-message')).toBeHidden();
    await expect(page.getByTestId('cart-items-list')).toBeVisible();

    const cartItem1 = page.getByTestId('cart-item-prod-1');
    await expect(cartItem1).toBeVisible();
    await expect(cartItem1.locator('.cart-item-name')).toContainText('Wireless Headphones Pro');

    // Add second product (Smartwatch Horizon - $129.50)
    const addBtn2 = page.getByTestId('add-to-cart-prod-2');
    await addBtn2.click();

    // Verify cart reflects 2 items
    await expect(page.getByTestId('header-cart-count')).toHaveText('2');
    await expect(page.getByTestId('cart-item-prod-2')).toBeVisible();

    // Remove first product using individual remove button
    await page.getByTestId('item-remove-prod-1').click();

    // Verify prod-1 is removed, but prod-2 remains
    await expect(page.getByTestId('cart-item-prod-1')).toBeHidden();
    await expect(page.getByTestId('cart-item-prod-2')).toBeVisible();
    await expect(page.getByTestId('header-cart-count')).toHaveText('1');

    // Clear remaining items using "Clear All" button
    await page.getByTestId('clear-cart-btn').click();

    // Verify cart returns to empty state
    await expect(page.getByTestId('cart-empty-message')).toBeVisible();
    await expect(page.getByTestId('header-cart-count')).toHaveText('0');
    await expect(page.getByTestId('header-cart-total')).toHaveText('$0.00');
  });

  test('Objective 3 & 4: Update quantities dynamically and calculate line & order totals', async ({ page }) => {
    // Add product 1 ($59.99)
    await page.getByTestId('add-to-cart-prod-1').click();

    // Verify initial line total ($59.99)
    await expect(page.getByTestId('item-qty-prod-1')).toHaveValue('1');
    await expect(page.getByTestId('item-line-total-prod-1')).toHaveText('$59.99');

    // Increase quantity using '+' button to 3
    const increaseBtn = page.getByTestId('qty-increase-prod-1');
    await increaseBtn.click(); // qty = 2
    await increaseBtn.click(); // qty = 3

    await expect(page.getByTestId('item-qty-prod-1')).toHaveValue('3');
    // Line total = 59.99 * 3 = 179.97
    await expect(page.getByTestId('item-line-total-prod-1')).toHaveText('$179.97');

    // Decrease quantity using '-' button to 2
    const decreaseBtn = page.getByTestId('qty-decrease-prod-1');
    await decreaseBtn.click(); // qty = 2

    await expect(page.getByTestId('item-qty-prod-1')).toHaveValue('2');
    // Line total = 59.99 * 2 = 119.98
    await expect(page.getByTestId('item-line-total-prod-1')).toHaveText('$119.98');

    // Add another product: Product 3 (Mechanical Keyboard - $89.00)
    await page.getByTestId('add-to-cart-prod-3').click();
    await expect(page.getByTestId('item-line-total-prod-3')).toHaveText('$89.00');

    // Calculate expected totals:
    // Subtotal: 119.98 + 89.00 = 208.98
    // Tax (8%): 208.98 * 0.08 = 16.7184 => 16.72
    // Shipping: Free ($0.00)
    // Order Total: 208.98 + 16.72 = 225.70
    await expect(page.getByTestId('cart-subtotal')).toHaveText('$208.98');
    await expect(page.getByTestId('cart-tax')).toHaveText('$16.72');
    await expect(page.getByTestId('cart-shipping')).toHaveText('Free');
    await expect(page.getByTestId('cart-total')).toHaveText('$225.70');

    // Verify checkout button text also displays the updated total
    await expect(page.getByTestId('place-order-btn')).toContainText('$225.70');
  });

  test('Objective 5: Validate required customer information and empty cart mistakes', async ({ page }) => {
    // Case A: Trying to place order with an empty cart
    await page.getByTestId('customer-name-input').fill('Alice Walker');
    await page.getByTestId('place-order-btn').click();

    // Verify cart error alert is displayed
    const cartError = page.getByTestId('cart-error');
    await expect(cartError).toBeVisible();
    await expect(cartError).toContainText(/Your cart is empty/i);

    // Verify modal does not open
    await expect(page.getByTestId('order-confirmation-modal')).toBeHidden();

    // Case B: Add product but leave customer name blank
    await page.getByTestId('add-to-cart-prod-1').click();
    await page.getByTestId('customer-name-input').fill(''); // Clear name
    await page.getByTestId('place-order-btn').click();

    // Verify name error message is displayed
    const nameError = page.getByTestId('name-error');
    await expect(nameError).toBeVisible();
    await expect(nameError).toContainText('Customer name is required.');
    await expect(page.getByTestId('order-confirmation-modal')).toBeHidden();

    // Case C: Enter too short name (1 char)
    await page.getByTestId('customer-name-input').fill('A');
    await page.getByTestId('place-order-btn').click();
    await expect(nameError).toBeVisible();
    await expect(nameError).toContainText('at least 2 characters');

    // Case D: Enter invalid email format (optional field error handling)
    await page.getByTestId('customer-name-input').fill('Alice Walker');
    await page.getByTestId('customer-email-input').fill('not-an-email');
    await page.getByTestId('place-order-btn').click();

    const emailError = page.getByTestId('email-error');
    await expect(emailError).toBeVisible();
    await expect(emailError).toContainText('valid email address');
    await expect(page.getByTestId('order-confirmation-modal')).toBeHidden();

    // Correct the email and verify error clears
    await page.getByTestId('customer-email-input').fill('alice@example.com');
    await expect(emailError).toBeHidden();
  });

  test('Objective 6: Display confirmation message and unique reference number after checkout', async ({ page }) => {
    // Customer adds 2 items
    await page.getByTestId('add-to-cart-prod-1').click(); // $59.99
    await page.getByTestId('add-to-cart-prod-4').click(); // $39.99

    // Customer enters name and email
    await page.getByTestId('customer-name-input').fill('Sarah Connor');
    await page.getByTestId('customer-email-input').fill('sarah@resistance.org');

    // Click Place Order
    await page.getByTestId('place-order-btn').click();

    // Verify confirmation modal opens
    const modal = page.getByTestId('order-confirmation-modal');
    await expect(modal).toBeVisible();

    // Verify Customer name in confirmation
    await expect(page.getByTestId('order-customer-name')).toHaveText('Sarah Connor');

    // Verify unique reference number exists and adheres to pattern (e.g. ORD-YYYYMMDD-XXXX001)
    const refText = await page.getByTestId('order-ref-number').textContent();
    expect(refText).toMatch(/^ORD-\d{8}-[A-Z0-9]+$/);

    // Verify total paid is calculated correctly
    // Subtotal: 59.99 + 39.99 = 99.98
    // Tax: 99.98 * 0.08 = 7.9984 => 8.00
    // Total: 107.98
    await expect(page.getByTestId('order-total-paid')).toHaveText('$107.98');

    // Verify cart is cleared in background
    await expect(page.getByTestId('header-cart-count')).toHaveText('0');

    // Click "Start New Order" to reset
    await page.getByTestId('new-order-btn').click();
    await expect(modal).toBeHidden();
    await expect(page.getByTestId('customer-name-input')).toHaveValue('');
  });

  test('Objective 7: Prevent duplicate orders when clicking button multiple times rapidly', async ({ page }) => {
    // Add product to cart
    await page.getByTestId('add-to-cart-prod-2').click();

    // Fill valid customer name
    await page.getByTestId('customer-name-input').fill('Marcus Wright');

    const placeOrderBtn = page.getByTestId('place-order-btn');

    // Simulate rapid user clicks
    // Using noWaitAfter prevents Playwright from hanging when the button is immediately disabled
    await placeOrderBtn.click({ noWaitAfter: true });

    // Attempt rapid duplicate clicks while in-flight
    await page.evaluate(() => {
      const btn = document.getElementById('placeOrderBtn');
      if (btn) {
        btn.click();
        btn.click();
      }
    });

    // Wait for the modal to be visible
    await expect(page.getByTestId('order-confirmation-modal')).toBeVisible();

    // Verify in window.__APP_STATE__ that exactly 1 order was processed
    const orderCount = await page.evaluate(() => window.__APP_STATE__.orderCount);
    expect(orderCount).toBe(1);

    // Verify unique reference number is present
    const refNumber = await page.getByTestId('order-ref-number').textContent();
    expect(refNumber).toBeTruthy();
    expect(refNumber).toContain('ORD-');
  });

  test('Copy Reference Number button works', async ({ page, context }) => {
    // Grant clipboard permissions
    await context.grantPermissions(['clipboard-read', 'clipboard-write']).catch(() => {});

    await page.getByTestId('add-to-cart-prod-6').click();
    await page.getByTestId('customer-name-input').fill('David Bowman');
    await page.getByTestId('place-order-btn').click();

    await expect(page.getByTestId('order-confirmation-modal')).toBeVisible();

    const copyBtn = page.locator('#copyRefBtn');
    await copyBtn.click();

    // Button should briefly display "Copied!"
    await expect(page.locator('#copyRefText')).toHaveText('Copied!');
  });

  test('Objective 8: Search and category filtering update catalog dynamically', async ({ page }) => {
    // Search for "Keyboard"
    const searchInput = page.locator('#searchInput');
    await searchInput.fill('Keyboard');

    // Should only show 1 product (Mechanical Keyboard)
    const cards = page.locator('.product-card');
    await expect(cards).toHaveCount(1);
    await expect(cards.first()).toContainText('Keychron');

    // Clear search
    await searchInput.fill('');
    await expect(page.locator('.product-card')).toHaveCount(12);

    // Filter by category "Wearables"
    await page.locator('#categoryFilter').selectOption('Wearables');
    await expect(page.locator('.product-card')).toHaveCount(1);
    await expect(page.locator('.product-card').first()).toContainText('Smartwatch');

    // Filter by category "Kitchen"
    await page.locator('#categoryFilter').selectOption('Kitchen');
    await expect(page.locator('.product-card')).toHaveCount(3);
    await expect(page.locator('.product-card').first()).toContainText('Air Fryer');

    // Filter by category "Furniture"
    await page.locator('#categoryFilter').selectOption('Furniture');
    await expect(page.locator('.product-card')).toHaveCount(3);
    await expect(page.locator('.product-card').first()).toContainText('Office Chair');

    // Reset category filter
    await page.locator('#categoryFilter').selectOption('all');
    await expect(page.locator('.product-card')).toHaveCount(12);
  });

  test('Objective 9: Order History persists in storage, shows shipment tracking, and enables 1-click reorder', async ({ page }) => {
    // Complete an order first
    await page.getByTestId('add-to-cart-prod-3').click(); // Keychron Keyboard
    await page.getByTestId('customer-name-input').fill('Maya Lin');
    await page.getByTestId('customer-email-input').fill('maya@example.com');
    await page.getByTestId('place-order-btn').click();

    // Verify confirmation modal opens
    await expect(page.getByTestId('order-confirmation-modal')).toBeVisible();

    // Click "View in Your Orders" from confirmation modal
    await page.locator('#openHistoryFromModalBtn').click();

    // Order History modal should now be visible
    const historyModal = page.getByTestId('order-history-modal');
    await expect(historyModal).toBeVisible();

    // Verify order card is rendered with customer name and Keychron keyboard
    const orderCard = page.locator('.order-history-card').first();
    await expect(orderCard).toBeVisible();
    await expect(orderCard).toContainText('Maya Lin');
    await expect(orderCard).toContainText('Keychron');

    // Test "Track package" button inside order history
    const trackBtn = orderCard.locator('.btn-track-package');
    await trackBtn.click();

    // Tracking modal should appear
    const trackingModal = page.locator('#trackingModal');
    await expect(trackingModal).toBeVisible();
    await expect(trackingModal.locator('.timeline-visual')).toBeVisible();

    // Close tracking modal
    await page.locator('#dismissTrackingBtn').click();
    await expect(trackingModal).toBeHidden();

    // Test 1-click "Buy again" button inside order history
    const buyAgainBtn = orderCard.locator('.btn-buy-again').first();
    await buyAgainBtn.click();

    // History modal should close, and cart count should now be 1
    await expect(historyModal).toBeHidden();
    await expect(page.getByTestId('header-cart-count')).toHaveText('1');
    await expect(page.getByTestId('cart-item-prod-3')).toBeVisible();
  });

});
