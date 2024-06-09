import React, { useState, useEffect } from 'react';
import Countdown from 'react-countdown';
import { UiButton } from '../../shared';
import { timerInterface } from '../../shared/interfaces/index';

const Timer: React.FC<timerInterface> = ({
	resetTest,
	handleVisibility,
	isRunning,
	setIsRunning,
}) => {
	const [targetDate, setTargetDate] = useState<number>(Date.now());

	useEffect(() => {
		const savedTargetDate = localStorage.getItem('targetDate');
		if (savedTargetDate) {
			const parsedTargetDate = Number(savedTargetDate);
			if (parsedTargetDate > Date.now()) {
				setTargetDate(parsedTargetDate);
				setIsRunning(true);
				handleVisibility(false);
			}
		}
	}, []);

	const timeFinished = () => {
		setIsRunning(false);
		localStorage.setItem('countQuestion', '0');
		resetTest(0);
		handleVisibility(true);
	};

	const handleStartTimer = () => {
		const newTargetDate = Date.now() + 50 * 1000;
		setTargetDate(newTargetDate);
		setIsRunning(true);
		localStorage.setItem('targetDate', newTargetDate.toString());
		handleVisibility(false);
	};

	const Completionist = () => <span>Начать тест</span>;

	return (
		<div>
			{!isRunning && (
				<UiButton
					clickFunction={handleStartTimer}
					text="Начать тест"
					color="bg-red-500"
				/>
			)}
			{isRunning && (
				<div className="mt-[5px] ml-5 border-2 border-solid border-black pl-3 pr-3">
					<Countdown
						date={targetDate}
						onComplete={timeFinished}
						renderer={({ minutes, seconds, completed }) => {
							if (completed) {
								return <Completionist />;
							} else {
								return (
									<div>
										<span className="text-2xl">{minutes}:</span>
										<span className="text-2xl">{seconds}</span>
									</div>
								);
							}
						}}
					/>
				</div>
			)}
		</div>
	);
};

export default Timer;
