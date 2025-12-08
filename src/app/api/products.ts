import { parseErrorResponse, request } from "./request";
import qs from "query-string";

const create = (payload: any) =>
  new Promise((rs, rj) => {
    request()
      .post(`/products/create`, payload)
      .then((res) => {
        const { data } = res.data;
        if (data) rs(data);
        else rj(new Error("Something went error!"));
      })
      .catch(parseErrorResponse)
      .then(rj);
  });

const getAll = (req: any) =>
  new Promise((rs, rj) => {
    const query = qs.stringify(req.query);
    request()
      .get(`/products/?${query}`)
      .then((res) => {
        const { data } = res.data;
        if (data) rs(data);
        else rj(new Error("Something went error!"));
      })
      .catch(parseErrorResponse)
      .then(rj);
  });

const update = (id: string, payload: any) =>
  new Promise((rs, rj) => {
    request()
      .put(`/products/${id}`, payload)
      .then((res) => {
        const { data } = res.data;
        if (data) rs(data);
        else rj(new Error("Something went error!"));
      })
      .catch(parseErrorResponse)
      .then(rj);
  });

const getProductById = (req: any) =>
  new Promise((rs, rj) => {
    request()
      .get(`/products/${req.params.id}`)
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
      .delete("/products/" + req.params.id)
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

const ProductService = {
  create,
  getAll,
  update,
  getProductById,
  deleted,
};
export default ProductService;
