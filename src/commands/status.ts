import * as vscode from 'vscode';
import { loadStatuses } from '../services/issue.service';
import { AuthService } from '../services/auth.service';
const clipboardy = require('clipboardy');

export function registerCommand_LoadStatus(context: vscode.ExtensionContext) {
    return vscode.commands.registerCommand('JCF.loadStatus', async (...args) => {
        const { auth, instance } = await AuthService.getInstance(context).loadInfo();
        loadStatuses(auth, instance).then(val => {
            vscode.window.showInformationMessage(`Loaded ${val.length} statuses from Jira instance ${instance}: ${val.map((v: any) => v.name)}`, 'Copy to Clipboard', 'Close').then(selection => {
                if (selection === 'Copy to Clipboard') {
                    const statusList = val.map((status: any) => `${status.name}`).join(',');
                    clipboardy.default.writeSync(statusList);
                    vscode.window.showInformationMessage('Statuses copied to clipboard.');
                }
                else if (selection === 'Close') {
                    // Do nothing, just close the message
                }
                }
            );
        })
    });
}