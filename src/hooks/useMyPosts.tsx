import { GenericResponse, Post, User } from "@/types";
import { useEffect, useState } from "react";
import { axios } from "@/lib";

export const useMyPosts = ({ ready }: { ready: boolean }) => {

    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        if (ready) {
            axios.get<GenericResponse<Post[]>>('/api/post/me')
                .then(res => {
                    setPosts(res.data.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [ready])

    return {
        posts
    };
};