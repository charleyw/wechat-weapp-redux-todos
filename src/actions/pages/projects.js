export const SHOW_PROJECT_FORM = 'SHOW_PROJECT_FORM';
export const HIDE_PROJECT_FORM = 'HIDE_PROJECT_FORM';

export const SHOW_TODO_FORM = 'SHOW_TODO_FORM';
export const HIDE_TODO_FORM = 'HIDE_TODO_FORM';

export function showProjectForm() {
  return {
    type: SHOW_PROJECT_FORM
  }
}

export function hideProjectForm() {
  return {
    type: HIDE_PROJECT_FORM
  }
}

export function showTodoForm() {
  return {
    type: SHOW_TODO_FORM
  }
}

export function hideTodoForm() {
  return {
    type: HIDE_TODO_FORM
  }
}
