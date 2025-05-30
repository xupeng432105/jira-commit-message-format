import * as vscode from 'vscode';

export const KEY_INSTANCE = 'JCF_instance';
export const KEY_USERNAME = 'JCF_username';
export const KEY_TOKEN = 'JCF_token';

export function loadInfo(context: vscode.ExtensionContext) {
    const username = context.globalState.get(KEY_USERNAME) || '';
    const token = context.globalState.get(KEY_TOKEN) || '';
    const instance = context.globalState.get(KEY_INSTANCE) as string || '';
    const auth = btoa(`${username}:${token}`);
    return {
        auth, 
        instance,
        username,
        token
    };
}