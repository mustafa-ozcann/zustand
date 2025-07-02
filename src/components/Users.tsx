import { useEffect } from 'react'
import useUserStore, { type User } from '../zustand/UserStor'
import { useNavigate } from 'react-router-dom'

function Users() {
    const users = useUserStore((state) => state.users);
    const loading = useUserStore((state) => state.loading);
    const error = useUserStore((state) => state.error);
    const fetchUsers = useUserStore((state) => state.fetchUsers);

    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleClick = (user: User) => {
        navigate(`/users/${user.id}`)
        

    }

  return (
    <div className='container mx-auto p-4'>
        {loading && <p className='text-center text-gray-500'>Loading...</p>}
        {error && <p>Error: {error}</p>}

        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {users.map( (user) => (
                <li key={user.id} className='bg-white p-4 rounded-lg shadow-md' onClick={() => handleClick(user)}>
                    <h3>{user.name.firstname} {user.name.lastname}</h3>
                
                </li>
            ))}
        </ul>

    </div>
  )
}

export default Users