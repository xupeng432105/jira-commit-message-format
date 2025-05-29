import * as vscode from 'vscode';
import { loadIssues } from './issue.service';

export class AuthView {
    public context: vscode.ExtensionContext | null = null;
    constructor(_context: vscode.ExtensionContext) {
        this.context = _context;
        this.init();
    }

    init() {
        let webview: vscode.WebviewView | null = null;
        const self = this;
        vscode.window.registerWebviewViewProvider('auth', {
            resolveWebviewView(webviewView) {
                webview = webviewView;
                webviewView.webview.options = { enableScripts: true };
                webviewView.webview.html = `
					<!DOCTYPE html>
					<html lang="en">
					<head>
						<meta charset="UTF-8">
						<meta name="viewport" content="width=device-width, initial-scale=1.0">
						<title>Jira Issues</title>
						<style>
							input[type="text"] {
								width: 300px;
								padding: 4px 8px;
								margin: 4px 0;
								box-sizing: border-box;
								border: 1px solid #ccc;
								border-radius: 4px;
								background-color: #333;
								font-size: 14px;
								color: #fff;
							}
						</style>
					</head>
					<body>
						<h1>Jira Issues</h1>
						<ul id="issues"></ul>
						<div id="login">
						
							<p>Login to Jira to view your issues.</p>
							<div>
								<label for="instance">Jira instance:</label>
								<div>
								<input type="text" id="jiraInstance" name="jiraInstance" required placeholder="yourjirawebsite.atlassian.net">
								</div>
							</div>
							<div>
								<label for="username">Username:</label>
								<div>
								<input width="200" type="text" id="username" name="username" required placeholder="abc@gmail.com">
								</div>
							</div>
							<div>
								<label for="token">Token:</label>
								<div>
								<input width="200" type="text" id="token" name="token" required placeholder="ATATT3xFfGF0ox_1JDrMpLArBQcFc8dINEuBn-1-hvobLLwxfgcuH5ZusKBQ9swSI6_b4ujoXsEgnNYM0RtuTkRC5oMdDgGjY6oJ-8M0ZWhyOGk9F3LmrQcGU25aV1z5UKCHx9eeiA7wQZ3aHLC9pC8HxXvQW65OUtootC8_jz7i1MeuZKJEHyE=3AC6B2DC">
								</div>
							</div>
							<p>Note: You can find your token in your Jira account settings.</p>
							<p>For more information, visit <a href="https://confluence.atlassian.com/cloud/api-tokens-938839638.html" target="_blank">Jira API Tokens</a>.</p>
							<button id="loginButton">Save</button>
						</div>
						<script>
						const vscode = acquireVsCodeApi();
						vscode.postMessage({ command: 'auth failed'});
							const issues = ${JSON.stringify([])};
							const issuesList = document.getElementById('issues');
							issues.forEach(issue => {
								const li = document.createElement('li');
								li.textContent = \`\${issue.key}: \${issue.summary} (\${issue.status})\`;
								issuesList.appendChild(li);
							});

							const loginButton = document.getElementById('loginButton');
							loginButton.addEventListener('click', () => {
								const username = document.getElementById('username').value;
								const token = document.getElementById('token').value;
								const instance = document.getElementById('jiraInstance').value;
								if (!instance || !username || !token) {
									vscode.postMessage({ command: 'auth failed'});
									return;
								}
								const auth = btoa(\`\${username}:\${token}\`);
								
								vscode.postMessage({ command: 'auth', auth: auth, instance: instance });
							})
						</script>
					</body>
					</html>
				`;

                webview.webview.onDidReceiveMessage(message => {
                    switch (message.command) {
                        case 'auth':
                            self.context?.globalState.update('auth', message.auth);
                            self.context?.globalState.update('instance', message.instance);
                            // loadIssues(message.value, message.instance);
                            // vscode.window.showInformationMessage(message.text);
                            break;
                        case 'auth failed':
                            vscode.window.showErrorMessage('Authentication failed. Please check your credentials and try again.');
                            break;
                    }
                });
            }
        });
    }
}