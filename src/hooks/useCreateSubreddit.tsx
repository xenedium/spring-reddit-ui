import { useState } from "react";
import { axios } from "@/lib"
import { GenericResponse, Subreddit, SubredditRequest } from "@/types";
import { useRouter } from "next/router";

export const useCreateSubreddit = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const createSubreddit = () => {
        if (name.length < 1) {
            setError('Name must be at least 1 characters long');
            return;
        }
        setLoading(true);
        setError(null);

        axios.post<GenericResponse<Subreddit>>('/api/subreddit', {
            name,
            description,
        } as SubredditRequest)
            .then((res) => {
                router.push(`/r/${res.data.data.name}`);
            })
            .catch((error) => {
                if (error.response.status === 403) {
                    router.push('/login');
                    return;
                }
                setError(error.response.data.message);
                setLoading(false);
            })
    }

    return {
        name,
        setName,
        description,
        setDescription,
        loading,
        error,
        createSubreddit,
    };
}