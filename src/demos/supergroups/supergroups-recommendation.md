# Supergroups Aha Moments: Recommendation

This document is a recommendation, not an exploration. We evaluated 8 directions and are recommending 2 to ship, 1 to build and test, and cutting the rest.

---

## The problem

When an admin sets up a time-off policy or benefits plan, they build a group of employees by typing names one at a time. If the Engineering team has 12 people, the admin types 12 names. When someone new joins Engineering next month, the admin has to remember to come back and add them manually -- or the new hire falls through the cracks.

The system already knows how to keep groups up to date automatically. But admins don't know this is possible, because the language we use to describe this capability -- "rules," "dynamic groups" -- doesn't meet them where they are.

## What we did

We built 8 interactive prototype directions (A through H) exploring different ways to introduce the concept of automatic groups to admins who are manually adding names. We then evaluated all 8 against our product goals, user research findings, UX principles, and competitive patterns from adjacent products.

The full evaluation is in [supergroups-aha-critique.md](supergroups-aha-critique.md). Interactive prototypes are available in the playground.

## The core finding

Across all 8 directions, there's a consistent gap between what we're trying to communicate and how users actually think about their task.

The prototypes say "rule" when the user thinks "automatically stays up to date." They say "Replace with rule" when the user would respond to "Keep it up to date." Our research has consistently shown that the core barrier to adoption is lack of confidence, not lack of power -- but these interventions introduce a power concept without first building confidence in what it means.

The concept we're trying to introduce isn't "rules" -- that's an implementation detail. The concept is: **groups can stay up to date automatically when your team changes.** Closing this language gap is the highest-leverage change regardless of which directions we ship.

---

## Recommendation

| Action | Direction | What it does | Upside | Risk |
|---|---|---|---|---|
| **Ship** | **E: Smart Search Results** | When an admin searches for "Alice," the dropdown also shows "Engineering department (12 people)" above individual results. Clicking it includes the whole team. No prompt, no new UI -- just smarter search results. | High -- organic discovery, zero jargon, no risk of feeling intrusive or annoying. Matches the Google Sheets formula-suggestion pattern. | Low -- search result enhancement using existing dropdown. No new paradigm to learn. |
| **Ship** | **D: Empty State (revised)** | Before any names are typed, the builder shows quick-start options based on org data: "Everyone in Engineering," "SF Office," "All full-time employees." One click includes a whole team. | Medium -- prevention over correction. Already built; needs a copy rewrite to remove jargon ("Start with a rule" becomes "Quick start" or "Include a whole team"). | Very low -- copy and minor logic changes on an existing prototype. |
| **Test** | **F: Outcome-Forward Suggestion** | When 3+ selected people share an attribute, an inline suggestion appears: "These 3 people are all in Engineering. Want this group to automatically update when people join or leave?" Shows a plain-language When/Then preview. Two responses: "Keep it up to date" (accept) or "No, just these people" (validates manual choice). | High -- strongest active intervention. Teaches the concept even when dismissed. Correct timing (during the behavior, not after). | Medium -- the When/Then preview is a new visual pattern that needs user testing. Takes more vertical space than a simple suggestion bar. |
| **Explore** | **G/H: AI-Powered Input** | A natural-language prompt ("Describe who to include") or a unified smart input that handles both group descriptions and individual name searches. Leverages the shipped AI Assistant. | Very high -- reframes the interaction from "build rules" to "describe your intent." Biggest potential for a paradigm shift. | High -- mode-switching cost (direct manipulation to natural language) is real and unvalidated. Needs user research before committing to inline placement. |
| **Cut** | **B: Post-Commit** | Suggestion appears after the user clicks "Preview Group." | -- | Wrong timing. Once the user clicks preview, they've mentally completed the task. Suggestions feel corrective ("you did it wrong"), not helpful. Most complex build for the weakest signal. |
| **Cut** | **C: Highlighting (standalone)** | Department badges on chips; cluster summaries appear passively. | -- | Purely implicit discovery has the lowest conversion rate. Keep the badges as ambient info layered into E and F -- not as a standalone bet. |
| **Superseded** | **A: Inline Suggestion** | Original inline suggestion with jargon-based copy. | -- | Right timing, wrong framing. Replaced by Direction F, which preserves A's correct timing and fixes every identified issue. |

## Why this sequence

- **E and D have the best ratio of impact to risk.** E is a search result enhancement -- low implementation cost, no new paradigm, organic discovery. D is already built and needs a copy rewrite. Both can ship without user testing.
- **F is the strongest active intervention but introduces a new pattern.** The When/Then preview needs validation. The "even dismissed suggestions teach" hypothesis needs measurement. Build it, test it, then ship with confidence.
- **G/H carry the highest upside but the highest uncertainty.** The AI Assistant is already shipped -- the question is whether embedding it in the picker context works, or whether the mode-switching cost is too high. This needs research, not a bet.
- **B is cut because the timing is structurally wrong.** Post-completion suggestions feel corrective, not helpful. Gmail Smart Compose research confirms: suggestions work during composition, not after.
- **C is kept as a supporting element, not a standalone.** The department badges are useful ambient information when layered into other directions. As a primary intervention, implicit discovery is too passive for the behavior change we need.

## Cross-cutting principles

These apply to every direction we ship, regardless of which ones move forward:

1. **All copy uses outcome language.** No "rule," no "dynamic," no "condition." Use "automatically updates," "stays up to date," "includes new people when they join."
2. **Dismissing a suggestion validates the user's approach.** "No, just these people" acknowledges intentional manual selection. "Dismiss" implies annoyance.
3. **Every intervention connects to the AI Assistant as a secondary path.** For users who dismiss a suggestion but might engage with a different modality, offer "Or describe who you want to include."
4. **Define success metrics before shipping.** Each direction tracks: (a) engagement rate, (b) downstream automatic-group creation rate in subsequent sessions, (c) support ticket volume for "how do I create a policy for X" queries.

## Competitive context

No direct HR competitor (Workday, Gusto, Deel, BambooHR) does anything sophisticated in this space -- this is a genuine differentiation opportunity. The closest patterns come from outside HR: Google Sheets (inline formula suggestions during manual entry), Linear (readable When/Then rules for automation), and Customer.io (natural language to audience segments). Rippling's AI Assistant already covers the natural-language angle, but the aha moment prototypes don't connect to it yet.

---

## Interactive prototypes

| Direction | Playground path |
|---|---|
| A: Inline Suggestion | [/direction-a-inline-suggestion](/direction-a-inline-suggestion) |
| B: Post-Commit | [/direction-b-post-commit](/direction-b-post-commit) |
| C: Chip Highlighting | [/direction-c-chip-highlighting](/direction-c-chip-highlighting) |
| D: Empty State | [/direction-d-empty-state](/direction-d-empty-state) |
| E: Smart Search Results | [/direction-e-smart-results](/direction-e-smart-results) |
| F: Outcome-Forward Suggestion | [/direction-f-outcome-forward](/direction-f-outcome-forward) |
| G: AI Bridge | [/direction-g-ai-bridge](/direction-g-ai-bridge) |
| H: Unified Smart Input | [/direction-h-unified-input](/direction-h-unified-input) |

**Full critique and evidence base:** [supergroups-aha-critique.md](supergroups-aha-critique.md)
