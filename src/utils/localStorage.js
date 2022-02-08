const getData = (name, defaultValue = {}) => {
  return JSON.parse(localStorage.getItem(name)) || defaultValue;
};

const saveData = (name, data) => {
  const dataToSave = { ...data };
  localStorage.setItem(name, JSON.stringify(dataToSave));
};

export { getData, saveData };
