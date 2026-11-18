const CART_STORAGE_KEY = 'murakami-cart';

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (raw === null) {
      return [];
    }
    const value = JSON.parse(raw);
    if (!Array.isArray(value)) {
      return [];
    }
    return value.filter((item) => {
      const product = findProductById(item.productId);
      return product && typeof item.quantity === 'number' && item.quantity > 0;
    });
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function getCart() {
  return loadCart();
}

function addToCart(productId) {
  const product = findProductById(productId);
  if (!product || !product.isAvailable) {
    console.warn('cart.js: товар недоступен:', productId);
    return;
  }
  const cart = loadCart();
  const existing = cart.find((item) => item.productId === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ productId, quantity: 1 });
  }
  saveCart(cart);
  updateCartBadge();
  renderCartPage();
  console.log(`cart.js: добавлено в корзину — ${product.title}`);
}

function changeQuantity(productId, delta) {
  const cart = loadCart();
  const item = cart.find((entry) => entry.productId === productId);
  if (!item) {
    return;
  }
  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  saveCart(cart);
  updateCartBadge();
  renderCartPage();
}

function removeFromCart(productId) {
  const product = findProductById(productId);
  let cart = loadCart();
  cart = cart.filter((item) => item.productId !== productId);
  saveCart(cart);
  updateCartBadge();
  renderCartPage();
  if (product) {
    console.log(`cart.js: удалено из корзины — ${product.title}`);
  }
}

function getCartCount() {
  return loadCart().reduce((sum, item) => sum + item.quantity, 0);
}

function getCartTotal() {
  return loadCart().reduce((sum, item) => {
    const product = findProductById(item.productId);
    if (!product) {
      return sum;
    }
    return sum + getFinalPrice(product) * item.quantity;
  }, 0);
}

function getCartItems() {
  return loadCart().map((item) => {
    const product = findProductById(item.productId);
    return { ...item, product };
  }).filter((item) => item.product);
}

function updateCartBadge() {
  const badge = document.querySelector('[data-cart-count]');
  if (!badge) {
    return;
  }
  const count = getCartCount();
  badge.textContent = String(count);
  badge.hidden = count === 0;
}

function createQuantityControls(product, quantity) {
  const controls = document.createElement('div');
  controls.classList.add('cart-quantity');

  const minusButton = document.createElement('button');
  minusButton.classList.add('cart-quantity__button');
  minusButton.type = 'button';
  minusButton.textContent = '−';
  minusButton.setAttribute('aria-label', `Уменьшить количество «${product.title}»`);
  minusButton.dataset.action = 'cart-decrease';
  minusButton.dataset.productId = String(product.id);

  const value = document.createElement('span');
  value.classList.add('cart-quantity__value');
  value.textContent = String(quantity);

  const plusButton = document.createElement('button');
  plusButton.classList.add('cart-quantity__button');
  plusButton.type = 'button';
  plusButton.textContent = '+';
  plusButton.setAttribute('aria-label', `Увеличить количество «${product.title}»`);
  plusButton.dataset.action = 'cart-increase';
  plusButton.dataset.productId = String(product.id);

  controls.append(minusButton, value, plusButton);
  return controls;
}

function renderCartPage() {
  const container = document.querySelector('[data-cart-container]');
  if (!container) {
    return;
  }
  const items = getCartItems();
  container.textContent = '';

  if (items.length === 0) {
    const empty = document.createElement('p');
    empty.classList.add('cart-empty');
    empty.textContent = 'Корзина пуста. Загляните в каталог — там много интересного.';
    container.append(empty);
    return;
  }

  const tableWrapper = document.createElement('div');
  tableWrapper.classList.add('table-wrapper');

  const table = document.createElement('table');
  table.classList.add('product-table', 'cart-table');

  const caption = document.createElement('caption');
  caption.textContent = 'Ваша корзина';

  const thead = document.createElement('thead');
  const headRow = document.createElement('tr');
  ['Книга', 'Цена', 'Количество', 'Сумма', ''].forEach((name) => {
    const th = document.createElement('th');
    th.scope = 'col';
    th.textContent = name;
    headRow.append(th);
  });
  thead.append(headRow);

  const tbody = document.createElement('tbody');
  items.forEach((item) => {
    const row = document.createElement('tr');

    const titleCell = document.createElement('th');
    titleCell.scope = 'row';
    titleCell.textContent = item.product.title;

    const priceCell = document.createElement('td');
    priceCell.dataset.label = 'Цена';
    priceCell.textContent = formatPrice(getFinalPrice(item.product));

    const quantityCell = document.createElement('td');
    quantityCell.dataset.label = 'Количество';
    quantityCell.append(createQuantityControls(item.product, item.quantity));

    const sumCell = document.createElement('td');
    sumCell.dataset.label = 'Сумма';
    sumCell.textContent = formatPrice(getFinalPrice(item.product) * item.quantity);

    const removeCell = document.createElement('td');
    const removeButton = document.createElement('button');
    removeButton.classList.add('button', 'button--secondary', 'cart-table__remove');
    removeButton.type = 'button';
    removeButton.textContent = 'Удалить';
    removeButton.dataset.action = 'cart-remove';
    removeButton.dataset.productId = String(item.product.id);
    removeCell.append(removeButton);

    row.append(titleCell, priceCell, quantityCell, sumCell, removeCell);
    tbody.append(row);
  });

  table.append(caption, thead, tbody);
  tableWrapper.append(table);
  container.append(tableWrapper);

  const total = document.createElement('p');
  total.classList.add('cart-total');
  total.textContent = `Итого: ${formatPrice(getCartTotal())}`;

  const actions = document.createElement('div');
  actions.classList.add('cart-actions');

  const checkoutLink = document.createElement('a');
  checkoutLink.classList.add('button', 'button--primary');
  checkoutLink.href = 'order.html';
  checkoutLink.textContent = 'Оформить заявку';

  const clearButton = document.createElement('button');
  clearButton.classList.add('button', 'button--secondary');
  clearButton.type = 'button';
  clearButton.textContent = 'Очистить корзину';
  clearButton.dataset.action = 'cart-clear';

  actions.append(checkoutLink, clearButton);
  container.append(total, actions);
}

document.addEventListener('click', (event) => {
  const target = event.target.closest('[data-action]');
  if (!target) {
    return;
  }

  const action = target.dataset.action;
  const productId = Number(target.dataset.productId);

  if (action === 'add-to-cart') {
    addToCart(productId);
  }
  if (action === 'cart-increase') {
    changeQuantity(productId, 1);
  }
  if (action === 'cart-decrease') {
    changeQuantity(productId, -1);
  }
  if (action === 'cart-remove') {
    removeFromCart(productId);
  }
  if (action === 'cart-clear') {
    saveCart([]);
    updateCartBadge();
    renderCartPage();
  }
});

updateCartBadge();
renderCartPage();

console.log('cart.js: товаров в корзине:', getCartCount());
