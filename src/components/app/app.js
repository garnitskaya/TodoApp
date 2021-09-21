import { Component } from "react";
import AppHeader from "../app-header";
import ItemStatusFilter from "../item-status-filter";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import "./app.css";

export default class App extends Component {

    state = {
        todoData: [
            { label: "Drink Coffe", important: false, id: 1 },
            { label: "Make Awesome App", important: true, id: 2 },
            { label: "Have a lunch", important: false, id: 3 },
        ]
    };

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex(el => el.id === id); //проверяем индекс в массиве равен ли он тому индексу, который передан

            const newArray = [
                ...todoData.slice(0, idx),//копируем массив до удаляемого элемента
                ...todoData.slice(idx + 1)];//копируем массив после удаляемого элемента

            return {
                todoData: newArray//
            }
        });
    };

    render() {
        return (
            <div className="todo-app">
                <AppHeader toDo={1} done={3} />
                <div className="top-panel d-flex">
                    <SearchPanel />
                    <ItemStatusFilter />
                </div>
                <TodoList
                    todos={this.state.todoData}
                    onDeleted={this.deleteItem} />
            </div>);
    };
};