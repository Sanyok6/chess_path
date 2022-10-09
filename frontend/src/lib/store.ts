import { writable } from 'svelte/store';

export interface Task {
	id: number;
	name: string;
	duration: number;
	lastCompleted: string; 
	creator: number;
}

export interface UserData {
	current_streak: number;
	record: number;
    last_completion: Date;
	tasks: Array<Task>;
	sets: Array<PuzzleSet>
}

export interface User {
	id: number;
	username: string;
	data: UserData;
}

export interface PuzzleSet {
	id: string;
	creator: string;
	name: string;
	last_opened: Date;
}

export interface Puzzles {
	id: number;
	fen: string;
	correct_variations: string;
}

export const userStore = writable<User | null>(null);

export const taskClaimed = writable<Boolean>(true);
