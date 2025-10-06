import { parseErrorResponse, request } from "./request";

const register = (payload: any) =>
  new Promise((rs, rj) => {
    request()
      .post(`/register`, payload)
      .then((res) => {
        const { data } = res.data;
        if (data) rs(data);
        else rj(new Error("Something went error!"));
      })
      .catch(parseErrorResponse)
      .then(rj);
  });
const login = (payload: any): Promise<{ user: any; token: string }> =>
  new Promise((rs, rj) => {
    request()
      .post(`/login`, payload)
      .then((res) => {
        const { data } = res.data;
        if (data) rs(data);
        else rj(new Error("Something went error!"));
      })
      .catch(parseErrorResponse)
      .then(rj);
  });
const forgotPassword = (payload: { email: string }) =>
  request()
    .post(`/forgot-password`, payload)
    .then((res) => res.data.data)
    .catch(parseErrorResponse);

const resetPassword = (payload: {
  email: string;
  otp: string;
  password: string;
}) =>
  request()
    .post(`/reset-password`, payload)
    .then((res) => res.data.data)
    .catch(parseErrorResponse);

const verifyLogin = (
  payload: any
): Promise<{
  user: any;
  token: string;
}> =>
  new Promise((rs, rj) => {
    request()
      .post(`/verify-login`, payload)
      .then((res) => {
        const { data } = res.data;
        if (data) rs(data);
        else rj(new Error("Something went error"));
      })
      .catch(parseErrorResponse)
      .then(rj);
  });

const AuthServices = {
  register,
  login,
  verifyLogin,
  forgotPassword,
  resetPassword,
};

export default AuthServices;
