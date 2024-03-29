import html from './app.html?raw'
import todoStore from '../store/todo.store'
import { renderTodos, createTodoHtml } from './use-cases/index';


const ElementIDs = {
    TodoList: 'todo-list',
}


/**
 * 
 * @param {String} elementId 
 */

export const App = (elementId) =>{

    const displayTodos = () => {
        const todos =  todoStore.geTodos(todoStore.getcurrentFilter());
        renderTodos(ElementIDs.TodoList)
    }

    //cuando la funcion app() se llama
    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();


}