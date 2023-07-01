import { createTheme } from '@mui/material/styles';

const darkPalette = {
    mode: 'dark',
    primary: {
        main: '#3DACFF ',
    },
    secondary: {
        main: '#121212',
    },
};

const lightPalette = {
    mode: 'light',
    primary: {
        main: '#3DACFF',
    },
    secondary: {
        main: '#f2f2f3',
    },
};

const darkTheme = createTheme({
    palette: darkPalette,
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
});

const lightTheme = createTheme({
    palette: lightPalette,
    typography: {
        fontFamily: 'Arial, sans-serif',
    },
});

export { darkTheme, lightTheme };
