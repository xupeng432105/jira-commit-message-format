import * as vscode from 'vscode';
const clipboardy = require('clipboardy');

export function registerCommand_ViewIssue(context: vscode.ExtensionContext) {
    return vscode.commands.registerCommand('JCF.viewIssue', (...args) => {
		const issue = args[0].contextValue;
        const data = JSON.stringify(issue.source);
        clipboardy.default.writeSync(data);
		vscode.window.showInformationMessage("Data copied." + data);
	});
}
