// get perticuler key from selected value
export const getPerticulerKeyFromSelectedValue = (e, value, key) => {
  if (value) {
    if (value[key]) {
      console.log(value, 'value---');
      return value[key];
    }
  } else {
    return '';
  }
};

// get value of autocomplete
export const getValueofAutocomplete = (id, list, key) => {
  let lstExist = list.filter((obj) => obj[key] == id);
  if (lstExist.length) {
    return lstExist[0];
  } else {
    return {};
  }
};

// get full value object
export const getFullValueObject = (e, value) => {
  if (value) {
    return value;
  } else {
    return '';
  }
};
