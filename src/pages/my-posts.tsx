import { HeaderMenu } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import { useAuth, useMyPosts } from "@/hooks";
import { AppShell, Container, Title } from "@mantine/core";

export default function MyPosts() {

    const { user, ready } = useAuth();
    const { posts } = useMyPosts({ ready });

    return (
        <AppShell
            header={<HeaderMenu {...user} />}
        >
            <Container size="xs" mt={-40}>
                <Title
                    align="center"
                    sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
                >
                    My Posts
                </Title>
                {
                    posts.map((post, index) => (
                        <PostCard key={index} post={post} />
                    ))
                }
            </Container>
        </AppShell>
    );
}