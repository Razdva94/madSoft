import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import ModalWindow from './ModalWindow';
import { menuPopupStateInterface } from '../../shared/interfaces';

const MenuPopupState: React.FC<menuPopupStateInterface> = ({
	data,
	setData,
	addQuestion,
}) => {
	const [selectedOption, setSelectedOption] = React.useState('');
	const [open, setOpen] = React.useState(false);
	const [variants, setVariants] = React.useState(false);
	const handleClose = () => {
		setOpen(false);
		setSelectedOption('');
	};

	React.useEffect(() => {
		if (selectedOption) {
			setOpen(true);
			if (selectedOption === 'single' || selectedOption === 'multi') {
				setVariants(true);
			} else {
				setVariants(false);
			}
		}
	}, [selectedOption]);

	const handleMenuItemClick = (
		option: React.SetStateAction<string>,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		popupState: any,
	) => {
		setSelectedOption(option);
		popupState.close();
	};
	return (
		<>
			<PopupState variant="popover" popupId="demo-popup-menu">
				{(popupState) => (
					<React.Fragment>
						<Button
							sx={{
								color: '#FFFFFF',
								paddingTop: '0.25rem',
								paddingBottom: '0.25rem',
								fontSize: '1.25rem',
								height: '36px',
								fontWeight: 'normal',
								textTransform: 'none',
								transition: 'opacity 0.3s',
								fontFamily: 'proximaR',
								'&:hover': {
									opacity: 0.9,
								},
							}}
							variant="contained"
							{...bindTrigger(popupState)}
						>
							Добавить вопросы
						</Button>
						<Menu {...bindMenu(popupState)}>
							<MenuItem
								onClick={() => handleMenuItemClick('single', popupState)}
							>
								Выбор одного варианта
							</MenuItem>
							<MenuItem
								onClick={() => handleMenuItemClick('multi', popupState)}
							>
								Выбор нескольких вариантов
							</MenuItem>
							<MenuItem
								onClick={() => handleMenuItemClick('short', popupState)}
							>
								Короткий ответ
							</MenuItem>
							<MenuItem onClick={() => handleMenuItemClick('long', popupState)}>
								Развернутый ответ
							</MenuItem>
						</Menu>
					</React.Fragment>
				)}
			</PopupState>
			<ModalWindow
				selectedOption={selectedOption}
				open={open}
				handleClose={handleClose}
				variants={variants}
				data={data}
				setData={setData}
				addQuestion={addQuestion}
			/>
		</>
	);
};

export default MenuPopupState;
