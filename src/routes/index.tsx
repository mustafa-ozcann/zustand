
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom'

// lazy loading
const Users = lazy(() => import('../components/Users'));
const TodoList = lazy(() => import('../components/TodoList'));
const UserDetails = lazy(() => import('../components/UserDetails'));
const Test2 = lazy(() => import('../components/Test2'));

function index() {
  return (
    <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/todo" element={<TodoList />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/test" element={<Test2 />} />
    </Routes>
  )
}

export default index