import { parseErrorResponse, request } from "./request";

const getAll = () =>
  new Promise((rs, rj) => {
    request()
      .get(`/users/`)
      .then((res) => {
        const { data } = res.data;
        if (data) rs(data);
        else rj(new Error("Something went error!"));
      })
      .catch(parseErrorResponse)
      .then(rj);
  });
const deleted = (req: { params: { id: string } }) =>
  new Promise((resolve, reject) => {
    request()
      .delete("/users/" + req.params.id)
      .then((res) => {
        const { data } = res.data;
        if (data) resolve(data);
        else {
          reject(new Error("Something went error"));
        }
      })
      .catch(parseErrorResponse)
      .then(reject);
  });

const create = (payload: any) =>
  new Promise((resolve, reject) => {
    request()
      .post(`/users/create`, payload)
      .then((res) => {
        const { data } = res.data;
        if (data) resolve(data);
        else reject(new Error("Something went wrong!"));
      })
      .catch(parseErrorResponse)
      .then(reject);
  });

const updated = (id: string, payload: any) =>
  new Promise((resolve, reject) => {
    request()
      .put(`/users/${id}`, payload)
      .then((res) => {
        const { data } = res.data;
        if (data) resolve(data);
        else reject(new Error("Something went error"));
      })
      .catch(parseErrorResponse)
      .then(reject);
  });
const UserService = {
  getAll,
  deleted,
  updated,
  create,
};

export default UserService;
