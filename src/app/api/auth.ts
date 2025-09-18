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

const AuthServices = {
  register,
};

export default AuthServices;
