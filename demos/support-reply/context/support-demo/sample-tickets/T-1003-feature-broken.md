---
id: T-1003
customer_name: Priya Subramanian
subject: "CSV export hits 500 error on accounts > 10k rows"
received_at: 2026-05-22T16:48:00Z
---

Hey team,

The CSV export from the Customers section throws a 500 error when my account has more than ~10,000 rows. Smaller exports work fine. Error in the browser console:

```
POST /api/exports/customers 500 (Internal Server Error)
{"error":"Request timed out after 30s"}
```

I'm on the Business plan (account ID acct_19f3b…). This worked last week — I think the slowdown started around the May 17 release notes mentioning "improved export pipeline."

Workaround would be a way to filter or paginate the export. Not blocking but my weekly reporting depends on this.

— Priya
Head of Ops, Pebble Logistics
