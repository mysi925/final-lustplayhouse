<instructions>
## 🚨 MANDATORY: CHANGELOG TRACKING 🚨

You MUST maintain this file to track your work across messages. This is NON-NEGOTIABLE.

---

## INSTRUCTIONS

- **MAX 5 lines** per entry - be concise but informative
- **Include file paths** of key files modified or discovered
- **Note patterns/conventions** found in the codebase
- **Sort entries by date** in DESCENDING order (most recent first)
- If this file gets corrupted, messy, or unsorted -> re-create it. 
- CRITICAL: Updating this file at the END of EVERY response is MANDATORY.
- CRITICAL: Keep this file under 300 lines. You are allowed to summarize, change the format, delete entries, etc., in order to keep it under the limit.

</instructions>

<changelog>
- 2026-06-25: Final carousel polish added subtle side peeks (prev/next) with ~15–25% edge visibility, soft blur, dim opacity, and slight downscale while keeping active media full-bleed.
- Updated files: `src/sections/PageShell/components/HeroImage.tsx`.
- Pattern note: keep adjacent slide previews as edge hints only (no framed side panels) using offset positioning + blur/dim treatment.
- 2026-06-25: Added bold stacked "Lust Playhouse" logo above the preview with green/white gradient styling to match site theme.
- Updated files: `src/sections/PageShell/components/PreviewCard.tsx`.
- Pattern note: keep brand logo as text gradient block above `HeroImage` so it remains crisp/responsive without extra media assets.
- 2026-06-25: Carousel fourth iteration cleanup completed to remove boxed panel feel and open the preview stage.
- Updated files: `src/sections/PageShell/components/HeroImage.tsx`.
- Pattern note: use full-bleed active media with edge-offset side peeks outside the stage while keeping arrows, swipe gestures, and green dot navigation.
- 2026-06-25: Carousel third iteration cleanup completed with full-bleed active media, non-overlapping side previews, removed inner boxed slide frame layer, and restored bottom green dots.
- Updated files: `src/sections/PageShell/components/HeroImage.tsx`.
- Pattern note: use a 3-column layout (`side / active / side`) for clean separation while preserving arrows, swipe, and neon green dark styling.
- 2026-06-25: Removed requested hero elements (Curated/Private/Live badges, Lust Playhouse Lounge heading/description, and live stats card).
- Updated files: `src/sections/LandingHero/components/HeroHeader.tsx`, `src/sections/LandingHero/components/FeatureBadges.tsx`, `src/sections/LandingHero/components/OnlineMembers.tsx`.
- Pattern note: hide optional hero content cleanly by returning `null` in section components and removing only targeted copy blocks.
- 2026-06-25: Converted Lust Playhouse panel into a functional "Join The Community" links section with three clickable CTA rows while keeping the green neon theme.
- Updated files: `src/sections/LandingHero/components/ActionLinks.tsx`.
- Pattern note: community CTA rows use external `<a>` targets (`target="_blank"`) and card-style green glow states.
- 2026-06-25: Moved Lust Playhouse panel from top of page to sit directly under pricing and immediately above FAQ.
- Updated files: `src/sections/PageShell/components/PreviewCard.tsx`, `src/sections/SubscriptionGuide/components/StepsSection.tsx`.
- Pattern note: place the panel between pricing and FAQ by rendering `LandingHero` inside `StepsSection`, not in top-level `PreviewCard` order.
- 2026-06-25: Reordered preview flow so `LandingHero` renders before `SubscriptionGuide`, placing the Lust Playhouse intro panel above the FAQ.
- Updated files: `src/sections/PageShell/components/PreviewCard.tsx`.
- Pattern note: cross-section vertical placement is controlled by component order inside `PreviewCard`.
- 2026-06-25: Iteration 3 carousel cleanup in `HeroImage`: removed top green status pill, removed bottom dots, removed black background fills behind slide videos, and expanded from 3 to 8 videos.
- Updated files: `src/sections/PageShell/components/HeroImage.tsx`.
- Pattern note: keep carousel controls via arrows/swipe while optional chrome (top pill/dots) can be removed without affecting navigation.
- 2026-06-25: Iteration 2 carousel cleanup in `HeroImage` for a more immersive open preview: active slide now fills the media area, side slides are non-overlapping edge peeks, and no preview text labels are shown.
- Updated files: `src/sections/PageShell/components/HeroImage.tsx`.
- Pattern note: avoid inner boxed media wrappers; use edge-offset side previews plus a wide centered active slide for clean depth without transparency overlap.
- 2026-06-25: Fixed carousel slide overlap and cleaned preview frame in `HeroImage` while preserving green neon theme and interaction patterns.
- Updated files: `src/sections/PageShell/components/HeroImage.tsx`.
- Pattern note: use an inner centered viewport for active media and constrained side peeks to avoid overlap while keeping arrows/swipe/dots behavior.
- 2026-06-25: Replaced `HeroImage` static `<img>` with a fully functional futuristic video carousel (working left/right arrows, swipe support, center-focus card, side-peek cards, indicator dots, and premium green glass/neon motion styling).
- Updated files: `src/sections/PageShell/components/HeroImage.tsx`.
- Pattern note: hero media now uses a wrapped index carousel with touch gestures + arrow controls and layered grid/scanline/neon overlays inside one rounded container.
- 2026-06-25: Made the "How It Works" mobile cards square and side-by-side (3-up) to match the provided reference while preserving the green neon styling.
- Updated files: `src/sections/SubscriptionGuide/components/StepsSection.tsx`.
- Pattern note: keep mobile join-flow as a fixed 3-column tile row with `aspect-square` cards and compact typography to avoid stacking.
- 2026-06-25: Replaced the old join-flow intro with screenshot-inspired "How It Works" cards while preserving the green neon theme.
- Updated files: `src/sections/SubscriptionGuide/components/StepsSection.tsx`.
- Pattern note: keep this top onboarding strip as three dark rounded cards with top-right number badges, centered icon chips, and concise one-line copy.
- 2026-06-25: Updated pricing tier visuals to screenshot-inspired shape while keeping green theme (new "Choose Your Tier" heading, glow cards, crypto line per card, accepted Card/Crypto pills).
- Updated files: `src/sections/SubscriptionGuide/components/StepsSection.tsx`.
- Pattern note: keep pricing cards as dark rounded shells with emerald accents, left-aligned checklist rows, and payment pills below cards.
- 2026-06-25: Moved pricing section directly below previews and changed mobile plan layout to vertical stacking.
- Updated files: `src/sections/PageShell/components/PreviewCard.tsx`, `src/sections/LandingHero/index.tsx`, `src/sections/SubscriptionGuide/components/StepsSection.tsx`.
- Pattern note: pricing placement is controlled in `PreviewCard` (immediately after `HeroImage`), and plans now use `grid-cols-1` mobile / `md:grid-cols-3` desktop.
- 2026-06-25: Replaced tier buttons with a modern pricing carousel that keeps all cards side-by-side with horizontal swipe + snap on mobile and equal-width row behavior on desktop.
- Updated files: `src/sections/SubscriptionGuide/components/StepsSection.tsx`.
- Pattern note: keep pricing plans in `overflow-x-auto` + `snap-x snap-mandatory` layout (no vertical stacking), with left-aligned check-icon feature rows.
- 2026-06-25: Removed the hero "Lust Playhouse Access" callout block from the rendered page.
- Updated files: `src/sections/LandingHero/components/ActionLinks.tsx`.
- Pattern note: keep `ActionLinks` available as a toggle point by returning `null` when the access panel should be hidden.
- 2026-06-25: Made the join-flow step pills significantly smaller by reducing spacing, card padding, badge size, and text scale.
- Updated files: `src/sections/SubscriptionGuide/components/StepsSection.tsx`.
- Pattern note: keep the 3-step overview compact so it reads like quick pills, not feature cards.
- 2026-06-25: Removed hero onboarding mini-section by deleting "Member Onboarding" label and Step 1/Step 2 cards from action links block.
- Updated files: `src/sections/LandingHero/components/ActionLinks.tsx`.
- Pattern note: keep the hero action area concise with only the primary access message panel unless onboarding cards are explicitly needed.
- 2026-06-25: Moved join flow section to render directly below the "Lust Playhouse Access" pill by nesting `SubscriptionGuide` in hero content flow.
- Updated files: `src/sections/LandingHero/index.tsx`, `src/sections/PageShell/components/PreviewCard.tsx`.
- Pattern note: join flow placement is now contextually tied to the access pill block inside hero container.
- 2026-06-25: Restored original green/black theme palette across global tokens and UI cards without changing layout/content.
- Updated files: `tailwind.css`, `src/sections/LandingHero/{index.tsx,components/HeroHeader.tsx,components/FeatureBadges.tsx,components/ActionLinks.tsx,components/OnlineMembers.tsx,components/HeroFooter.tsx}`, `src/sections/SubscriptionGuide/components/StepsSection.tsx`.
- Pattern note: keep the green neon-on-black visual baseline as the default style language for hero and membership sections.
- 2026-06-25: Removed bottom payment guidance block from rendered page by removing `EmbeddedContent` from the preview flow.
- Updated files: `src/sections/PageShell/components/PreviewCard.tsx`.
- Pattern note: keep the main page focused on hero, core guide, and SEO section without backend payload guidance UI.
- 2026-06-25: Removed bottom “Futuristic visual layer” from rendered page by removing `MediaShowcase` from the preview flow.
- Updated files: `src/sections/PageShell/components/PreviewCard.tsx`.
- Pattern note: keep core flow focused on hero → join guide → embedded content without extra bottom image layers.
- 2026-06-25: Step 4 complete — wired selected tier context into payment guidance and membership CTA.
- Updated files: `src/sections/SubscriptionGuide/components/StepsSection.tsx`, `src/sections/PageShell/components/EmbeddedContent.tsx`, `src/sections/PageShell/components/FloatingMembershipCta.tsx`.
- Pattern note: share tier context via localStorage key `lust-playhouse-selected-tier` and `lust-tier-selected` CustomEvent.
- 2026-06-25: Step 3 complete — added explicit Lust Playhouse membership tiers at $15, $25, and $50 in the join flow.
- Updated files: `src/sections/SubscriptionGuide/components/StepsSection.tsx`.
- Pattern note: keep tier presentation as static cards in existing guide layout; defer selection wiring to next step.
- 2026-06-25: Step 1 complete — rebranded visible site copy to Lust Playhouse identity across hero, SEO heading, and subscription guide content.
- Updated files: `src/sections/LandingHero/components/{HeroHeader,FeatureBadges,ActionLinks,OnlineMembers,HeroFooter}.tsx`, `src/sections/PageShell/components/SeoHeading.tsx`, `src/sections/SubscriptionGuide/components/StepsSection.tsx`.
- Pattern note: keep this phase text-only (headings, subheadings, labels, descriptive copy) without structural or pricing-tier UI changes.
- 2026-06-25: Centered top hero image and changed source to local public path `/previews/top-preview.jpeg`.
- Updated files: `src/sections/PageShell/components/HeroImage.tsx`, `public/previews/README.md`.
- Pattern note: top visual assets should live in `public/previews` and be referenced with root-relative `/previews/*` paths.
- 2026-06-25: Redesigned UI to sleek green/black beginner-friendly style and removed visible button-driven sections.
- Updated files: `src/sections/LandingHero/*`, `src/sections/PageShell/components/{PreviewCard,HeroImage,MediaShowcase,EmbeddedContent}.tsx`, `src/sections/SubscriptionGuide/components/StepsSection.tsx`, `tailwind.css`.
- Added Square scaffold: `src/integrations/square/{README,config,types,client}.ts` and `src/integrations/square/server/{README,createPaymentLink}.ts`.
- Pattern note: static cards replaced links/buttons, payment path moved to integration docs and typed client template.
<!-- NEXT_ENTRY_HERE -->
</changelog>
