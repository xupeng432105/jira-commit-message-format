import * as vscode from 'vscode';

export class AuthProcessDialog {
    public context: vscode.ExtensionContext | null = null;
    constructor(_context: vscode.ExtensionContext) {
        this.context = _context;
    }

    async init() {
        const context = this.context as vscode.ExtensionContext;
        const instance = await vscode.window.showInputBox({
            prompt: 'Please fill your Jira information firstly.',
            placeHolder: 'e.g. yourjirawebsite.atlassian.net',
            ignoreFocusOut: true,
            value: context.globalState.get('instance') || '',
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
        context.globalState.update('instance', instance);
        const username = await vscode.window.showInputBox({
            prompt: 'Please fill your Jira username.',
            placeHolder: 'e.g. abc.gmail.com',
            value: context.globalState.get('username') || '',
            ignoreFocusOut: true,
            validateInput(value) {
                if (!value) {
                    return 'Username cannot be empty.';
                }
                return null;
            },
        });
        if(!username) return;
        context.globalState.update('username', username);
        const token = await vscode.window.showInputBox({
            prompt: 'Please fill your Jira token. You can find your token in your Jira account settings.',
            placeHolder: 'e.g. ATATT3xFfGF0ox_1JDrMpLArBQcFc8dINEuBn-1-hvobLLwxfgcuH5ZusKBQ9swSI6_b4ujoXsEgnNYM0RtuTkRC5oMdDgGjY6oJ-8M0ZWhyOGk9F3LmrQcGU25aV1z5UKCHx9eeiA7wQZ3aHLC9pC8HxXvQW65OUtootC8_jz7i1MeuZKJEHyE=3AC6B2EC',
            value: context.globalState.get('token') || '',
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
        context.globalState.update('token', token);

        return true;
}
}