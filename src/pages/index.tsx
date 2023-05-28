import { HeaderMenu } from '@/components/Header';
import { AppShell, Container, Title } from '@mantine/core';
import { useAuth } from '@/hooks';

export default function Home() {
    const { user } = useAuth();

    return (
        <AppShell
            padding="md"
            header={<HeaderMenu {...user} />}
        >
            <Container>
                <Title align='center'>No subreddits found...</Title>
                <Title align='center'>Create one</Title>
            </Container>
        </AppShell>

    );
}