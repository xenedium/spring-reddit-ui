import { HeaderMenu } from '@/components/Header';
import { PostCard } from '@/components/PostCard';
import { useAuth, useSubreddit } from '@/hooks';
import { AppShell, Container, Title, Text, createStyles, Card, ScrollArea } from '@mantine/core';
import { useRouter } from 'next/router'


const useStyles = createStyles((theme) => ({
    container: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    }
}))


export default function Subreddit() {
    const router = useRouter()
    const { subname } = router.query
    const { user, ready } = useAuth();
    const { subreddit, posts } = useSubreddit({ name: subname as string, ready });
    const { classes, cx } = useStyles();
    return (
        <AppShell
            header={<HeaderMenu {...user} />}
        >
            <Container size="xl" mt={-40}>
                <Card withBorder className={classes.container} radius="md" >
                    <Title
                        align="center"
                        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
                    >
                        Welcome to r/{subreddit?.name}
                    </Title>
                    <Text align="center" c="dimmed" mt="sm">
                        {subreddit?.description}
                    </Text>
                </Card>

                <Container size="xs" my={40}>
                    <Title
                        align="center"
                        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
                    >
                        Posts
                    </Title>
                    {
                        posts.map((post, index) => (
                            <PostCard key={index} post={post} />
                        ))
                    }
                </Container>

            </Container>

        </AppShell>
    );

}