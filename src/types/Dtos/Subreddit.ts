import { User } from "./User";

export type Subreddit = {
    id: number;
    name: string;
    description: string;
    createdDate: number;
    user: User;
};