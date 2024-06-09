import { Dispatch, SetStateAction } from 'react';

export interface ButtonProps {
	clickFunction: () => void;
	text: string;
	color?: string;
	textColor?: string;
}

export interface QuestionInterface {
	question: string;
	type: string;
	options?: string[];
}

export interface UiStageInterface {
	color: string;
	key: number;
}

export interface timerInterface {
	resetTest: Dispatch<SetStateAction<number>>;
	handleVisibility: (value: boolean) => void;
	isRunning: boolean;
	setIsRunning: Dispatch<SetStateAction<boolean>>;
}

export interface newDataInterface {
	options: string[];
	question: string;
	type: string;
}

export interface Option {
	options?: Array<string>;
}

export interface optionsQuizInterface {
	countQuestion: number;
	questions: Option[];
}

export interface menuPopupStateInterface {
	data: { options: string[]; question: string; type: string };
	setData: Dispatch<
		SetStateAction<{ options: string[]; question: string; type: string }>
	>;
	addQuestion: () => void;
}

export interface ModalWindowInterface extends menuPopupStateInterface {
	selectedOption: string;
	handleClose: () => void;
	open: boolean;
	variants: boolean;
}
