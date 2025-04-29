export function getDiscountPrice(price: number, discountPercentage: number) {
  const discount = price * (discountPercentage / 100);
  return Math.floor((price - discount) * 100) / 100;
}
