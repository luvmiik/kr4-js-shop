const catalogState = {
  query: '',
  category: 'all',
  sort: 'default',
  availableOnly: false
};

function searchProducts(products, query) {
  const normalizedQuery = query.trim().toLowerCase();
  if (normalizedQuery === '') {
    return products;
  }
  return products.filter((product) => {
    return product.title.toLowerCase().includes(normalizedQuery);
  });
}

function filterProductsByCategory(products, category) {
  if (category === 'all') {
    return products;
  }
  return products.filter((product) => product.category === category);
}

function filterAvailableProducts(products) {
  return products.filter((product) => product.isAvailable);
}

function sortProducts(products, sortType) {
  const productsCopy = [...products];
  if (sortType === 'price-asc') {
    return productsCopy.sort((a, b) => a.price - b.price);
  }
  if (sortType === 'price-desc') {
    return productsCopy.sort((a, b) => b.price - a.price);
  }
  if (sortType === 'title-asc') {
    return productsCopy.sort((a, b) => a.title.localeCompare(b.title, 'ru'));
  }
  if (sortType === 'rating-desc') {
    return productsCopy.sort((a, b) => b.rating - a.rating);
  }
  return productsCopy;
}

function getPreparedProducts(products, state) {
  let result = [...products];
  result = searchProducts(result, state.query);
  result = filterProductsByCategory(result, state.category);
  if (state.availableOnly) {
    result = filterAvailableProducts(result);
  }
  result = sortProducts(result, state.sort);
  return result;
}

function countAvailableProducts(products) {
  return products.filter((product) => product.isAvailable).length;
}

function calculateAveragePrice(products) {
  if (products.length === 0) {
    return 0;
  }
  const total = products.reduce((sum, product) => sum + product.price, 0);
  return Math.round(total / products.length);
}

function createProductCard(product) {
  const card = document.createElement('article');
  card.classList.add('product-card');
  if (product.rating >= 4.8) {
    card.classList.add('product-card--featured');
  }

  const cover = document.createElement('div');
  cover.classList.add('product-card__cover');
  cover.append(createProductPicture(product));

  const body = document.createElement('div');
  body.classList.add('product-card__body');

  const title = document.createElement('h3');
  title.classList.add('product-card__title');

  const titleButton = document.createElement('button');
  titleButton.classList.add('product-card__link');
  titleButton.type = 'button';
  titleButton.textContent = product.title;
  titleButton.dataset.action = 'product-details';
  titleButton.dataset.productId = String(product.id);
  title.append(titleButton);

  const meta = document.createElement('p');
  meta.classList.add('product-card__description');
  meta.textContent = `${getCategoryTitle(product.category)} · ${product.year} · ${product.rating} ★`;

  const price = document.createElement('p');
  price.classList.add('product-card__price');
  price.textContent = formatPrice(getFinalPrice(product));
  if (product.discountPercent > 0) {
    const oldPrice = document.createElement('span');
    oldPrice.classList.add('product-card__price-old');
    oldPrice.textContent = formatPrice(product.price);
    price.prepend(oldPrice);
  }

  const status = document.createElement('p');
  status.classList.add('product-card__status');
  status.textContent = product.isAvailable ? 'В наличии' : 'Нет в наличии';
  status.classList.add(product.isAvailable ? 'product-card__status--ok' : 'product-card__status--out');

  const description = document.createElement('p');
  description.classList.add('product-card__description');
  description.textContent = product.description;

  const actions = document.createElement('div');
  actions.classList.add('product-card__actions');

  const detailsButton = document.createElement('button');
  detailsButton.classList.add('button', 'button--secondary', 'product-card__button');
  detailsButton.type = 'button';
  detailsButton.textContent = 'Подробнее';
  detailsButton.dataset.action = 'product-details';
  detailsButton.dataset.productId = String(product.id);

  const cartButton = document.createElement('button');
  cartButton.classList.add('button', 'button--primary', 'product-card__button');
  cartButton.type = 'button';
  cartButton.dataset.action = 'add-to-cart';
  cartButton.dataset.productId = String(product.id);
  if (product.isAvailable) {
    cartButton.textContent = 'В корзину';
  } else {
    cartButton.textContent = 'Недоступно';
    cartButton.disabled = true;
  }

  actions.append(detailsButton, cartButton);
  body.append(title, meta, price, status, description, actions);
  card.append(cover, body);
  return card;
}

function renderProducts(container, productsToRender, countElement, emptyElement) {
  container.textContent = '';
  if (countElement) {
    countElement.textContent = `Найдено книг: ${productsToRender.length}`;
  }
  if (emptyElement) {
    emptyElement.hidden = productsToRender.length > 0;
  }
  productsToRender.forEach((product) => {
    container.append(createProductCard(product));
  });
}

function updateCatalog() {
  const container = document.querySelector('[data-products-container]');
  if (!container) {
    return;
  }
  const countElement = document.querySelector('.catalog-count');
  const emptyElement = document.querySelector('.catalog-empty');

  if (container.dataset.limit) {
    const featured = sortProducts(products, 'rating-desc').slice(0, Number(container.dataset.limit));
    renderProducts(container, featured, countElement, emptyElement);
    return;
  }

  const prepared = getPreparedProducts(products, catalogState);
  renderProducts(container, prepared, countElement, emptyElement);
}

const searchInput = document.querySelector('#catalog-search');
const categoryFilter = document.querySelector('#category-filter');
const sortSelect = document.querySelector('#sort-select');
const availableToggle = document.querySelector('#available-toggle');

if (searchInput) {
  searchInput.addEventListener('input', (event) => {
    catalogState.query = event.target.value;
    updateCatalog();
  });
}

if (categoryFilter) {
  categoryFilter.addEventListener('change', (event) => {
    catalogState.category = event.target.value;
    updateCatalog();
  });
}

if (sortSelect) {
  sortSelect.addEventListener('change', (event) => {
    catalogState.sort = event.target.value;
    updateCatalog();
  });
}

if (availableToggle) {
  availableToggle.addEventListener('change', (event) => {
    catalogState.availableOnly = event.target.checked;
    updateCatalog();
  });
}

updateCatalog();

console.log('catalog.js: товаров в наличии:', countAvailableProducts(products));
console.log('catalog.js: средняя цена:', calculateAveragePrice(products));
