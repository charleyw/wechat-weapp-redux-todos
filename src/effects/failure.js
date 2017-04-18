import {showNotification} from '../actions/notificationActions';

export default (type, resource, payload, error) => [showNotification(error.message, 'warn')];
