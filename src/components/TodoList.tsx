import React, { useState } from 'react';
import useTodoStore from '../zustand/todoStor';
import TodoItem from './TodoItem';
import type { Todo } from '../zustand/todoStor';

const TodoList: React.FC = () => {
  const [input, setInput] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Edit için ayrı state'ler
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editInput, setEditInput] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editImage, setEditImage] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const editTodo = useTodoStore((state) => state.editTodo);
  const handleAdd = () => { 
    if (input.trim() === '') return;
    addTodo(input, description, image);
    setInput('');
    setDescription('');
    setImage('');
    setIsModalOpen(false);
  };

  const handleEdit = () => {
    if (editInput.trim() === '' || !editingTodo) return;
    editTodo(editingTodo.id, editInput, editDescription, editImage);
    setEditInput('');
    setEditDescription('');
    setEditImage('');
    setEditingTodo(null);
    setIsEditModalOpen(false);
  };

  const openEditModal = (todo: Todo) => {
    setEditingTodo(todo);
    setEditInput(todo.title);
    setEditDescription(todo.description);
    setEditImage(todo.image);
    setIsEditModalOpen(true);
  };

  const modalOpen = () => {
    setIsModalOpen(true);
  }

  const modalClose = () => {
    setIsModalOpen(false);
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingTodo(null);
    setEditInput('');
    setEditDescription('');
    setEditImage('');
  }

  return (
    <div className='container mx-auto p-4 flex flex-col items-center justify-center gap-4'>
      <h1 className='text-2xl font-bold text-center'>Zustand Todo List</h1>

      <button onClick={isModalOpen ? modalClose : modalOpen} 

      className={`bg-blue-500 text-white p-2 rounded-md ${isModalOpen ? 'bg-red-500' : 'bg-blue-500 p-2'}`}>
        {isModalOpen ? 'close' : 'add todo'}
      </button>

      {isModalOpen && (
        <div className='flex flex-col items-center justify-center gap-4 w-1/2 bg-white p-4 rounded-md shadow-md'>
        <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Bir görev gir..."
        className='border border-gray-300 rounded-md p-2 w-1/2'
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Açıklama gir..."
        className='border border-gray-300 rounded-md p-2 w-1/2'
      />
      <input
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Resim URL gir..."
        className='border border-gray-300 rounded-md p-2 w-1/2'
      />

      <button onClick={handleAdd} className='bg-blue-500 text-white p-2 rounded-md '>Ekle</button>
      </div>
      )}

      {isEditModalOpen && (
        <div className='flex flex-col items-center justify-center gap-4 w-1/2 bg-white p-4 rounded-md shadow-md'>
          <h2 className='text-xl font-bold'>Todo Düzenle</h2>
          <input
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
            placeholder="Başlık..."
            className='border border-gray-300 rounded-md p-2 w-1/2'
          />
          <input
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Açıklama..."
            className='border border-gray-300 rounded-md p-2 w-1/2'
          />
          <input
            value={editImage}
            onChange={(e) => setEditImage(e.target.value)}
            placeholder="Resim URL..."
            className='border border-gray-300 rounded-md p-2 w-1/2'
          />
          <div className='flex gap-2'>
            <button onClick={handleEdit} className='bg-green-500 text-white p-2 rounded-md'>Güncelle</button>
            <button onClick={closeEditModal} className='bg-gray-500 text-white p-2 rounded-md'>İptal</button>
          </div>
        </div>
      )}

      

      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10'  >
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={() => deleteTodo(todo.id)}
            onEdit={() => openEditModal(todo)}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
