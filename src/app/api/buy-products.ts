import { parseErrorResponse, request } from "./request";

const create = (payload: any) =>
  new Promise((rs, rj) => {
    request()
      .post(`/buy-products/create`, payload)
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
      .get(`/buy-products/`)
      .then((res) => {
        const { data } = res.data;
        if (data) rs(data);
        else rj(new Error("Something went error!"));
      })
      .catch(parseErrorResponse)
      .then(rj);
  });

const BuyProductService = {
  create,
  getAll,
};
export default BuyProductService;
