document.addEventListener('DOMContentLoaded', () => {
  const cartManager = new CartManager(STORAGE_KEY_CART);

  // DOM Elements
  const cartToggleBtn = document.getElementById('cart-toggle');
  const cartDrawerEl = document.getElementById('cart-drawer');
  const cartCloseBtn = document.getElementById('cart-close');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalEl = document.getElementById('cart-total');
  const checkout_btn = document.getElementById('checkout-btn'); // snake_case
  const addToCartBtns = document.querySelectorAll('.add-to-cart');

  const menuToggleBtn = document.getElementById('menu-toggle');
  const mainNavEl = document.getElementById('main-nav');

  // Render Cart
  function renderCart() {
    cartItemsContainer.innerHTML = '';
    if (cartManager.items.length === 0) {
      cartItemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
      cartManager.items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `<strong>${item.title}</strong> <span> x${item.qty}</span> <div>${formatPrice(item.price * item.qty)}</div>`;
        cartItemsContainer.appendChild(div);
      });
    }
    cartTotalEl.textContent = formatPrice(cartManager.getTotal());
  }

  // Cart open/close
  function openCart() {
    cartDrawerEl.classList.add('open');
    cartDrawerEl.setAttribute('aria-hidden', 'false');
    renderCart();
  }

  function closeCart() {
    cartDrawerEl.classList.remove('open');
    cartDrawerEl.setAttribute('aria-hidden', 'true');
  }

  // Add to cart
  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      const id = card.dataset.id;
      const title = card.querySelector('.product-title').textContent;
      const priceText = card.querySelector('.product-price').textContent.replace('€','').trim();
      const price = parseFloat(priceText);
      const product = new ProductCard(id, title, price, null);
      cartManager.addItem(product);
      openCart();
    });
  });

  // Event listeners
  cartToggleBtn.addEventListener('click', openCart);
  cartCloseBtn.addEventListener('click', closeCart);

  checkout_btn.addEventListener('click', () => {
    alert('Gracias por tu compra (demo).');
    cartManager.clearCart();
    renderCart();
    closeCart();
  });

  menuToggleBtn.addEventListener('click', () => {
    mainNavEl.classList.toggle('open');
  });

  // Initial render
  renderCart();
});
