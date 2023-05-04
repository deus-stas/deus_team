import { fetchUtils } from "react-admin";
import { stringify } from "query-string";

const apiUrl = process.env.NODE_ENV === 'production'
  ? 'http://188.120.232.38/api'
  : 'http://localhost:5000/api';

const httpClient = fetchUtils.fetchJson;

const dataProvider = {
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const { q, ...filters } = params.filter; // оставляем только фильтры, не связанные с полем q (поисковый запрос)
    const query = {
      ...filters,
      _sort: field,
      _order: order,
      _start: (page - 1) * perPage,
      _limit: perPage,
      _fields: params.fields // добавляем параметр fields
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
    const images = ['image', 'bannerFirst', 'bannerSecond', 'bannerThird', 'bannerFourth', 'bannerFifth', 'video'];
    let hasImage = false; // флаг, указывающий на наличие картинки в параметрах запроса
    for (const [key, value] of Object.entries(params.data)) {
      if (images.includes(key) && value) {
        hasImage = true;
        formData.append(key, value.rawFile);
      } else {
        if (key === "awardProject") {
          value.forEach((item, index) => {
            Object.keys(item).forEach((itemKey) => {
              formData.append(`awardProject[${index}][${itemKey}]`, item[itemKey]);
            });
          });
        } else if (key === "raitingProject") {
          value.forEach((item, index) => {
            Object.keys(item).forEach((itemKey) => {
              formData.append(`raitingProject[${index}][${itemKey}]`, item[itemKey]);
            });
          });
        } else {
          formData.append(key, value);
        }
      }
    }
    return httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: hasImage ? formData : JSON.stringify(params.data),
    }).then(({ json }) => ({ data: { ...params.data, id: json.id } }));
  },

  update: (resource, params) => {
    const formData = new FormData();
    const images = ['image', 'bannerFirst', 'bannerSecond', 'bannerThird', 'bannerFourth', 'bannerFifth', 'video'];
    let hasImage = false; // флаг, указывающий на наличие картинки в параметрах запроса

    for (const [key, value] of Object.entries(params.data)) {
      if (images.includes(key) && value) {
        hasImage = true;
        formData.append(key, value.rawFile);
      } else {
        if (key === "awardProject") {
          value.forEach((item, index) => {
            Object.keys(item).forEach((itemKey) => {
              formData.append(`awardProject[${index}][${itemKey}]`, item[itemKey]);
            });
          });
        } else if (key === "raitingProject") {
          value.forEach((item, index) => {
            Object.keys(item).forEach((itemKey) => {
              formData.append(`raitingProject[${index}][${itemKey}]`, item[itemKey]);
            });
          });
        } else {
          formData.append(key, value);
        }
      }
    }

    const url = `${apiUrl}/${resource}/${params.id}`;

    const options = {
      method: "PUT",
      body: hasImage ? formData : JSON.stringify(params.data),
    };

    return httpClient(url, options).then(({ json }) => ({ data: json }));
  },

  updateMany: (resource, params) => {
    const query = {
      id: params.ids.join(','),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    return httpClient(url, {
      method: 'PATCH',
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