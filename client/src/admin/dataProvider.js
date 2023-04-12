import { fetchUtils } from "react-admin";
import { stringify } from "query-string";

const apiUrl = "http://localhost:5000/api"; // URL вашего Express сервера

const httpClient = fetchUtils.fetchJson;

const dataProvider = {
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      ...params.filter,
      _sort: field,
      _order: order,
      _start: (page - 1) * perPage,
      _limit: perPage,
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => ({
      data: json,
      total: parseInt(headers.get("content-range").split("/").pop(), 10),
    }));
  },

  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
      data: json,
    })),

  getMany: (resource, params) => {
    const query = {
      id: params.ids.map(id => id).join(','),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ json }) => ({ data: json }));
  },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      ...params.filter,
      [params.target]: params.id,
      _sort: field,
      _order: order,
      _start: (page - 1) * perPage,
      _limit: perPage
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => {
      return {
        data: json,
        total: parseInt(headers.get('content-range').split('/').pop(), 10),
      };
    });
  },

  create: (resource, params) => {
    const formData = new FormData();
    formData.append("image", params.data.image.rawFile);
    formData.append("name", params.data.name);
    formData.append("tags", params.data.tags);
    formData.append("body", params.data.body);
    return httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: formData,
    }).then(({ json }) => ({ data: { ...params.data, id: json.id } }));
  },

  update: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json })),

  updateMany: (resource, params) => {
    const query = {
      id: params.ids.map(id => id).join(','),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }));
  },

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
    }).then(({ json }) => ({ data: json })),

  deleteMany: (resource, params) => {
    const requests = params.ids.map(id =>
      httpClient(`${apiUrl}/${resource}/${id}`, {
        method: 'DELETE',
      })
    );
    return Promise.all(requests).then(responses => ({
      data: responses.map(({ json }) => json),
    }));
  },
};

export default dataProvider;