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
};

export default AuthServices;
