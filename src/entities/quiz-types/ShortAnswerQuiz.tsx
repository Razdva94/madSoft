import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields() {
	return (
		<Box
			component="form"
			sx={{
				'& > :not(style)': { m: 1, width: '25ch' },
				'& .MuiInputLabel-root': { color: 'black' },
				'& .MuiInput-underline:before': { borderBottomColor: 'black' },
				'& .MuiInput-underline:hover:not(.Mui-disabled):before': {
					borderBottomColor: 'black',
				},
				'& .MuiInput-underline:after': { borderBottomColor: 'black' },
				'& .MuiInput-root:focus': { color: 'black' },
				'& .MuiInputLabel-root.Mui-focused': { color: 'black' },
			}}
			noValidate
			autoComplete="off"
		>
			<TextField id="standard-basic" label="Ответ" variant="standard" />
		</Box>
	);
}
