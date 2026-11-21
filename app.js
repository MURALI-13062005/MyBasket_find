/**
 * MyBasket Mini Checkout & Order History Demo
 * Core Application Logic, Reactive State & Interactive History
 */

(function () {
  'use strict';

  // --- Real Products Catalog with High Quality Imagery ---
  const PRODUCTS = [
    {
      id: 'prod-1',
      name: 'Sony WH-1000XM5 Wireless Headphones Pro',
      category: 'Audio',
      price: 59.99,
      originalPrice: 79.99,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',
      icon: '🎧',
      rating: 4.8,
      ratingCount: 3840,
      tag: 'Best Seller',
      prime: true,
      description: 'Industry-leading noise cancellation, crystal-clear hands-free calling, and 30-hour battery life with fast charge.'
    },
    {
      id: 'prod-2',
      name: 'Apex Horizon Smartwatch AMOLED Display with GPS',
      category: 'Wearables',
      price: 129.50,
      originalPrice: 169.99,
      discount: 24,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80',
      icon: '⌚',
      rating: 4.7,
      ratingCount: 1920,
      tag: 'MyBasket Choice',
      prime: true,
      description: 'Continuous heart-rate tracking, SpO2 sensor, built-in dual GPS, 5ATM water resistance, and 14-day battery.'
    },
    {
      id: 'prod-3',
      name: 'Keychron K2 Pro Mechanical RGB Keyboard',
      category: 'Peripherals',
      price: 89.00,
      originalPrice: 109.00,
      discount: 18,
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=80',
      icon: '⌨️',
      rating: 4.9,
      ratingCount: 4210,
      tag: 'Popular',
      prime: true,
      description: 'Hot-swappable tactile mechanical switches with per-key dynamic south-facing RGB backlighting and Bluetooth 5.1.'
    },
    {
      id: 'prod-4',
      name: 'Logitech MX Master 3S Ergonomic Vertical Mouse',
      category: 'Peripherals',
      price: 39.99,
      originalPrice: 49.99,
      discount: 20,
      image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=80',
      icon: '🖱️',
      rating: 4.8,
      ratingCount: 5630,
      tag: 'Ergo Choice',
      prime: true,
      description: 'Quiet clicks, 8K DPI track-on-glass sensor, electromagnetic scroll wheel, and ergonomic sculpted thumb rest.'
    },
    {
      id: 'prod-5',
      name: 'Anker PowerExpand 7-in-1 USB-C Hub 4K HDMI Adapter',
      category: 'Accessories',
      price: 29.99,
      originalPrice: 39.99,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80',
      icon: '🔌',
      rating: 4.6,
      ratingCount: 2180,
      tag: 'MyBasket Basics',
      prime: true,
      description: '4K@60Hz HDMI video output, 100W Power Delivery pass-through, SD/microSD card reader, and 3x USB 3.0 ports.'
    },
    {
      id: 'prod-6',
      name: 'Hydro Flask Stainless Steel Insulated Thermal Bottle 32oz',
      category: 'Lifestyle',
      price: 19.50,
      originalPrice: 28.00,
      discount: 30,
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=80',
      icon: '🧊',
      rating: 4.7,
      ratingCount: 1470,
      tag: 'Eco Friendly',
      prime: true,
      description: 'TempShield double-wall vacuum insulation keeps beverages cold up to 24 hours or piping hot up to 12 hours.'
    },
    {
      id: 'prod-7',
      name: 'Ninja Air Fryer Max XL 5.5-Quart Digital Cooker',
      category: 'Kitchen',
      price: 99.99,
      originalPrice: 139.99,
      discount: 28,
      image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&auto=format&fit=crop&q=80',
      icon: '🍳',
      rating: 4.8,
      ratingCount: 6540,
      tag: 'Best Seller',
      prime: true,
      description: 'Cook crisp meals with up to 75% less fat. 7 versatile cooking programs, max crisp technology, and dishwasher-safe basket.'
    },
    {
      id: 'prod-8',
      name: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker 6Qt',
      category: 'Kitchen',
      price: 79.99,
      originalPrice: 109.99,
      discount: 27,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80',
      icon: '🍲',
      rating: 4.7,
      ratingCount: 8920,
      tag: 'MyBasket Choice',
      prime: true,
      description: 'Combines 7 kitchen appliances in one: pressure cooker, slow cooker, rice cooker, steamer, sauté pan, and warmer.'
    },
    {
      id: 'prod-9',
      name: 'DeLonghi Magnifica Compact Espresso & Coffee Machine',
      category: 'Kitchen',
      price: 159.00,
      originalPrice: 219.00,
      discount: 27,
      image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&auto=format&fit=crop&q=80',
      icon: '☕',
      rating: 4.9,
      ratingCount: 3150,
      tag: 'Popular',
      prime: true,
      description: 'Freshly ground beans with 15-bar professional pressure, integrated manual frother, and custom drink size presets.'
    },
    {
      id: 'prod-10',
      name: 'Ergonomic High-Back Executive Mesh Office Chair',
      category: 'Furniture',
      price: 189.99,
      originalPrice: 249.99,
      discount: 24,
      image: 'https://images.unsplash.com/photo-1580481077195-c22ae00e0083?w=500&auto=format&fit=crop&q=80',
      icon: '🪑',
      rating: 4.8,
      ratingCount: 4120,
      tag: 'Best Seller',
      prime: true,
      description: 'Breathable 3D mesh backrest, adjustable 3D armrests, dynamic lumbar support, tilt-lock mechanism, and heavy-duty nylon base.'
    },
    {
      id: 'prod-11',
      name: 'Electric Dual-Motor Height Adjustable Standing Desk 55in',
      category: 'Furniture',
      price: 249.00,
      originalPrice: 329.00,
      discount: 24,
      image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500&auto=format&fit=crop&q=80',
      icon: '🏢',
      rating: 4.8,
      ratingCount: 2740,
      tag: 'Featured',
      prime: true,
      description: 'Solid wooden tabletop with dual whisper-quiet motors, anti-collision sensor, and 4 programmable memory height presets.'
    },
    {
      id: 'prod-12',
      name: 'Rustic Solid Oak Wood Coffee Table with Lower Shelf',
      category: 'Furniture',
      price: 119.50,
      originalPrice: 159.00,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&auto=format&fit=crop&q=80',
      icon: '🛋️',
      rating: 4.6,
      ratingCount: 1890,
      tag: 'Top Rated',
      prime: true,
      description: 'Handcrafted natural oak finish with sturdy matte steel frame, open lower shelf for books and remotes, water-resistant surface.'
    }
  ];

  const STORAGE_KEY = 'mybasket_mini_orders';

  // --- Reactive Application State ---
  const state = {
    products: PRODUCTS,
    cart: [], // Array of { id, name, price, originalPrice, image, icon, quantity }
    taxRate: 0.08, // 8% sales tax
    shippingFee: 0.00, // Free shipping
    isSubmitting: false,
    orderCount: 0,
    lastOrder: null,
    currency: 'USD', // 'USD' or 'INR'
    currencyRate: 83.0, // 1 USD = 83 INR
    ordersHistory: []
  };

  // Expose state globally for Playwright test assertions
  window.__APP_STATE__ = state;

  // --- DOM Elements Cache ---
  const elements = {
    productsGrid: document.getElementById('productsGrid'),
    resultsCount: document.getElementById('resultsCount'),
    searchInput: document.getElementById('searchInput'),
    searchBtn: document.getElementById('searchBtn'),
    categoryFilter: document.getElementById('categoryFilter'),
    currencyToggleBtn: document.getElementById('currencyToggleBtn'),
    currencyFlag: document.getElementById('currencyFlag'),
    currencyCode: document.getElementById('currencyCode'),

    // Cart Elements
    headerCartCount: document.getElementById('headerCartCount'),
    headerCartTotal: document.getElementById('headerCartTotal'),
    clearCartBtn: document.getElementById('clearCartBtn'),
    cartAlert: document.getElementById('cartAlert'),
    cartAlertMessage: document.getElementById('cartAlertMessage'),
    cartEmptyState: document.getElementById('cartEmptyState'),
    cartItemsList: document.getElementById('cartItemsList'),
    cartSummarySection: document.getElementById('cartSummarySection'),
    cartItemCountLabel: document.getElementById('cartItemCountLabel'),
    cartSubtotal: document.getElementById('cartSubtotal'),
    cartTax: document.getElementById('cartTax'),
    cartShipping: document.getElementById('cartShipping'),
    cartTotal: document.getElementById('cartTotal'),

    // Checkout Form
    checkoutForm: document.getElementById('checkoutForm'),
    customerName: document.getElementById('customerName'),
    customerEmail: document.getElementById('customerEmail'),
    customerAddress: document.getElementById('customerAddress'),
    nameError: document.getElementById('nameError'),
    emailError: document.getElementById('emailError'),
    placeOrderBtn: document.getElementById('placeOrderBtn'),
    btnSpinner: document.getElementById('btnSpinner'),
    btnText: document.getElementById('btnText'),

    // Order Confirmation Modal
    orderConfirmationModal: document.getElementById('orderConfirmationModal'),
    confirmCustomerName: document.getElementById('confirmCustomerName'),
    confirmOrderRef: document.getElementById('confirmOrderRef'),
    confirmOrderDate: document.getElementById('confirmOrderDate'),
    confirmItemsList: document.getElementById('confirmItemsList'),
    confirmTotalPaid: document.getElementById('confirmTotalPaid'),
    newOrderBtn: document.getElementById('newOrderBtn'),
    copyRefBtn: document.getElementById('copyRefBtn'),
    copyRefText: document.getElementById('copyRefText'),
    openHistoryFromModalBtn: document.getElementById('openHistoryFromModalBtn'),

    // Order History Modal
    ordersNavBtn: document.getElementById('ordersNavBtn'),
    historyCountBadge: document.getElementById('historyCountBadge'),
    orderHistoryModal: document.getElementById('orderHistoryModal'),
    closeHistoryBtn: document.getElementById('closeHistoryBtn'),
    clearHistoryBtn: document.getElementById('clearHistoryBtn'),
    ordersHistoryList: document.getElementById('ordersHistoryList'),
    historyEmptyState: document.getElementById('historyEmptyState'),
    startShoppingHistoryBtn: document.getElementById('startShoppingHistoryBtn'),
    viewHistoryBannerBtn: document.getElementById('viewHistoryBannerBtn'),
    subnavHistoryLink: document.getElementById('subnavHistoryLink'),

    // Tracking Modal
    trackingModal: document.getElementById('trackingModal'),
    trackingRefDisplay: document.getElementById('trackingRefDisplay'),
    closeTrackingBtn: document.getElementById('closeTrackingBtn'),
    dismissTrackingBtn: document.getElementById('dismissTrackingBtn'),

    // General
    toastContainer: document.getElementById('toastContainer'),
    backToTopBtn: document.getElementById('backToTopBtn')
  };

  // --- Utility Formatting Helpers ---
  const formatCurrency = (amountInUSD) => {
    if (state.currency === 'INR') {
      const inrAmount = Number(amountInUSD) * state.currencyRate;
      return '₹' + inrAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return '$' + Number(amountInUSD).toFixed(2);
  };

  const generateOrderReference = () => {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const countSeq = String(state.orderCount + 1).padStart(3, '0');
    return `ORD-${dateStr}-${randomHex}${countSeq}`;
  };

  const getFormattedDate = (dateObj = new Date()) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return dateObj.toLocaleDateString('en-US', options);
  };

  // --- Calculation Engine ---
  const calculateTotals = () => {
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal > 0 ? +(subtotal * state.taxRate).toFixed(2) : 0;
    const shipping = subtotal > 0 ? state.shippingFee : 0;
    const total = subtotal + tax + shipping;
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);

    return {
      subtotal,
      tax,
      shipping,
      total,
      totalItems
    };
  };

  // --- Toast Notifications ---
  const showToast = (message, type = 'info') => {
    if (!elements.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span>${type === 'success' ? '✓' : 'ℹ'}</span> <span>${message}</span>`;
    elements.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      setTimeout(() => toast.remove(), 250);
    }, 2800);
  };

  // --- Render Products Catalog ---
  const renderProducts = (productsToRender = state.products) => {
    if (!elements.productsGrid) return;

    if (productsToRender.length === 0) {
      elements.productsGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px; background: #fff; border-radius: 8px;">
          <p style="font-size: 16px; color: #555;">No products match your search criteria.</p>
          <button type="button" class="btn-amz-secondary" style="margin-top: 12px;" id="resetFilterBtn">View All Products</button>
        </div>
      `;
      const resetBtn = document.getElementById('resetFilterBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          if (elements.searchInput) elements.searchInput.value = '';
          if (elements.categoryFilter) elements.categoryFilter.value = 'all';
          renderProducts(state.products);
          updateResultsCount(state.products.length);
        });
      }
      return;
    }

    elements.productsGrid.innerHTML = productsToRender.map(product => {
      const stars = '★'.repeat(Math.floor(product.rating)) + (product.rating % 1 >= 0.5 ? '½' : '');
      const badgeClass = product.tag.includes('Best') ? 'best-seller' : 'amazon-choice';

      return `
        <article class="product-card" data-testid="product-card-${product.id}" id="${product.id}">
          <div class="product-image-wrap">
            <img src="${product.image}" alt="${product.name}" class="product-real-img" loading="eager" referrerpolicy="no-referrer">
            <span class="product-tag-badge ${badgeClass}">${product.tag}</span>
          </div>
          <div class="product-body">
            <span class="product-category-label">${product.category}</span>
            <h3 class="product-title" title="${product.name}">${product.name}</h3>
            
            <div class="product-rating-row">
              <span class="stars-graphic">${stars}</span>
              <span class="ratings-count">(${product.ratingCount.toLocaleString()})</span>
            </div>

            <p class="product-desc">${product.description}</p>
            
            <div class="product-pricing-wrap">
              <span class="deal-header-tag">Limited time deal</span>
              <div class="price-row">
                <span class="discount-pill">-${product.discount}%</span>
                <div class="product-price" data-testid="product-price-${product.id}">
                  <span class="product-price-currency">${state.currency === 'INR' ? '₹' : '$'}</span>${state.currency === 'INR' ? (product.price * state.currencyRate).toFixed(2) : product.price.toFixed(2)}
                </div>
                <span class="original-mrp">${formatCurrency(product.originalPrice)}</span>
              </div>

              <div class="prime-delivery-notice">
                <span class="prime-badge-tag">prime</span>
                <span class="delivery-date">FREE Delivery <strong>Tomorrow, 8 PM</strong></span>
              </div>

              <div class="stock-status-green">✓ In stock</div>

              <button 
                type="button" 
                class="btn-add-cart" 
                data-testid="add-to-cart-${product.id}"
                data-id="${product.id}"
                aria-label="Add ${product.name} to cart"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach click events
    elements.productsGrid.querySelectorAll('.btn-add-cart').forEach(button => {
      button.addEventListener('click', (e) => {
        const productId = e.currentTarget.getAttribute('data-id');
        addToCart(productId);

        const btn = e.currentTarget;
        const orig = btn.innerHTML;
        btn.classList.add('added');
        btn.innerHTML = `✓ Added to Cart`;
        setTimeout(() => {
          btn.classList.remove('added');
          btn.innerHTML = orig;
        }, 900);
      });
    });
  };

  const updateResultsCount = (count) => {
    if (elements.resultsCount) {
      elements.resultsCount.textContent = `Showing ${count} product${count === 1 ? '' : 's'}`;
    }
  };

  // --- Filtering & Search ---
  const applyFilters = (shouldScroll = false) => {
    const rawQuery = (elements.searchInput?.value || '').trim();
    const query = rawQuery.toLowerCase();
    const dept = elements.categoryFilter?.value || 'all';

    // Show or hide clear button
    const clearBtn = document.getElementById('searchClearBtn');
    if (clearBtn) {
      clearBtn.style.display = rawQuery ? 'flex' : 'none';
    }

    let filtered = state.products.filter(p => {
      const matchDept = (dept === 'all' || p.category.toLowerCase() === dept.toLowerCase());
      const matchQuery = !query || 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.tag.toLowerCase().includes(query);
      return matchDept && matchQuery;
    });

    // If query was typed but nothing found in selected department, search all departments
    if (filtered.length === 0 && query && dept !== 'all') {
      filtered = state.products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
      if (filtered.length > 0) {
        showToast(`Showing results for "${rawQuery}" in All Departments`, 'info');
      }
    }

    renderProducts(filtered);
    updateResultsCount(filtered.length);

    if (shouldScroll && elements.productsGrid) {
      elements.productsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // --- Cart Operations ---
  const addToCart = (productId) => {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    const existing = state.cart.find(item => item.id === productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      state.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        icon: product.icon,
        quantity: 1
      });
    }

    renderCart();
    showToast(`Added "${product.name.slice(0, 24)}..." to Cart`, 'success');
  };

  const updateQuantity = (productId, newQty) => {
    const itemIndex = state.cart.findIndex(i => i.id === productId);
    if (itemIndex === -1) return;

    const qty = parseInt(newQty, 10);
    if (isNaN(qty) || qty <= 0) {
      removeFromCart(productId);
      return;
    }

    state.cart[itemIndex].quantity = Math.min(qty, 99);
    renderCart();
  };

  const removeFromCart = (productId) => {
    const item = state.cart.find(i => i.id === productId);
    state.cart = state.cart.filter(i => i.id !== productId);
    renderCart();
    if (item) {
      showToast(`Removed "${item.name.slice(0, 20)}..." from Cart`);
    }
  };

  const clearCart = () => {
    state.cart = [];
    renderCart();
    showToast('Shopping cart cleared');
  };

  const hideCartError = () => {
    if (elements.cartAlert) {
      elements.cartAlert.style.display = 'none';
    }
  };

  const showCartError = (message) => {
    if (elements.cartAlert && elements.cartAlertMessage) {
      elements.cartAlertMessage.textContent = message;
      elements.cartAlert.style.display = 'flex';
    }
  };

  // --- Render Cart UI ---
  const renderCart = () => {
    const totals = calculateTotals();

    // Update Header Counter
    if (elements.headerCartCount) elements.headerCartCount.textContent = totals.totalItems;
    if (elements.headerCartTotal) elements.headerCartTotal.textContent = formatCurrency(totals.total);
    if (elements.cartItemCountLabel) elements.cartItemCountLabel.textContent = `${totals.totalItems} item${totals.totalItems === 1 ? '' : 's'}`;

    // Update Place Order Button Text
    if (!state.isSubmitting && elements.btnText) {
      elements.btnText.textContent = `Place Order (${formatCurrency(totals.total)})`;
    }

    // Toggle Empty vs Active View
    if (state.cart.length === 0) {
      if (elements.cartEmptyState) elements.cartEmptyState.style.display = 'block';
      if (elements.cartItemsList) elements.cartItemsList.style.display = 'none';
      if (elements.cartSummarySection) elements.cartSummarySection.style.display = 'none';
      if (elements.clearCartBtn) elements.clearCartBtn.style.display = 'none';
      return;
    }

    if (elements.cartEmptyState) elements.cartEmptyState.style.display = 'none';
    if (elements.cartItemsList) elements.cartItemsList.style.display = 'flex';
    if (elements.cartSummarySection) elements.cartSummarySection.style.display = 'block';
    if (elements.clearCartBtn) elements.clearCartBtn.style.display = 'inline-block';

    hideCartError();

    // Render Cart Items
    elements.cartItemsList.innerHTML = state.cart.map(item => {
      const lineTotal = item.price * item.quantity;
      return `
        <div class="cart-item" data-testid="cart-item-${item.id}">
          <div class="cart-item-img-wrap">
            <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
          </div>
          <div class="cart-item-details">
            <div class="cart-item-name" title="${item.name}">${item.name}</div>
            <div class="cart-item-unit-price">${formatCurrency(item.price)} each</div>
            <div class="qty-stepper">
              <button 
                type="button" 
                class="btn-qty" 
                data-testid="qty-decrease-${item.id}"
                data-id="${item.id}"
                data-action="decrease"
                aria-label="Decrease quantity"
              >-</button>
              <input 
                type="number" 
                class="qty-input" 
                data-testid="item-qty-${item.id}"
                data-id="${item.id}"
                value="${item.quantity}"
                min="1"
                max="99"
                aria-label="Quantity for ${item.name}"
              >
              <button 
                type="button" 
                class="btn-qty" 
                data-testid="qty-increase-${item.id}"
                data-id="${item.id}"
                data-action="increase"
                aria-label="Increase quantity"
              >+</button>
            </div>
          </div>
          <div class="cart-item-actions">
            <span class="cart-item-line-total" data-testid="item-line-total-${item.id}">${formatCurrency(lineTotal)}</span>
            <button 
              type="button" 
              class="btn-item-remove" 
              data-testid="item-remove-${item.id}"
              data-id="${item.id}"
              aria-label="Remove ${item.name}"
            >Delete</button>
          </div>
        </div>
      `;
    }).join('');

    // Summary Totals
    if (elements.cartSubtotal) elements.cartSubtotal.textContent = formatCurrency(totals.subtotal);
    if (elements.cartTax) elements.cartTax.textContent = formatCurrency(totals.tax);
    if (elements.cartShipping) elements.cartShipping.textContent = totals.shipping === 0 ? 'Free' : formatCurrency(totals.shipping);
    if (elements.cartTotal) elements.cartTotal.textContent = formatCurrency(totals.total);

    // Event listeners on Cart Item controls
    elements.cartItemsList.querySelectorAll('.btn-qty').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const action = e.currentTarget.getAttribute('data-action');
        const item = state.cart.find(i => i.id === id);
        if (!item) return;
        const newQty = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
        updateQuantity(id, newQty);
      });
    });

    elements.cartItemsList.querySelectorAll('.qty-input').forEach(input => {
      input.addEventListener('change', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        updateQuantity(id, e.currentTarget.value);
      });
    });

    elements.cartItemsList.querySelectorAll('.btn-item-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        removeFromCart(id);
      });
    });
  };

  // --- Form Validation ---
  const validateName = (name) => {
    const trimmed = name.trim();
    if (!trimmed) {
      return { isValid: false, message: 'Customer name is required.' };
    }
    if (trimmed.length < 2) {
      return { isValid: false, message: 'Customer name must be at least 2 characters long.' };
    }
    return { isValid: true };
  };

  const validateEmail = (email) => {
    const trimmed = email.trim();
    if (!trimmed) {
      return { isValid: true };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      return { isValid: false, message: 'Please enter a valid email address (e.g. name@domain.com).' };
    }
    return { isValid: true };
  };

  const setFieldError = (inputEl, errorEl, message) => {
    if (inputEl) inputEl.classList.add('input-error');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.style.display = 'block';
    }
  };

  const clearFieldError = (inputEl, errorEl) => {
    if (inputEl) inputEl.classList.remove('input-error');
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.style.display = 'none';
    }
  };

  // --- Order History LocalStorage Management ---
  const loadOrdersHistory = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        state.ordersHistory = JSON.parse(stored);
      } else {
        state.ordersHistory = [];
      }
    } catch (e) {
      console.warn('Failed to load orders from localStorage:', e);
      state.ordersHistory = [];
    }
    updateHistoryBadge();
  };

  const saveOrderToHistory = (order) => {
    state.ordersHistory.unshift(order);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.ordersHistory));
    } catch (e) {
      console.warn('Failed to save order to localStorage:', e);
    }
    updateHistoryBadge();
  };

  const updateHistoryBadge = () => {
    if (elements.historyCountBadge) {
      elements.historyCountBadge.textContent = state.ordersHistory.length;
    }
  };

  const renderOrdersHistory = () => {
    if (!elements.ordersHistoryList || !elements.historyEmptyState) return;

    if (state.ordersHistory.length === 0) {
      elements.historyEmptyState.style.display = 'block';
      elements.ordersHistoryList.style.display = 'none';
      return;
    }

    elements.historyEmptyState.style.display = 'none';
    elements.ordersHistoryList.style.display = 'flex';

    elements.ordersHistoryList.innerHTML = state.ordersHistory.map(order => {
      const itemsHtml = order.items.map(item => `
        <div class="order-history-item">
          <img src="${item.image}" alt="${item.name}" class="order-item-img">
          <div class="order-item-info">
            <span class="order-item-name">${item.name}</span>
            <span class="order-item-meta">Qty: ${item.quantity} &bull; ${formatCurrency(item.price)} each</span>
          </div>
          <div class="order-actions-col">
            <button 
              type="button" 
              class="btn-buy-again" 
              data-order-id="${order.reference}"
              data-prod-id="${item.id}"
            >
              🔄 Buy again
            </button>
          </div>
        </div>
      `).join('');

      return `
        <div class="order-history-card" data-order-ref="${order.reference}">
          <div class="order-card-header">
            <div class="order-header-col">
              <span class="order-header-label">Order Placed</span>
              <span class="order-header-val">${order.date}</span>
            </div>
            <div class="order-header-col">
              <span class="order-header-label">Total</span>
              <span class="order-header-val">${formatCurrency(order.total)}</span>
            </div>
            <div class="order-header-col">
              <span class="order-header-label">Ship To</span>
              <span class="order-header-val">${order.customerName}</span>
            </div>
            <div class="order-header-col" style="margin-left: auto;">
              <span class="order-header-label">Order #</span>
              <span class="order-header-val">${order.reference}</span>
            </div>
          </div>
          <div class="order-card-body">
            <div class="order-delivery-status">
              <span>✓ Arriving Tomorrow by 8 PM</span>
              <button 
                type="button" 
                class="btn-track-package" 
                data-ref="${order.reference}" 
                style="margin-left: auto;"
              >
                Track package
              </button>
            </div>
            <div class="order-items-grid">
              ${itemsHtml}
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach Buy Again events
    elements.ordersHistoryList.querySelectorAll('.btn-buy-again').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const prodId = e.currentTarget.getAttribute('data-prod-id');
        addToCart(prodId);
        showToast('Item added back to your cart!', 'success');
        elements.orderHistoryModal.style.display = 'none';
      });
    });

    // Attach Track Package events
    elements.ordersHistoryList.querySelectorAll('.btn-track-package').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const ref = e.currentTarget.getAttribute('data-ref');
        openTrackingModal(ref);
      });
    });
  };

  const openTrackingModal = (ref) => {
    if (elements.trackingRefDisplay) elements.trackingRefDisplay.textContent = `Tracking Order: ${ref}`;
    if (elements.trackingModal) elements.trackingModal.style.display = 'flex';
  };

  // --- Order Submission Handler ---
  const handleCheckoutSubmit = (e) => {
    e.preventDefault();

    // Prevent duplicate orders
    if (state.isSubmitting) {
      console.warn('Order submission already in progress. Duplicate click ignored.');
      return;
    }

    // Step 1: Check if cart is empty
    if (state.cart.length === 0) {
      showCartError('Your cart is empty. Please add items to proceed.');
      return;
    }

    // Step 2: Validate customer name
    const nameVal = elements.customerName.value;
    const nameValidation = validateName(nameVal);
    if (!nameValidation.isValid) {
      setFieldError(elements.customerName, elements.nameError, nameValidation.message);
      elements.customerName.focus();
      return;
    } else {
      clearFieldError(elements.customerName, elements.nameError);
    }

    // Step 3: Validate customer email (optional)
    const emailVal = elements.customerEmail.value;
    const emailValidation = validateEmail(emailVal);
    if (!emailValidation.isValid) {
      setFieldError(elements.customerEmail, elements.emailError, emailValidation.message);
      elements.customerEmail.focus();
      return;
    } else {
      clearFieldError(elements.customerEmail, elements.emailError);
    }

    // Lock submission state
    state.isSubmitting = true;
    elements.placeOrderBtn.disabled = true;
    if (elements.btnSpinner) elements.btnSpinner.style.display = 'inline-block';
    if (elements.btnText) elements.btnText.textContent = 'Processing Order...';

    // Calculate Final Order Data
    const totals = calculateTotals();
    const orderRef = generateOrderReference();
    const orderDate = getFormattedDate();

    const orderData = {
      reference: orderRef,
      customerName: nameVal.trim(),
      customerEmail: emailVal.trim(),
      customerAddress: elements.customerAddress ? elements.customerAddress.value : '',
      items: JSON.parse(JSON.stringify(state.cart)),
      subtotal: totals.subtotal,
      tax: totals.tax,
      shipping: totals.shipping,
      total: totals.total,
      currency: state.currency,
      date: orderDate,
      timestamp: Date.now()
    };

    // Increment order count
    state.orderCount += 1;
    state.lastOrder = orderData;

    // Save to permanent history
    saveOrderToHistory(orderData);

    // Simulate payment / network turnaround
    setTimeout(() => {
      displayOrderConfirmation(orderData);

      // Reset cart and form
      state.cart = [];
      renderCart();
      elements.checkoutForm.reset();

      // Reset submission lock
      state.isSubmitting = false;
      elements.placeOrderBtn.disabled = false;
      if (elements.btnSpinner) elements.btnSpinner.style.display = 'none';
      if (elements.btnText) elements.btnText.textContent = `Place Order (${formatCurrency(0)})`;

      showToast(`Order ${orderRef} confirmed!`, 'success');
    }, 400);
  };

  // --- Display Confirmation Modal ---
  const displayOrderConfirmation = (order) => {
    if (elements.confirmCustomerName) elements.confirmCustomerName.textContent = order.customerName;
    if (elements.confirmOrderRef) elements.confirmOrderRef.textContent = order.reference;
    if (elements.confirmOrderDate) elements.confirmOrderDate.textContent = `Placed on ${order.date}`;
    if (elements.confirmTotalPaid) elements.confirmTotalPaid.textContent = formatCurrency(order.total);

    if (elements.confirmItemsList) {
      elements.confirmItemsList.innerHTML = order.items.map(item => `
        <div class="purchased-item-row">
          <span>${item.quantity}x ${item.name}</span>
          <span style="font-weight: 600;">${formatCurrency(item.price * item.quantity)}</span>
        </div>
      `).join('');
    }

    if (elements.orderConfirmationModal) {
      elements.orderConfirmationModal.style.display = 'flex';
    }
  };

  const closeConfirmationModal = () => {
    if (elements.orderConfirmationModal) {
      elements.orderConfirmationModal.style.display = 'none';
    }
  };

  // --- Initial Setup and Event Bindings ---
  const init = () => {
    // 1. Load Orders History
    loadOrdersHistory();

    // 2. Render initial product catalog
    renderProducts();
    updateResultsCount(state.products.length);

    // 3. Render initial empty cart
    renderCart();

    // 4. Search and Category Filter Listeners
    if (elements.searchInput) {
      elements.searchInput.addEventListener('input', () => applyFilters(false));
      elements.searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          applyFilters(true);
        }
      });
    }
    if (elements.searchBtn) {
      elements.searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        applyFilters(true);
      });
    }
    const clearSearchBtn = document.getElementById('searchClearBtn');
    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        if (elements.searchInput) elements.searchInput.value = '';
        applyFilters(false);
        elements.searchInput?.focus();
      });
    }
    if (elements.categoryFilter) {
      elements.categoryFilter.addEventListener('change', () => applyFilters(true));
    }

    // 4b. Subnav Category Filter Buttons
    document.getElementById('subnavAllBtn')?.addEventListener('click', () => {
      if (elements.searchInput) elements.searchInput.value = '';
      if (elements.categoryFilter) elements.categoryFilter.value = 'all';
      applyFilters(true);
      showToast('Showing all categories', 'info');
    });

    document.getElementById('subnavKitchenBtn')?.addEventListener('click', () => {
      if (elements.searchInput) elements.searchInput.value = '';
      if (elements.categoryFilter) elements.categoryFilter.value = 'Kitchen';
      applyFilters(true);
      showToast('Filtered to Kitchen & Dining', 'info');
    });

    document.getElementById('subnavFurnitureBtn')?.addEventListener('click', () => {
      if (elements.searchInput) elements.searchInput.value = '';
      if (elements.categoryFilter) elements.categoryFilter.value = 'Furniture';
      applyFilters(true);
      showToast('Filtered to Furniture & Home', 'info');
    });

    document.getElementById('subnavBestSellersBtn')?.addEventListener('click', () => {
      if (elements.searchInput) elements.searchInput.value = '';
      if (elements.categoryFilter) elements.categoryFilter.value = 'all';
      const bestSellers = state.products.filter(p => p.tag.toLowerCase().includes('best'));
      renderProducts(bestSellers);
      updateResultsCount(bestSellers.length);
      elements.productsGrid?.scrollIntoView({ behavior: 'smooth' });
      showToast('Showing Best Sellers', 'info');
    });

    document.getElementById('subnavDealsBtn')?.addEventListener('click', () => {
      if (elements.searchInput) elements.searchInput.value = '';
      if (elements.categoryFilter) elements.categoryFilter.value = 'all';
      const deals = state.products.filter(p => p.discount >= 25);
      renderProducts(deals);
      updateResultsCount(deals.length);
      elements.productsGrid?.scrollIntoView({ behavior: 'smooth' });
      showToast('Showing Today\'s Deals', 'info');
    });

    document.getElementById('subnavElectronicsBtn')?.addEventListener('click', () => {
      if (elements.searchInput) elements.searchInput.value = '';
      if (elements.categoryFilter) elements.categoryFilter.value = 'Peripherals';
      const electronics = state.products.filter(p => ['Audio', 'Peripherals', 'Wearables', 'Accessories'].includes(p.category));
      renderProducts(electronics);
      updateResultsCount(electronics.length);
      elements.productsGrid?.scrollIntoView({ behavior: 'smooth' });
      showToast('Showing Electronics & Gadgets', 'info');
    });

    // 5. Currency Toggle ($ USD <-> ₹ INR)
    if (elements.currencyToggleBtn) {
      elements.currencyToggleBtn.addEventListener('click', () => {
        if (state.currency === 'USD') {
          state.currency = 'INR';
          if (elements.currencyFlag) elements.currencyFlag.textContent = '🇮🇳';
          if (elements.currencyCode) elements.currencyCode.textContent = 'INR (₹)';
        } else {
          state.currency = 'USD';
          if (elements.currencyFlag) elements.currencyFlag.textContent = '🇺🇸';
          if (elements.currencyCode) elements.currencyCode.textContent = 'USD ($)';
        }
        applyFilters();
        renderCart();
        showToast(`Currency changed to ${state.currency}`, 'info');
      });
    }

    // 6. Real-time form field validations
    if (elements.customerName) {
      elements.customerName.addEventListener('input', () => {
        const res = validateName(elements.customerName.value);
        if (res.isValid) {
          clearFieldError(elements.customerName, elements.nameError);
        }
      });
    }

    if (elements.customerEmail) {
      elements.customerEmail.addEventListener('input', () => {
        const res = validateEmail(elements.customerEmail.value);
        if (res.isValid) {
          clearFieldError(elements.customerEmail, elements.emailError);
        }
      });
    }

    // 7. Clear Cart Button
    if (elements.clearCartBtn) {
      elements.clearCartBtn.addEventListener('click', clearCart);
    }

    // 8. Form Submission
    if (elements.checkoutForm) {
      elements.checkoutForm.addEventListener('submit', handleCheckoutSubmit);
    }

    // 9. Modal Reset Buttons
    if (elements.newOrderBtn) {
      elements.newOrderBtn.addEventListener('click', () => {
        closeConfirmationModal();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // 10. Copy Reference Number
    if (elements.copyRefBtn) {
      elements.copyRefBtn.addEventListener('click', () => {
        const ref = elements.confirmOrderRef?.textContent || '';
        navigator.clipboard.writeText(ref).then(() => {
          if (elements.copyRefText) elements.copyRefText.textContent = 'Copied!';
          setTimeout(() => {
            if (elements.copyRefText) elements.copyRefText.textContent = 'Copy';
          }, 1500);
        }).catch(() => {
          if (elements.copyRefText) elements.copyRefText.textContent = 'Copied!';
        });
      });
    }

    // 11. Order History Navigation and Modals
    const openHistory = () => {
      renderOrdersHistory();
      if (elements.orderHistoryModal) elements.orderHistoryModal.style.display = 'flex';
    };

    if (elements.ordersNavBtn) elements.ordersNavBtn.addEventListener('click', openHistory);
    if (elements.viewHistoryBannerBtn) elements.viewHistoryBannerBtn.addEventListener('click', openHistory);
    if (elements.subnavHistoryLink) elements.subnavHistoryLink.addEventListener('click', (e) => {
      e.preventDefault();
      openHistory();
    });
    if (elements.openHistoryFromModalBtn) {
      elements.openHistoryFromModalBtn.addEventListener('click', () => {
        closeConfirmationModal();
        openHistory();
      });
    }

    if (elements.closeHistoryBtn) {
      elements.closeHistoryBtn.addEventListener('click', () => {
        elements.orderHistoryModal.style.display = 'none';
      });
    }

    if (elements.startShoppingHistoryBtn) {
      elements.startShoppingHistoryBtn.addEventListener('click', () => {
        elements.orderHistoryModal.style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    if (elements.clearHistoryBtn) {
      elements.clearHistoryBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear your order history?')) {
          state.ordersHistory = [];
          localStorage.removeItem(STORAGE_KEY);
          updateHistoryBadge();
          renderOrdersHistory();
          showToast('Order history cleared');
        }
      });
    }

    // 12. Tracking Modal Handlers
    if (elements.closeTrackingBtn) {
      elements.closeTrackingBtn.addEventListener('click', () => {
        elements.trackingModal.style.display = 'none';
      });
    }
    if (elements.dismissTrackingBtn) {
      elements.dismissTrackingBtn.addEventListener('click', () => {
        elements.trackingModal.style.display = 'none';
      });
    }

    // 13. Address Quick Pills
    document.querySelectorAll('.btn-address-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        document.querySelectorAll('.btn-address-pill').forEach(p => p.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const addr = e.currentTarget.getAttribute('data-addr');
        if (elements.customerAddress && addr) {
          elements.customerAddress.value = addr;
        }
      });
    });

    // 14. Payment Method radio card toggle
    document.querySelectorAll('.payment-card input[type="radio"]').forEach(radio => {
      radio.addEventListener('change', () => {
        document.querySelectorAll('.payment-card').forEach(c => c.classList.remove('selected'));
        radio.closest('.payment-card')?.classList.add('selected');
      });
    });

    // 15. Back to Top
    if (elements.backToTopBtn) {
      elements.backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // 16. Hero Deal Countdown Timer
    const dealTimerEl = document.getElementById('dealTimer');
    if (dealTimerEl) {
      let secondsRemaining = 15738;
      setInterval(() => {
        secondsRemaining = Math.max(0, secondsRemaining - 1);
        const h = String(Math.floor(secondsRemaining / 3600)).padStart(2, '0');
        const m = String(Math.floor((secondsRemaining % 3600) / 60)).padStart(2, '0');
        const s = String(secondsRemaining % 60).padStart(2, '0');
        dealTimerEl.textContent = `${h}h : ${m}m : ${s}s`;
      }, 1000);
    }

    // Close modals on escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (elements.orderConfirmationModal) elements.orderConfirmationModal.style.display = 'none';
        if (elements.orderHistoryModal) elements.orderHistoryModal.style.display = 'none';
        if (elements.trackingModal) elements.trackingModal.style.display = 'none';
      }
    });
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
