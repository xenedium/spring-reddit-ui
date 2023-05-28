import { HeaderMenu } from '@/components/Header';
import { User, UserResponse } from '@/types';
import { AppShell, LoadingOverlay } from '@mantine/core';
import { useEffect, useState } from 'react';
import { axios } from '@/lib';
import { useRouter } from 'next/router';

export default function Home() {

    const [user, setUser] = useState<User>({
        id: 0,
        username: '',
        email: '',
        created: '',
    })
    const [loading, setLoading] = useState<boolean>(true)
    const router = useRouter()

    const ClearAndRedirectToLogin = () => { localStorage.removeItem('token'); router.push('/login') }

    useEffect(() => {
        let token = localStorage.getItem('token')
        if (!token) {
            ClearAndRedirectToLogin()
            return;
        }
        setLoading(false)
        /*
        axios.get<UserResponse>('/auth/me')
            .then((res) => {
                setLoading(false)
                setUser(res.data.data)
            })
            .catch(() => {
                ClearAndRedirectToLogin()
            })
        */
    }, [])

    return (
        <>
            {loading ? <LoadingOverlay visible={loading} /> :
                <AppShell
                    padding="md"
                    header={<HeaderMenu {...user} />}
                >
                </AppShell>}
        </>
    );
}