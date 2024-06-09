import React, { useState, ChangeEvent, SyntheticEvent } from 'react';
import FormGroup from '@mui/material/FormGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { red } from '@mui/material/colors';
import { optionsQuizInterface } from '../../shared/interfaces';

const SingleOptionQuiz: React.FC<optionsQuizInterface> = ({
	questions,
	countQuestion,
}) => {
	const initialQuestions = questions[countQuestion].options;
	const [selectedOption, setSelectedOption] = useState<string | null>(null);

	const handleRadioChangeWrapper = (event: SyntheticEvent<Element, Event>) => {
		handleRadioChange(event as ChangeEvent<HTMLInputElement>);
	};
	const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSelectedOption(event.target.value);
	};

	return (
		<FormControl component="fieldset">
			<FormGroup>
				{initialQuestions?.map((label, index) => (
					<FormControlLabel
						key={index}
						value={label}
						control={
							<Radio
								sx={{
									color: 'black',
									'&.Mui-checked': {
										color: red[600],
									},
								}}
							/>
						}
						label={label}
						checked={selectedOption === label}
						onChange={handleRadioChangeWrapper}
						sx={{
							'&.Mui-checked': {
								color: red[600],
							},
						}}
					/>
				))}
			</FormGroup>
		</FormControl>
	);
};

export default SingleOptionQuiz;
