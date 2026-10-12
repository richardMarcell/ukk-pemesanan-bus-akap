let selectedClass = "";

const bussClass = {
  ekonomi: {
    price: 10000,
    price_in_rupiah: "Rp 10.000",
    image: "./assets/images/ekonomi.png",
  },
  eksekutif: {
    price: 20000,
    price_in_rupiah: "Rp 20.000",
    image: "./assets/images/eksekutif.png",
  },
  bisnis: {
    price: 30000,
    price_in_rupiah: "Rp 30.000",
    image: "./assets/images/bisnis.png",
  },
};

document.getElementById("class").addEventListener("change", function (event) {
  selectedClass = event.target.value;
  const imgClass = document.getElementById("img_class");
  const ticketPrice = document.getElementById("ticket_price");
  imgClass.style.display = "block";
  imgClass.src = bussClass[selectedClass].image;

  ticketPrice.innerHTML = bussClass[selectedClass].price_in_rupiah;
});

document
  .getElementById("btn_calculate")
  .addEventListener("click", function (event) {
    const normalPassagerInput = document.getElementById("normal_passagger");
    const elderyPassagerInput = document.getElementById("eldery_passagger");
    const totalPayment = document.getElementById("total_payment");

    const totalNormalPassanger = normalPassagerInput.value;
    const totalElderyPassanger = elderyPassagerInput.value;

    const totalPriceOfNormalPassager =
      totalNormalPassanger * bussClass[selectedClass].price;
    const totalPriceOfElderyPassager =
      (totalElderyPassanger * bussClass[selectedClass].price * 90) / 100;

    const totalPrice = totalPriceOfNormalPassager + totalPriceOfElderyPassager;
    totalPayment.innerHTML = "Rp " + totalPrice.toLocaleString("id");
  });
