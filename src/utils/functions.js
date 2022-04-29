export function setItemCart(product) {
  if (getItems()) {
    const cartsItems = getItems();
    if (product) {
      const filtered = cartsItems.filter((a) => a.id === product.id);
      if (filtered.length === 1) {
        sumItemCart(product);
        return;
      }
      const newpd = { ...product, qt: 1 };
      const newItem = cartsItems.concat(newpd);
      localStorage.setItem("cart", JSON.stringify(newItem));
      return { newItem };
    }
    return;
  }
  const newpd = { ...product, qt: 1 };
  localStorage.setItem("cart", JSON.stringify([newpd]));
}

export function sumItemCart(product) {
  const cartsItems = getItems();
  const fnd = cartsItems.find((a) => a.id === product.id);
  const index = cartsItems.indexOf(fnd);
  cartsItems[index].qt++;
  cartsItems[index].total_price =
    cartsItems[index].qt * cartsItems[index].price;
  localStorage.setItem("cart", JSON.stringify(cartsItems));
}

export function getItems() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

export function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + ":" + seconds + " " + ampm;
  return strTime;
}

export function formatDate() {
  const meses = new Array(
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  );
  var f = new Date();
  return f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear();
}

export const getTotal = () => {
  const items = getItems();

  return (
    items &&
    items.map((i) => Number(i.qt) * Number(i.price)).reduce((a, b) => a + b, 0)
  );
};

export function removeItem(item, option) {
  if (item) {
    if (getItems()) {
      const cartsItems = getItems();
      const fnd = cartsItems.find((a) => a.id === item.id);
      const index = cartsItems.indexOf(fnd);
      if (option === "remove" || cartsItems[index].qt <= 1) {
        cartsItems.splice(index, 1);
      } else if (cartsItems[index].qt > 1) {
          cartsItems[index].qt--;
      }
      localStorage.setItem("cart", JSON.stringify(cartsItems));
    }
  }
}