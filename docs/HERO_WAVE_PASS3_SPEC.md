# Hero Wave Pass 3 Spec (Decision-Complete)

## Summary
This pass targets Stripe-style hero treatment quality for Solara: a clearly visible top-right wave sweep in light and dark mode, clipped to hero only, with a visible hero bottom divider and no panel artifacts.

Validation baseline from current screenshots:
- Light mode (1366/768/390): wave is too faint and reads as background tint instead of an intentional sweep.
- Dark mode (1366/768/390): wave visibility is acceptable, but sweep origin can be clearer on desktop/tablet.
- Divider line exists, but light-mode separation competes with background glow.

## Scope
- Homepage hero wave system only.
- No route, backend, schema, or API changes.
- No shared component API breaking changes.

## Public API / Interface Changes
- No changes to route/API/backend/public schemas.
- Keep `HeroWaveAnimationProps` unchanged:
  - `className?: string`
  - `theme?: "light" | "dark" | "auto"`
  - `interactive?: boolean`

## Implementation Plan

### 1) Hero Composition (Top-Origin Sweep)
File: `front-end/src/pages/Home.jsx`

- Keep wave as hero background layer.
- Increase hero stage so wave has room to arc:
  - `lg:min-h-[680px]` (from `620px`).
- Force top-origin sweep container placement:
  - `HeroWaveAnimation` class should be:
    - `absolute inset-x-0 -top-32 bottom-0 sm:-top-36 lg:-top-44`
- Keep `hero-divider-line` at hero bottom.

### 2) Wave Layer Geometry + Clipping
File: `front-end/src/index.css`

- `.hero-wave` remains hero-clipped (`overflow: hidden`, `isolation: isolate`).
- Replace mask with stronger top-right radial emphasis:
  - Desktop mask center above/right of hero, with slower falloff into center.
  - Keep mobile/tablet masks separately tuned.
- Set live and fallback layer extents to match exactly:
  - `.hero-wave__canvas` and `.hero-wave__static` must share identical inset values per breakpoint.
- Breakpoint insets:
  - Desktop (`>=1024`): `inset: -42% -8% -8% -4%`
  - Tablet (`640-1023`): `inset: -34% -14% -6% -12%`
  - Mobile (`<640`): `inset: -24% -18% -4% -30%`

### 3) Blend Strategy (Remove Washout)
File: `front-end/src/index.css`

- Reduce left washout in `.hero-wave-mask` for light mode:
  - Left gradient opacity target range:
    - start `0.82-0.88`, mid `0.30-0.38`, near center `0.10-0.16`.
- Dark mode mask:
  - Keep stronger contrast than light, but avoid hard stripe.
- Maintain no hard rectangle edges:
  - No linear hard-stop gradients that terminate the wave abruptly.

### 4) Shader Tuning (Visibility Without Harshness)
File: `front-end/src/components/ui/hero-wave/shaders/wave.frag.glsl`

- Increase visible alpha envelope:
  - `alpha = edgeFade * (1.03 + vWave * 0.12) * uIntro`
  - Clamp remains `[0, 1]`.
- Expand right sweep entry:
  - `rightSweep` threshold broadens toward center so light mode has clear presence.
- Reduce line harshness:
  - Keep line detail but lower line contribution intensity by ~18-24%.
- Keep glow controlled:
  - Avoid over-bloom that causes fogged panel look.

### 5) Preset Tuning (Top-Right Arc Readability)
File: `front-end/src/components/ui/hero-wave/SolaraWaveConfig.ts`

- Light preset:
  - Increase footprint and top-origin posture:
    - `meshScaleX` and `meshScaleY` +6-10%
    - `meshOffsetY` +0.08 to +0.14
    - `meshRotationZ` small decrease toward steeper diagonal entry.
  - Slightly increase glow only if light mode remains faint after mask changes.
- Dark preset:
  - Keep current intensity near baseline; only adjust orientation for parity with light.
- Mobile/tablet modifiers:
  - Keep reduced displacement for readability.
  - Preserve vertical origin (`meshOffsetY` additive) across breakpoints.

### 6) Perf/Fallback Stability
Files:
- `front-end/src/components/ui/hero-wave/HeroWaveAnimation.tsx`
- `front-end/src/components/ui/hero-wave/SolaraWaveEngine.ts`

- Keep existing perf guard (already tuned):
  - delayed sampling window
  - lower FPS thresholds
  - longer sustained duration before fallback.
- Keep dev behavior:
  - do not hard-force fallback on transient perf drop in development.
- Keep production fallback safety:
  - force fallback on sustained low FPS.

### 7) Divider Line Segmentation
File: `front-end/src/index.css`

- Keep `.hero-divider-line` always visible over wave.
- Increase light-mode divider contrast slightly:
  - raise center stop opacity by ~0.08.
- Dark mode divider remains restrained.

## Test Cases and Validation

### A) Build/Runtime
1. `npm run build` succeeds.
2. No runtime errors on homepage mount/unmount.

### B) Screenshot Validation (Fixed Viewports)
Capture at:
1. `1366x900` light and dark
2. `768x1024` light and dark
3. `390x844` light and dark

### C) Visual Acceptance Criteria
1. Light 1366:
   - Wave is clearly visible without zooming.
   - Sweep reads as top-right origin moving downward.
   - No panel/boxed rectangle.
2. Light 768:
   - Wave still visible and integrated; text remains readable.
3. Light 390:
   - Controlled but noticeable presence; no clipping into nav.
4. Dark modes:
   - Similar structure; no glow spill overpowering content.
5. Divider line:
   - visibly separates hero and stats strip in both themes.

### D) Motion/Perf Acceptance
1. No immediate switch to fallback on capable desktop.
2. `prefers-reduced-motion` => static fallback only.
3. Eco mode / `data-perf="low"` => static fallback only.

## Rollout and Risk Controls
- Keep `VITE_HERO_WAVE` kill switch intact.
- Keep static fallback assets as permanent safety net.
- If light mode still fails criteria after Pass 3:
  - escalate to Phase 2 (WebGPU/TSL path), not before.

## Assumptions
1. Homepage editorial layout and copy remain unchanged.
2. Wave remains hero-only, not sitewide.
3. No migration to R3F in this pass; current custom Three.js engine remains.
