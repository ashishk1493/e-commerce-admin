// get perticuler key from selected value
export const getPerticulerKeyFromSelectedValue = (e, value, key) => {
  if (value) {
    if (value[key]) {
      return value[key]
    }
  } else {
    return ''
  }
}

// get full value object
export const getFullValueObject = (e, value) => {
  if (value) {
    return value
  } else {
    return ""
  }
}