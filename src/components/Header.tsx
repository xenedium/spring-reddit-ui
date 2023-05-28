import {
    createStyles,
    Header,
    Group,
    Button,
    Divider,
    Box,
    Burger,
    Drawer,
    ScrollArea,
    rem,
    Menu,
    UnstyledButton,
    Avatar,
    Text
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import { InputWithButton } from './Searchbar';
import { ButtonToggle } from './ButtonToggle';
import { useRouter } from 'next/router';
import { User } from '@/types';
import { IconArrowDown, IconArrowUp, IconChevronDown, IconDoor, IconLogout, IconMessage, IconPlus } from '@tabler/icons-react';
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
    link: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontWeight: 500,
        fontSize: theme.fontSizes.sm,

        [theme.fn.smallerThan('sm')]: {
            height: rem(42),
            display: 'flex',
            alignItems: 'center',
            width: '100%',
        },

        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        }),
    },

    subLink: {
        width: '100%',
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        borderRadius: theme.radius.md,

        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        }),

        '&:active': theme.activeStyles,
    },

    dropdownFooter: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        margin: `calc(${theme.spacing.md} * -1)`,
        marginTop: theme.spacing.sm,
        padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
        paddingBottom: theme.spacing.xl,
        borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
            }`,
    },

    hiddenMobile: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    hiddenDesktop: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },
    user: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        transition: 'background-color 100ms ease',

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        },

    },
    userActive: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },
}));

export function HeaderMenu(user: User) {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const { classes, theme, cx } = useStyles();
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const router = useRouter();

    const logout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    }


    return (
        <Box pb={120}>
            <Header height={60} px="md">
                <Group position="apart" sx={{ height: '100%' }}>
                    <Image
                        src='/logo.svg'
                        alt="Reddit logo"
                        width={50}
                        height={50}
                    />

                    <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
                        <InputWithButton />
                    </Group>

                    <Group className={classes.hiddenMobile}>
                        <ButtonToggle />
                        <Menu
                            width={260}
                            position="bottom-end"
                            transitionProps={{ transition: 'pop-top-right' }}
                            onClose={() => setUserMenuOpened(false)}
                            onOpen={() => setUserMenuOpened(true)}
                            withinPortal
                        >
                            <Menu.Target>
                                <UnstyledButton
                                    className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                                >
                                    <Group spacing={7}>
                                        <Avatar src={""} alt={user.username} radius="xl" size={20} />
                                        <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                                            {user.username}
                                        </Text>
                                        <IconChevronDown size={rem(12)} stroke={1.5} />
                                    </Group>
                                </UnstyledButton>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Label>Create</Menu.Label>
                                <Menu.Item
                                    icon={<IconMessage size="0.9rem" color={theme.colors.yellow[6]} stroke={1.5} />}
                                    onClick={() => router.push('/create-post')}
                                >
                                    New Post</Menu.Item>
                                <Menu.Item
                                    icon={<IconPlus size="0.9rem" color={theme.colors.yellow[6]} stroke={1.5} />}
                                    onClick={() => router.push('/create-subreddit')}
                                >
                                    New Subreddit
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item
                                    icon={<IconArrowUp size="0.9rem" color={theme.colors.green[6]} stroke={1.5} />}
                                    onClick={() => router.push('/upvoted-posts')}
                                >
                                    Upvoted posts
                                </Menu.Item>
                                <Menu.Item
                                    icon={<IconArrowDown size="0.9rem" color={theme.colors.red[6]} stroke={1.5} />}
                                    onClick={() => router.push('/downvoted-posts')}
                                >
                                    Downvoted posts
                                </Menu.Item>
                                <Menu.Item
                                    icon={<IconMessage size="0.9rem" color={theme.colors.blue[6]} stroke={1.5} />}
                                    onClick={() => router.push('/my-posts')}
                                >
                                    Your posts
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Label>Settings</Menu.Label>

                                <Menu.Item
                                    icon={<IconLogout size="0.9rem" stroke={1.5} />}
                                    onClick={() => {
                                        logout();
                                    }}
                                >
                                    Logout
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>

                    <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
                </Group>
            </Header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="Navigation"
                className={classes.hiddenDesktop}
                zIndex={1000000}
            >
                <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
                    <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
                    <InputWithButton />
                    <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

                    <Group position="center" grow pb="xl" px="md">
                        <ButtonToggle />
                    </Group>
                    <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

                    <Group position="center" grow pb="xl" px="md">
                        <Button
                            leftIcon={<IconMessage size="0.9rem" stroke={1.5} />}
                            onClick={() => router.push('/create-post')}
                        >
                            New Post
                        </Button>

                        <Button
                            leftIcon={<IconPlus size="0.9rem" stroke={1.5} />}
                            onClick={() => router.push('/create-subreddit')}
                        >
                            New Subreddit
                        </Button>
                    </Group>
                    <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
                    <Group position="center" grow pb="xl" px="md">
                        <Button
                            leftIcon={<IconArrowUp size="0.9rem" stroke={1.5} />}
                            onClick={() => router.push('/upvoted-posts')}
                        >
                            Upvoted posts
                        </Button>
                        <Button
                            leftIcon={<IconArrowDown size="0.9rem" stroke={1.5} />}
                            onClick={() => router.push('/downvoted-posts')}
                        >
                            Downvoted posts
                        </Button>
                    </Group>
                    <Group position="center" grow pb="xl" px="md">
                        <Button
                            leftIcon={<IconMessage size="0.9rem" stroke={1.5} />}
                            onClick={() => router.push('/my-posts')}
                        >

                            My posts
                        </Button>
                    </Group>
                    <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
                    <Group position="center" grow pb="xl" px="md">
                        <Button
                            leftIcon={<IconLogout size="0.9rem" stroke={1.5} />}
                            onClick={() => logout()}
                        >
                            Logout
                        </Button>
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}