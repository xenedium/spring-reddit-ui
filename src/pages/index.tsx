import { HeaderMenu } from '@/components/Header';
import { axios } from '@/lib';
import { LoginRequest, LoginResponse } from '@/types';
import { AppShell } from '@mantine/core';

export default function Home({ data }: any) {
    return (
        <AppShell
            padding="md"
            header={<HeaderMenu />}
        >
        </AppShell>
    )
}
/*
export async function getServerSideProps() {
    const res = await axios.post<LoginResponse>('/api/auth/login', {
        username: 'test',
        password: 'test'
    } as LoginRequest)

    return {
        props: {
            data: res.data
        }
    }
}
*/