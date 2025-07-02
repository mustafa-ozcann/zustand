import { useParams } from 'react-router-dom'
import useUserStore from '../zustand/UserStor'
import { useNavigate } from 'react-router-dom'


function UserDetails() {

    const {id} = useParams();
    const navigate = useNavigate();
    const user = useUserStore((state) => state.users.find((user) => user.id === Number(id)));
    if (!user) {
        return <div>User not found</div>
    }

    const nextUser = () => {
      if (user.id === 10) {
        navigate(`/users/1`);
      } else {
        const nextId = user.id + 1;
        navigate(`/users/${nextId}`);
      }
    }
    const previousUser = () => {
      if (user.id === 1) {
        navigate(`/users/10`);
      } else {
        const previousId = user.id - 1;
        navigate(`/users/${previousId}`);
      }
    }


  return (
    <div className='flex flex-col items-center justify-center'>

    
      <div className='flex flex-col gap-4 mx-auto p-4 bg-white rounded-lg shadow-md mt-10 w-1/2'>
          <h1 className='text-2xl font-bold text-center'>User Details</h1>
          <div className='flex flex-col gap-2'>
          <p className='text-lg font-bold'>{user.name.firstname} {user.name.lastname}</p>
          <p className='text-sm text-gray-500'>{user.email}</p>
          <p className='text-sm text-gray-500'>{user.phone}</p>
          <div className='flex flex-col gap-2'>
          <p className='text-sm text-gray-500'>{user.address.city}</p>
          <p className='text-sm text-gray-500'>{user.address.street}</p>
          <p className='text-sm text-gray-500'>{user.address.number}</p>
          <p className='text-sm text-gray-500'>{user.address.zipcode}</p>
          <p className='text-sm text-gray-500'>{user.address.geolocation.lat}</p>
          <p className='text-sm text-gray-500'>{user.address.geolocation.long}</p>
          </div>
         
          </div>
          
      </div>
      <div className='flex gap-4'>
        <button className='bg-blue-500 text-white p-2 rounded-md' onClick={previousUser}>Previous User</button>
        <button className='bg-blue-500 text-white p-2 rounded-md' onClick={nextUser}>Next User</button>
      </div>
    </div>
  )
}

export default UserDetails