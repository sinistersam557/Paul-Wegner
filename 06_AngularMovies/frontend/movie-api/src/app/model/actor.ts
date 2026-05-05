import { Movie } from "./movie";

export interface Actor {
    id: number;
    name: string;
    popularity: number;
    profile_path: string;
    biography?: string;
}