import Cookies from "js-cookie";

export const URL = "https://shop-fc2021.herokuapp.com/v1";

export const ApiLogin = (info, callback) => {
  console.log(info);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(info);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  fetch(`${URL}/login`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.status) return callback(result, null);
      callback(null, result.errMsg);
    })
    .catch((error) => console.log("error", error));
};

export const ApiRegister = (info, callback) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(info);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`${URL}/register`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.status) return callback(result, null);
      callback(null, result.errMsg);
    })
    .catch((error) => console.log("error", error));
};

export const ApiOtp = async (info, callback) => {
  const token = await Cookies.get("registerToken");

  var myHeaders = new Headers();
  myHeaders.append("token", token);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(info);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`${URL}/otp`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.status) return callback(result, null);
      callback(null, result.errMsg);
    })
    .catch((error) => console.log("error", error));
};

export const ApiForgotPass = (info, callback) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(info);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`${URL}/forget/password`, requestOptions)
    .then((response) => response.json())
    .then((result) =>
      result.status ? callback(result, null) : callback(null, result.errMsg)
    )
    .catch((error) => console.log("error", error));
};

export const ApiVerifyOtp = async (info, callback) => {
  const token = await Cookies.get("forgotToken");

  var myHeaders = new Headers();
  myHeaders.append("token", token);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(info);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`${URL}/verify/password`, requestOptions)
    .then((response) => response.json())
    .then((result) =>
      result.status ? callback(result, null) : callback(null, result.errMsg)
    )
    .catch((error) => console.log("error", error));
};
