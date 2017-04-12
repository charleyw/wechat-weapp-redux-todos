import { queryParameters, fetchJson } from '../utils/fetch';
import {
    GET_LIST,
    GET_ONE,
    CREATE,
    UPDATE,
    DELETE,
} from './types';

export default (apiUrl, httpClient = fetchJson) => {
    const convertRESTRequestToHTTP = (type, resource, params) => {
        let url = '';
        const options = {};
        switch (type) {
        case GET_LIST: {
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            const query = {
                sort: JSON.stringify([field, order]),
                range: JSON.stringify([(page - 1) * perPage, (page * perPage) - 1]),
                filter: JSON.stringify(params.filter),
            };
            url = `${apiUrl}/${resource}?${queryParameters(query)}`;
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
            url = `${apiUrl}/${resource}`;
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
        return { url, options };
    };

    /**
     * @param {Object} response HTTP response from fetch()
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The REST request params, depending on the type
     * @returns {Object} REST response
     */
    const convertHTTPResponseToREST = (response, type, resource, params) => {
        const { data } = response;
        switch (type) {
        case GET_LIST:
            return {
                data: json.map(x => x),
                total: parseInt(headers.get('content-range').split('/').pop(), 10),
            };
        default:
            return data;
        }
    };

    return (type, resource, params) => {
        const { url, options } = convertRESTRequestToHTTP(type, resource, params);
        return httpClient(url, options)
            .then(response => convertHTTPResponseToREST(response, type, resource, params));
    };
};
