export const loadData = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    toastr.error("error");
    return [];
  }
};

export const saveData = (key, payload) =>
  localStorage.setItem(key, JSON.stringify(payload));
