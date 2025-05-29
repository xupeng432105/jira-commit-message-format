import * as vscode from 'vscode';
import { AuthProcessDialog } from '../auth-process-dialog';
import { IssueView } from '../issue-view';

export function registerCommand_Auth(context: vscode.ExtensionContext) {
    return vscode.commands.registerCommand('JCF.auth', async () => {
        const v = await new AuthProcessDialog(context).init();
        if (v)
            new IssueView(context);
    });
}