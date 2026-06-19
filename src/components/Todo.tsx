import React, { useEffect } from 'react';
import {type TodoId, type TodoTitle, type Todo as TodoType} from '../types.ts';

interface Props extends TodoType {
    onToggleComplete: ({id, completed}: Pick<TodoType, 'id' | 'completed'>) => void;
    onRemoveTodo : (id: TodoId) => void;
    onUpdateTitle: (id: TodoId, { title }: TodoTitle) => void;
}

export const Todo: React.FC<Props> = ({id, title, completed, onRemoveTodo, onToggleComplete, onUpdateTitle}) => {

    const [isEditing, setIsEditing] = React.useState(false);
    const [editTitle, setEditTitle] = React.useState(title);
    const inputRef = React.useRef<HTMLInputElement>(null);
        
    // Auto-foco cuando el usuario entra a editar
    useEffect(() => {
            if (isEditing) {
                inputRef.current?.focus();
            }
        }, [isEditing]);

    const handleSubmit = () => {
            const trimmedText = editTitle.trim();
        if (trimmedText !== title && trimmedText !== '') {
            // Guardamos el cambio llamando a la función de App.tsx
            onUpdateTitle({ id }, { title: trimmedText });
        } else if (trimmedText === '') {
            onRemoveTodo({ id }); // Si lo borra todo, la especificación TodoMVC dice que se elimina
        }
        setIsEditing(false);
    };

    return(
        <li className={`${completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
            
            {/* VISTA NORMAL */}
            <div className="view">
                <input 
                    className="toggle" 
                    type="checkbox" 
                    checked={completed}
                    onChange={(event) => {
                        onToggleComplete({ id, completed: event.target.checked });
                    }} 
                />
                
            
                <label onDoubleClick={() => setIsEditing(true)}>
                    {title}
                </label>
                
                <button 
                    className="destroy" 
                    onClick={() => onRemoveTodo({ id })}
                />
            </div>
            
            {/* VISTA DE EDICIÓN */}
            <input
                ref={inputRef}
                className="edit"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onBlur={handleSubmit} // Si pinchas fuera, guarda
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSubmit();
                    if (e.key === 'Escape') {
                        setEditTitle(title); // Cancela
                        setIsEditing(false);
                    }
                }}
            />
        </li>
    );
};