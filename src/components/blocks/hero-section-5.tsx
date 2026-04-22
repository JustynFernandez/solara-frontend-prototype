import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronRight } from "lucide-react";
import { AnimatePresence, useReducedMotion, useScroll, motion } from "framer-motion";

type HeroSectionProps = {
  showHeader?: boolean;
  density?: "default" | "balanced" | "compact";
  videoSrc?: string;
  posterSrc?: string;
  title?: string;
  animatedTitlePrefix?: string;
  animatedTitleBeforeWord?: string;
  animatedTitleWords?: string[];
  animatedTitleSuffix?: string;
  animatedTitleIntervalMs?: number;
  animatedTitleLoop?: boolean;
  animatedTitleRestartDelayMs?: number;
  body?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};

export function HeroSection({
  showHeader = true,
  density = "default",
  videoSrc = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  posterSrc,
  title = "Neighborhood Solar, made simple",
  animatedTitlePrefix,
  animatedTitleBeforeWord,
  animatedTitleWords,
  animatedTitleSuffix = ".",
  animatedTitleIntervalMs = 2200,
  animatedTitleLoop = true,
  animatedTitleRestartDelayMs,
  body = "Plan projects, coordinate your community, and track impact in one place.",
  primaryCtaLabel = "Explore Solara",
  primaryCtaHref = "/services",
  secondaryCtaLabel = "See a demo",
  secondaryCtaHref = "/solar-navigator",
}: HeroSectionProps) {
  const sectionSpacingClass =
    density === "compact"
      ? "py-16 md:pb-20 lg:pb-24 lg:pt-44"
      : density === "balanced"
        ? "py-24 md:pb-32 lg:pb-36 lg:pt-64"
        : "py-24 md:pb-32 lg:pb-36 lg:pt-72";
  const titleClass =
    density === "compact"
      ? "mt-6 text-[clamp(2.35rem,11vw,3.7rem)] leading-[0.92] tracking-[-0.055em] sm:text-5xl sm:leading-[0.95] sm:tracking-[-0.045em] md:text-5xl md:leading-[0.95] lg:mt-10 xl:text-6xl"
      : density === "balanced"
        ? "mt-7 text-[clamp(2.35rem,11vw,3.8rem)] leading-[0.92] tracking-[-0.055em] sm:text-5xl sm:leading-[0.95] sm:tracking-[-0.045em] md:text-6xl lg:mt-14 xl:text-7xl"
        : "mt-8 text-[clamp(2.45rem,11.4vw,3.95rem)] leading-[0.92] tracking-[-0.055em] sm:text-5xl sm:leading-[0.95] sm:tracking-[-0.045em] md:text-6xl lg:mt-16 xl:text-7xl";
  const bodyClass = density === "compact" ? "mt-5 text-base md:text-lg" : density === "balanced" ? "mt-6 text-lg" : "mt-8 text-lg";
  const actionClass = density === "compact" ? "mt-8" : density === "balanced" ? "mt-11" : "mt-12";
  const prefersReducedMotion = useReducedMotion();
  const safeAnimatedTitleWords = React.useMemo(
    () => (animatedTitleWords ?? []).map((word) => word.trim()).filter(Boolean),
    [animatedTitleWords]
  );
  const hasAnimatedTitle = safeAnimatedTitleWords.length > 0;
  const [animatedWordIndex, setAnimatedWordIndex] = React.useState(0);
  const [completedCycleCount, setCompletedCycleCount] = React.useState(0);

  React.useEffect(() => {
    setAnimatedWordIndex(0);
    setCompletedCycleCount(0);
  }, [safeAnimatedTitleWords.join("|"), prefersReducedMotion, animatedTitleLoop, animatedTitleRestartDelayMs]);

  React.useEffect(() => {
    if (!hasAnimatedTitle || prefersReducedMotion || safeAnimatedTitleWords.length < 2) {
      return undefined;
    }

    const hasRestartDelay = typeof animatedTitleRestartDelayMs === "number" && animatedTitleRestartDelayMs > 0;
    const isRestingAtStartWord = !animatedTitleLoop && animatedWordIndex === 0 && completedCycleCount > 0;
    if (isRestingAtStartWord && !hasRestartDelay) {
      return undefined;
    }

    const nextDelayMs = isRestingAtStartWord ? (animatedTitleRestartDelayMs as number) : animatedTitleIntervalMs;
    const timeoutId = window.setTimeout(() => {
      setAnimatedWordIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % safeAnimatedTitleWords.length;
        if (nextIndex === 0) {
          setCompletedCycleCount((prevCount) => prevCount + 1);
        }
        return nextIndex;
      });
    }, nextDelayMs);

    return () => window.clearTimeout(timeoutId);
  }, [
    animatedTitleIntervalMs,
    animatedTitleLoop,
    animatedTitleRestartDelayMs,
    animatedWordIndex,
    completedCycleCount,
    hasAnimatedTitle,
    prefersReducedMotion,
    safeAnimatedTitleWords,
  ]);

  const animatedTitleLongestWord = hasAnimatedTitle
    ? safeAnimatedTitleWords.reduce(
        (longestWord, word) => (word.length > longestWord.length ? word : longestWord),
        safeAnimatedTitleWords[0]
      )
    : "";
  const animatedTitleCurrentWord = hasAnimatedTitle ? safeAnimatedTitleWords[animatedWordIndex] ?? safeAnimatedTitleWords[0] : "";
  const animatedTitleLongestToken = hasAnimatedTitle ? `${animatedTitleLongestWord}${animatedTitleSuffix}` : "";
  const animatedTitleCurrentToken = hasAnimatedTitle ? `${animatedTitleCurrentWord}${animatedTitleSuffix}` : "";
  const resolvedAnimatedTitlePrefix = animatedTitlePrefix ?? title;
  const resolvedAnimatedTitleBeforeWord = (animatedTitleBeforeWord ?? "").trim();
  const mobileTitleLines = React.useMemo(() => {
    const normalizedPrefix = resolvedAnimatedTitlePrefix.replace(/\s+/g, " ").trim();
    if (!normalizedPrefix) return ["", ""];
    if (normalizedPrefix === "Neighborhood Solar," || normalizedPrefix === "Neighborhood Solar") {
      return ["Neighborhood", "Solar,"];
    }

    const prefixParts = normalizedPrefix.split(" ");
    if (prefixParts.length === 1) {
      return [normalizedPrefix, ""];
    }

    const lastToken = prefixParts.pop() ?? "";
    return [prefixParts.join(" "), lastToken];
  }, [resolvedAnimatedTitlePrefix]);

  const renderAnimatedToken = (className?: string, reserveWidth = true) => {
    if (prefersReducedMotion) {
      return <span className={cn("font-semibold", className)}>{`${safeAnimatedTitleWords[0]}${animatedTitleSuffix}`}</span>;
    }

    return (
      <span
        className={cn("inline-block font-semibold", className)}
        style={reserveWidth ? { minWidth: `${Math.max(animatedTitleLongestToken.length, 1)}ch` } : undefined}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={animatedTitleCurrentToken}
            className="inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            {animatedTitleCurrentToken}
          </motion.span>
        </AnimatePresence>
      </span>
    );
  };

  return (
    <>
      {showHeader ? <HeroHeader /> : null}
      <main className="overflow-x-hidden">
        <section>
          <div className={cn("relative isolate overflow-hidden", sectionSpacingClass)}>
            <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 lg:block lg:px-12">
              <div className="mx-auto max-w-xl text-center lg:ml-0 lg:max-w-full lg:text-left">
                <h1 className={cn("max-w-[15.5ch] text-balance text-white [text-shadow:0_8px_28px_rgba(0,0,0,0.35)] sm:max-w-2xl", titleClass)}>
                  {!hasAnimatedTitle ? (
                    title
                  ) : (
                    <>
                      <span className="sm:hidden">
                        <span className="block">{mobileTitleLines[0]}</span>
                        {mobileTitleLines[1] ? <span className="block">{mobileTitleLines[1]}</span> : null}
                        <span className="mt-1 inline-flex items-baseline whitespace-nowrap text-[0.8em] leading-[0.94]">
                          {resolvedAnimatedTitleBeforeWord ? (
                            <>
                              <span>{resolvedAnimatedTitleBeforeWord}</span>
                              <span aria-hidden="true">&nbsp;</span>
                              <span>{renderAnimatedToken(undefined, false)}</span>
                            </>
                          ) : (
                            renderAnimatedToken(undefined, false)
                          )}
                        </span>
                      </span>

                      <span className="hidden sm:inline">
                        <span>{resolvedAnimatedTitlePrefix}</span>
                        {resolvedAnimatedTitleBeforeWord ? (
                          <span className="mt-1 inline-flex items-baseline whitespace-nowrap sm:ml-[0.25ch] sm:mt-0">
                            <span>{resolvedAnimatedTitleBeforeWord}</span>
                            {"\u00A0"}
                            {renderAnimatedToken()}
                          </span>
                        ) : (
                          <span className="sm:ml-[0.25ch]">{renderAnimatedToken()}</span>
                        )}
                      </span>
                    </>
                  )}
                </h1>
                <p className={cn("max-w-[29ch] text-balance text-white/90 [text-shadow:0_4px_16px_rgba(0,0,0,0.35)] sm:max-w-2xl", bodyClass)}>
                  {body}
                </p>

                <div className={cn("flex flex-col items-center justify-center gap-2.5 sm:flex-row lg:justify-start", actionClass)}>
                  <Button
                    asChild
                    size="lg"
                    className="h-12 rounded-full border border-white/42 bg-white pl-5 pr-3 text-base font-semibold text-slate-950 shadow-[0_18px_46px_rgba(7,15,28,0.24)] hover:bg-white/94 hover:text-slate-950 focus-visible:ring-white/70 focus-visible:ring-offset-0 dark:border-white/24 dark:bg-white dark:text-slate-950 dark:hover:bg-white/94"
                  >
                    <a href={primaryCtaHref}>
                      <span className="text-nowrap">{primaryCtaLabel}</span>
                      <ChevronRight className="ml-1" />
                    </a>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    variant="ghost"
                    className="h-12 rounded-full border border-white/22 bg-black/14 px-5 text-base font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm hover:bg-black/24 hover:text-white focus-visible:ring-white/55 focus-visible:ring-offset-0 dark:border-white/18 dark:bg-white/10 dark:hover:bg-white/16"
                  >
                    <a href={secondaryCtaHref}>
                      <span className="text-nowrap">{secondaryCtaLabel}</span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="absolute inset-1 overflow-hidden rounded-3xl border border-black/10 lg:rounded-[3rem] dark:border-white/5">
              <video
                autoPlay
                loop
                muted
                playsInline
                poster={posterSrc}
                className="size-full rounded-[inherit] object-cover opacity-78 brightness-95 contrast-110 saturate-125 dark:opacity-58 dark:brightness-90 dark:contrast-110 dark:saturate-125 dark:lg:opacity-76"
                src={videoSrc}
              />
            </div>
          </div>
        </section>

      </main>
    </>
  );
}

const menuItems = [
  { name: "Navigator", href: "/solar-navigator" },
  { name: "Workspaces", href: "/projects" },
  { name: "Connect", href: "/connect" },
  { name: "Learn", href: "/learn" },
];

const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { scrollYProgress } = useScroll();

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrolled(latest > 0.05);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <header>
      <nav data-state={menuState && "active"} className="group fixed z-20 w-full pt-2">
        <div
          className={cn(
            "mx-auto max-w-7xl rounded-3xl px-6 transition-all duration-300 lg:px-12",
            scrolled && "bg-background/50 backdrop-blur-2xl"
          )}
        >
          <motion.div
            className={cn(
              "relative flex flex-wrap items-center justify-between gap-6 py-3 duration-200 lg:gap-0 lg:py-6",
              scrolled && "lg:py-4"
            )}
          >
            <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
              <a href="/" aria-label="home" className="flex items-center space-x-2">
                <Logo />
              </a>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>

              <div className="hidden lg:block">
                <ul className="flex gap-8 text-sm">
                  {menuItems.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-muted-foreground hover:text-foreground block duration-150"
                      >
                        <span>{item.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-muted-foreground hover:text-foreground block duration-150"
                      >
                        <span>{item.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button asChild variant="outline" size="sm">
                  <a href="/sign-in">
                    <span>Login</span>
                  </a>
                </Button>
                <Button asChild size="sm">
                  <a href="/register">
                    <span>Sign up</span>
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </nav>
    </header>
  );
};

const Logo = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 78 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-5 w-auto", className)}
    >
      <path
        d="M3 0H5V18H3V0ZM13 0H15V18H13V0ZM18 3V5H0V3H18ZM0 15V13H18V15H0Z"
        fill="url(#logo-gradient)"
      />
      <defs>
        <linearGradient id="logo-gradient" x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9B99FE" />
          <stop offset="1" stopColor="#2BC8B7" />
        </linearGradient>
      </defs>
    </svg>
  );
};
