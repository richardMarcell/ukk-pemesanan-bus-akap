let products = [];
const catalog = document.getElementById("catalog");

const getProducts = async () => {
  const response = await fetch("./data/products.json");
  return response.json();
};

const renderProductCards = () => {
  getProducts()
    .then((productResponses) => {
      products = productResponses;
      let productCards = "";
      products.forEach((product) => {
        productCards += `
                <div class="flex flex-col shadow-lg rounded-lg">
                    <img class="h-48" src="${product.image}" alt="${product.name}">
                    <div class="p-2">
                        <div class="font-bold text-xl">${product.name}</div>
                        <div class="flex justify-between font-bold my-2">
                            <span>${product.code}</span>
                            <span>Rp ${product.price.toLocaleString("id-ID")}</span>
                        </div>
                        <button id="buttonAddToCard" onclick="addToCart('${product.code}')" class="px-4 py-2 w-full bg-green-500 text-white rounded-lg cursor-pointer">+ Tambah Ke Keranjang</button>
                    </div>
                </div>
                `;
      });
      catalog.innerHTML = productCards;
    })
    .catch((error) => {
      console.error(error);
    });
};

const addToCart = (productCode) => {
  const product = products.find((product) => product.code === productCode);

  if (product) {
    let carts = JSON.parse(sessionStorage.getItem("carts")) ?? [];
    const isExists = carts.some((cart) => cart.code === product.code);

    if (!isExists) {
      carts.push(product);
      sessionStorage.setItem("carts", JSON.stringify(carts));
      alert("Berhasil menambahkan produk ke keranjang");
    } else {
      alert("Produk sudah ada di keranjang");
    }
  }
};

renderProductCards();
