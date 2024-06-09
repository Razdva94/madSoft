import React, { useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import { red } from '@mui/material/colors';
import { optionsQuizInterface } from '../../shared/interfaces';

const MultiOptionQuiz: React.FC<optionsQuizInterface> = ({
	questions,
	countQuestion,
}) => {
	const initialQuestions = questions[countQuestion].options;
	console.log(initialQuestions);
	const [checkedState, setCheckedState] = useState(
		initialQuestions?.map(() => false),
	);

	const handleCheckboxChange = (index: number) => {
		const updatedCheckedState = checkedState?.map((item, idx) =>
			idx === index ? !item : item,
		);
		setCheckedState(updatedCheckedState);
	};

	return (
		<FormControl component="fieldset">
			<FormGroup>
				{initialQuestions?.map((label, index) => (
					<div key={index} className="flex items-center">
						{checkedState && (
							<Checkbox
								checked={checkedState[index]}
								onChange={() => handleCheckboxChange(index)}
								sx={{
									'&.Mui-checked': {
										color: red[600],
									},
								}}
							/>
						)}
						<span className="ml-[8px]">{label}</span>
					</div>
				))}
			</FormGroup>
		</FormControl>
	);
};

export default MultiOptionQuiz;
