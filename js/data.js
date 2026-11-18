const CATEGORIES = {
  novels: 'Романы',
  stories: 'Рассказы',
  essays: 'Эссе'
};

const PRODUCT_IMAGE_SIZES = '(max-width: 639px) 40vw, (max-width: 1023px) 50vw, 220px';

const products = [
  {
    id: 1,
    title: 'Норвежский лес',
    category: 'novels',
    price: 890,
    discountPercent: 0,
    rating: 4.8,
    isAvailable: true,
    year: 1987,
    pages: 384,
    imageAlt: 'Обложка романа «Норвежский лес»',
    description: 'Роман о любви, утрате и взрослении в Токио 1960-х.',
    images: {
      fallback: 'images/norwegian-wood-640.jpg',
      jpg: 'images/norwegian-wood-480.jpg 480w, images/norwegian-wood-640.jpg 640w, images/norwegian-wood-960.jpg 960w',
      webp: 'images/norwegian-wood-480.webp 480w, images/norwegian-wood-640.webp 640w, images/norwegian-wood-960.webp 960w'
    }
  },
  {
    id: 2,
    title: 'Кафка на пляже',
    category: 'novels',
    price: 1090,
    discountPercent: 10,
    rating: 4.7,
    isAvailable: true,
    year: 2002,
    pages: 608,
    imageAlt: 'Обложка романа «Кафка на пляже»',
    description: 'Магический реализм, пророчества и говорящие коты.',
    images: {
      fallback: 'images/kafka-640.jpg',
      jpg: 'images/kafka-480.jpg 480w, images/kafka-640.jpg 640w',
      webp: 'images/kafka-480.webp 480w, images/kafka-640.webp 640w'
    }
  },
  {
    id: 3,
    title: '1Q84. Трилогия',
    category: 'novels',
    price: 2400,
    discountPercent: 15,
    rating: 4.9,
    isAvailable: true,
    year: 2009,
    pages: 1344,
    imageAlt: 'Обложка трилогии «1Q84»',
    description: 'Альтернативная реальность, две луны и музыка Яначека.',
    images: {
      fallback: 'images/1q84-640.jpg',
      jpg: 'images/1q84-480.jpg 480w, images/1q84-640.jpg 640w',
      webp: 'images/1q84-480.webp 480w, images/1q84-640.webp 640w'
    }
  },
  {
    id: 4,
    title: 'Хроники Заводной Птицы',
    category: 'novels',
    price: 1250,
    discountPercent: 0,
    rating: 4.6,
    isAvailable: true,
    year: 1994,
    pages: 640,
    imageAlt: 'Обложка романа «Хроники Заводной Птицы»',
    description: 'Трилогия о поиске исчезнувших людей и кошек.',
    images: {
      fallback: 'images/windup-640.jpg',
      jpg: 'images/windup-480.jpg 480w, images/windup-640.jpg 640w',
      webp: 'images/windup-480.webp 480w, images/windup-640.webp 640w'
    }
  },
  {
    id: 5,
    title: 'Мужчины без женщин',
    category: 'stories',
    price: 740,
    discountPercent: 0,
    rating: 4.5,
    isAvailable: true,
    year: 2014,
    pages: 320,
    imageAlt: 'Обложка сборника рассказов «Мужчины без женщин»',
    description: 'Семь историй об одиночестве и мужской дружбе.',
    images: {
      fallback: 'images/men-640.jpg',
      jpg: 'images/men-480.jpg 480w, images/men-640.jpg 640w, images/men-960.jpg 960w',
      webp: 'images/men-480.webp 480w, images/men-640.webp 640w, images/men-960.webp 960w'
    }
  },
  {
    id: 6,
    title: 'Охота на овец',
    category: 'novels',
    price: 990,
    discountPercent: 5,
    rating: 4.6,
    isAvailable: true,
    year: 1982,
    pages: 416,
    imageAlt: 'Обложка романа «Охота на овец»',
    description: 'Дилогия о крысах, магической овце и заколдованном отеле.',
    images: {
      fallback: 'images/sheep-640.jpg',
      jpg: 'images/sheep-480.jpg 480w, images/sheep-640.jpg 640w, images/sheep-960.jpg 960w',
      webp: 'images/sheep-480.webp 480w, images/sheep-640.webp 640w, images/sheep-960.webp 960w'
    }
  },
  {
    id: 7,
    title: 'Дэнс, дэнс, дэнс',
    category: 'novels',
    price: 1150,
    discountPercent: 0,
    rating: 4.4,
    isAvailable: false,
    year: 1988,
    pages: 576,
    imageAlt: 'Обложка романа «Дэнс, дэнс, дэнс»',
    description: 'Продолжение «Охоты на овец»: отель, призраки и дельфины.',
    images: {
      fallback: 'images/dance-640.jpg',
      jpg: 'images/dance-480.jpg 480w, images/dance-640.jpg 640w, images/dance-960.jpg 960w',
      webp: 'images/dance-480.webp 480w, images/dance-640.webp 640w, images/dance-960.webp 960w'
    }
  },
  {
    id: 8,
    title: 'Исчезновение слона',
    category: 'stories',
    price: 780,
    discountPercent: 0,
    rating: 4.3,
    isAvailable: true,
    year: 1993,
    pages: 288,
    imageAlt: 'Обложка сборника рассказов «Исчезновение слона»',
    description: 'Семнадцать странных рассказов раннего Мураками.',
    images: {
      fallback: 'images/elephant-640.jpg',
      jpg: 'images/elephant-480.jpg 480w, images/elephant-640.jpg 640w, images/elephant-960.jpg 960w',
      webp: 'images/elephant-480.webp 480w, images/elephant-640.webp 640w, images/elephant-960.webp 960w'
    }
  },
  {
    id: 9,
    title: 'О чем я говорю, когда говорю о беге',
    category: 'essays',
    price: 690,
    discountPercent: 10,
    rating: 4.7,
    isAvailable: true,
    year: 2007,
    pages: 256,
    imageAlt: 'Обложка эссе «О чем я говорю, когда говорю о беге»',
    description: 'Автобиографические заметки о беге и писательстве.',
    images: {
      fallback: 'images/running-640.jpg',
      jpg: 'images/running-480.jpg 480w, images/running-640.jpg 640w, images/running-960.jpg 960w',
      webp: 'images/running-480.webp 480w, images/running-640.webp 640w, images/running-960.webp 960w'
    }
  },
  {
    id: 10,
    title: 'Подземка',
    category: 'essays',
    price: 1050,
    discountPercent: 0,
    rating: 4.2,
    isAvailable: false,
    year: 1997,
    pages: 400,
    imageAlt: 'Обложка документальной книги «Подземка»',
    description: 'Документальное расследование зариновой атаки в токийском метро.',
    images: {
      fallback: 'images/underground-640.jpg',
      jpg: 'images/underground-480.jpg 480w, images/underground-640.jpg 640w, images/underground-960.jpg 960w',
      webp: 'images/underground-480.webp 480w, images/underground-640.webp 640w, images/underground-960.webp 960w'
    }
  }
];

function formatPrice(price) {
  return `${price.toLocaleString('ru-RU')} ₽`;
}

function getFinalPrice(product) {
  if (product.discountPercent > 0) {
    return Math.round(product.price * (100 - product.discountPercent) / 100);
  }
  return product.price;
}

function findProductById(id) {
  return products.find((product) => product.id === id);
}

function getCategoryTitle(category) {
  return CATEGORIES[category] || 'Книги';
}

function getProductSummary(product) {
  const status = product.isAvailable ? 'в наличии' : 'нет в наличии';
  return `${product.title} — ${formatPrice(product.price)} (${status})`;
}

function createProductPicture(product) {
  const picture = document.createElement('picture');

  const source = document.createElement('source');
  source.type = 'image/webp';
  source.srcset = product.images.webp;
  source.sizes = PRODUCT_IMAGE_SIZES;

  const img = document.createElement('img');
  img.src = product.images.fallback;
  img.srcset = product.images.jpg;
  img.sizes = PRODUCT_IMAGE_SIZES;
  img.alt = product.imageAlt;
  img.loading = 'lazy';

  picture.append(source, img);
  return picture;
}

console.log('data.js: каталог загружен, товаров:', products.length);
console.table(products);
