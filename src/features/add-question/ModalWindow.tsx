import React from 'react';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import Fade from '@mui/material/Fade';
import {
	ModalWindowInterface,
	newDataInterface,
} from '../../shared/interfaces';
import { IconButton, TextField, Typography, Button } from '@mui/material';
import { Close } from '@mui/icons-material';

const ModalWindow: React.FC<ModalWindowInterface> = ({
	selectedOption,
	open,
	handleClose,
	variants,
	setData,
	addQuestion,
}) => {
	const single = { title: 'Вопрос с одним вариантом ответа' };
	const multi = { title: 'Вопрос с несколькими вариантами ответа' };
	const short = { title: 'Вопрос с коротким ответом' };
	const long = { title: 'Вопрос с длинным ответом' };

	const handleDataChange = (i: number | null, value: string) => {
		setData((prevData: newDataInterface) => {
			const newData: newDataInterface = { ...prevData };
			if (i === null) {
				newData.question = value;
			}
			newData.type = selectedOption;
			if (i) {
				newData.options[i - 1] = value;
			}
			return newData;
		});
	};

	const handleSubmit = () => {
		// console.log('Question:', data.question);
		// console.log('Type:', data.type);
		// if (variants) {
		// 	console.log('Variant 1:', data.options[0]);
		// 	console.log('Variant 2:', data.options[1]);
		// 	console.log('Variant 3:', data.options[2]);
		// 	console.log('Variant 4:', data.options[3]);
		// }
		addQuestion();
		setData({
			question: '',
			type: '',
			options: [''],
		});
		handleClose();
	};

	const choseType = (selectedOption: string) => {
		switch (selectedOption) {
			case 'single':
				return single;
			case 'multi':
				return multi;
			case 'long':
				return short;
			case 'short':
				return long;
			default:
				return null;
		}
	};

	return (
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				slots={{ backdrop: StyledBackdrop }}
			>
				<Fade in={open}>
					<ModalContent sx={style}>
						<div className="flex justify-between">
							<h2 id="transition-modal-title" className="modal-title text-2xl">
								{choseType(selectedOption)?.title}
							</h2>
							<IconButton onClick={handleClose}>
								<Close color="primary" />
							</IconButton>
						</div>
						<div className="flex-col flex">
							<Typography variant="h6" gutterBottom sx={{ marginBottom: 0 }}>
								Вопрос:
							</Typography>
							<TextField
								onChange={(e) => handleDataChange(null, e.target.value)}
								label="Введите ваш вопрос"
								variant="outlined"
							></TextField>
						</div>
						{variants && (
							<div className="flex-col flex">
								<Typography variant="h6" gutterBottom sx={{ marginBottom: 0 }}>
									Варианты ответов:
								</Typography>
								<div className="flex-col flex gap-2">
									<TextField
										onChange={(e) => handleDataChange(1, e.target.value)}
										placeholder="Введите ответ на 1 вопрос"
									></TextField>
									<TextField
										onChange={(e) => handleDataChange(2, e.target.value)}
										placeholder="Введите ответ на 2 вопрос"
									></TextField>
									<TextField
										onChange={(e) => handleDataChange(3, e.target.value)}
										placeholder="Введите ответ на 3 вопрос"
									></TextField>
									<TextField
										onChange={(e) => handleDataChange(4, e.target.value)}
										placeholder="Введите ответ на 4 вопрос"
									></TextField>
								</div>
							</div>
						)}
						<Button color="primary" variant="contained" onClick={handleSubmit}>
							Отправить
						</Button>
					</ModalContent>
				</Fade>
			</Modal>
		</div>
	);
};

const Backdrop = React.forwardRef<HTMLDivElement, { open?: boolean }>(
	(props, ref) => {
		const { open, ...other } = props;
		return (
			<Fade in={open}>
				<div ref={ref} {...other} />
			</Fade>
		);
	},
);

const grey = {
	50: '#F3F6F9',
	100: '#E5EAF2',
	200: '#DAE2ED',
	300: '#C7D0DD',
	400: '#B0B8C4',
	500: '#9DA8B7',
	600: '#6B7A90',
	700: '#434D5B',
	800: '#303740',
	900: '#1C2025',
};

const Modal = styled(BaseModal)`
	position: fixed;
	z-index: 1300;
	inset: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
	z-index: -1;
	position: fixed;
	inset: 0;
	background-color: rgb(0 0 0 / 0.5);
	-webkit-tap-highlight-color: transparent;
`;

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 700,
};

const ModalContent = styled('div')(
	({ theme }) => css`
		font-family: 'IBM Plex Sans', sans-serif;
		font-weight: 500;
		text-align: start;
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 20px;
		overflow: hidden;
		background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
		border-radius: 8px;
		border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
		box-shadow: 0 4px 12px
			${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
		padding: 24px;
		color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

		& .modal-title {
			margin: 0;
			line-height: 1.5rem;
			margin-bottom: 8px;
		}

		& .modal-description {
			margin: 0;
			line-height: 1.5rem;
			font-weight: 400;
			color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
			margin-bottom: 4px;
		}
	`,
);

export default ModalWindow;
