import { axios } from "@/lib";
import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import { User, UserResponse } from "@/types";

export const useAuth = () => {
    const router = useRouter();

    const [ready, setReady] = useState(false);
    const [user, setUser] = useState<User>({ id: 0, username: '', email: '', created: 0 });

    useEffect(() => {
        if (localStorage.getItem('token')) {
            axios.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            axios.get<UserResponse>('/api/auth/me')
                .then(res => {
                    setUser(res.data.data);
                    setReady(true);
                })
                .catch(err => {
                    delete axios.defaults.headers['Authorization'];
                    localStorage.removeItem('token');
                    router.push('/login');
                })
        }
        else {
            delete axios.defaults.headers['Authorization'];
            router.push('/login');
        }
    }, [])

    return {
        ready,
        user
    };
}