export const formatPrice = (price: number, fractions: number = 0) => {
  const formattedPrice = new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", minimumFractionDigits: fractions, maximumFractionDigits: fractions }).format(Math.abs(price));
  if (price > 0) {
    return `+ ${formattedPrice}`;
  } else if (price < 0) {
    return `- ${formattedPrice}`;
  } else {
    return formattedPrice;
  }
}