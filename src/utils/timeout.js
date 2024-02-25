export const time = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(console.log("timeout"));
    }, ms);
  });
};