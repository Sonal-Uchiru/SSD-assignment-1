import { ThemeOptions } from '@mui/material'

declare module '@mui/material/styles' {
    interface Theme {
        status: {
            danger: string
        }
    }

    interface Palette {
        neutral: Palette['primary']
    }

    interface PaletteOptions {
        neutral: PaletteOptions['primary']
    }

    interface Palette {
        blue: Palette['primary']
    }

    interface PaletteOptions {
        blue: PaletteOptions['primary']
    }

    interface Palette {
        black: Palette['primary']
    }

    interface PaletteOptions {
        black: PaletteOptions['primary']
    }

    interface Palette {
        white: Palette['primary']
    }

    interface PaletteOptions {
        white: PaletteOptions['primary']
    }

    // allow configuration using `createTheme`
    interface ThemeOptions {
        status: {
            danger: React.CSSProperties['color']
        }
    }
}

declare module '@mui/material/styles' {
    interface TypographyVariants {
        S1: React.CSSProperties
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        S1?: React.CSSProperties
    }

    interface TypographyVariants {
        S2: React.CSSProperties
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        S2?: React.CSSProperties
    }

    interface TypographyVariants {
        M1: React.CSSProperties
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        M1?: React.CSSProperties
    }

    interface TypographyVariants {
        M2: React.CSSProperties
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        M2?: React.CSSProperties
    }

    interface TypographyVariants {
        L1: React.CSSProperties
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        L1?: React.CSSProperties
    }

    interface TypographyVariants {
        L2: React.CSSProperties
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        L2?: React.CSSProperties
    }

    interface TypographyVariants {
        L3: React.CSSProperties
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        L3?: React.CSSProperties
    }

    interface TypographyVariants {
        fontFamily1: React.CSSProperties
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        fontFamily1?: React.CSSProperties
    }

    interface TypographyVariants {
        fontFamily2: React.CSSProperties
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        fontFamily2?: React.CSSProperties
    }

    interface TypographyVariants {
        fontWeightFull: React.CSSProperties
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        fontWeightFull?: React.CSSProperties
    }

    interface TypographyVariants {
        fontWeightSemi: React.CSSProperties
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        fontWeightSemi?: React.CSSProperties
    }

    interface TypographyVariants {
        fontWeightLow: React.CSSProperties
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        fontWeightLow?: React.CSSProperties
    }

    interface TypographyVariants {
        fontWeightBold: React.CSSProperties
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        fontWeightBold?: React.CSSProperties
    }

    interface TypographyVariants {
        fontWeightNormal: React.CSSProperties
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        fontWeightNormal?: React.CSSProperties
    }
}
