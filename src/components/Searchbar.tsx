import { TextInput, TextInputProps, ActionIcon, useMantineTheme } from '@mantine/core';
import { IconSearch, IconArrowRight, IconArrowLeft } from '@tabler/icons-react';
import { useState } from 'react';
import { useRouter } from 'next/router';

export function InputWithButton(props: TextInputProps) {
    const theme = useMantineTheme();
    const [value, setValue] = useState('');
    const router = useRouter();

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            router.push(`/r/${value}`);
        }}>
            <TextInput
                icon={<IconSearch size="1.1rem" stroke={1.5} onClick={() => router.push(`/r/${value}`)} />}
                radius="xl"
                size="md"
                rightSection={
                    <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
                        {theme.dir === 'ltr' ? (
                            <IconArrowRight size="1.1rem" stroke={1.5} />
                        ) : (
                            <IconArrowLeft size="1.1rem" stroke={1.5} />
                        )}
                    </ActionIcon>
                }
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
                placeholder="Search subreddits..."
                rightSectionWidth={42}
                {...props}
            />
        </form>
    );
}