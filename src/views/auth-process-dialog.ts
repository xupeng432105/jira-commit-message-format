import * as vscode from 'vscode';
import { KEY_INSTANCE, KEY_TOKEN, KEY_USERNAME } from '../key';

export class AuthProcessDialog {
    public context: vscode.ExtensionContext | null = null;
    constructor(_context: vscode.ExtensionContext) {
        this.context = _context;
    }

    async init() {
        const context = this.context as vscode.ExtensionContext;
        const instance = await vscode.window.showInputBox({
            prompt: 'Please fill your Jira information firstly.',
            placeHolder: 'e.g. yours.atlassian.net',
            ignoreFocusOut: true,
            value: context.globalState.get(KEY_INSTANCE) || '',
            validateInput(value) {
                if (!value) {
                    return 'Jira instance cannot be empty.';
                }
                // if (!/^[a-zA-Z0-9-]+\.atlassian\.net$/.test(value)) {
                // 	return 'Please enter a valid Jira instance (e.g. abc.atlassian.net).';
                // }
                return null;
            },
        });
        if(!instance) return;
        context.globalState.update(KEY_INSTANCE, instance);
        const username = await vscode.window.showInputBox({
            prompt: 'Please fill your Jira username.',
            placeHolder: 'e.g. abc.gmail.com',
            value: context.globalState.get(KEY_USERNAME) || '',
            ignoreFocusOut: true,
            validateInput(value) {
                if (!value) {
                    return 'Username cannot be empty.';
                }
                return null;
            },
        });
        if(!username) return;
        context.globalState.update(KEY_USERNAME, username);
        const token = await vscode.window.showInputBox({
            prompt: 'Please fill your Jira token. You can find your token in your Jira account settings.',
            placeHolder: 'e.g. ATATT3xFfGF0ox_1JDrMpLArBQcFc8dINEuBn-1-hvobLLwx...',
            value: context.globalState.get(KEY_TOKEN) || '',
            password: true,
            ignoreFocusOut: true,
            validateInput(value) {
                if (!value) {
                    return 'Token cannot be empty.';
                }
                return null;
            },
        });
        if(!token) return;
        context.globalState.update(KEY_TOKEN, token);

        return true;
}
}