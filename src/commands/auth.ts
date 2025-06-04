import * as vscode from 'vscode';
import { AuthProcessDialog } from '../views/auth-process-dialog';
import { IssueView } from '../views/issue-view';

export function registerCommand_Auth(context: vscode.ExtensionContext) {
    return vscode.commands.registerCommand('JCF.auth', async () => {
        const v = await new AuthProcessDialog(context).init();
        if (v) { IssueView.getInstance()?.treeViewProvider?.refresh(); }
    });
}