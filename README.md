
## Features
* Automatically generate jira commit message in certain format.
![alt text](./usage.gif)

* Default format is: {{issue.key}} - {{issue.summary}},
* Use javascript expression `{{issue.type == 'Bug' ? ('[BugFix] ' + issue.key): ('[Others]' + issue.key) }} - {{issue.summary}}`.
* Issue field are `key` | `summary` | `type` | `status` | `source`, 
* `status` value includes `Bug` `Task` `Story`, etc..
* `source` value is the original `jira` object from JIRA api

