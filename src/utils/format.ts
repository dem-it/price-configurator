export const formatPrice = (price: number, fractions: number = 0) => {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", minimumFractionDigits: fractions, maximumFractionDigits: fractions }).format(price)
}