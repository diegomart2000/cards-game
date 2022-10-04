module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
    },

    fontFamily: {
      slab: 'Alfa Slab One',
      courier: 'Courier Prime',
    },

    colors: {
      transparent: 'transparent',
      black: {
        DEFAULT: '#000000',
        light: 'rgba(0, 0, 0, 0.5)',
      },
      white: {
        DEFAULT: '#FFFFFF',
        light: 'rgba(255, 255, 255, 0.5)',
      },
      current: 'currentColor',
      board: '#0A863E',
      accent: '#EFCE4B',
      card: {
        red: '#F64242',
        black: '#000000',
      },
    },

    borderRadius: {
      sm: '10px',
      md: '14px',
      lg: '24px',
    },

    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      3: '3px',
    },

    rotate: {
      '15': '15deg',
      '7': '7.5deg',
    }
  },
  plugins: [],
};
