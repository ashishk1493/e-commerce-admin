import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const handleRemoveDuplicateText = (value) => {
  const userNumbers = value;
  var removeDuplicate = userNumbers;
  const lstold = removeDuplicate.split("\n");
  const lst = lstold.map((obj) => obj.trim())
  function removeDuplicates(lst) {
    return lst.filter((item, index) => lst.indexOf(item) === index);
  }
  return (removeDuplicates(lst).join('\n'))
};

export const notifySucc = (message) => {
  toast.success(message)
};

export const notifyError = (message) => {
  toast.error(message)
}

export const anqAddform = (value, onadd, redirectOnSuc) => {
  return onadd(value).then((result) => {
    console.log(result, "resultresult");
    if (result.data.success == "true") {
      notifySucc(result.data.message)
      redirectOnSuc()
      return result.data
    } else {
      result.data.message.map((msg) => notifyError(msg))
      return result.data
    }
  }).catch((err) => {
    console.log(err, "error catch")
  });
};

export const anqEditform = (value, id, onedit, redirectOnSuc) => {
  return onedit(value, id).then((result) => {
    console.log(result, "resultresult");
    if (result.data.success == "true") {
      notifySucc(result.data.message)
      redirectOnSuc()
      return result.data
    } else {
      result.data.message.map((msg) => notifyError(msg))
      return result.data
    }
  }).catch((err) => {
    console.log(err, "error catch")
  });
};


export const loginformApi = (data, onLoadin, dispatch) => {
  return dispatch(onLoadin({ email: data.email, forgot_password_link: "test", password: data.password })).then((result) => {
    // console.log(result, "result.data");
    // if (result.data.success == true) {
    //   notifySucc(result.data.message)
    //   return result.data
    // } else {
    //   // result.data.message.map((msg) => notifyError(msg))
    //   notifyError(result.data.message)
    //   return result.data
    // }
  }).catch((err) => {
    console.log(err, "error catch")
    notifyError(err.message)
  });
};