const productCarts = document.getElementById("carts");
let products = JSON.parse(sessionStorage.getItem("carts")) ?? [];
products = products.map((product) => ({ ...product, qty: product.qty ?? 1 }));

const saveCarts = () => {
  sessionStorage.setItem("carts", JSON.stringify(products));
};

const renderProductCards = () => {
  let productCards = "";

  products.forEach((product) => {
    productCards += `
        <div class="flex flex-col w-fit shadow-lg rounded-lg">
            <img class="h-48 rounded" src="${product.image}" alt="${product.name}">
            <div class="p-2">
                <div class="font-bold text-xl">${product.name}</div>
                <div class="flex justify-between font-bold my-2">
                    <span>${product.code}</span>
                    <span>Rp ${product.price.toLocaleString("id-ID")}</span>
                </div>
                <div class="flex space-between gap-4">
                    <button onclick="decreaseQty('${product.code}')" id="decreaseQty" class="px-4 py-2 w-full cursor-pointer bg-green-500 text-white rounded-lg">-</button>
                    <input id="productQty" type="text" disabled class="border rounded text-center p-1" value="${product.qty ?? 0}" id="inputProductQty"/>
                    <button onclick="increaseQty('${product.code}')" id="increaseQty" class="px-4 py-2 w-full bg-green-500 cursor-pointer text-white rounded-lg">+</button>
                </div>
            </div>
        </div>
        `;
  });

  if (productCards.length < 1) {
    productCarts.classList.remove("grid");
    productCarts.classList.remove("grid-cols-4");
    productCarts.innerHTML =
      "<p class='text-center text-lg'>Tidak ada Data Produk</p>";
  } else {
    productCarts.innerHTML = productCards;
  }

  //   Update Total Price
  const totalPrice = products.reduce((acc, product) => {
    return acc + (product.qty ?? 0) * product.price;
  }, 0);

  const totalPriceLabel = document.getElementById("totalPrice");
  totalPriceLabel.innerHTML = "Rp " + totalPrice.toLocaleString("id");
};

const increaseQty = (code) => {
  const product = products.find((product) => product.code === code);
  if (product) {
    product.qty += 1;
    saveCarts();
    renderProductCards();
  }
};

const decreaseQty = (code) => {
  const product = products.find((product) => product.code === code);
  if (!product) return;

  if (product.qty > 1) {
    product.qty -= 1;
  } else {
    // qty sudah 1, jadi dikurangi lagi berarti dihapus dari keranjang
    products = products.filter((product) => product.code !== code);
  }

  saveCarts();
  renderProductCards();
};

renderProductCards();
