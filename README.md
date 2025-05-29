
## Features
* Automatically generate jira commit message in certain format

* Default format is: {{issue.key}} - {{issue.summary}},
* Support issue field are `key` `summary` `type` `status`, 
* Support use js expression `{{issue.type == 'Bug' ? ('[BugFix] \\n' + issue.key): ('[Others]' + issue.key) }} - {{issue.summary}}`.
* `status` value includs `Bug` `Task` `Story`, etc..
