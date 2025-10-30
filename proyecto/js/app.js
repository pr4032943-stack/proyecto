
document.addEventListener('DOMContentLoaded', () => {
  const cart = new CartManager(STORAGE_KEY_CART);

  const cartToggle = document.getElementById('cart-toggle');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartClose = document.getElementById('cart-close');
  const cartItemsEl = document.getElementById('cart-items');
  const cartTotalEl = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');


  function renderCart() {
    cartItemsEl.innerHTML = '';
    if (cart.items.length === 0) {
      cartItemsEl.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
      cart.items.forEach(it => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `<strong>${it.title}</strong> <span> x${it.qty}</span> <div>${formatPrice(it.price * it.qty)}</div>`;
        cartItemsEl.appendChild(div);
      });
    }
    cartTotalEl.textContent = formatPrice(cart.getTotal());
  }

  function openCart() {
    cartDrawer.classList.add('open');
    cartDrawer.setAttribute('aria-hidden', 'false');
    renderCart();
  }

  function closeCart() {
    cartDrawer.classList.remove('open');
    cartDrawer.setAttribute('aria-hidden', 'true');
  }

  
  addToCartButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      const id = card.dataset.id;
      const title = card.querySelector('.product-title').textContent;
      const priceText = card.querySelector('.product-price').textContent.replace('€','').trim();
      const price = parseFloat(priceText);
      const product = new ProductCard(id, title, price, null);
      cart.addItem(product);
      openCart();
    });
  });

 
  cartToggle.addEventListener('click', openCart);
  cartClose.addEventListener('click', closeCart);

  checkoutBtn.addEventListener('click', () => {
    alert('Gracias por tu compra (demo).');
    cart.clearCart();
    renderCart();
    closeCart();
  });

  
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });

 
  renderCart();
});

