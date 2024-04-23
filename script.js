function fetchData(category) {
  return fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const categoryProducts = data.categories.find(cat => cat.category_name === category).category_products;
      return categoryProducts;
    });
}

function populateCards(products) {
  const productCardsContainer = document.querySelector('.product-cards');
  productCardsContainer.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      ${product.badge_text ? `<span class="badge">${product.badge_text}</span>` : ''}
      <div class="details">
        <div class="title-container">
          <h2 class="title">${product.title}</h2>
          <p class="vendor">${product.vendor}</p>
        </div>
        <div class="price-container">
          <p class="price">Rs ${product.price}</p>
          <p class="compare-price">${product.compare_at_price}</p>
          <p class="discount">${calculateDiscount(product.price, product.compare_at_price)}</p>
        </div>
        <button class="add-to-cart">Add to Cart</button>
      </div>
    `;
    productCardsContainer.appendChild(card);
  });
}

function calculateDiscount(price, compareAtPrice) {
  const discount = ((compareAtPrice - price) / compareAtPrice) * 100;
  return `${Math.round(discount)}% off`;
}

const tabs = document.querySelectorAll(".tab");
console.log(tabs);
tabs.forEach(tab => {
  console.log(tab);

  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const category = tab.getAttribute('data-category');
    console.log("hii");
    fetchData(category)
      .then(products => populateCards(products))
      .catch(error => console.error('Error fetching data:', error));
  });
});

tabs[0].click();
