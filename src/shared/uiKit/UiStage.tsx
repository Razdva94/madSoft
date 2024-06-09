import React from 'react';
import { UiStageInterface } from '../interfaces';

const UiStage: React.FC<UiStageInterface> = ({ color }) => {
	return <div className={`w-14 h-3 rounded ${color}`}></div>;
};

export default UiStage;
