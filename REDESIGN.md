# Portfolio redesign checkpoint

The latest published site is preserved at Git tag `checkpoint/live-before-redesign-2026-10-23`, commit `d316dff`. The earlier local baseline is also preserved as `checkpoint/pre-redesign-2026-10-23`, commit `f9e04dc`.

The redesign retains the JSON content sources, Decap CMS, Identity recovery redirect, resume, contact service, video IDs, award source links and CGI galleries. The four lower-priority learning films remain last in the library.

To undo the redesign later, revert its commit on main and push the resulting commit. Do not reset main or overwrite subsequent content edits. The checkpoint tag can also be checked out in a separate worktree for comparison.

The public contact form uses the existing EmailJS service. Validation can be tested without submission; a real delivery test sends email and is intentionally not automated.

## Motion home page (2026-10-25)

The home page is now a static white/orange motion site in `public/index.html` (GSAP + Lenis from CDNs, images in `public/home/img/`). The React app moved from `index.html` to `app.html` and still serves the film library at `/work`, plus all other routes, via the `netlify.toml` fallback. Decap CMS and Netlify Identity are unchanged; the Identity token hand-off script is also on the new home page.

Note: "Home Page" edits in the CMS (`src/content/home.json`) no longer change the home page, because its copy is written into `public/index.html`. Work-page content still comes from the CMS.

The site before this change is preserved at Git tag `checkpoint/live-before-motion-redesign-2026-10-25` (commit `272dbb4`) and as Netlify deploy `6adcf53f37055332662dea83`. Fastest rollback: in Netlify > Deploys, open that deploy and choose "Publish deploy". Permanent rollback: `git revert` this commit on main and push.
