import { create } from 'zustand';

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type TodoAction = {
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  setLoading: (loading: boolean) => void;
};

type TodoState = {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  loading: boolean;
};

/** 
const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  loading: false,

  addTodo: (text: string) =>
    set((state) => ({
      todos: [
        ...state.todos,
        { id: Date.now(), text, completed: false },
      ],
    })),

  toggleTodo: (id: number) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      ),
    })),

  deleteTodo: (id: number) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
}));

export default useTodoStore;
