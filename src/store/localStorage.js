export const loadState = () => {
  try {
    const serialState = localStorage.getItem('budgetly');
    if (serialState === null) {
      return undefined;
    }
    return JSON.parse(serialState);
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serialState = JSON.stringify(state);
    localStorage.setItem('budgetly', serialState);
  } catch (err) {
    console.log(err);
  }
};
