import TodoListItem from "../todo-list-item";
import "./todo-list.css";

const TodoList = ({ todos, onDeleted }) => {
    const elements = todos.map(item => {
        const { id, ...itemProps } = item;

        return (
            <li key={id} className="list-group-item">
                <TodoListItem
                    onDeleted={() => onDeleted(id)}
                    {...itemProps} /> {/* используем деструктуризацию, что бы не передавать лишние сво-во, которое не используется */}
            </li>)
    });

    return (
        <ul className="list-group todo-list">
            {elements}
        </ul>
    );
};

export default TodoList;