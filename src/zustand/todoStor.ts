import { create } from 'zustand';

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};



type TodoState = {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  loading: boolean;

};

const mustafa = {
  name: 'mustafa',
  age: 20,
  city: 'istanbul',
  country: 'turkey',
  email: 'mustafa@gmail.com',
  phone: '1234567890',
  address: 'istanbul',
}



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
    mustafa,

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
