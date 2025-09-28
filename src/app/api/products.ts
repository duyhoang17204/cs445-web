import { parseErrorResponse, request } from "./request";

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

const ProductService = {
  create,
};
export default ProductService;
