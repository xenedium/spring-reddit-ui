import { HeaderMenu } from '@/components/Header';
import { AppShell } from '@mantine/core';
import { useAuth } from '@/hooks';

export default function Home() {
    const { user } = useAuth();

    return (

        <AppShell
            padding="md"
            header={<HeaderMenu {...user} />}
        >
        </AppShell>

    );
}