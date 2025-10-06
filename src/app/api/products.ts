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

const ProductService = {
  create,
  getAll,
};
export default ProductService;
