function createAnalytics() {
  let counter = 0;
  let destroyed = false;
  console.log("test");
  const listener = () => (counter += 1);
  document.addEventListener("click", listener);
  return {
    destroy() {
      document.removeEventListener("click", listener);
      destroyed = true;
    },
    getClick() {
      if (destroyed) {
        return `Analytics is destroyed. Total clicks = ${counter}`;
      }
      return counter;
    },
  };
}

window.analytics = createAnalytics();
