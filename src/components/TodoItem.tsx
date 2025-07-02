import React from 'react';
import type { Todo } from '../zustand/todoStor';

type Props = {
  todo: Todo;
  
  onDelete: () => void;
  onEdit: () => void;
};

const TodoItem: React.FC<Props> = ({ todo, onDelete, onEdit }) => {
  return (
    <li className='bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200'>
      {/* Resim Alanı */}
      <div className='relative h-40 w-50 overflow-hidden'>
        {todo.image ? (
          <img 
            src={todo.image} 
            alt={todo.title}
            className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/300x200/f3f4f6/9ca3af?text=No+Image';
            }}
          />
        ) : (
          <div className='w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center'>
            <span className='text-gray-400 text-sm'>Resim Yok</span>
          </div>
        )}
      </div>

      {/* İçerik Alanı */}
      <div className='p-6'>
        <h3 className='text-xl font-bold text-gray-800 mb-2 line-clamp-2'>{todo.title}</h3>
        <p className='text-gray-600 text-sm mb-4 line-clamp-3'>{todo.description}</p>
        
        {/* Butonlar */}
        <div className='flex gap-3 mt-auto'>
          <button 
            onClick={onEdit}
            className='flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium'
          >
            Düzenle
          </button>
          <button 
            onClick={onDelete}
            className='flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium'
          >
            Sil
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
