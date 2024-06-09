import { Routes, Route } from 'react-router-dom';
import './index.css';
import MainPage from '../pages/MainPage';

const AppEnter = () => {
	return (
		<Routes>
			<Route path="/" element={<MainPage />} />
		</Routes>
	);
};

export default AppEnter;
