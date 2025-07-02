
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom'

// lazy loading
const Users = lazy(() => import('../components/Users'));
const TodoList = lazy(() => import('../components/TodoList'));
const UserDetails = lazy(() => import('../components/UserDetails'));
const Test = lazy(() => import('../components/Test'));
const Login = lazy(() => import('../pages/Login'));

function index() {
  return (
    <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/todo" element={<TodoList />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/test" element={<Test />} />
        <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default index