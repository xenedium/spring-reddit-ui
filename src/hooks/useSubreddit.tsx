import { useEffect, useState } from 'react';
import { axios } from '@/lib';
import { GenericResponse, Post, Subreddit } from '@/types';
import { useRouter } from 'next/router';

export const useSubreddit = ({ name, ready }: { name: string, ready: boolean }) => {
    const [subreddit, setSubreddit] = useState<Subreddit | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);

    const router = useRouter();
    useEffect(() => {
        if (!ready || !name) return;
        axios.get<GenericResponse<Subreddit>>(`${process.env.NEXT_PUBLIC_API_URL}/api/subreddit/${name}`)
            .then((res) => {
                setSubreddit(res.data.data);
                axios.get<GenericResponse<Post[]>>(`${process.env.NEXT_PUBLIC_API_URL}/api/post/sub-name/${name}`)
                    .then((res) => {
                        setPosts(res.data.data);
                    })
                    .catch((error) => {
                        if (error.response.status === 404) {
                            router.push('/404');
                            return;
                        }
                    })
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    router.push('/404');
                    return;
                }
            })
    }, [ready, name])

    return {
        subreddit,
        posts,
    };
};