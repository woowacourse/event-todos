const TODOAPP = (function () {
    'use strict';

    const ENTER_KEY = 13
    const ESC_KEY = 27
    const todoTemplate =
        "<li>"+
        "<div class=\"view\">"+
        "<input class=\"toggle\" type=\"checkbox\">"+
        "<label class='label'>{{todoTitle}}</label>"+
        "<button class=\"destroy\"></button>"+
        "</div>"+
        "<input class=\"edit\" value=\"{{todoTitle}}\">"+
        "</li>"

    const todoItemTemplate = Handlebars.compile(todoTemplate);

    const TodoController = function () {
        const todoService = new TodoService()
        const todoList = document.getElementById('todo-list')

        const canAddTodo = function () {
            const todoTitle = document.getElementById('new-todo-title')
            todoTitle.addEventListener('keydown', todoService.add)
        }

        const canCompleteTodo = function () {
            todoList.addEventListener('click', function (event) {
                if (event.target.classList.contains('toggle')) {
                    todoService.toggle(event)
                }
            })
        }

        const canDeleteTodo = function () {
            todoList.addEventListener('click', function (event) {
                if (event.target.classList.contains('destroy')) {
                    todoService.destroy(event)
                }
            })
        }

        const canUpdateTodo = function () {
            todoList.addEventListener('dblclick', function (event) {
                if (event.target.classList.contains('label')) {
                    todoService.focus(event)
                }
            })
        }

        const init = function () {
            canAddTodo()
            canCompleteTodo()
            canDeleteTodo()
            canUpdateTodo()
        }

        return {
            init: init
        }
    }


    const TodoService = function () {
        const add = function (event) {
            const todoTitle = event.target.value
            const todoList = document.getElementById('todo-list')
            if (event.which === ENTER_KEY && todoTitle !== ''){
                todoList.insertAdjacentHTML('beforeend', todoItemTemplate({"todoTitle":todoTitle}))
                event.target.value = ''
            }
        }

        const destroy = function (event) {
            const result = confirm("정말로 삭제하시겠습니까?");
            if (result === true) {
                event.target.parentElement.parentElement.remove()
            }
        }

        const toggle = function (event) {
            event.target.parentElement.parentElement.classList.toggle('completed')
        }

        const focus = function (event) {
            const updatedElement = event.target.closest('li')
            updatedElement.classList.toggle('editing')
            updatedElement.addEventListener('keydown', update)
        }

        const update = function (event) {
            const updatedElement = event.target.closest('li')
            const inputValue = updatedElement.querySelector('input.edit').value
            if (event.which === ESC_KEY) {
                updatedElement.classList.toggle('editing')
            }
            if (event.which === ENTER_KEY && inputValue !== ''){
                updatedElement.querySelector('label').innerText = inputValue
                updatedElement.classList.toggle('editing')
            }
        }

        return {
            add:add,
            toggle:toggle,
            destroy:destroy,
            focus: focus
        }
    }

    const init = function () {
        const todoController = new TodoController()
        todoController.init()
    };

    return {
        init: init,
    };
})();

TODOAPP.init();
