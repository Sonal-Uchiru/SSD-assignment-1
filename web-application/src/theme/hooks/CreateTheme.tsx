import { createTheme } from '@mui/material'

const theme = createTheme({
    status: {
        danger: '#e53e3e',
    },

    palette: {
        primary: {
            main: '#03C988',
        },

        secondary: {
            main: '#FFF6EA',
        },

        error: {
            main: '#F34E4E',
        },

        warning: {
            main: '#FFCC00',
        },

        neutral: {
            main: '#D0D0D0',
        },

        blue: {
            main: '#54A7FF',
        },

        black: {
            main: '#282828',
        },

        white: {
            main: '#FFFFFF',
        },
    },

    spacing: [5, 10, 15, 25, 40, 65],

    typography: {
        S1: {
            fontSize: 14,
        },
        S2: {
            fontSize: 8,
        },

        M1: {
            fontSize: 28,
        },

        M2: {
            fontSize: 18,
        },

        L1: {
            fontSize: 60,
        },

        L2: {
            fontSize: 48,
        },

        L3: {
            fontSize: 34,
        },

        fontFamily1: {
            fontFamily: 'Montserrat, sans-serif',
        },

        fontFamily2: {
            fontFamily: 'Times New Roman',
        },

        fontWeightFull: {
            fontWeight: 900,
        },

        fontWeightSemi: {
            fontWeight: 600,
        },

        fontWeightLow: {
            fontWeight: 400,
        },

        fontWeightBold: {
            fontWeight: 'bold',
        },

        fontWeightNormal: {
            fontWeight: 'normal',
        },
    },

    components: {
        MuiFormLabel: {
            styleOverrides: {
                asterisk: {
                    color: 'red',
                },
            },
        },
        MUIDataTableBodyCell: {
            styleOverrides: {
                root: {
                    marginLeft: 17,
                },
            },
        },
    },
})

export default theme
