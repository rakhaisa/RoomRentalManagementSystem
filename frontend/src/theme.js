
  // mui theme settings
  export const themeSettings = (mode) => {
    return {
      palette: {
            primary: {
              main: '#CF5C36',
              light: '#E24816',
              dark: '#B24530',
              contrastText: '#fff',
            },
            secondary: {
              main: '#EFC88B',
              light: '#F1A23B',
              dark: '#D9A05B',
              contrastText: '#000',
            },
            neutral: {
              main: '#F4E3B2',
              light: '#EFE2A1',
              dark: '#C7BBA3',
              contrastText: '#000',
            },
            text: {
              primary: '#3C3C3C',
              secondary: '#444140',
            },
            background: {
              default: '#FFFDF3',
            },
            grey:{
              main :'#D3d5d7',
              light: '#EBEBF0',
            },
            white:{
              gading : '#FEF9E3',
              linen :'#F2EAD3',
              ivory : '#Fdf6e4',
            }
      },
      typography: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 12,
        h1: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 40,
        },
        h2: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 32,
        },
        h3: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 24,
        },
        h4: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 20,
        },
        h5: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 16,
        },
        h6: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 14,
        },
      },
    };
  };