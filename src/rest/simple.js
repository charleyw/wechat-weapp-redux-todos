import {queryParameters, fetchJson} from '../utils/fetch';
import {
  GET_LIST,
  GET_ONE,
  CREATE,
  UPDATE,
  DELETE,
} from './types';

export default (apiUrl, httpClient = fetchJson) => {
  const convertRESTRequestToHTTP = (type, resource, params, auth) => {
    let url = '';
    const options = {auth};
    const {basePath} = params;
    switch (type) {
      case GET_LIST: {
        const query = {
          filter: JSON.stringify(params.filter),
        };
        url = `${apiUrl}/${basePath ? basePath : resource}?${queryParameters(query)}`;
        break;
      }
      case GET_ONE:
        url = `${apiUrl}/${resource}/${params.id}`;
        break;
      case UPDATE:
        url = `${apiUrl}/${resource}/${params.id}`;
        options.method = 'PUT';
        options.data = JSON.stringify(params.data);
        break;
      case CREATE:
        url = `${apiUrl}/${basePath ? basePath : resource}`;
        options.method = 'POST';
        options.data = JSON.stringify(params.data);
        break;
      case DELETE:
        url = `${apiUrl}/${resource}/${params.id}`;
        options.method = 'DELETE';
        break;
      default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }
    return {url, options};
  };

  /**
   * @param {Object} response HTTP response from fetch()
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The REST request params, depending on the type
   * @returns {Object} REST response
   */
  const convertHTTPResponseToREST = (response, type, resource, params) => {
    const {data} = response;
    switch (type) {
      case GET_LIST:
        return data;
      default:
        return data;
    }
  };

  return (type, resource, params, auth = undefined) => {
    const {url, options} = convertRESTRequestToHTTP(type, resource, params, auth);
    return httpClient(url, options)
      .then(response => convertHTTPResponseToREST(response, type, resource, params));
  };
};
