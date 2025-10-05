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
};
export default CategoryService;
