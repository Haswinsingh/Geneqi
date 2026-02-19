/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: "var(--font-main)",
                heading: "var(--font-heading)",
            },
            colors: {
                background: "var(--bg-dark)",
                foreground: "var(--text-main)",
                primary: {
                    DEFAULT: "var(--primary)",
                    glow: "var(--primary-glow)",
                },
                secondary: "var(--secondary)",
                accent: "var(--accent)",
                muted: "var(--text-muted)",
                glass: "var(--glass)",
                "glass-border": "var(--glass-border)",
            },
            container: {
                center: true,
                padding: "2rem",
                screens: {
                    "2xl": "1400px",
                },
            },
        },
    },
    plugins: [],
}
