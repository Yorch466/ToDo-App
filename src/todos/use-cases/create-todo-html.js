import { Todo } from "../models/todo.model"

/**
 * 
 * @param {Todo} todo 
 */
export const createTodoHtml = (todo) =>{

    if(!todo) throw new Error(' A TODO object is required');

    const html = `<h1>${ todo.description }</h1>`;

    const liElment = document.createElement('li');

    liElment.innerHTML = html;

    return liElment;
}