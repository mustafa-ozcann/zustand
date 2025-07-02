import { create } from 'zustand';
import axios from 'axios';

export type User = {
    id: number;
    email: string;
    username: string;
    name: {
      firstname: string;
      lastname: string;
    };
    address: {
      city: string;
      street: string;
      number: number;
      zipcode: string;
      geolocation: {
        lat: string;
        long: string;
      };
    };
    phone: string;
  };
  

  type UserState = {
    users: User[];
    loading: boolean;
    error: string | null;
    fetchUsers: () => Promise<void>;
};

const useUserStore = create<UserState>((set) => ({
    users: [],
    loading: false,
    error: null,
    fetchUsers: async () => {
        set({ loading: true, error: null });
        try {
                const response = await axios.get('https://fakestoreapi.com/users');
                set({ users: response.data, loading: false });
        } catch (error: unknown) {
            console.error('Error fetching users:', error);
            set({ error: 'Failed to fetch users', loading: false });
        }
    }
}));

export default useUserStore;