import React, { useState } from 'react';
import useTodoStore from '../zustand/todoStor';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const [input, setInput] = useState('');
  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  const handleAdd = () => {
    if (input.trim() === '') return;
    addTodo(input);
    setInput('');
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold text-center'>Zustand Todo List</h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Bir görev gir..."
        className='border border-gray-300 rounded-md p-2 w-1/2'
      />
      <button onClick={handleAdd} className='bg-blue-500 text-white p-2 rounded-md '>Ekle</button>

      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10'  >
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => toggleTodo(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
