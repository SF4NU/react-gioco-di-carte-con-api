export const interval = (ms) => {
  return new Promise((resolve, reject) => {
    setInterval(() => {
      renderOnce.current = true;
    }, ms);
  });
};
