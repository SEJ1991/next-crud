export function getShortFormatNumber(number: number) {
  const formatter = new Intl.NumberFormat('en', {
    notation: 'compact',
    compactDisplay: 'short',
  });

  return formatter.format(number);
}

export function getRandomInt(min: number, max: number) {
  if (min > max) return 0;
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);

  return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
}
