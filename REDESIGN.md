# Portfolio redesign checkpoint

The latest published site is preserved at Git tag `checkpoint/live-before-redesign-2026-10-23`, commit `d316dff`. The earlier local baseline is also preserved as `checkpoint/pre-redesign-2026-10-23`, commit `f9e04dc`.

The redesign retains the JSON content sources, Decap CMS, Identity recovery redirect, resume, contact service, video IDs, award source links and CGI galleries. The four lower-priority learning films remain last in the library.

To undo the redesign later, revert its commit on main and push the resulting commit. Do not reset main or overwrite subsequent content edits. The checkpoint tag can also be checked out in a separate worktree for comparison.

The public contact form uses the existing EmailJS service. Validation can be tested without submission; a real delivery test sends email and is intentionally not automated.
