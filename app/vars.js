let baseUrli;
if (process.env.NODE_ENV === 'production') {
  baseUrli = 'https://imp.gg/';
} else if (process.env.NODE_ENV === 'development') {
  baseUrli = 'http://localhost:3001/';
}
console.log(baseUrli);
export const baseUrl = baseUrli;
