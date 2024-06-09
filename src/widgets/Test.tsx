import React, { useState, useEffect } from 'react';
import { Timer, MenuPopupState } from '../features';
import { UiButton, UiStage } from '../shared';
import {
	MultiOptionQuiz,
	Question,
	SingleOptionQuiz,
	ShortAnswerQuiz,
	LongAnswerQuiz,
} from '../entities';
import { initialQuestions } from '../shared/initialTemplate/index';
import type { QuestionInterface } from '../shared/interfaces';

const Test = () => {
	const [countQuestion, setCountQuestion] = useState(0);
	const [isVisible, setIsVisible] = useState(true);
	const [questions, setQuestions] = useState(initialQuestions);
	const [isRunning, setIsRunning] = useState(false);
	const [data, setData] = React.useState({
		question: '',
		type: '',
		options: [''],
	});

	const storedQuestions = localStorage.getItem('questions');
	useEffect(() => {
		if (storedQuestions !== null) {
			setQuestions(JSON.parse(storedQuestions));
		} else {
			localStorage.setItem('questions', JSON.stringify(initialQuestions));
		}
	}, [setQuestions]);
	const addQuestion = () => {
		setQuestions((previousQuestion) => {
			const newList = [...previousQuestion, data];
			localStorage.setItem('questions', JSON.stringify(newList));
			return newList;
		});
	};
	useEffect(() => {
		const savedCount = localStorage.getItem('countQuestion');
		if (savedCount !== null) {
			setCountQuestion(Number(savedCount));
		}
	}, []);

	const question = questions[countQuestion];
	const addCount = () => {
		const newCount = countQuestion + 1;
		setCountQuestion(newCount);
		localStorage.setItem('countQuestion', String(newCount));
	};

	const handleVisibility = (value: boolean) => {
		setIsVisible(value);
	};

	const resetTest = (zero: number) => {
		setCountQuestion(zero);
	};

	const handleEndTestEarly = () => {
		resetTest(0);
		handleVisibility(true);
		setIsRunning(false);
	};

	const choseType = (question: { type: string }) => {
		switch (question?.type) {
			case 'single':
				return (
					<SingleOptionQuiz
						questions={questions}
						countQuestion={countQuestion}
					/>
				);
			case 'multi':
				return (
					<MultiOptionQuiz
						questions={questions}
						countQuestion={countQuestion}
					/>
				);
			case 'long':
				return <LongAnswerQuiz />;
			case 'short':
				return <ShortAnswerQuiz />;
			default:
				return null;
		}
	};
	const countStages = (questions: QuestionInterface[]) => {
		return questions.map((_, i) => {
			if (i < countQuestion) {
				if (countQuestion > questions.length - 1) {
					handleEndTestEarly();
				}
				return <UiStage key={i} color="bg-black" />;
			}
			if (i === countQuestion && !isVisible) {
				return <UiStage key={i} color="bg-red-500" />;
			}
			if (i > countQuestion) {
				return <UiStage key={i} color="bg-gray-200" />;
			}
			return null;
		});
	};
	return (
		<div className="w-3/5 flex flex-col gap-5">
			<div className=" flex flex-row font-bold items-end gap-5">
				<h1 className="text-3xl m-0">Тестирование</h1>
				<Timer
					resetTest={() => resetTest(0)}
					handleVisibility={handleVisibility}
					isRunning={isRunning}
					setIsRunning={setIsRunning}
				/>
				{isVisible && (
					<MenuPopupState
						data={data}
						setData={setData}
						addQuestion={addQuestion}
					/>
				)}
			</div>
			<div className="flex gap-1">{countStages(questions)}</div>
			{!isVisible && (
				<>
					<Question question={question?.question} />
					{choseType(question)}
					<UiButton
						text="Ответить"
						clickFunction={addCount}
						color="bg-red-500"
					/>
				</>
			)}
		</div>
	);
};

export default Test;
