let page = 0;
const per_page = 5;
let productContainer = document.querySelector("#products");
let loader = document.getElementById("loader");
function getProducts() {
  loader.classList.add("d-none");
  let xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.onload = function () {
    if (this.readyState === 4 && this.status === 200) {
      buildProductCard(this.response.products);
      loader.classList.remove("d-none");
    }
  };
  xhr.open(
    "GET",
    `api/Products/getProducts.php?page=${page}&per_page=${per_page}`,
    true
  );
  xhr.send();
}

document.addEventListener("DOMContentLoaded", () => {
  getProducts();
});

const buildProductCard = (products) => {
  products.forEach((product) => {
    let card = document.createElement("div");
    card.classList.add("card", "my-3");

    let cardImage = document.createElement("img");
    cardImage.classList.add("card-img-top");
    cardImage.src = `images/${product.image}`;

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = product.name;

    let cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.textContent = product.descr;

    let price = document.createElement("h5");
    price.textContent = product.price;

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(price);

    card.appendChild(cardImage);
    card.appendChild(cardBody);

    productContainer.appendChild(card);
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        page++;
        setTimeout(() => {
          getProducts();
        }, 1500);
      }
    });
  },
  {
    threshold: 0.5,
  }
);

observer.observe(loader);
