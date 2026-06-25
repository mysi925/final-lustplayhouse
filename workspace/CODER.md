<instructions>
This file will be automatically added to your context. 
It serves multiple purposes:
  1. Storing frequently used tools so you can use them without searching each time
  2. Recording the user's code style preferences (naming conventions, preferred libraries, etc.)
  3. Maintaining useful information about the codebase structure and organization
  4. Remembering tricky quirks from this codebase

When you spend time searching for certain configuration files, tricky code coupled dependencies, or other codebase information, add that to this CODER.md file so you can remember it for next time.
Keep entries sorted in DESC order (newest first) so recent knowledge stays in prompt context if the file is truncated.
</instructions>

<coder>
## 2026-06-25
- Final carousel refinement in `src/sections/PageShell/components/HeroImage.tsx`: side previews are now subtle 15–25% edge peeks with slight downscale, dimming, and soft blur while active media remains dominant full-bleed.
- Added a bold gradient text logo above the preview in `src/sections/PageShell/components/PreviewCard.tsx` using "Lust" + "Playhouse" stacked typography in a green/white palette to match site theme.
- Hero carousel fourth iteration in `src/sections/PageShell/components/HeroImage.tsx`: removed boxed 3-column panel framing, made active media full-bleed in the container, and converted side previews to subtle edge peeks outside the main stage while preserving arrows/swipe/dots and green neon theme.
- Hero carousel third iteration in `src/sections/PageShell/components/HeroImage.tsx`: removed inner framed slide box (`absolute inset-0 z-10` layer), switched to a non-overlapping 3-column full-bleed layout, restored bottom green dots, and kept side arrows/swipe with green neon style.
- Removed the requested LandingHero content blocks by stripping the H1/description from `src/sections/LandingHero/components/HeroHeader.tsx` and making `FeatureBadges` + `OnlineMembers` return `null`.
- Replaced `src/sections/LandingHero/components/ActionLinks.tsx` null-render with a functional "Join The Community" 3-link CTA block (free channel, chatroom, admin) using external anchor links and green neon styling.
- Moved the Lust Playhouse panel (`LandingHero`) from top-of-page placement into `src/sections/SubscriptionGuide/components/StepsSection.tsx` directly between pricing and FAQ, and removed its top render from `src/sections/PageShell/components/PreviewCard.tsx`.
- Moved `LandingHero` above `SubscriptionGuide` in `src/sections/PageShell/components/PreviewCard.tsx` so the Lust Playhouse intro panel appears before the FAQ block in page order.
- Iteration 3 in `src/sections/PageShell/components/HeroImage.tsx`: removed the top green pill/status strip and bottom dot indicators, removed black slide background fills, and expanded carousel media list from 3 to 8 videos while keeping arrows/swipe flow.
- Iteration 2 in `src/sections/PageShell/components/HeroImage.tsx`: removed boxed-in inner framing, made active media fill the preview area more openly, repositioned side previews to non-overlapping edge peeks, and kept arrows/swipe/dots + green neon styling.
- Refined `src/sections/PageShell/components/HeroImage.tsx` carousel layout to remove slide overlap: centered framed active card, controlled side peeks, smooth non-overlapping transitions, removed overlay labels/text, and kept arrows/swipe/dots with existing green neon style.
- Replaced static hero image in `src/sections/PageShell/components/HeroImage.tsx` with a functional futuristic video carousel (working arrow navigation, swipe, side-peek cards, active dots, glass/neon overlays, and subtle tilt/parallax on hover).
- Adjusted the "How It Works" mobile layout in `src/sections/SubscriptionGuide/components/StepsSection.tsx` to keep all 3 cards side-by-side as square tiles (`grid-cols-3` + `aspect-square`) instead of stacked rectangles.
- Replaced the old "Lust Playhouse Join Flow" intro block in `src/sections/SubscriptionGuide/components/StepsSection.tsx` with a new "How It Works" 3-card strip (number badges, icon chips, one-line action copy) inspired by the screenshot while preserving the green neon palette.
- Restyled the tier cards in `src/sections/SubscriptionGuide/components/StepsSection.tsx` to match the requested screenshot shape: bold "Choose Your Tier" header, rounded neon-glow card shells, per-card crypto line, and bottom accepted payment pills while preserving the green palette.
- Moved `SubscriptionGuide` out of `src/sections/LandingHero/index.tsx` into `src/sections/PageShell/components/PreviewCard.tsx` so pricing renders directly below the preview image.
- Updated `src/sections/SubscriptionGuide/components/StepsSection.tsx` pricing layout to stack plans vertically on mobile (`grid-cols-1`) while keeping a 3-column row on desktop.
- Rebuilt membership pricing in `src/sections/SubscriptionGuide/components/StepsSection.tsx` as a horizontal snap carousel (no stacking) with Tease/Desire/Obsession cards, checklist rows, and swipe hint.
- Removed the "Lust Playhouse Access" callout panel by making `src/sections/LandingHero/components/ActionLinks.tsx` render `null`.
- Reduced the size of the three join-flow step pills in `src/sections/SubscriptionGuide/components/StepsSection.tsx` by tightening grid gaps, card padding, badge sizing, and text scale.
- Removed onboarding strip and Step 1/Step 2 cards from `src/sections/LandingHero/components/ActionLinks.tsx`, leaving only the access intro panel in that block.
- Moved `SubscriptionGuide` render into `src/sections/LandingHero/index.tsx` directly after `ActionLinks` ("Lust Playhouse Access" pill block) and removed standalone guide render from `src/sections/PageShell/components/PreviewCard.tsx`.
- Reverted theme palette from rose/fuchsia/black back to original green/black across `tailwind.css`, hero components, and join flow cards while preserving structure and copy.
- Removed bottom payment guidance section from page flow by taking out `EmbeddedContent` usage in `src/sections/PageShell/components/PreviewCard.tsx`.
- Removed bottom “Futuristic visual layer” section from page flow by taking out `MediaShowcase` usage in `src/sections/PageShell/components/PreviewCard.tsx`.
- Step 4 complete: wired selected tier context through `src/sections/SubscriptionGuide/components/StepsSection.tsx`, `src/sections/PageShell/components/EmbeddedContent.tsx`, and `src/sections/PageShell/components/FloatingMembershipCta.tsx` using localStorage key `lust-playhouse-selected-tier` plus `lust-tier-selected` window event.
- Step 3 complete: added explicit membership tiers ($15, $25, $50) directly in `src/sections/SubscriptionGuide/components/StepsSection.tsx` using existing card styling patterns.
- Visual theme pass completed for Lust Playhouse (step 2): shifted palette from green to rose/fuchsia/black across hero, guide, media, embedded sections, and global theme tokens in `tailwind.css`.
- Rebrand copy pass completed for Lust Playhouse across hero, stats, SEO text, and guide FAQ in: `src/sections/LandingHero/components/{HeroHeader,FeatureBadges,ActionLinks,OnlineMembers,HeroFooter}.tsx`, `src/sections/PageShell/components/SeoHeading.tsx`, `src/sections/SubscriptionGuide/components/StepsSection.tsx`.
- Step 1 plan scope done with text-only identity updates; no structural or tier-pricing UI changes applied yet.
- Top hero image now uses local public asset path `/previews/top-preview.jpeg` from `public/previews`.
- Hero image alignment is centered via `src/sections/PageShell/components/HeroImage.tsx` container flex centering.
- Theme baseline: green/black futuristic look is now centered in `tailwind.css` variables and section-level gradients.
- Main visual flow is built from `src/sections/PageShell/components/PreviewCard.tsx` with hero, guide, media, and setup panels.
- Payment integration scaffold is located at `src/integrations/square/*` with split config/types/client/server template files.
- User preference captured: beginner-friendly wording, remove visible action buttons, keep clean static guidance cards.
</coder>
