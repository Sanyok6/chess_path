import { writable } from 'svelte/store';

export interface Task {
	name: string;
	duration: number;
	lastCompleted: string; 
	creator: number;
}

export interface UserData {
	record: number;
    last_completion: Date;
	tasks: Array<Task>;
}

export interface User {
	id: number;
	username: string;
	data: UserData;
}

export const userStore = writable<User | null>(null);

