tailwind.config = {
    darkMode: ["class"],
    theme: {
        extend: {
            colors: {
                background: "var(--color-background)",
                foreground: "var(--color-foreground)",
                card: "var(--color-card)",
                "card-foreground": "var(--color-card-foreground)",
                primary: "var(--color-primary)",
                "primary-foreground": "var(--color-primary-foreground)",
                secondary: "var(--color-secondary)",
                "secondary-foreground": "var(--color-secondary-foreground)",
                muted: "var(--color-muted)",
                "muted-foreground": "var(--color-muted-foreground)",
                accent: "var(--color-accent)",
                "accent-foreground": "var(--color-accent-foreground)",
                border: "var(--color-border)",
            },
            fontFamily: {
                display: ["Amiri", "Cairo", "serif"],
                body: ["Cairo", "system-ui", "sans-serif"],
            },
            boxShadow: {
                soft: "var(--shadow-soft)",
                elegant: "var(--shadow-elegant)",
            },
        },
    },
};
