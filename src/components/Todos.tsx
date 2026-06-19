import {type ListOfTodos, type TodoId, type TodoTitle, type Todo as TodoType} from '../types.ts';
import {Todo} from './Todo.tsx';

interface Props {
    todos: ListOfTodos;
    onToggleComplete: ({id, completed}: Pick<TodoType, 'id' | 'completed'>) => void;
    onRemoveTodo : (id: TodoId) => void;
    onUpdateTitle: (id: TodoId, { title }: TodoTitle) => void;
}

export const Todos: React.FC<Props> = ({todos, onToggleComplete, onRemoveTodo, onUpdateTitle}) => {
    return(
        <ul className = "todo-list">
            {todos.map(todo => (
                <Todo 
                key={todo.id} 
                id = {todo.id}
                title = {todo.title}
                completed = {todo.completed}
                onToggleComplete={onToggleComplete}
                onRemoveTodo={onRemoveTodo}
                onUpdateTitle={onUpdateTitle}
                />
            ))}
        </ul>
    );
}
