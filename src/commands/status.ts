import * as vscode from 'vscode';
import { loadStatuses } from '../services/issue.service';
import { AuthService } from '../services/auth.service';
const clipboardy = require('clipboardy');

export function registerCommand_LoadStatus(context: vscode.ExtensionContext) {
    return vscode.commands.registerCommand('JCF.loadStatus', async (...args) => {
        const { auth, instance } = await AuthService.getInstance(context).loadInfo();
        loadStatuses(auth, instance).then(val => {
            val = Array.from(new Set(val.map((v: any) => v.name)));
            val = val.sort((a: any, b: any) => {
                if (a.toLowerCase() < b.toLowerCase()) { return -1; }
                if (a.toLowerCase() > b.toLowerCase()) { return 1; }
                return 0;
            });
            vscode.window.showInformationMessage(`Loaded ${val.length} statuses from Jira instance ${instance}: ${val}`, 'Copy to Clipboard', 'Close').then(selection => {
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