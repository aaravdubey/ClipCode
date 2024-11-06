const debounce = (func, delay) => {
  let timeoutId;
  
  const debounced = (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };

  return debounced;
};

export { debounce };
