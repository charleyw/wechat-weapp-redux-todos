import {crudCreate, crudGetList} from './dataActions'

export const addTodo = (projectId, name) => (crudCreate('todos', {name}, `projects/${projectId}/todos`, {projectId: projectId}));

export const addProject = (name) => (crudCreate('projects', {name}));
export const fetchProjects = () => (crudGetList('projects'));
