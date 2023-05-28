import { Comment, GenericResponse, Post } from "@/types";
import { Button, Card, Container, ScrollArea, Text, Textarea, createStyles, rem } from "@mantine/core";
import { IconArrowDown, IconArrowUp } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { axios } from "@/lib";


const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,

        [theme.fn.smallerThan('xs')]: {
            flexDirection: 'column',
        }
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
        borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        lineHeight: 1,
        borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
    },
}));

export function PostCard({ post }: { post: Post }) {
    const { classes } = useStyles();

    const [comments, setComments] = useState<Comment[]>([]);
    const [voteCount, setVoteCount] = useState<number>(post.voteCount);
    const [comment, setComment] = useState<string>('');

    useEffect(() => {
        getComments();
    }, []);

    const getComments = () => {
        axios.get<GenericResponse<Comment[]>>(`/api/post/${post.id}/comments`)
            .then(res => {
                setComments(res.data.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const Upvote = () => {
        axios.post<GenericResponse<null>>(`/api/post/upvote/${post.id}`)
            .then(res => {
                console.log(res.data);
                axios.get<GenericResponse<Post>>(`/api/post/${post.id}`)
                    .then(res => {
                        setVoteCount(res.data.data.voteCount);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err);
            })
    };

    const Downvote = () => {
        axios.post<GenericResponse<null>>(`/api/post/downvote/${post.id}`)
            .then(res => {
                console.log(res.data);
                axios.get<GenericResponse<Post>>(`/api/post/${post.id}`)
                    .then(res => {
                        setVoteCount(res.data.data.voteCount);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err);
            })
    };

    const submitComment = () => {
        axios.post<GenericResponse<null>>('/api/comment', {
            postId: post.id,
            text: comment,
        })
            .then(res => {
                console.log(res.data);
                setComment('');
                getComments();
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <Card withBorder padding="lg" radius="md" my={40}>
            <Text fz="lg" fw={500} align="center">
                {post.postName}
            </Text>
            <Text fz="sm" c="dimmed" mt={10} align="center">
                {post.description}
            </Text>
            <Container>
                <Text fz="sm" fw={500} mt="md">
                    Comments:
                </Text>
                <ScrollArea h={150}>
                    {
                        comments.map((comment, index) => (
                            <Text key={index} fz="sm" fw={500} mt="md" c="dimmed">
                                {comment.user.username}: {comment.text}
                            </Text>
                        ))

                    }
                </ScrollArea>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Textarea
                        placeholder="Add a comment"
                        mt="md"
                        value={comment}
                        onChange={(e) => setComment(e.currentTarget.value)}
                    />
                    <Button
                        mt="md"
                        fullWidth
                        type="submit"
                        onClick={() => submitComment()}
                    >
                        Add Comment
                    </Button>
                </form>
            </Container>
            <Container mt={20} className={classes.container}>
                <Button leftIcon={<IconArrowUp />} mt={20} onClick={Upvote}>
                    Upvote
                </Button>
                <Text fz="lg" fw={500} mt={20}>
                    Votes: {voteCount}
                </Text>
                <Button leftIcon={<IconArrowDown />} mt={20} onClick={Downvote}>
                    Downvote
                </Button>
            </Container>

            <Card.Section mt={20} className={classes.footer}>
                <Text fz="sm" c="dimmed" align='center'>
                    Author: {post.user.username}
                </Text>
                <Text fz="sm" c="dimmed" align='center'>
                    Created: {new Date(post.createdDate).toLocaleDateString()}
                </Text>
            </Card.Section>

        </Card>
    )
}