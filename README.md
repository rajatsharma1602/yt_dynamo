# yt_dynamo
youtube dynamo snippets


purpose - todo list app
table = todo
attributes
userId -> PK - S
todoId -> sk - S
dueDate - S
priority - S
status - S

key schema
pk - HASH
sk - RANGE

LSI
1. byDueDate => pk - HASH, sk -> dueDate - RANGE
2. byStatus => pk- HASH, sk -> status - RANGE
3. byPriority => pk - HASH, sk -> priority - RANGE