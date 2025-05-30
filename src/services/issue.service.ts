import * as vscode from 'vscode';

export function loadIssues(auth: string, instance: string) {
	const config = vscode.workspace.getConfiguration('JCF');
	let statusList: string[] = config.get<string[]>('statusList') || ["Open", "In Progress (Implement)", "Reopened"];
	return fetch(`https://${instance}/rest/api/2/search?jql=assignee=currentUser() AND status in (${statusList.map(s => '"' + s + '"').join(", ")})`, {
			method: 'GET',
			headers: {
				'Authorization': `Basic ${auth}`,
    			'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
		.then(response => response.json())
		.then((data: any) => {
			const _data: any[] = data.issues.map((issue: any) => (
                {
                    key: issue.key, 
                    summary: issue.fields.summary, 
                    status: issue.fields.status.name, 
                    type: issue.fields.issuetype.name, 
					priority: issue.fields.priority.name,
                    source: issue
                }
            ));
			vscode.window.showErrorMessage('Error fetching data from JIRA API, check your network or authentication: ' );
			return _data;
		}, error => {
			vscode.window.showErrorMessage('Error fetching data from JIRA API, check your network or authentication: ' + error);
			vscode.commands.executeCommand('JCF.auth');
		})
}

export function loadStatuses(auth: string, instance: string) {
	return fetch(`https://${instance}/rest/api/2/status`, {
			method: 'GET',
			headers: {
				'Authorization': `Basic ${auth}`,
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
		.then(response => response.json())
		.then((data: any) => {
			return data;
		}, error => {
			vscode.window.showErrorMessage('Error fetching statuses from JIRA API, check your network or authentication: ' + error);
			vscode.commands.executeCommand('JCF.auth');
		});
}