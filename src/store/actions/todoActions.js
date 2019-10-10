import _ from "lodash";
import { errorToString } from "../../helpers/index";
import todosService from "../../services/todos.service";

const columns = ["title", "description", "due", "completed", "author"];

export function retrieveTodos() {
  return async function(dispatch) {
    const { data: todos } = await todosService.getMyTodos();
    return dispatch({ type: "SET_TODOS", todos });
  };
}

export function createTodo(todo) {
  return async function(dispatch) {
    const newTodo = { ...todo, _id: 0 };

    dispatch({ type: "CREATE_TODO", todo: newTodo });
    const { data } = await todosService.postTodo(_.pick(todo, columns));
    dispatch({ type: "UPDATE_TODO", todo: data, _id: 0 });
  };
}

export function updateTodo(todo) {
  return async function(dispatch, getState) {
    const { todos } = getState();
    const tmpTodo = todos.find(t => t._id === todo._id);

    try {
      dispatch({ type: "UPDATE_TODO", todo });
      await todosService.patchTodo(todo._id, _.pick(todo, columns));
    } catch (ex) {
      dispatch({ type: "UPDATE_TODO", todo: tmpTodo });
      return { error: errorToString(ex.response.data) };
    }
  };
}

export function deleteTodo(todo) {
  return async function(dispatch) {
    try {
      dispatch({ type: "DELETE_TODO", todo });
      await todosService.deleteTodo(todo._id, todo);
    } catch (ex) {
      dispatch({ type: "CREATE_TODO", todo });
    }
  };
}

function validate(todo) {
  // Joi validation here

  if (!todo.title) return { error: "Title can't be empty" };

  // Joi implementation returns an Object whether true or false
  return {};
}
