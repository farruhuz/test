export const thousandSeperator = (value: number | string, sign: ' ' | ',' = ' ') => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sign);
};
