import React from 'react';
import type { Todo } from '../zustand/todoStor';

type Props = {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
};

const TodoItem: React.FC<Props> = ({ todo, onToggle, onDelete }) => {
  return (
    <li className='bg-white p-4 rounded-lg shadow-md flex justify-between items-center '>
      <span className='text-lg font-bold'
        onClick={onToggle}
        style={{
          cursor: 'pointer',
          textDecoration: todo.completed ? 'line-through' : 'none',
        }}
      >
        {todo.text}
      </span >
        <button onClick={onDelete} className='bg-red-500 text-white p-2 rounded-md ml-4'>
        Sil
      </button>
    </li>
  );
};

export default TodoItem;
