const orderForm = document.querySelector('.page-form');

if (orderForm) {
  const nameInput = orderForm.querySelector('#page-order-name');
  const emailInput = orderForm.querySelector('#page-order-email');
  const phoneInput = orderForm.querySelector('#page-order-phone');
  const productSelect = orderForm.querySelector('#page-order-product');
  const consentInput = orderForm.querySelector('#page-order-consent');

  const nameError = orderForm.querySelector('#page-order-name-error');
  const emailError = orderForm.querySelector('#page-order-email-error');
  const phoneError = orderForm.querySelector('#page-order-phone-error');
  const consentError = orderForm.querySelector('#page-order-consent-error');
  const formMessage = orderForm.querySelector('.form-message');

  function showError(input, errorElement, message) {
    errorElement.textContent = message;
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', errorElement.id);
  }

  function clearError(input, errorElement) {
    errorElement.textContent = '';
    input.removeAttribute('aria-invalid');
    input.removeAttribute('aria-describedby');
  }

  function validateName() {
    const value = nameInput.value.trim();
    if (value.length < 2) {
      showError(nameInput, nameError, 'Введите имя не короче 2 символов.');
      return false;
    }
    clearError(nameInput, nameError);
    return true;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      showError(emailInput, emailError, 'Введите корректный e-mail, например: name@mail.ru');
      return false;
    }
    clearError(emailInput, emailError);
    return true;
  }

  function validatePhone() {
    const digits = phoneInput.value.replace(/\D/g, '');
    if (digits.length !== 11 || !['7', '8'].includes(digits[0])) {
      showError(phoneInput, phoneError, 'Введите телефон в формате +7 (900) 000-00-00.');
      return false;
    }
    clearError(phoneInput, phoneError);
    return true;
  }

  function validateConsent() {
    if (!consentInput.checked) {
      showError(consentInput, consentError, 'Подтвердите согласие на обработку персональных данных.');
      return false;
    }
    clearError(consentInput, consentError);
    return true;
  }

  if (productSelect) {
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Выберите книгу';
    productSelect.append(placeholder);
    products.forEach((product) => {
      const option = document.createElement('option');
      option.value = product.title;
      option.textContent = `${product.title} — ${formatPrice(getFinalPrice(product))}`;
      productSelect.append(option);
    });

    const params = new URLSearchParams(window.location.search);
    const productFromUrl = params.get('product');
    if (productFromUrl) {
      const option = Array.from(productSelect.options).find((item) => item.value === productFromUrl);
      if (option) {
        productSelect.value = option.value;
      }
    }
  }

  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isConsentValid = validateConsent();
    const isFormValid = isNameValid && isEmailValid && isPhoneValid && isConsentValid;

    if (!isFormValid) {
      if (formMessage) {
        formMessage.textContent = 'Проверьте выделенные поля формы.';
      }
      return;
    }

    const requestData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim(),
      product: productSelect ? productSelect.value : '',
      comment: orderForm.querySelector('#page-order-comment').value.trim(),
      cartTotal: getCartTotal()
    };

    console.log('validation.js: форма прошла проверку');
    console.table(requestData);

    if (formMessage) {
      formMessage.textContent = '';
    }

    if (typeof showSuccess === 'function') {
      showSuccess('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
    }

    orderForm.reset();
  });

  nameInput.addEventListener('input', validateName);
  emailInput.addEventListener('input', validateEmail);
  phoneInput.addEventListener('input', validatePhone);
  consentInput.addEventListener('change', validateConsent);
}
