import { parseErrorResponse, request } from "./request";

const create = (payload: any) =>
  new Promise((rs, rj) => {
    request()
      .post(`/categories/create`, payload)
      .then((res) => {
        const { data } = res.data;
        if (data) rs(data);
        else rj(new Error("Something went error!"));
      })
      .catch(parseErrorResponse)
      .then(rj);
  });

const getAll = () =>
  new Promise((rs, rj) => {
    request()
      .get(`/categories/`)
      .then((res) => {
        const { data } = res.data;
        if (data) rs(data);
        else rj(new Error("Something went error!"));
      })
      .catch(parseErrorResponse)
      .then(rj);
  });
const update = (req: { params: { id: string }; body: any }) =>
  new Promise((resolve, reject) => {
    request()
      .put("/categories/" + req.params.id, req.body)
      .then((res) => {
        const { data } = res.data;
        if (data) resolve(data);
        else reject(new Error("Something went error"));
      })
      .catch(parseErrorResponse)
      .then(reject);
  });

const deleted = (req: { params: { id: string } }) =>
  new Promise((resolve, reject) => {
    request()
      .delete("/categories/" + req.params.id)
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

const CategoryService = {
  create,
  getAll,
  deleted,
  update,
};
export default CategoryService;
