# Supergroups Aha Moments: Design Critique and Strategic Evaluation

---

## Executive Summary

Four prototype directions were built to explore how to introduce rule-based group building to users who manually add names in the Supergroups builder. This critique evaluates each direction against the CPO's original constraints, the Supergroups Confidence research, evidence-based UX principles, competitive benchmarks, and the design reference frameworks (Rams, Linear, Bret Victor, McKinley).

### The core finding

All four directions share a fundamental framing problem: they use the system's language to explain a concept to users who don't yet speak that language. The copy across every prototype leads with the mechanism ("rule," "dynamic rule," "Department rule") rather than the outcome ("this group stays up to date automatically"). The Confidence research identifies the core problem as **lack of confidence, not lack of power** -- yet every intervention introduces a power concept without first building confidence in what it means.

The CPO's original prompt was precise: *"The point is just to introduce the concept."* But the concept isn't "rules" (an implementation detail). The concept is: **groups can stay up to date automatically when your team changes.** None of the four prototypes lead with this.

### What to do about it

**Ship (highest impact, lowest risk):**
- Direction E (new): Search-time smart results -- show group-level matches in the search dropdown before individual names
- Direction D (revised): Empty state with reframed language -- outcome-first copy, no jargon

**Build and test:**
- Direction F (new): Improved inline suggestion with outcome-forward copy, When/Then rule preview, and intentional-selection handling

**Explore:**
- Direction G (new): AI Bridge -- leverage the existing AI Assistant as a natural-language entry point

**Cut:**
- Direction B: Wrong timing, weakest evidence base
- Direction C as standalone: Keep badges as ambient information, not a primary intervention

### Competitive positioning

No direct HR competitor (Workday, Gusto, Deel, BambooHR) does anything sophisticated in this space. This is a genuine competitive advantage opportunity. The closest analogues come from outside HR: Google Sheets formula suggestions (pattern detection during manual entry), Linear's Triage Rules (readable When/Then rule format), and Customer.io's AI Segment Builder (natural language to segments). Rippling's AI Assistant already covers the natural-language angle -- but the aha moment prototypes don't connect to it.

---

## Part 1: Direction-by-Direction Critique

Each direction is evaluated against five lenses: (1) the CPO's constraints (not Clippy, not over-engineered, reprogram thinking), (2) the Confidence research findings, (3) evidence-based UX principles, (4) design reference frameworks, and (5) competitive patterns.

### Direction A: Inline Replacement Suggestion

**The prototype:** When 3+ selected people share an attribute (department, location, employment type, or manager), an inline suggestion bar appears below the chip area with a star icon, the text *"{N} people are in {Value}. Use a {Attribute} rule instead?"*, and two buttons: "Replace with rule" (primary) and "Dismiss" (ghost). Accepting replaces matching chips with a single rule chip. Dismissing hides the suggestion for that attribute+value combination for the session.

**What works:**

- Correct timing. The suggestion appears during the behavior, matching the Google Sheets formula suggestion pattern -- the most successful analogue for "detect manual entry, suggest automation." Research on Gmail Smart Compose confirms that inline suggestions during composition outperform retrospective suggestions.
- Clear trigger with a reasonable threshold (3+ people sharing an attribute).
- Direct path from suggestion to action -- one click converts manual selections to a rule.
- Dismissal tracking per attribute+value prevents the same suggestion from nagging repeatedly.

**What doesn't work:**

- **The copy is feature-centric, not outcome-centric.** The current text reads: *"3 people are in Engineering. Use a Department rule instead?"* This tells users **what** they can do, not **why** it matters. It assumes "Department rule" is a meaningful phrase to users who have never used rules. The Confidence research explicitly identifies this vocabulary gap as the core barrier.

- **The primary CTA uses jargon.** "Replace with rule" asks users to trade something they understand (names they typed) for something they don't ("a rule"). This inverts the trust equation -- the user needs to trust the unknown concept before committing. The CTA should name the outcome, not the mechanism.

- **No handling of intentional manual selection.** If a user wants 3 specific engineers from a 50-person Engineering department, the suggestion "everyone in Engineering" is wrong and erodes trust. There is no acknowledgment that the user might be deliberately choosing individuals. The "Dismiss" label implies the suggestion was unwanted, not that the user's approach is valid. This violates Rams principle #6 (honest) -- the interface should respect both paths.

- **Single-attribute detection is simplistic.** The real value of Supergroups comes from compound rules ("Full-time employees in California"). The detection logic in `detection-utils.ts` only finds single-attribute clusters, so the suggestions will always feel basic compared to what the system can actually do. This creates a ceiling on how impressive the aha moment can be.

- **No learning across sessions.** Dismissed suggestions are tracked in component state (`useState<Set<string>>`), which resets on page reload. A user who understands rules and always picks individuals will be re-prompted every session.

**Rams check:**
- Violates #4 (understandable) -- uses system jargon ("rule") that the target user doesn't know
- Violates #6 (honest) -- doesn't acknowledge intentional manual selection as a valid choice
- Strong on #10 (as little design as possible) -- the suggestion bar is compact and dismissible

**Verdict:** Strongest foundation of all four directions. The timing is right and the mechanism is sound. But the framing needs a fundamental rewrite -- lead with outcomes, not mechanisms. This direction becomes Direction F (below) with the proposed fixes.

---

### Direction B: Post-Commit Simplification

**The prototype:** The user adds people freely with no interruption. When they click "Preview Group," a review panel appears showing all members. If clusters are detected, a banner appears at the top of the preview: *"{N} people are in {Value}. You could replace them with a dynamic rule that stays up to date."* with "Use rule" (primary) and "Keep as-is" (ghost) buttons.

**What works:**

- Least disruptive intervention point. The suggestion appears at a natural pause -- the user has stopped adding and is reviewing.
- The preview panel is a reasonable review context. The banner doesn't interrupt the primary task flow.

**What doesn't work:**

- **Fundamentally wrong timing.** Once a user clicks "Preview Group," they have mentally completed the task. The group is built; they're verifying, not constructing. Suggestions at this point feel like corrections ("you did it wrong") rather than assistance ("here's a faster way"). Gmail Smart Compose research validates this -- suggestions are effective during composition, not after. Bret Victor's principle of immediate feedback reinforces the point: delayed feedback breaks the connection between action and insight.

- **The framing is subtly condescending.** "You could replace them with a dynamic rule" implies the user's manual work was unnecessarily complex. "Simplification" as a value proposition assumes the user perceives their current approach as complicated -- but they don't. They typed names and it worked. The complexity is invisible to them.

- **Rule-based mental models are forward-looking.** Linear's Triage Rules use a When/Then structure that is inherently about the future: "When X happens, then do Y." This maps to the real value of Supergroups rules (automatic updates when team composition changes). Direction B applies rule-thinking retrospectively -- "you already did this, but you could have done it differently" -- which fights against how rule-based reasoning naturally works.

- **Most complex implementation for weakest signal.** Through the McKinley "boring technology" lens: this direction requires building a preview flow, a cluster detection step at preview time, inline suggestions within the preview panel, and accept/dismiss logic that bridges back to the builder state. That is the most engineering surface area of any direction, applied at the moment when users are least receptive to suggestions.

**Rams check:**
- Violates #10 (as little design as possible) -- substantial UI added to a review moment where users want confirmation, not new options
- Weak on #2 (useful) -- the suggestion arrives when the user's need has already been met

**Verdict:** Deprioritize or cut. The resources would be better spent on Direction A improvements (becoming Direction F) or new directions. The post-commit moment is a review checkpoint, not a teaching moment.

---

### Direction C: Attribute Highlighting on Chips

**The prototype:** Each name chip shows a department badge (e.g., "Engineering") via `<ChipBadge>`. When 3+ chips share an attribute, a cluster summary appears below: *"{N} people from {Value}"* with an optional "Create rule" ghost button. There is no explicit prompt -- the user is expected to notice the visual pattern and connect the dots.

**What works:**

- Most aligned with Rams #10 (as little design as possible) and the CPO's "not Clippy" constraint. The badges are ambient metadata, not interruptions.
- Department badges add genuine information value even if the user never converts to a rule. Seeing "Engineering" on three chips is useful context regardless of whether it triggers an aha moment.
- Teaches pattern recognition, which has compounding long-term value. A user who learns to notice shared attributes will apply that mental model in future sessions.

**What doesn't work:**

- **Relies entirely on users noticing visual patterns during a task-focused flow.** In B2B admin contexts, users are goal-directed -- they're completing a task (build a group for a policy), not exploring an interface. This is the "billboard on a highway" problem: the information is there, but the user is driving toward a destination, not sightseeing. Expecting them to pause and reflect on badge patterns is optimistic.

- **The implementation reveals the team's own uncertainty.** The highlight state is hardcoded to `false` (`<HighlightedChip isHighlighted={false}>`). The visual highlight that would make clusters visually distinct is literally turned off. If the builders of the prototype weren't confident enough to enable the core differentiating feature, that's a strong signal about the direction's viability.

- **GitLab's feature discovery research supports this concern.** GitLab's design system categorizes feature discovery into three tiers: implicit (user discovers naturally), contextual (subtle cues near relevant tasks), and disruptive (modals/banners). Implicit discovery has the lowest conversion rate. Direction C is purely implicit -- it provides information but no affordance, no action prompt, no explanation of why the pattern matters.

- **"Create rule" as the CTA inherits the same jargon problem.** Even when users do notice the cluster summary, the action is labeled with vocabulary they don't understand.

**Rams check:**
- Strong on #6 (honest) -- presents information without pressure
- Strong on #10 (minimal) -- the lightest touch of all directions
- Weak on #2 (useful) -- information without clear affordance or explanation

**Verdict:** Keep the department badges as ambient information layered into other directions, but do not invest in this as a standalone intervention. The badges are a supporting element, not a primary aha moment. The conversion path is too passive for the behavior change the CPO is seeking.

---

### Direction D: Empty-State Education

**The prototype:** Before any names are added, the empty builder shows a label -- "Start with a rule" -- above suggestion pills derived from org data. Pills include options like "Everyone in Engineering," "SF Office," "All Full-time employees," "All Hourly employees," and the second-largest department. Each pill has an icon and is clickable. Clicking adds a rule chip directly.

**What works:**

- Prevents the problem instead of correcting it. Rather than detecting manual name entry and suggesting conversion, this direction intercepts before the user starts. Conceptually, this is the strongest framing -- it's upstream of the mistake.
- Empty states are proven activation moments. Research shows guided empty states reduce early churn better than blank screens. SaaS activation data indicates time-to-first-value under 15 minutes is critical, and pre-populated suggestions compress that window.
- Suggestion pills are a good interaction pattern -- low commitment, visually scannable, easy to explore without risk.

**What doesn't work:**

- **"Start with a rule" is exactly the jargon the user doesn't understand.** This is the concept you're trying to teach. Using it as the instructional label creates a circular reference -- the education moment uses the vocabulary it's supposed to introduce. Users who don't know what rules are will not find "Start with a rule" clarifying.

- **Pills are generic, not contextual.** "Everyone in Engineering" and "SF Office" are org-structure suggestions, but they don't connect to what the user is trying to accomplish. If the user arrived from a time-off policy setup, the relevant suggestion is "All full-time employees" -- but it's buried among department and location options. The pills have no awareness of upstream intent.

- **Only works for empty-group creation.** Most Supergroup creation happens from a policy or workflow context where the user already has some intent. Users who arrive knowing they need "my California contractors" won't find generic org suggestions useful -- they'll skip past them to the search field. This direction's effectiveness is bounded by the percentage of users who arrive at an empty builder without a pre-formed intent, which is likely a small subset.

- **Banner blindness is a documented risk.** The prototype's own design notes acknowledge this: *"Weak for users who arrive with an intent already formed -- they'll skip past it."* Empty-state education competes with the user's existing mental plan. The 3-step vs. 7-step tour research (72% vs. 16% completion) suggests that users engage with simple, relevant prompts and ignore generic ones.

**Rams check:**
- Good on #10 (minimal) -- the pills are visually light and disappear once the user starts typing
- Weak on #4 (understandable) -- "Start with a rule" is jargon
- Weak on #2 (useful) -- generic suggestions may not match user intent

**Verdict:** Right conceptual approach (prevention over correction), but the execution needs reframing. Replace "Start with a rule" with outcome-oriented language. If possible, make pills contextual to the upstream workflow. With language fixes, this direction is viable as a Tier 1 ship alongside the new Direction E.

---

## Part 2: Cross-Cutting Issues

These issues affect all four directions and should be addressed regardless of which directions move forward.

### 1. Language gap (most critical)

Every prototype assumes users understand "rule" and "dynamic." The Confidence research explicitly identifies this vocabulary gap. The CPO's prompt is about introducing a concept, not a feature. Every surface should use outcome language:

| Current (mechanism) | Proposed (outcome) |
|---|---|
| "Use a Department rule instead?" | "Want this group to automatically include anyone who joins Engineering?" |
| "Replace with rule" | "Keep it up to date" |
| "Start with a rule" | "Quick start" or "Include a whole team" |
| "Create rule" | "Include everyone" |
| "dynamic rule that stays up to date" | "automatically updates when people join or leave" |

The through-line: users understand people joining and leaving teams. They don't understand "dynamic rules." Speak their language.

### 2. No connection to the AI Assistant

The Supergroups AI Assistant shipped in Q4 2025. It lets users express intent in natural language ("create a policy for all contractors in the US") and have it translated into rules. None of the four aha moment prototypes reference it, bridge to it, or offer it as an alternative path.

This is a missed opportunity. For users who dismiss an inline suggestion but might engage with a different modality, the AI Assistant is a natural fallback. For empty-state education, "Describe who you want to include" is a more powerful suggestion than any pre-built pill.

### 3. No measurement framework

None of the prototypes connect to the Q2 metrics defined in `supergroups_q2_metrics_baselines.md`:
- **Saved Group Reuse Rate** -- does the aha moment lead to more reusable group definitions?
- **Complex rule adoption** -- does the intervention increase the <10% of customers creating compound rules?
- **Support ticket reduction** -- do fewer users file tickets asking how to create policies for specific segments?

Each direction should define its success signal. Without measurement, this work cannot be evaluated after shipping and will remain a bet with no feedback loop.

### 4. Single-attribute limitation

The detection logic in `detection-utils.ts` iterates through attributes individually (`department`, `location`, `employmentType`, `manager`) and finds groups where threshold+ people share the same single value. It does not detect compound patterns ("3 people are full-time AND in California").

Real Supergroups value comes from compound rules. The suggestions will always feel simplistic compared to what the system can actually do. This creates a ceiling on how impressive the aha moment can be -- the user's first exposure to rules is the least powerful version of them.

This is acceptable for v1 (the CPO explicitly said "not over-engineered"), but the architecture should allow for compound detection in the future.

### 5. No handling of intentional manual selection

Users sometimes genuinely want 3 specific people, not "everyone in Engineering." None of the directions distinguish between "user doesn't know about rules" and "user is intentionally selecting individuals."

Getting this wrong has asymmetric consequences. A correct suggestion that's accepted is a small win. A wrong suggestion that implies the user's approach is incorrect is a trust violation that makes them less likely to engage with future suggestions.

The fix is straightforward: frame the dismiss option as validation of the manual approach, not rejection of the suggestion. "No, just these people" acknowledges intent; "Dismiss" implies annoyance.

---

## Part 3: Competitive Landscape

### Direct HR competitors

**Workday:** Supports "condition rules" for workflow automation and dynamic group membership based on employee attributes (job level, location, compensation grade). The UX is configuration-heavy and documentation-driven -- no smart suggestions, no pattern detection, no inline education. Rule creation requires navigating to a dedicated rule builder and understanding Workday's data model.

**Gusto:** Recently added policy management flows (time-off, onboarding) with employee assignment. Policy targeting is manual -- admins select employees or use basic filters. No dynamic group concept, no rule suggestions, no pattern detection.

**Deel:** Centralized policy management across multi-entity structures. Emphasizes compliance automation. No dynamic grouping or rule-based employee targeting visible in current product surfaces.

**BambooHR / Justworks:** Basic employee list management. No dynamic group builder, no rule-based targeting, no smart suggestions.

**Assessment:** No direct competitor does anything sophisticated in this space. The bar is low -- which means Rippling has a genuine differentiation opportunity, but also means there are no proven HR-specific patterns to reference. The inspiration must come from adjacent domains.

### Adjacent product patterns

**Google Sheets formula suggestions** -- the strongest analogy.
Google Sheets detects patterns in manual data entry (recognizing headers, data groupings, "Total" labels) and suggests formulas inline when users type "=". The system works because: (1) it appears at the moment of intent, (2) it shows the result before committing, (3) it doesn't interrupt -- it augments the existing interaction. The suggestion is part of the typing flow, not a separate prompt. This is the model Direction E (Search-Time Smart Results) applies to Supergroups.

**Linear Triage Rules** -- the best reference for making rules readable.
Linear's Triage Rules UI presents automation rules as readable When/Then cards: *"When: Customer name includes any of [chips] -> Then: Set priority all High."* This is directly relevant because it answers the question all four prototypes struggle with: how do you make "rules" understandable to someone who has never used them? Linear's answer: show rules as plain-language sentences with a clear condition-action structure. No boolean logic, no jargon -- just "When X, Then Y." This pattern should inform how Direction F presents rule previews in the inline suggestion.

**Linear Triage Intelligence** -- the trust-through-transparency model.
Separately from explicit rules, Linear's AI-powered Triage Intelligence suggests labels and assignments for new issues with transparent reasoning ("similar to issue X because..."). The key insight: showing why a suggestion was made builds trust. The current aha moment prototypes explain what the user can do but not why the system thinks it's relevant. Adding reasoning ("These 3 people are all in Engineering") is already partially present, but the connection to outcomes is missing.

**Customer.io AI Segment Builder** -- natural language to segments.
Customer.io lets users describe audience segments in natural language and have them translated into filter rules automatically. Rippling's AI Assistant already does this for Supergroups. The gap: the aha moment prototypes don't connect to it. Customer.io positions the AI builder as the primary entry point, not a secondary feature.

**Gmail Smart Compose** -- inline suggestions during composition.
Research on Smart Compose shows: (1) suggestions work when inline with the action, not retrospective; (2) accepted suggestions don't significantly change the final output's structure (users maintain control); (3) the pattern is additive, not corrective. This directly supports Direction A/F's timing and directly undermines Direction B's post-commit approach.

**GitLab feature discovery taxonomy** -- implicit vs. contextual vs. disruptive.
GitLab's design system research categorizes feature discovery into three tiers with increasing conversion rates: implicit (user discovers naturally -- lowest conversion), contextual (subtle cues near relevant tasks -- moderate), and disruptive (modals/banners -- highest conversion but highest fatigue). Direction C is implicit. Direction A is contextual. Direction B is mildly disruptive at the wrong moment. The research suggests contextual discovery is the optimal balance for B2B tools where users are task-focused.

### Competitive positioning summary

Rippling is in an unusual position: the aha moment concept has no direct competitor precedent in HR software, but strong analogues in adjacent B2B tools. The opportunity is to apply lessons from Google Sheets (timing), Linear (rule readability), and the feature discovery research (contextual > implicit) to a domain where no one else is trying. Executed well, this becomes a genuine differentiator. Executed with jargon and wrong timing, it becomes Clippy for HR admins.

---

## Part 4: Proposed New Directions

### Direction E: Search-Time Smart Results (Hybrid A+D)

**When:** As users type names in the search field, before individual results appear.

**Pattern:** Show group-level matches above individual results in the search dropdown. When a user types "Al" looking for "Alice Chen," the dropdown shows:

> **Engineering department** (12 people)
> **Alice Chen** -- Engineering, San Francisco
> **Alex Rivera** -- Operations, Austin

Group-level results appear naturally alongside individual results. No separate UI, no banner, no prompt.

**Why this works:**
- Intercepts at the moment of search, not after selection. Users see the group option before they start picking individuals.
- Zero Clippy risk -- it's just search results. There's no suggestion, no prompt, no implication that the user is doing something wrong.
- Zero jargon -- "Engineering department (12 people)" is not a "rule." It's a description.
- Zero new UI paradigm -- search dropdowns already show results. Adding group-level results is a natural extension.
- Matches the Google Sheets formula suggestion pattern: detect context during the user's existing action and offer a higher-level option alongside the manual path.

**Why this might not work:**
- Users may be too focused on finding a specific person to notice group results.
- Requires search infrastructure changes (the current prototype's search only returns individual employees).
- The group result doesn't explain that it "stays up to date" -- it looks like a shortcut, not a conceptual shift.

**Success signal:** Measure click-through rate on group-level search results vs. individual results. Track whether users who click a group result go on to create more rule-based groups in future sessions.

---

### Direction F: Outcome-Forward Inline Suggestion (Improved Direction A)

**When:** Same trigger as Direction A -- 3+ people sharing an attribute, detected via `detectClusters()`.

**Pattern:** Reframed suggestion with three key changes:

1. **Outcome-first copy:** *"These 3 people are all in Engineering. Want this group to automatically update when people join or leave?"*

2. **When/Then rule preview** (inspired by Linear's Triage Rules):
   > When: Someone joins or leaves **Engineering**
   > Then: This group updates automatically

3. **Intentional-selection acknowledgment:** Two CTAs:
   - "Keep it up to date" (primary) -- accepts the rule
   - "No, just these people" (secondary) -- validates the manual approach

**Why this works:**
- Preserves Direction A's correct timing (during the behavior, not after).
- Leads with the outcome (automatic updates) instead of the mechanism (rules).
- The When/Then preview makes the abstract concept concrete. Users see what "a rule" actually means in plain language before committing. This directly addresses the Confidence research finding: users need to understand what will happen, not just what they can do.
- "No, just these people" teaches the concept even when dismissed. The user learns that groups CAN auto-update, and their manual choice is validated rather than rejected. This is the Rams #6 (honest) fix -- the interface respects both paths.

**Why this might not work:**
- The suggestion takes more vertical space than Direction A's compact bar, which could feel heavier.
- When/Then preview is a new visual pattern that needs to be learned. First exposure may be confusing.
- Still limited to single-attribute detection (inherits the cross-cutting limitation).

**Success signal:** Measure acceptance rate vs. Direction A's current design. Track whether users who see the suggestion (accepted or dismissed) create rule-based groups at a higher rate in subsequent sessions -- the "even dismissed suggestions teach" hypothesis.

---

### Direction G: AI Bridge

**When:** In the empty state or as a persistent option alongside the people picker.

**Pattern:** A text field or prompt: *"Describe who to include -- e.g., 'all full-time employees in California'"* that connects to the existing Supergroups AI Assistant.

**Why this works:**
- Leverages an existing shipped capability (AI Assistant, Q4 2025). No new backend work required.
- Doesn't require pattern detection -- users express their own intent.
- This IS the aha moment in its purest form: "I can just say what I want and the system figures it out."
- Reframes the entire interaction from "build rules" to "describe your intent," which is the mental model shift the CPO is seeking.

**Why this might not work:**
- Mode-switching cost. Users arrive at the group builder in direct-manipulation mode (clicking, typing names, adding chips). A natural-language text field is a fundamentally different interaction paradigm. The cognitive cost of switching from "I'm picking people" to "I'm describing a group in words" may be higher than it appears. The conversational AI patterns visible in competitor products (Customer.io, chatbot interfaces) work because the user enters the conversational mode intentionally -- not because they're redirected to it mid-task.
- Text fields in picker contexts have low engagement. Users expect to type a name and see results, not compose a description. The AI entry point may work better as a separate, intentional pathway (e.g., a button that opens the AI Assistant) than as an inline text field.
- Requires the user to articulate their intent, which assumes they have a clear intent. The aha moment targets users who are manually adding names -- some of them don't have a clear "group" concept in mind, just a list of people.

**Success signal:** Measure engagement rate with the AI prompt in the picker context vs. the standalone AI Assistant entry point. Track whether AI-generated groups have higher rule complexity than manually built groups.

---

## Part 5: Recommended Prioritization

### Tier 1: Ship (highest impact, lowest risk)

| Direction | What to do | Why | Effort |
|---|---|---|---|
| **E: Search-Time Smart Results** | Add group-level matches to the people search dropdown | Zero jargon, zero new paradigm, highest probability of organic discovery. No Clippy risk. Matches the Google Sheets pattern. | Low -- search result enhancement, no new UI patterns |
| **D: Empty State (revised)** | Replace "Start with a rule" with outcome language; make pills contextual to upstream workflow if possible | Already built. Fixes the jargon problem with a copy change. Prevention > correction. | Very low -- copy changes and minor logic adjustments |

### Tier 2: Build and test

| Direction | What to do | Why | Effort |
|---|---|---|---|
| **F: Improved Inline Suggestion** | Build the outcome-forward version with When/Then preview and "No, just these people" dismiss | Strongest active intervention. Addresses every critique of Direction A while preserving its correct timing. Needs testing to validate the When/Then preview pattern and the "even dismissed suggestions teach" hypothesis. | Medium -- UI redesign of the suggestion bar, new copy, When/Then component |

### Tier 3: Explore

| Direction | What to do | Why | Effort |
|---|---|---|---|
| **G: AI Bridge** | Test AI prompt engagement in the picker context vs. standalone entry | Strategic leverage of existing AI investment, but mode-switching risk is real. Needs user research before committing to the inline placement. | Low to build, but needs research to validate placement |

### Cut

| Direction | What to do | Why |
|---|---|---|
| **B: Post-Commit** | Do not ship | Wrong timing (suggestions after task completion feel corrective), most complex implementation for weakest signal, retrospective framing fights against forward-looking rule mental models |
| **C: Highlighting (standalone)** | Keep badges as ambient info in other directions; do not invest as a primary intervention | Purely implicit discovery has the lowest conversion rate per GitLab research. Implementation was incomplete (`isHighlighted={false}`). Useful as a supporting element layered into Directions E or F, not as a standalone |

### Cross-cutting actions (apply to all shipped directions)

1. **Rewrite all copy to use outcome language.** No "rule," no "dynamic," no "condition." Use "automatically updates," "stays up to date," "includes new people when they join."
2. **Connect to the AI Assistant.** Any direction that offers a dismiss should offer the AI Assistant as a secondary path: "Or describe who you want to include."
3. **Define success metrics before shipping.** Each direction should track: (a) suggestion engagement rate, (b) downstream rule-based group creation rate, (c) support ticket volume for "how do I create a policy for X" queries.
4. **Respect intentional manual selection.** Frame dismiss actions as validation ("No, just these people") not rejection ("Dismiss").

---

## Appendix: Evidence Base

### Research and strategy documents referenced
- Supergroups Confidence Research & Design Synthesis -- "The core issue is not lack of power, it's lack of confidence"
- Q2 2026 Direction One-Pager -- "Ship targeted UX transparency" pillar
- Q2 Metrics Baselines -- <10% complex rule adoption, 0.5% Saved Group adoption
- Q1 2026 QPR -- "Users continue to struggle with understanding how to use Supergroups effectively"
- CPO prompt (MacInnis) -- "The point is just to introduce the concept... a small number of these moments would allow us to quickly reprogram the user's thinking"

### Design reference frameworks applied
- Dieter Rams' Ten Principles -- #2 (useful), #4 (understandable), #6 (honest), #10 (as little design as possible)
- Linear -- craft as competitive advantage, high information density without clutter, When/Then rule readability
- Bret Victor (Inventing on Principle) -- immediate feedback creates understanding; delayed feedback breaks the connection
- Dan McKinley (Choose Boring Technology) -- spend innovation tokens wisely; the most complex implementation should solve the hardest problem
- Ryan Scott (Strategic Career Growth) -- frame in business terms; identify who is underserved; use data for leverage
- GitLab Feature Discovery -- implicit < contextual < disruptive; contextual is the optimal balance for task-focused B2B users

### Competitive products analyzed
- Google Sheets formula suggestions (pattern detection during manual entry)
- Linear Triage Rules (When/Then readable rule format)
- Linear Triage Intelligence (AI-powered suggestions with transparent reasoning)
- Customer.io AI Segment Builder (natural language to segments)
- Gmail Smart Compose (inline suggestions during composition)
- Workday, Gusto, Deel, BambooHR (no sophisticated pattern in this space)
