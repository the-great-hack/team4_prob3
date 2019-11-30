const colors = {
    primary: "#62A7E0",
    secondary: "#33BE8B",
    black: "rgba(0, 0, 0, 0.87)",
    body: "#757976",
    white: "#FFFFFF",
    gray: "#FCFCFC",
    darkGray: "#575757",
    tertiaryGray: "#EAEAEA",
    whiteSmoke: "#F5F5F5",
    paleBlue: "#F8F9FB",
    sectionHeading: "#363F50",
    darkYellow: "#E2C571",
    darkRed: "#CD5B6C",
    hotRed: "#ff3f3f",
    darkBlue: "#2d67c1",
    darkGreen: "#418c59",
    lightGreen: "#54b781",
    lightBlue: "#579ddb",
    lightGray: "#aaabaa",
    brightBlue: "#6199e2",
    orange: "#E2C571",
    lightRed: "#f44336",
    red: "#CD5B6C",
};

const theme = {
    direction: "ltr",
    shape: {
        borderRadius: 6,
    },
    palette: {
        common: {
            black: "rgba(0, 0, 0, 0.87)",
            white: "#FFFFFF",
        },
        primary: {
            main: colors.primary,
        },
        secondary: {
            main: colors.secondary,
        },
        text: {
            primary: colors.black,
            white: colors.white,
        },
        warning: {
            main: colors.orange,
        },
        error: {
            main: colors.red,
        },
        grey: {
            25: "#FAFAFA",
            50: "#FCFCFC",
            100: "#F5F5F5",
            750: "#6F7075",
        },
        listing: {
            hot: colors.lightBlue,
            signature: colors.lightGreen,
            basic: colors.lightGray,
            developerHot: colors.darkBlue,
            developerBasic: colors.darkGray,
            developerSignature: colors.darkGreen,
            saleFlag: colors.lightGreen,
            rentFlag: colors.lightBlue,
        },
        progressBar: {
            used: colors.darkRed,
            remaining: colors.brightBlue,
            total: colors.orange,
        },
        barChart: {
            leads: colors.brightBlue,
        },
        listingsStatusBreakDown: {
            active: colors.darkRed,
            incomplete: colors.brightBlue,
        },
    },
    color: colors,
    typography: {
        fontFamily: "'Lato', 'Helvetica', 'Arial', sans-serif",
        body1: {
            color: "inherit",
            fontWeight: "inherit",
        },
        greyed: {
            color: colors.darkGray,
        },
        fontWeightBold: 700,
    },
    shadows: [
        "none",
        "0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)",
        "0px 1px 5px 0px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 3px 1px -2px rgba(0,0,0,0.12)",
        "0px 1px 8px 0px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 3px 3px -2px rgba(0,0,0,0.12)",
        "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
        "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
        "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
        "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
        "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
        "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)",
        "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
        "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
        "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
        "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)",
        "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
        "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
        "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
        "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
        "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
        "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
        "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
        "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
        "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
        "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
        "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)",
    ],
};

const overrides = {
    MuiInputLabel: {
        root: { direction: theme.direction },
    },
    MuiButton: {
        containedSecondary: {
            color: theme.color.white,
        },
        containedPrimary: {
            color: theme.color.white,
        },
        contained: {
            boxShadow: "none",
        },
        outlined: {
            background: theme.color.white,
        },
    },
    MuiFab: {
        root: {
            boxShadow: "none",
        },
    },
    MuiGrid: {
        container: {
            "&$spacing-xs-3": {
                width: "100%",
                margin: "auto",
            },

            padding: "1rem",

            "&.MuiGrid-item": {
                padding: 0,
            },
        },
    },
    MuiPaper: {
        elevation1: {
            border: `1px solid ${theme.color.tertiaryGray}`,
            boxShadow: "none",
        },
    },
    MuiListItemIcon: {
        root: {
            color: "inherit",
        },
    },
    MuiDrawer: {
        root: {
            height: "inherit",
        },
        paper: {
            position: "relative",
        },
    },
    MuiFilledInput: {
        root: {
            overflow: "hidden",
            border: `1px solid ${theme.color.tertiaryGray}`,
            backgroundColor: theme.color.white,
            borderRadius: theme.shape.borderRadius,

            "&$focused": {
                borderColor: theme.palette.primary.main,
            },
        },
        underline: {
            "&.Mui-error": {
                borderColor: theme.palette.error.main,
            },
            "&:before": {
                transition: "none",
                borderBottom: "none",
                content: "none",
            },
            "&:after": {
                transition: "none",
                borderBottom: "none",
                content: "none",
            },
        },
    },
    MuiTabs: {
        root: {
            borderRadius: theme.shape.borderRadius,
            backgroundColor: theme.palette.secondary.main,
            color: theme.color.white,
        },
    },
    MuiTab: {
        root: {
            "&$selected": {
                fontWeight: theme.typography.fontWeightBold,
            },
        },
    },
    MuiPickersToolbarText: {
        toolbarTxt: {
            color: theme.palette.text.white,
        },
        toolbarBtnSelected: {
            color: theme.palette.text.white,
        },
    },
    MuiTooltip: {
        tooltip: {
            backgroundColor: theme.palette.common.white,
            color: theme.palette.common.black,
            boxShadow: theme.shadows[1],
            fontSize: 12,
        },
    },
};

export default {
    ...theme,
    overrides: overrides,
};
