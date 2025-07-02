import React, { useState, useEffect } from 'react';
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
  };

  const modalClose = () => {
    setIsModalOpen(false);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingTodo(null);
    setEditInput('');
    setEditDescription('');
    setEditImage('');
  };

  useEffect(() => {
    document.title = 'Todo List';
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <div className='container mx-auto p-6'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-800 mb-2'>Todo Uygulaması</h1>
          <p className='text-gray-600'>Zustand ile güçlendirilmiş modern todo yöneticisi</p>
        </div>

        {/* Add Todo Button */}
        <div className='flex justify-center mb-8'>
          <button 
            onClick={isModalOpen ? modalClose : modalOpen} 
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl ${
              isModalOpen 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white'
            }`}
          >
            {isModalOpen ? '✕ Kapat' : '+ Yeni Todo Ekle'}
          </button>
        </div>

        {/* Add Todo Modal */}
        {isModalOpen && (
          <div className='flex justify-center mb-8'>
            <div className='bg-white p-8 rounded-xl shadow-xl border border-gray-200 w-full max-w-md'>
              <h2 className='text-2xl font-bold text-gray-800 mb-6 text-center'>Yeni Todo Ekle</h2>
              <div className='space-y-4'>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Başlık girin..."
                  className='w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Açıklama girin..."
                  rows={3}
                  className='w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
                />
                <input
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Resim URL'si girin..."
                  className='w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
                <button 
                  onClick={handleAdd} 
                  className='w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 rounded-lg font-semibold transition-all duration-200'
                >
                  Todo Ekle
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Todo Modal */}
        {isEditModalOpen && (
          <div className='flex justify-center mb-8'>
            <div className='bg-white p-8 rounded-xl shadow-xl border border-gray-200 w-full max-w-md'>
              <h2 className='text-2xl font-bold text-gray-800 mb-6 text-center'>Todo Düzenle</h2>
              <div className='space-y-4'>
                <input
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                  placeholder="Başlık..."
                  className='w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Açıklama..."
                  rows={3}
                  className='w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
                />
                <input
                  value={editImage}
                  onChange={(e) => setEditImage(e.target.value)}
                  placeholder="Resim URL..."
                  className='w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
                <div className='flex gap-3'>
                  <button 
                    onClick={handleEdit} 
                    className='flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors duration-200'
                  >
                    Güncelle
                  </button>
                  <button 
                    onClick={closeEditModal} 
                    className='flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors duration-200'
                  >
                    İptal
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Todo Grid */}
        {todos.length === 0 ? (
          <div className='text-center py-16'>
            <div className='text-6xl mb-4'>📝</div>
            <h3 className='text-xl font-semibold text-gray-600 mb-2'>Henüz todo yok</h3>
            <p className='text-gray-500'>İlk todo'nuzu ekleyerek başlayın!</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={() => deleteTodo(todo.id)}
                onEdit={() => openEditModal(todo)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
