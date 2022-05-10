export const getSalerPerMonth = (month, sales) => {
  const filter_sales = sales.filter(
    (s) =>
      new Date(s.dateOfSale).getMonth() + 1 === month &&
      new Date(s.dateOfSale).getFullYear() === new Date().getFullYear()
  );
  return filter_sales.length;
};

export const getSalerPerDate = (day, sales) => {
  const filter_sales = sales.filter(
    (a) =>
      new Date(a.dateOfSale).getFullYear() === getDateDay(day).year &&
      new Date(a.dateOfSale).getMonth() === getDateDay(day).month &&
      new Date(a.dateOfSale).getDate() === getDateDay(day).day
  );
  return filter_sales.length;
};

export const getDateDay = (n) => {
  var curr = new Date();
  var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
  var last = first + n;
  var lastday = new Date(curr.setDate(last));
  return {
    day: lastday.getDate(),
    month: lastday.getMonth(),
    year: lastday.getFullYear(),
  };
};
