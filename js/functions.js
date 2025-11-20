// Constants
const STORAGE_KEY_CART = 'SKATEHOUSE_CART_V1';

// Classes
class ProductCard {
  constructor(id, title, price, image) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.image = image;
  }
}

class CartManager {
  constructor(storageKey) {
    this.storageKey = storageKey;
    this.items = this.loadCart();
  }

  loadCart() {
    const raw = localStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) : [];
  }

  saveCart() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }

  addItem(product) {
    const found = this.items.find(i => i.id === product.id);
    if (found) {
      found.qty += 1;
    } else {
      this.items.push({ id: product.id, title: product.title, price: product.price, qty: 1 });
    }
    this.saveCart();
  }

  removeItem(productId) {
    this.items = this.items.filter(i => i.id !== productId);
    this.saveCart();
  }

  clearCart() {
    this.items = [];
    this.saveCart();
  }

  getTotal() {
    return this.items.reduce((sum, it) => sum + it.price * it.qty, 0);
  }
}

// Utilities
function formatPrice(amount) {
  return '€' + amount.toFixed(2);
}

// Export to global scope
window.CartManager = CartManager;
window.ProductCard = ProductCard;
window.formatPrice = formatPrice;
window.STORAGE_KEY_CART = STORAGE_KEY_CART;
