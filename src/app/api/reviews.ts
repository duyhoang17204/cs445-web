import { parseErrorResponse, request } from "./request";

const getAll = (product_id: string) =>
  new Promise((resolve, reject) => {
    if (!product_id) return reject(new Error("product_id is required"));
    request()
      .get(`/reviews/${product_id}`)
      .then((res) => {
        const { data } = res.data;
        if (data) resolve(data);
        else reject(new Error("Something went wrong!"));
      })
      .catch(parseErrorResponse)
      .then(reject);
  });

const create = (payload: any) =>
  new Promise((resolve, reject) => {
    request()
      .post(`/reviews`, payload)
      .then((res) => {
        const { data } = res.data;
        if (data) resolve(data);
        else reject(new Error("Something went wrong!"));
      })
      .catch(parseErrorResponse)
      .then(reject);
  });

const update = (id: string, payload: any) =>
  new Promise((resolve, reject) => {
    if (!id) return reject(new Error("Review ID is required"));
    request()
      .put(`/reviews/${id}`, payload)
      .then((res) => {
        const { data } = res.data;
        if (data) resolve(data);
        else reject(new Error("Something went wrong!"));
      })
      .catch(parseErrorResponse)
      .then(reject);
  });

const deleted = (id: string) =>
  new Promise((resolve, reject) => {
    if (!id) return reject(new Error("Review ID is required"));
    request()
      .delete(`/reviews/${id}`)
      .then((res) => {
        const { data } = res.data;
        if (data) resolve(data);
        else reject(new Error("Something went wrong!"));
      })
      .catch(parseErrorResponse)
      .then(reject);
  });

const ReviewService = {
  getAll,
  create,
  update,
  deleted,
};

export default ReviewService;
