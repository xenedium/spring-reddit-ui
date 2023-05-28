import { Subreddit } from "./Subreddit";
import { User } from "./User";

export type Post = {
    id: number;
    postName: string;
    url: string;
    description: string;
    voteCount: number;
    user: User;
    subreddit: Subreddit;
    createdDate: number;
};