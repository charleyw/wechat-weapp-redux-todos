import {crudCreate} from './dataActions'

export const addTodo = (projectId, name) => (crudCreate('todos', {name}, `projects/${projectId}/todos`));
export const addProject = (name) => (crudCreate('projects', {name}));
