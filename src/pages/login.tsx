import { useLogin } from '@/hooks';
import { Paper, createStyles, TextInput, PasswordInput, Checkbox, Button, Title, Text, rem, LoadingOverlay } from '@mantine/core';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
    wrapper: {
        minHeight: rem(900),
        backgroundSize: 'cover',
        backgroundImage: 'url(/waves.svg)',
    },

    form: {
        borderRight: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
            }`,
        minHeight: rem(900),
        maxWidth: rem(450),
        paddingTop: rem(80),

        [theme.fn.smallerThan('sm')]: {
            maxWidth: '100%',
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
}));

export default function Login() {
    const { classes } = useStyles();

    const { loading, error, username, password, setUsername, setPassword, login } = useLogin();

    return (
        <div className={classes.wrapper}>
            <LoadingOverlay visible={loading} />
            <Paper className={classes.form} radius={0} p={30}>

                <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
                    Welcome back to Spring-Reddit!
                </Title>
                <form onSubmit={e => e.preventDefault()}>
                    <TextInput
                        label="Username"
                        placeholder="Your username"
                        size="md"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        error={error}
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Your password"
                        mt="md"
                        size="md"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        error={error}
                    />
                    <Checkbox label="Keep me logged in" mt="xl" size="md" defaultChecked />
                    <Button fullWidth mt="xl" size="md" onClick={login} type='submit'>
                        Login
                    </Button>
                </form>

                <Text ta="center" mt="md">
                    Don&apos;t have an account?{' '}
                    <Link href="/register">
                        Register
                    </Link>
                </Text>
            </Paper>
        </div>
    );
}