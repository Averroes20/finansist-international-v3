export const getRandomNumber = (): number => {
  const array = new Uint8Array(1);
  window.crypto.getRandomValues(array);
  return (array[0] % 3) + 1;
};
