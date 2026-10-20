# Launch checks, measurement & learning loop
**Status:** operational template — NOT a record of published results.

## A. Critical prelaunch blocker: offer inconsistency
On 19 Oct 2026 the `main` branch of `pablomerchanm/ignite-yourself` showed “A 12-week Authority Build ...” while our 12 Oct 2026 Growth OS defines Authority Platform (~USD 3,000 and short production) as the current offer. DO NOT channel paid or promotional traffic to an incompatible offer without checking the deployed live page. Determine deployed repo and domain before edits.

Current offer language for editing, pending approval:
- Hero: “The work behind your name deserves a clearer home.”
- Supporting line: “Research-led personal websites for established professionals. We organize your career, credentials and public work into an independent, verifiable professional record.”
- CTA: “Talk to us about your professional platform.”
- Who for: “Independent advisors, technical specialists, expert witnesses, researchers and senior professionals whose work spans multiple institutions or sources.”
- Honest qualifier: “Not a follower-growth program, and not guaranteed leads or search rankings.”
- Current price reference: USD 3,000, confirm offer and terms before public pricing.
- Safe direct contact: Existing functional verified contact entry point. Do not invent Calendly link or a nonexistent URL path.
- Do not silently delete/refactor old site; implement separate reviewed PR in relevant deployed repo.

## B. Article HTML publishing spec (for implementer)
- Each piece has unique slug, meaningful `title`, `meta description`, H1 and single `main`, clear byline and publication date.
- Mobile readable text (18px line height ~1.6), breadcrumbs and three internal links per piece to published sibling content and the offer/CTA.
- `rel=canonical` points to *actual* deployed production article URL, not a guessed deployed path.
- Link to source when factual or legal claim relies on it; sources verified before launch.
- Article schema is optional; only valid if statements reflect visible page and real author.
- No autoindex / claims of indexation without Search Console confirmation; request indexing after sitemap published.
- Add links from site nav, home editorial section and relevant offer page.
- OG preview, site favicon, 404 handling and proper contact target.
- Keep pages under same host so internal links are consistent; validate Vercel routing.
- Publish ONE article and verify crawl and CTA before sharing to social.

## C. Traffic URLs (examples only — do NOT paste before verifying published URL)
`https://igniteyourself.co/insights/linkedin-vs-personal-website?utm_source=linkedin&utm_medium=organic&utm_campaign=authority_gap_2026q4`
`https://igniteyourself.co/insights/expert-witness-website?utm_source=x&utm_medium=organic&utm_campaign=authority_gap_2026q4`
In Reddit, no commercial links unless explicitly relevant and permitted; don't hide affiliations.

## D. Google setup
- Check domain ownership of Google Search Console and sitemap.xml.
- Verify robots.txt, noindex, canonical and redirects for actual deployed URLs.
- Check Search Console performance (queries, pages, impressions, clicks) for baseline.
- Google AI experiences don't provide a special ranking shortcut; public factual content and crawl access help discoverability but guarantee neither indexing nor citations.
- Log any manual AI answer sampling with exact question, date, model and location caveats; treat as anecdotal.

## E. Minimal weekly metrics log (CSV schema)
```
date,channel,author,asset_id,url,buyer_angle,minutes_spent,impressions,clicks,relevant_replies,qualified_conversations,proposals,paid_deposits,paid_revenue_usd,learned
```
If unknown, leave blank; do not enter zero until checked. Relevant replies are not the same as qualified conversations.

## F. Attribution
Ask new inbound leads “How did you hear about Ignite?” Log the answer in their own words. Use UTM for site links where appropriate. A lead may have multiple touches; don't automatically assign one article all the credit.

## G. 21-day review
- Qualitative: which post attracted practitioners in relevant disciplines rather than designers and marketers?
- Commercial: qualified conversations, proposal requests, deposit receipts; time/cost per meaningful opportunity.
- Operational: who had to review claims, how long did content take, where did approvals stall?
- Editorial: what buyer objections or problems repeat in conversations?
- Decisions: KEEP / ADJUST / STOP per channel. SEO needs at least 90 days before broad traffic conclusions.
- Record actual results in dated log; never quietly backfill suggested actions as completed.

## H. Before publishing anything externally
- [ ] Correct deployed Authority Platform offer and contact route
- [ ] Remove/replace any 12-week/9k legacy copy from *conversion path* or clearly reconcile
- [ ] Verify legal/disciplinal claims and external URLs
- [ ] Review for unsupported authority/customer claims
- [ ] Human editor reads all articles and comments for accuracy and voice
- [ ] Articles include internal links only to pages actually live
- [ ] Confirm permissions for any names, faces, quotes, logos or previews
- [ ] Confirm subreddit/community policy and thread freshness
- [ ] Track links, questions, qualified replies and sales outcomes
