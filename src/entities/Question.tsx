import React from 'react';

type questionProps = {
	question: string;
};

const Question: React.FC<questionProps> = ({ question }) => {
	return <p className="text-2xl font-medium">{question}</p>;
};

export default Question;
