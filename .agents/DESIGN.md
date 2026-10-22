---
name: Athletic Kinetic
colors:
  surface: '#10141a'
  surface-dim: '#10141a'
  surface-bright: '#353940'
  surface-container-lowest: '#0a0e14'
  surface-container-low: '#181c22'
  surface-container: '#1c2026'
  surface-container-high: '#262a31'
  surface-container-highest: '#31353c'
  on-surface: '#dfe2eb'
  on-surface-variant: '#e5beb2'
  inverse-surface: '#dfe2eb'
  inverse-on-surface: '#2d3137'
  outline: '#ac897e'
  outline-variant: '#5c4037'
  surface-tint: '#ffb59c'
  primary: '#ffb59c'
  on-primary: '#5c1900'
  primary-container: '#ff570b'
  on-primary-container: '#511500'
  inverse-primary: '#ab3600'
  secondary: '#ffb68b'
  on-secondary: '#522300'
  secondary-container: '#ff7f1c'
  on-secondary-container: '#602a00'
  tertiary: '#7bd0ff'
  on-tertiary: '#00354a'
  tertiary-container: '#009bd1'
  on-tertiary-container: '#002d40'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbcf'
  primary-fixed-dim: '#ffb59c'
  on-primary-fixed: '#390c00'
  on-primary-fixed-variant: '#832700'
  secondary-fixed: '#ffdbc8'
  secondary-fixed-dim: '#ffb68b'
  on-secondary-fixed: '#321200'
  on-secondary-fixed-variant: '#753400'
  tertiary-fixed: '#c4e7ff'
  tertiary-fixed-dim: '#7bd0ff'
  on-tertiary-fixed: '#001e2c'
  on-tertiary-fixed-variant: '#004c69'
  background: '#10141a'
  on-background: '#dfe2eb'
  surface-variant: '#31353c'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  metric-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.03em
  metric-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
---

## Brand & Style

This design system embodies an athletic-tech aesthetic tailored for high-performance fitness logging and biomechanical tracking. The visual environment balances utilitarian clarity with energetic intensity: a deep carbon obsidian canvas that minimizes distraction during intense physical training, punctuated by vibrant, luminous orange accents that command immediate focus for progressive overload metrics, PR notifications, and critical input triggers.

The design philosophy combines high-end dark mode minimalism with precision data-display patterns. Surfaces are calibrated to look engineered rather than decorative—utilizing crisp translucent structure lines, subtle optical contrast, and athletic micro-interactions. The target audience encompasses dedicated athletes, weightlifters, and fitness practitioners who require zero-friction logging, hyper-legible numerical figures in dimly lit gyms, and instant visual validation of sets, repetitions, and velocity.

## Colors

The palette is engineered around an emissive dark architecture:

- **Primary (`#FF5400`) & Secondary (`#FF7A00`)**: Radiant, athletic kinetic oranges used exclusively for high-priority calls to action, completed sets, active state rings, and dynamic weight load markers. Hover states transition down to `#E04800` for physical tactile resistance.
- **Tertiary (`#38BDF8`)**: A technical cyan used sparingly for ancillary biomechanical indicators, rest timer progression rings, and informational delta tags (e.g., pace or RPE indicators).
- **Surfaces & Backgrounds**: Layered deep slates and carbons:
  - Base canvas: `#0B0F15`
  - Layer 1 Container (Cards & Nav): `#121824`
  - Layer 2 Raised (Modals, Dropdowns, Active Cells): `#1B2234`
- **Structural Outlines**: Subtly frosted slate borders (`#27314A`) to define bounding boundaries without visual clutter.
- **Typography & Neutrals**: Crisp high-legibility text in pure slate white (`#F8FAFC`) with secondary data, unit identifiers, and disabled states rendered in muted zinc-blue (`#94A3B8` and `#64748B`).

## Typography

Typography prioritizes rapid glanceability under motion and exertion:

- **Display & Headlines (`Plus Jakarta Sans`)**: Robust geometry, modern proportions, and sculpted counters provide confident hierarchy and motivating visual rhythm.
- **Metrics & Digits (`Plus Jakarta Sans`)**: All numbers (reps, sets, load weight, RPE, timers) must render using tabular numerical settings (`font-variant-numeric: tabular-nums`) to prevent layout shifts during live tracking or adjustments.
- **Body & Microcopy (`Inter`)**: Engineered neutral legibility for instructional text, exercise notes, set breakdown descriptions, and system meta-labels.

## Layout & Spacing

The layout is built upon an 8pt architectural rhythm using a responsive fluid grid:

- **Breakpoints & Grids**:
  - **Mobile (< 768px)**: 4-column fluid layout with `1rem` margins and `1rem` gutters. Interactive targets (set checkers, increment steppers) adhere strictly to a minimum 48px touch-target area.
  - **Tablet (768px – 1024px)**: 8-column layout with `1.5rem` margins and `1rem` gutters. Splits routine structure and workout analytics side-by-side.
  - **Desktop (> 1024px)**: 12-column layout capped at a max-width of 1440px with `2.5rem` margins and `1.5rem` gutters. Accommodates persistent sidebar workout queues, active telemetry center stage, and calendar volume heatmaps on the right.

Vertical density is compact to minimize scrolling during workout sessions; cards use dense inner padding (`space-md`) and unified row heights for set rows.

## Elevation & Depth

Visual depth is achieved through structural tonal layering and selective luminous diffusion rather than heavy generic drop shadows:

- **Base Layer (`#0B0F15`)**: Deep canvas level.
- **Level 1 (`#121824`)**: Routine lists, workout summaries, and static cards. Outlined by a crisp 1px stroke of `#27314A`.
- **Level 2 (`#1B2234`)**: Active exercise cards, hover states, and drawer drawers. Accented by a subtle top-edge 1px highlight (`rgba(255, 255, 255, 0.05)`).
- **Floating Modals & Overlays**: Positioned over a 70% blurred backdrop (`backdrop-filter: blur(12px)`); shadowed with an ultra-diffused ambient shadow: `0 20px 40px -15px rgba(0, 0, 0, 0.7)`.
- **Kinetic Glow (Active State)**: When an exercise or timer is actively engaged, the element casts an energetic 12px ambient blur tinted with the primary hue: `0 0 24px -4px rgba(255, 84, 0, 0.25)`.

## Shapes

This design system uses a balanced rounded geometry (Level 2: `0.5rem` base radius) that reflects contemporary athletic industrial design—neither playfully soft nor aggressively harsh.

- **Inputs, Chips, and Steppers**: `0.5rem` (`rounded-md`) to ensure clear visual alignment.
- **Cards and Containers**: `0.75rem` to `1rem` (`rounded-lg` to `rounded-xl`) for grouping sets, routines, and telemetry modules.
- **Pills**: Badges denoting PRs (Personal Records), completion indicators, and the weekly frequency selector segments employ full pill radius (`9999px`) to create clear semiotic contrast against structural content cards.

## Components

### Buttons
- **Primary Athletic Action**: Gradient fill from `#FF6B2C` to `#FF5400`, bold uppercase or semi-bold labels in `#FFFFFF`. On active/pressed, scale to 0.98 with `#E04800` background.
- **Secondary Ghost**: Transparent fill, 1px `#27314A` border, text `#F8FAFC`. On hover, border shifts to `#FF5400` with an opacity fill of `rgba(255, 84, 0, 0.08)`.
- **Quick-Log Set Checkers**: Circular or square button (min 44px) with outline `#27314A`. Upon logging, transitions instantly to `#FF5400` with a checkmark icon in pure white and a crisp haptic pulse.

### Exercise Cards & Set Rows
- Exercise cards live on `#121824` containers with header rows showing exercise name, targeted muscle group chip, and history link.
- Sets are arranged in structured tabular rows: Set Index, Previous Load, Weight Input, Reps Input, and Status Action. Alternating set rows maintain subtle contrast (`#161E2E`). Completed sets dim previous columns to `#64748B` while highlighting the completed rep badge.

### Metric Chips & Badges
- **Set/Rep/Weight Chips**: Encapsulated chips with background `#1B2234`, `#27314A` border, and high-contrast numerical values in `#F8FAFC` alongside `#94A3B8` unit labels (e.g., `85 kg`, `10 reps`).
- **PR Badges**: High-voltage pill (`rgba(255, 84, 0, 0.15)`) with `#FF7A00` text and a flame/star micro-icon.

### Inputs & Number Steppers
- Low-profile dark inputs (`#0B0F15`) inset within `#1B2234` cards, accented by a 1px border of `#27314A`.
- Large, center-aligned tabular numbers for weight and reps. Increment/decrement steppers positioned on input flanks for one-handed thumb interaction during workouts.
- Focus ring: `0 0 0 2px #FF5400`.

### Weekly Frequency Selector
- Segmented control supporting 3, 4, 5, or 6-day splits.
- Inactive days render with neutral slate text on dark background; selected frequency day turns `#FF5400` with bold text and soft ambient glow.

### Modals & Load Loggers
- Bottom-sheet sheet on mobile; centered dialog on desktop.
- Houses quick-add percentage calculators (+2.5kg, +5kg, +10kg quick buttons) and RPE slider controls with live kinetic orange progress fills.
