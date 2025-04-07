
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
        // Futuristic theme
        space: {
          DEFAULT: '#0F172A',
          dark: '#020617',
          light: '#1E293B',
        },
        glow: {
          cyan: '#0BFFCF',
          purple: '#8B5CF6',
          pink: '#D946EF',
        },
			},
      keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
            filter: 'brightness(1)',
          },
          '50%': {
            opacity: '0.8',
            filter: 'brightness(1.2)',
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
			},
      backgroundImage: {
        'space-gradient': 'linear-gradient(to bottom, #0F172A, #020617)',
        'glow-gradient': 'linear-gradient(135deg, #0BFFCF 0%, #8B5CF6 50%, #D946EF 100%)',
        'cyberpunk-grid': "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='none'/%3E%3Cpath d='M0 0h1v1H0z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M0 10h1v1H0z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M0 20h1v1H0z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M0 30h1v1H0z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M0 40h1v1H0z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M0 50h1v1H0z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M0 60h1v1H0z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M0 70h1v1H0z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M0 80h1v1H0z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M0 90h1v1H0z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M10 0h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M10 10h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M10 20h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M10 30h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M10 40h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M10 50h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M10 60h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M10 70h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M10 80h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M10 90h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M20 0h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M20 10h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M20 20h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M20 30h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M20 40h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M20 50h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M20 60h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M20 70h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M20 80h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M20 90h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M30 0h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M30 10h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M30 20h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M30 30h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M30 40h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M30 50h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M30 60h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M30 70h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M30 80h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M30 90h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M40 0h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M40 10h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M40 20h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M40 30h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M40 40h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M40 50h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M40 60h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M40 70h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M40 80h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M40 90h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M50 0h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M50 10h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M50 20h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M50 30h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M50 40h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M50 50h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M50 60h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M50 70h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M50 80h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M50 90h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M60 0h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M60 10h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M60 20h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M60 30h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M60 40h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M60 50h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M60 60h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M60 70h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M60 80h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M60 90h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M70 0h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M70 10h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M70 20h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M70 30h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M70 40h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M70 50h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M70 60h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M70 70h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M70 80h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M70 90h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M80 0h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M80 10h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M80 20h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M80 30h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M80 40h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M80 50h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M80 60h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M80 70h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M80 80h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M80 90h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M90 0h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M90 10h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M90 20h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M90 30h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M90 40h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M90 50h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M90 60h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M90 70h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M90 80h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3Cpath d='M90 90h1v1h-1z' fill='%230BFFCF' fill-opacity='0.05'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'glow-cyan': '0 0 15px rgba(11, 255, 207, 0.5)',
        'glow-purple': '0 0 15px rgba(139, 92, 246, 0.5)',
        'glow-pink': '0 0 15px rgba(217, 70, 239, 0.5)',
      },
      borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
