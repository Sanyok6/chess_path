import { writable } from 'svelte/store';

export interface UserData {
	record: number;
    last_completion: Date; 
}

export interface User {
	id: number;
	username: string;
	data: UserData;
}

export const userStore = writable<User | null>(null);

// export interface Appearance {
// 	board_style: string;
// 	piece_set: string;
// }

// export const appearanceStore = writable<Appearance | null>(null);
