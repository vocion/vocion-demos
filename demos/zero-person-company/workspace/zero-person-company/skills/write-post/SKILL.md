---
slug: write-post
name: Write Post
description: >-
  Draft a short blog post from a content brief: one idea, grounded in this
  workspace's own files, ending with a pointer at the approval gate that
  will review it. Use when asked to turn a brief into a draft.
playbooks: [editorial-voice]
version: 1
---

# Write Post

Given a content brief, produce a draft post.

1. **One idea.** State the query the post answers in the first sentence.
2. **Ground every claim.** For each capability you describe, name the file
   in this workspace or the pinned core that backs it. If you can't name
   one, cut the claim rather than soften it.
3. **A worked example.** Where the brief calls for one, use this
   workspace's own files — an agent, a mission, the `publish-post`
   workflow — not a hypothetical.
4. **Never claim it shipped.** A draft is a draft until the `publish-post`
   workflow's `review` step clears it. Say "drafted", never "published" or
   "sent".
5. **Hand off.** End the draft with a one-line note on what still needs
   fact-checking before it goes to review.

Output: the draft body, plus a short list of the files it cites.
