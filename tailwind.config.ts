module.exports = {
	theme: {
		extend: {
			keyframes: {
				rotateFadeOutRight: {
					'0%': { opacity: '1', transform: 'rotate(0deg) translateX(0)' },
					'100%': { opacity: '0', transform: 'rotate(15deg) translateX(100%)' },
				},
				rotateFadeOutLeft: {
					'0%': { opacity: '1', transform: 'rotate(0deg) translateX(0)' },
					'100%': {
						opacity: '0',
						transform: 'rotate(-15deg) translateX(-100%)',
					},
				},
				slideInFromLeft: {
					'0%': { opacity: '0', transform: 'translateX(-100%)' },
					'100%': { opacity: '1', transform: 'translateX(0)' },
				},
				slideInFromRight: {
					'0%': { opacity: '0', transform: 'translateX(100%)' },
					'100%': { opacity: '1', transform: 'translateX(0)' },
				},
			},
			animation: {
				rotateFadeOutRight: 'rotateFadeOutRight 0.5s forwards',
				rotateFadeOutLeft: 'rotateFadeOutLeft 0.5s forwards',
				slideInFromLeft: 'slideInFromLeft 0.5s forwards',
				slideInFromRight: 'slideInFromRight 0.5s forwards',
			},
		},
	},
	plugins: [],
};
