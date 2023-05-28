import { useState } from 'react';
import { axios } from '@/lib';
import { SignupResponse, SignupRequest } from '@/types';

export const useRegister = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    const clear = () => {
        setUsername('');
        setPassword('');
        setError(null);
    }

    const register = () => {
        if (password !== passwordConfirm) {
            setError('Passwords do not match');
            return;
        }
        setLoading(true);
        setError(null);
        axios.post<SignupResponse>('/api/auth/signup', { email, username, password } as SignupRequest)
            .then(response => {
                setSuccess(true);
            })
            .catch(error => {
                setError(error.response.data.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return {
        loading,
        error,
        username,
        password,
        email,
        passwordConfirm,
        success,
        setEmail,
        setPasswordConfirm,
        setUsername,
        setPassword,
        register,
    };
};