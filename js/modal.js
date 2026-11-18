const productDialog = document.createElement('dialog');
productDialog.classList.add('product-dialog');
productDialog.setAttribute('aria-labelledby', 'product-dialog-title');

const dialogBody = document.createElement('div');
dialogBody.classList.add('product-dialog__inner');

const dialogImage = document.createElement('div');
dialogImage.classList.add('product-dialog__image');

const dialogContent = document.createElement('div');
dialogContent.classList.add('product-dialog__content');

const dialogTitle = document.createElement('h2');
dialogTitle.id = 'product-dialog-title';
dialogTitle.classList.add('product-dialog__title');

const dialogMeta = document.createElement('p');
dialogMeta.classList.add('product-dialog__meta');

const dialogPrice = document.createElement('p');
dialogPrice.classList.add('product-dialog__price');

const dialogStatus = document.createElement('p');
dialogStatus.classList.add('product-card__status');

const dialogDescription = document.createElement('p');
dialogDescription.classList.add('product-dialog__text');

const dialogActions = document.createElement('div');
dialogActions.classList.add('product-dialog__actions');

const dialogCartButton = document.createElement('button');
dialogCartButton.classList.add('button', 'button--primary');
dialogCartButton.type = 'button';
dialogCartButton.dataset.action = 'add-to-cart';

const dialogCloseButton = document.createElement('button');
dialogCloseButton.classList.add('button', 'button--secondary');
dialogCloseButton.type = 'button';
dialogCloseButton.textContent = 'Закрыть';

dialogActions.append(dialogCartButton, dialogCloseButton);
dialogContent.append(dialogTitle, dialogMeta, dialogPrice, dialogStatus, dialogDescription, dialogActions);
dialogBody.append(dialogImage, dialogContent);
productDialog.append(dialogBody);
document.body.append(productDialog);

let lastFocusedElement = null;

function fillProductDialog(product) {
  dialogImage.textContent = '';
  dialogImage.append(createProductPicture(product));
  dialogTitle.textContent = product.title;
  dialogMeta.textContent = `${getCategoryTitle(product.category)} · ${product.year} · ${product.pages} стр. · ${product.rating} ★`;
  dialogPrice.textContent = '';
  if (product.discountPercent > 0) {
    const oldPrice = document.createElement('span');
    oldPrice.classList.add('product-card__price-old');
    oldPrice.textContent = formatPrice(product.price);
    dialogPrice.append(oldPrice);
  }
  dialogPrice.append(document.createTextNode(formatPrice(getFinalPrice(product))));
  dialogStatus.textContent = product.isAvailable ? 'В наличии' : 'Нет в наличии';
  dialogStatus.className = 'product-card__status';
  dialogStatus.classList.add(product.isAvailable ? 'product-card__status--ok' : 'product-card__status--out');
  dialogDescription.textContent = product.description;
  dialogCartButton.dataset.productId = String(product.id);
  dialogCartButton.textContent = product.isAvailable ? 'В корзину' : 'Недоступно';
  dialogCartButton.disabled = !product.isAvailable;
}

function openProductModal(product) {
  lastFocusedElement = document.activeElement;
  fillProductDialog(product);
  productDialog.showModal();
}

dialogCloseButton.addEventListener('click', () => {
  productDialog.close();
});

productDialog.addEventListener('close', () => {
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
});

document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-action="product-details"]');
  if (!button) {
    return;
  }
  const product = findProductById(Number(button.dataset.productId));
  if (!product) {
    console.warn('modal.js: товар не найден:', button.dataset.productId);
    return;
  }
  openProductModal(product);
});
