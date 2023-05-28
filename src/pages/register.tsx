import { useRegister } from '@/hooks';
import { Paper, createStyles, TextInput, PasswordInput, Button, Title, Text, rem, Modal, LoadingOverlay, } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
    wrapper: {
        minHeight: rem(900),
        backgroundSize: 'cover',
        backgroundImage:
            'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
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

export default function Register() {
    const { classes } = useStyles();
    const router = useRouter();
    const {
        email,
        username,
        password,
        passwordConfirm,
        setEmail,
        setUsername,
        setPassword,
        setPasswordConfirm,
        register,
        loading,
        error,
        success,
    } = useRegister();
    return (
        <div className={classes.wrapper}>
            <Modal opened={success} onClose={() => { }} centered>
                <Paper radius="md">
                    <Title order={2} align="center" mb="md">
                        Registration successful!
                    </Title>
                    <Text align="center">
                        You can now login to your account
                    </Text>
                    <Button
                        fullWidth
                        variant="light"
                        size="lg"
                        mt="xl"
                        onClick={() => { router.replace('/login') }}
                    >
                        <Text size="sm">Login</Text>
                    </Button>
                </Paper>
            </Modal>
            <LoadingOverlay visible={loading} />
            <Paper className={classes.form} radius={0} p={30}>
                <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
                    Welcome to Spring-Reddit!
                </Title>
                <form onSubmit={e => e.preventDefault()}>
                    <TextInput
                        label="Email address"
                        placeholder="hello@gmail.com"
                        size="md"
                        error={error}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <TextInput
                        label="Username"
                        placeholder="Your username"
                        size="md"
                        mt="md"
                        error={error}
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Your password"
                        mt="md"
                        size="md"
                        error={error}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <PasswordInput
                        label="Password confirmation"
                        placeholder="Your password confirmation"
                        mt="md"
                        size="md"
                        error={error}
                        value={passwordConfirm}
                        onChange={e => setPasswordConfirm(e.target.value)}
                    />
                    <Button fullWidth mt="xl" size="md" onClick={register} type='submit'>
                        Register
                    </Button>
                </form>

                <Text ta="center" mt="md">
                    Already have an account?{' '}
                    <Link href="/login">
                        Login
                    </Link>
                </Text>
            </Paper>
        </div>
    );
}