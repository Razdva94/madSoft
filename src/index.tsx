import React from 'react';
import ReactDOM from 'react-dom/client';
import AppEnter from './app/AppEnter';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<React.StrictMode>
			<AppEnter />
		</React.StrictMode>
	</BrowserRouter>,
);
