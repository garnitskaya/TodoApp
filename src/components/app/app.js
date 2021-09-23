import { Component } from "react";
import AppHeader from "../app-header";
import ItemAddForm from "../item-add-form";
import ItemStatusFilter from "../item-status-filter";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import "./app.css";

export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem("Drink Coffe"),
            this.createTodoItem("Make Awesome App"),
            this.createTodoItem("Have a lunch")
        ],
        term: '',
        filter: 'all' //active, all ,done
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    };

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex(el => el.id === id); //проверяем индекс в массиве равен ли он тому индексу, который передан

            const newArray = [
                ...todoData.slice(0, idx),//копируем массив до удаляемого элемента
                ...todoData.slice(idx + 1)];//копируем массив после удаляемого элемента

            return {
                todoData: newArray
            }
        });
    };


    addItem = (text) => {
        // genetare id
        const newItem = this.createTodoItem(text);
        // add element in array
        this.setState(({ todoData }) => {

            const newArray = [
                ...todoData,
                newItem
            ];

            return {
                todoData: newArray
            }
        })
    };

    toggleProperty(arr, id, propName) {
        //1. update object
        const idx = arr.findIndex(el => el.id === id); //проверяем индекс в массиве равен ли он тому индексу, который передан

        const oldItem = arr[idx];
        const newItem = { ...oldItem, [propName]: !oldItem[propName] };

        //2. construct new array
        return [
            ...arr.slice(0, idx),//копируем массив до обновляемого элемента
            newItem,//добавляем новый элемент
            ...arr.slice(idx + 1)//копируем массив после обновляемого элемента
        ];
    };

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        });
    };

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        });
    };

    search(items, term) {
        if (term.length === 0) {
            return items;
        }

        return items.filter((item) => item.label.toLowerCase()
            .indexOf(term.toLowerCase()) > -1);
    };

    filter(items, filter) {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    }

    onSearchChange = (term) => {
        this.setState({ term });
    };

    onFilterChange = (filter) => {
        this.setState({ filter });
    };

    render() {

        const { todoData, term, filter } = this.state;

        const visibleItems = this.filter(this.search(todoData, term), filter); //видимые на текущий момент элементы
        const doneCount = todoData.filter(el => el.done).length;//возвращаем все эл у которых done-true и считаем длину массива
        const toDoCount = todoData.length - doneCount;//весь массив минус выполненные элементы


        return (
            <div className="todo-app">
                <AppHeader toDo={toDoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={this.onSearchChange} />
                    <ItemStatusFilter
                        filter={filter}
                        onFilterChange={this.onFilterChange} />
                </div>

                <TodoList
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                    todos={visibleItems}
                    onDeleted={this.deleteItem} />

                <ItemAddForm onItemAdded={this.addItem} />
            </div>);
    };
};