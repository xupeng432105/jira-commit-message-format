import * as vscode from 'vscode';

export function loadIssues(auth: string, instance: string) {
	return fetch(`https://${instance}/rest/api/2/search?jql=assignee=currentUser() AND status in ("Open", "In Progress", "Reopened")`, {
			method: 'GET',
			headers: {
				'Authorization': `Basic ${auth}`,
    			'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
		.then(response => response.json())
		.then((data: any) => {
			const _data: any[] = data.issues.map((issue: any) => ({key: issue.key, summary: issue.fields.summary, status: issue.fields.status.name}));
			return _data;
		}, error => {
			vscode.window.showErrorMessage('Error fetching data from GitHub API: ' + error);
		})
}