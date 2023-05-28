import { HeaderMenu } from '@/components/Header';
import { useAuth, useCreateSubreddit } from '@/hooks';
import { TextInput, Paper, Title, Container, Button, AppShell, Textarea, LoadingOverlay } from '@mantine/core';

export default function CreateSubreddit() {

    const {
        name,
        setName,
        description,
        setDescription,
        loading,
        error,
        createSubreddit,
    } = useCreateSubreddit();

    const { user, ready } = useAuth();

    return (
        <AppShell
            padding="md"
            header={<HeaderMenu {...user} />}
        >
            <LoadingOverlay visible={loading} />
            <Container size={420} my={40}>
                <Title
                    align="center"
                    sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
                >
                    New subreddit!
                </Title>

                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <TextInput
                            label="Subreddit Name"
                            placeholder="r/"
                            required
                            value={name}
                            onChange={e => setName(e.currentTarget.value)}
                            error={error}
                        />
                        <Textarea
                            label="Description"
                            placeholder="This is the official subreddit for..."
                            mt="md"
                            required
                            value={description}
                            onChange={e => setDescription(e.currentTarget.value)}
                            error={error}
                        />

                        <Button fullWidth mt="xl" type='submit' onClick={createSubreddit}>
                            Create
                        </Button>
                    </form>
                </Paper>
            </Container>
        </AppShell>

    )
}