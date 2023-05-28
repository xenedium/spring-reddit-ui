import { useState } from 'react';
import { useRouter } from 'next/router';
import { axios } from '@/lib';
import { LoginRequest, LoginResponse } from '@/types';

export const useLogin = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    const clear = () => {
        setUsername('');
        setPassword('');
        setError(null);
    }

    const login = () => {
        setLoading(true);
        setError(null);
        axios.post<LoginResponse>('/api/auth/login', { username, password } as LoginRequest)
            .then(response => {
                response.data.token && localStorage.setItem('token', response.data.token);
                axios.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;
                router.push('/');
            })
            .catch(error => {
                setError(error.response.data.message);
                setLoading(false);
            })
    }

    return {
        loading,
        error,
        username,
        password,
        setUsername,
        setPassword,
        login,
    };
};