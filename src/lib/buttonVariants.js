export const buttonGradients = {
    primary: "bg-button-primary",
    outline: "border border-white/50 bg-white/80 dark:border-white/10 dark:bg-white/10",
};
export const buttonShadows = {
    default: "shadow-solara-soft hover:shadow-glow",
    light: "shadow-2xs hover:shadow-xs",
    strong: "shadow-md hover:shadow-lg",
};
export const buttonSizes = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-5 py-2 text-sm",
    lg: "px-6 py-3 text-base",
};
export const buttonBase = "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-[rgba(0,123,255,0.5)] dark:focus-visible:ring-offset-slate-900 focus-glow disabled:cursor-not-allowed disabled:opacity-60";
export const buttonVariants = {
    primary: `${buttonBase} ${buttonGradients.primary} bg-[length:220%_220%] text-white ${buttonShadows.default} hover:scale-[1.02] hover:bg-[position:100%_50%]`,
    outline: `${buttonBase} ${buttonGradients.outline} text-slate-900 dark:text-white ${buttonShadows.light} hover:border-[rgba(0,123,255,0.45)] hover:scale-[1.02] dark:hover:border-[rgba(212,175,55,0.55)]`,
};
