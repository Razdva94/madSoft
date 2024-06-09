import React from 'react';
import { ButtonProps } from '../interfaces';

const UiButton: React.FC<ButtonProps> = ({
	clickFunction,
	text,
	color,
	textColor = 'text-white',
}) => {
	return (
		<button
			className={`w-fit px-5 py-1 rounded ${color} ${textColor}
			 text-xl font-normal hover:opacity-70 transition-opacity 
			 `}
			onClick={clickFunction}
		>
			{text}
		</button>
	);
};

export default UiButton;
