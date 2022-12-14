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
	total_completed: number;
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
	amount: number;
}

export interface PuzzleSetWithPuzzles {
	id: string;
	creator: number;
	name: string;
	last_opened: Date;
	puzzles: Puzzles[];
}

export interface Puzzles {
	id: number;
	fen: string;
	correct_variations: string;
}

export const userStore = writable<User | null>(null);

export const taskClaimed = writable<Boolean>(true);
