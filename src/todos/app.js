import html from './app.html?raw'
import todoStore, { Filters } from '../store/todo.store'
import { renderTodos, renderPending } from './use-cases'


const ElementIDs = {
    ClearCompleted: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    DeleteTodo: '.destroy',
    SelectedFilter: '.filtro',
    PendingCountTarget: '#pending-count',
}


/**
 * 
 * @param {String} elementId 
 */

export const App = (elementId) =>{

    const displayTodos = () => {
        const todos =  todoStore.getTodos(todoStore.getcurrentFilter());
        renderTodos(ElementIDs.TodoList, todos)
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPending(ElementIDs.PendingCountTarget);
    }

    //cuando la funcion app() se llama
    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    //Referencias HTML
    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
    const todoListUL =  document.querySelector(ElementIDs.TodoList);
    const clearCompletedButton = document.querySelector(ElementIDs.ClearCompleted);
    const selectedFilter = document.querySelectorAll(ElementIDs.SelectedFilter);



    //Listeners

    newDescriptionInput.addEventListener('keyup', (event)=>{
        if(event.keyCode !== 13) return;
        if(event.target.value.trim().length === 0) return;

        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';
    });

    todoListUL.addEventListener('click', (event)=>{
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    todoListUL.addEventListener('click', (event)=>{
        const isDestroyeElement = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');
        if( !element || !isDestroyeElement ) return;
        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
    })

    clearCompletedButton.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    selectedFilter.forEach(element =>{
        element.addEventListener('click', (element) =>{
            selectedFilter.forEach(el => el.classList.remove('selected'));
            element.target.classList.add('selected');
            
            switch( element.target.text){
                case 'Todos':
                    todoStore.setFilter(Filters.All);
                    break;
                case 'Completados':
                    todoStore.setFilter(Filters.Completed);
                    break;
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending);
                    break;
            }

            displayTodos();
        })

    });
}