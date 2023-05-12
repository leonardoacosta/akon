/** @type {import("tailwindcss").Config} */
module.exports = {
	presets: [require('@acme/tailwind-config')],
	theme: {
		extend: {
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 }
				},
				overlayShow: {
					from: { opacity: 0 },
					to: { opacity: 1 }
				},
				contentShow: {
					from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
					to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' }
				}
			},
			animation: {
				overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
				contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	}
};
