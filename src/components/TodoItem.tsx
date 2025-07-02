import React from 'react';
import type { Todo } from '../zustand/todoStor';

type Props = {
  todo: Todo;
  
  onDelete: () => void;
  onEdit: () => void;
};

const TodoItem: React.FC<Props> = ({ todo, onDelete, onEdit }) => {
  return (
    <li className='flex flex-col items-center justify-center gap-4 w-full h-full bg-white p-4 rounded-lg shadow-md  '>
      <span className='flex flex-col items-center justify-center gap-4 w-full h-full font-bold '>
          <div className='flex flex-col items-center justify-center gap-4 w-full h-full'>
            <h1 className='text-lg font-bold text-center'>{todo.title}</h1>
            <p className='text-sm text-gray-500 text-center'>{todo.description}</p>
            <img src={todo.image} className='w-20 h-20 rounded-md' />

            <button onClick={onDelete} className='bg-red-500 text-white p-2 rounded-md ml-4 w-20 h-10 gap-4 '>
            Delete
        </button>
          <button onClick={onEdit} className='bg-blue-500 text-white p-2 rounded-md w-20 h-10 gap-4 '>
            Edit
          </button>
        </div>
      </span >
    </li>
  );
};

export default TodoItem;
