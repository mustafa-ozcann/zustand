import { create } from 'zustand';

export type Todo = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  image: string;
  
};

type TodoState = {
  todos: Todo[];
  addTodo: (title: string, description: string, image: string) => void;
  
  deleteTodo: (id: number) => void;
  editTodo: (id: number, title: string, description: string, image: string) => void;
  loading: boolean;

};

const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  loading: false,

  addTodo: (title: string, description: string, image: string) =>
    set((state) => ({
      todos: [
        ...state.todos,
        { id: Date.now(), title, description, image, completed: false },
      ],
    })),
    

  

  editTodo: (id: number, title: string, description: string, image: string) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id
          ? { ...todo, title, description, image }
          : todo
      ),
    })),

  deleteTodo: (id: number) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
}));

export default useTodoStore;
