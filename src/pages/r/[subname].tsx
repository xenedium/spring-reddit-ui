import { HeaderMenu } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import { useAuth, useSubreddit } from "@/hooks";
import {
  AppShell,
  Container,
  Title,
  Text,
  createStyles,
  Card,
  ScrollArea,
  Modal,
  Button,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useState } from "react";

import { axios } from "@/lib";
import { GenericResponse } from "@/types";
import { IconPlus } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  container: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },
  center: {
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
    alignSelf: "center",
  },
}));

export default function Subreddit() {
  const router = useRouter();
  const { subname } = router.query;
  const { user, ready } = useAuth();
  const { subreddit, posts } = useSubreddit({ name: subname as string, ready });
  const { classes, cx } = useStyles();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [modal, setModal] = useState(false);

  const PostComment = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/post`, {
        title,
        content,
        subredditId: subreddit?.id,
        url: "https://google.com",
      })
      .then((res) => {
        router.reload();
      })
      .catch((err) => {});
  };

  return (
    <AppShell header={<HeaderMenu {...user} />}>
      <Container size="xl" mt={-40}>
        <Modal opened={modal} onClose={() => setModal(false)}>
          <TextInput
            label="Title"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            label="Content"
            placeholder="Say what you want !"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button my="md" fullWidth onClick={PostComment}>
            Post
          </Button>
        </Modal>
        <Card withBorder className={classes.container} radius="md">
          <Title
            align="center"
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 900,
            })}
          >
            Welcome to r/{subreddit?.name}
          </Title>
          <Text align="center" c="dimmed" mt="sm">
            {subreddit?.description}
          </Text>

          <Button
            mt="md"
            fullWidth
            leftIcon={<IconPlus />}
            onClick={() => setModal(true)}
          >
            Create new post
          </Button>
        </Card>

        <Container size="xs" my={40}>
          <Title
            align="center"
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 900,
            })}
          >
            Posts
          </Title>
          {posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </Container>
      </Container>
    </AppShell>
  );
}
