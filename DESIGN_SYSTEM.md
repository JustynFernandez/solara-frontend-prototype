# Solara Design System

**Updated:** January 2026

This document describes the standardized design tokens, patterns, and utilities for the Solara front-end application.

---

## Color System

### Brand Colors (CSS Variables)

All brand colors are defined as CSS custom properties in `src/index.css`:

```css
--solara-navy: #003366        /* Primary dark blue */
--solara-blue: #007bff        /* Primary blue */
--solara-blue-alt: #0b4fbf    /* Alternative blue shade */
--solara-sky: #00bfff         /* Light cyan */
--solara-gold: #d4af37        /* Accent gold */
--solara-amber: #ffbf5f       /* Light gold */
--solara-ember: #e0952d       /* Orange-gold */
--solara-ink: #0b1224         /* Dark text */
--solara-cloud: #f5f5f5       /* Light gray */
```

### RGB Variables (For Transparency)

Use these for consistent rgba() colors:

```css
--solara-blue-rgb: 0, 123, 255
--solara-gold-rgb: 212, 175, 55
--solara-navy-rgb: 0, 51, 102
```

**Usage:**
```css
background: rgba(var(--solara-blue-rgb), 0.2);
```

---

## Border Opacities

**Standardized to 4 levels:**

```css
--border-10: rgba(255, 255, 255, 0.1)  /* Subtle */
--border-20: rgba(255, 255, 255, 0.2)  /* Light */
--border-50: rgba(255, 255, 255, 0.5)  /* Medium */
--border-70: rgba(255, 255, 255, 0.7)  /* Strong */
```

**Tailwind Usage:**
```jsx
className="border border-white/10"  // Subtle
className="border border-white/20"  // Light
className="border border-white/50"  // Medium
className="border border-white/70"  // Strong
```

---

## Glass Effects

**Consolidated to 2 variants:**

### 1. `.glass-surface` (Light Glass)
```css
background: rgba(255, 255, 255, 0.8);
border: 1px solid var(--border-50);
backdrop-filter: blur(18px);
box-shadow: var(--shadow-xs), 0 1px 0 var(--border-50);
```

### 2. `.glass-heavy` (Strong Glass)
```css
background: rgba(255, 255, 255, 0.14);
border: 1px solid var(--border-50);
backdrop-filter: blur(22px) saturate(1.2);
box-shadow: var(--shadow-md), 0 1px 0 var(--border-50);
```

**When to use:**
- Use `.glass-surface` for overlays, modals, and panels
- Use `.glass-heavy` for hero sections and featured content

---

## Shadow Scale

All shadows use the standardized Tailwind shadow scale from `tailwind.config.cjs`:

```css
shadow-2xs: 0px 4px 12px rgba(12, 18, 36, 0.05)
shadow-xs: 0px 8px 28px rgba(12, 18, 36, 0.08)
shadow-sm: 0px 14px 42px rgba(12, 18, 36, 0.12)
shadow: 0px 18px 56px rgba(12, 18, 36, 0.14)
shadow-md: 0px 24px 68px rgba(12, 18, 36, 0.16)
shadow-lg: 0px 28px 88px rgba(12, 18, 36, 0.18)
shadow-xl: 0px 32px 108px rgba(12, 18, 36, 0.2)
shadow-2xl: 0px 34px 120px rgba(14, 207, 138, 0.24)
```

**Special shadows:**
```css
shadow-glow: 0 10px 40px rgba(0, 123, 255, 0.28)          /* Blue glow */
shadow-glow-amber: 0 10px 40px rgba(212, 175, 55, 0.3)    /* Gold glow */
shadow-solara-soft: 0 18px 56px rgba(0, 51, 102, 0.12)    /* Soft depth */
shadow-solara-glass: 0 20px 70px rgba(0, 51, 102, 0.16), 0 1px 0 rgba(255, 255, 255, 0.32)
```

**Usage:**
```jsx
className="shadow-xs hover:shadow-md"
className="shadow-glow"
```

---

## Background Gradients

### Page Backgrounds (Tailwind Classes)

```jsx
className="bg-page-light"     // Services, Connect pages
className="bg-page-home"      // Home page variant
className="bg-page-projects"  // Projects page
className="bg-page-dark"      // Dark mode backgrounds
```

### Button Gradients

```jsx
className="bg-button-primary" // Primary button gradient
```

### Decorative Gradients (CSS Classes)

```css
.solara-gradient       /* Brand gradient: navy → blue → gold */
.solara-gradient-soft  /* Soft overlay gradient */
.gradient-accent       /* Accent overlay gradient */
```

---

## Spacing Hierarchy

### Section Spacing (Vertical)

```css
--spacing-section-sm: 3rem    /* py-12: 48px */
--spacing-section-md: 3.5rem  /* py-14: 56px */
--spacing-section-lg: 4rem    /* py-16: 64px */
```

**Utility Classes:**
```jsx
className="section-spacing-sm"  // Small sections
className="section-spacing-md"  // Standard sections
className="section-spacing-lg"  // Hero sections
```

### Card Padding

```css
--spacing-card-sm: 1rem    /* p-4: 16px - Compact */
--spacing-card-md: 1.5rem  /* p-6: 24px - Standard */
--spacing-card-lg: 2rem    /* p-8: 32px - Spacious */
```

**Usage:**
```jsx
className="p-4"  // Compact cards, badges
className="p-6"  // Standard cards, panels
className="p-8"  // Hero cards, featured content
```

### Gap Spacing

```css
--spacing-gap-sm: 1.5rem   /* gap-6: 24px */
--spacing-gap-md: 2rem     /* gap-8: 32px */
--spacing-gap-lg: 3rem     /* gap-12: 48px */
```

---

## Button System

### Importing Button Variants

```tsx
import { buttonVariants, buttonSizes, buttonShadows } from "@/lib/buttonVariants";
```

### Available Variants

**Pre-composed variants:**
```tsx
buttonVariants.primary   // Full gradient with glow
buttonVariants.outline   // Ghost button with border
```

**Component parts:**
```tsx
buttonGradients.primary  // Just the gradient
buttonGradients.outline  // Just the outline style
buttonShadows.default    // Standard shadow
buttonShadows.light      // Light shadow
buttonShadows.strong     // Strong shadow
buttonSizes.sm           // Small button
buttonSizes.md           // Medium button
buttonSizes.lg           // Large button
```

### Button Usage Examples

**With AnimatedButton component:**
```tsx
import AnimatedButton from "@/components/ui/animated-button";

<AnimatedButton variant="primary">Get Started</AnimatedButton>
<AnimatedButton variant="outline">Learn More</AnimatedButton>
```

**Custom button composition:**
```tsx
import { buttonBase, buttonGradients, buttonShadows, buttonSizes } from "@/lib/buttonVariants";

<button className={`${buttonBase} ${buttonGradients.primary} ${buttonShadows.default} ${buttonSizes.md}`}>
  Custom Button
</button>
```

---

## Card Surfaces

### Standard Cards

**`.card-surface`** - Standard elevated card with gradient background
```jsx
className="card-surface rounded-2xl p-6"
```

**`.card-ghost`** - Transparent card with subtle border
```jsx
className="card-ghost rounded-xl p-4"
```

### Pill Badges

**`.skill-pill`** - 3D rivet-style pill (for skills, tags)
```jsx
className="skill-pill"
```

**`.pill-soft`** - Soft transparent pill
```jsx
className="pill-soft rounded-full px-3 py-1"
```

---

## Typography

### Font Families

```css
--font-sans: "Inter", "Sora", system-ui, sans-serif
--font-serif: "Montserrat", "Plus Jakarta Sans", sans-serif
--font-mono: "Space Grotesk", monospace
```

**Tailwind Usage:**
```jsx
className="font-sans"     // Body text
className="font-display"  // Headings (Montserrat)
className="font-mono"     // Code, technical content
```

---

## Animation & Motion

### Reduced Motion Support

The application respects user preferences via:
- `useEcoMode()` hook - Disables heavy animations
- `@media (prefers-reduced-motion: reduce)` - System preference
- `[data-perf="low"]` - Performance mode flag

### Animation Classes

```css
.motion-purpose         /* Interactive card with lift effect */
.motion-arrow          /* Arrow that shifts on hover */
.motion-arrow-shift    /* Container that triggers arrow shift */
```

### Framer Motion Animations

```jsx
animate={{ opacity: [0, 1], y: [20, 0] }}
transition={{ duration: 0.5, ease: "easeOut" }}
```

---

## Dark Mode

Dark mode is class-based using the `.dark` class on the root element.

**All CSS variables automatically switch** when `.dark` is present:

```css
:root { --border: rgba(12, 18, 36, 0.1); }
.dark { --border: rgba(255, 255, 255, 0.1); }
```

**Tailwind usage:**
```jsx
className="bg-white dark:bg-slate-900"
className="text-slate-900 dark:text-white"
```

---

## Best Practices

### ✅ Do

- Use CSS custom properties for colors: `var(--solara-blue)`
- Use standardized border opacities: `border-white/10`, `border-white/20`, `border-white/50`, `border-white/70`
- Use shadow scale from Tailwind config: `shadow-xs`, `shadow-md`, `shadow-glow`
- Import button variants from `@/lib/buttonVariants`
- Use spacing utilities: `.section-spacing-md`, `p-6`, `gap-8`
- Use `.glass-surface` or `.glass-heavy` for glass effects

### ❌ Don't

- Hard-code hex colors in JSX: ~~`#007bff`~~
- Use arbitrary border opacities: ~~`border-white/35`~~
- Define custom shadows inline: ~~`shadow-[0_20px_80px_rgba(12,18,36,0.1)]`~~
- Duplicate button gradient strings
- Create one-off spacing values
- Create new glass effect classes

---

## Migration Guide

### Replacing Hard-Coded Colors

**Before:**
```jsx
style={{ color: "#007bff" }}
className="text-[#d4af37]"
```

**After:**
```jsx
style={{ color: "var(--solara-blue)" }}
className="text-solara-gold"
```

### Replacing Custom Shadows

**Before:**
```jsx
className="shadow-[0_20px_80px_rgba(12,18,36,0.1)]"
```

**After:**
```jsx
className="shadow-md"
```

### Replacing Button Gradients

**Before:**
```jsx
className="bg-[linear-gradient(120deg,#003366,#0b4fbf,#d4af37)]"
```

**After:**
```jsx
className="bg-button-primary"
// or
import { buttonVariants } from "@/lib/buttonVariants";
className={buttonVariants.primary}
```

---

## File References

- **Colors & Variables:** [src/index.css](src/index.css) (lines 7-106)
- **Tailwind Config:** [tailwind.config.cjs](tailwind.config.cjs)
- **Button System:** [src/lib/buttonVariants.ts](src/lib/buttonVariants.ts)
- **Animated Button:** [src/components/ui/animated-button.tsx](src/components/ui/animated-button.tsx)

---

## Questions?

For design system updates or questions, update this document and ensure all components follow these standards.
