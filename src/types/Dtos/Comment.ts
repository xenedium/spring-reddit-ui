import { Post } from "./Post";
import { User } from "./User";

export type Comment = {
    id: number;
    text: string;
    post: Post;
    user: User;
    createdDate: number;
}