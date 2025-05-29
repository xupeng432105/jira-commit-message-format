import * as vscode from 'vscode';
const clipboardy = require('clipboardy');


export function registerCommand_Format(context: vscode.ExtensionContext) {
    return vscode.commands.registerCommand('JCF', (...args) => {
		const issue = args[0].contextValue;
		const config = vscode.workspace.getConfiguration('JCF');
		let format: string = config.get<string>('format') || "{{issue.key}} - {{issue.summary}}";
		const regex = /\{\{(.*?)\}\}/g;
		const matches = (format.match(regex) || []).map(match => match.replace(/\{\{|\}\}/g, ""));
		matches.forEach((match) => {
			format = format.replace(`{{${match}}}`, eval(match) || '');
		})
		clipboardy.default.writeSync(format);
		vscode.window.showInformationMessage(`Copy "${format}" to clipboard successfully!`);
	});
}