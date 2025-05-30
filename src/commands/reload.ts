import * as vscode from 'vscode';
import { IssueView } from '../views/issue-view';
const clipboardy = require('clipboardy');

export function registerCommand_Reload(context: vscode.ExtensionContext, issueView: IssueView) {
    return vscode.commands.registerCommand('JCF.reload', (...args) => {
        issueView.treeViewProvider?.refresh();
	});
}