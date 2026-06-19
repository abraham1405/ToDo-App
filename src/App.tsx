import { useState } from 'react'
import {Todos} from './components/Todos'
import type { FilterSelected, TodoId, TodoTitle, Todo as TodoType } from './types'
import { TODO_FILTERS } from './consts'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

const mocksTodo = [
  {
    id: '1',
    title: 'Learn React',
    completed: true,
  },
  {
    id: '2',
    title: 'Build a To-Do App',
    completed: false,
  },
  {
    id: '3',
    title: 'Deploy the App',
    completed: false,
  },
]
function App() {
  const [todos, setTodos] = useState(mocksTodo)
  const [filterSelected, setFilterSelected] = useState<FilterSelected>(TODO_FILTERS.ALL)

  const handleRemove = ({ id }: TodoId) : void => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const handleComplete = (
    { id, completed }: Pick<TodoType, 'id' | 'completed'>
  ) : void => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed }
      }
      return todo
    })
    setTodos(newTodos)
  }

  const handleFilterChange = (filter: FilterSelected): void => {
    setFilterSelected(filter);
  }

  const handleRemoveAllCompleted = (): void => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }
  
  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.length - activeCount;

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed;
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed;
    return todo;
  });

  const handleAddTodo = ({ title }: TodoTitle): void => {
    const newTodo = {
      title,
      id: crypto.randomUUID(),
      completed: false,
    };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  }

  const handleUpdateTitle = ({ id }: TodoId, { title }: TodoTitle): void => {
      const newTodos = todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            title // Actualizamos solo el título
          }
        }
        return todo
      })
      setTodos(newTodos)
    }

  return (
    <div className="todoapp">
      <Header onAddTodo={handleAddTodo}/>
      <Todos
       todos={filteredTodos}
       onRemoveTodo={handleRemove}
       onToggleComplete={handleComplete}
       onUpdateTitle={handleUpdateTitle}
       />
      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        onClearCompleted={handleRemoveAllCompleted}
        handleFilterChange={handleFilterChange}
      />
    </div>
  )
}

export default App
