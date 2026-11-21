# 🛍️ MyBasket - Mini Checkout & Browser Test Suite

An e-commerce storefront, reactive shopping cart, 1-click checkout, and persistent order history application inspired by modern retail experiences. Built with pure **HTML5**, **CSS3**, **Vanilla JavaScript**, and automated with **Playwright End-to-End Browser Testing**.

---

## 🌟 Key Features

### 1. 🎨 Customer-Attracting Storefront & Custom Vector Logo
- **Custom Vector Logo**: Handcrafted gradient shopping basket with speed sparkle star and smile trajectory line.
- **Aurora Hero Banner**: Cyber-sapphire gradient with live **Deal of the Day** countdown ticker (`04h : 22m : 18s`) and discount highlights.
- **Vibrant Deal Badges**:
  - `Limited time deal` (Ruby Red gradient)
  - `Best Seller` (Sunset Orange gradient)
  - `MyBasket Choice` (Dark Slate)
- **Prime Delivery Tags**: Instant delivery estimates with `prime FREE Delivery Tomorrow, 8 PM`.
- **Authentic Star Ratings**: Customer review counts and star graphics.

### 2. 🗂️ Multi-Department Product Catalog (12 Real Products)
- **Electronics & Audio**: Sony WH-1000XM5 ANC Headphones Pro
- **Wearables**: Apex Horizon AMOLED Smartwatch with GPS
- **Peripherals**: Keychron K2 Pro Mechanical RGB Keyboard, Logitech MX Master 3S Mouse
- **Accessories & Lifestyle**: Anker 7-in-1 USB-C Hub, Hydro Flask 32oz Insulated Thermal Bottle
- **Kitchen & Dining**:
  - Ninja Air Fryer Max XL 5.5-Quart Digital Cooker
  - Instant Pot Duo 7-in-1 Electric Pressure Cooker 6Qt
  - De'Longhi Magnifica Compact Espresso & Coffee Machine
- **Furniture & Living**:
  - Ergonomic High-Back Executive Mesh Office Chair with Lumbar Support
  - Seville Classics Electric Dual-Motor Height-Adjustable Standing Desk (55")
  - Rustic Solid Oak Wood Coffee Table with Lower Shelf

### 3. 🔍 Smart Real-Time Search & Department Filtering
- Search across title, category, tags, and description.
- **Enter key support** & instant smooth auto-scroll to search results.
- **1-Click Search Clear** (`✕`) button.
- Subnav department quick filters (**Kitchen & Dining**, **Furniture & Home**, **Best Sellers**, **Today's Deals**, **Electronics**).

### 4. 🛒 Dynamic Shopping Cart & Calculations
- Live quantity adjustment (`+` / `-` steppers or direct input).
- Dynamic price calculations:
  - Line total per item
  - Cart subtotal
  - 8% Sales Tax
  - Free Prime shipping
  - Grand Order Total
- Header cart counter and live price pill updates.

### 5. 💳 Robust Checkout & Duplicate Order Lockout
- Form validation:
  - Required customer full name (minimum 2 characters).
  - Optional email address with RFC regex validation.
  - Quick address presets (**Home** / **Office**).
  - Payment method selection (**MyBasket Pay** / **Cash on Delivery**).
- **Duplicate Click Prevention**: Submit button immediately disables, shows animated spinner, and protects against rapid accidental double-clicks.

### 6. 📦 Persistent Order History ("Returns & Orders") & Shipment Tracking
- Stored permanently in browser `localStorage`.
- Order reference generator (e.g. `ORD-20261122-XXXX001`) with **1-click Copy to Clipboard**.
- **🔄 1-Click "Buy Again"**: Instantly re-adds items from any past order into the cart.
- **🚚 "Track Package"**: Interactive 4-step delivery progress timeline (`Ordered` ➔ `Packed` ➔ `Shipped` ➔ `Out for Delivery`).

---

## 🧪 Automated Browser Testing (Playwright)

Complete end-to-end test suite verifying all 9 core functional objectives across multiple browser engines:

```bash
# Run tests on Chrome
npx playwright test --project=chrome

# Run tests on Microsoft Edge
npx playwright test --project=edge
```

| # | Objective | Status |
|---|---|:---:|
| 1 | Page structure, branding & initial 12-item catalog | ✅ Passed |
| 2 | Add and remove products from shopping cart | ✅ Passed |
| 3 | Quantity steppers & dynamic line total recalculation | ✅ Passed |
| 4 | Tax (8%), shipping, and grand total calculations | ✅ Passed |
| 5 | Validation for required customer name, email format & empty cart | ✅ Passed |
| 6 | Order confirmation display & unique reference number generation | ✅ Passed |
| 7 | Duplicate order submission lockout under rapid multi-clicks | ✅ Passed |
| 8 | Real-time search, clear, and department filtering (Kitchen & Furniture) | ✅ Passed |
| 9 | Order History persistence, shipment tracking stepper & 1-click reorder | ✅ Passed |

---

## 🚀 Running Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/MURALI-13062005/MyBasket_find.git
   cd MyBasket_find
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local server**:
   ```bash
   node server.js
   ```

4. **Open in browser**:
   Visit [http://localhost:3000](http://localhost:3000)

---

## 💻 Tech Stack
- **Frontend**: HTML5, CSS3 (CSS Custom Properties & Flexbox/Grid), Vanilla JavaScript (ES6+)
- **Testing**: Playwright End-to-End Test Runner
- **Backend / Server**: Lightweight Node.js Static HTTP Server
