import * as vscode from 'vscode';
import { KEY_INSTANCE, KEY_TOKEN, KEY_USERNAME } from '../key';
import { AuthProcessDialog } from '../views/auth-process-dialog';

export class AuthService {
    static instance: AuthService;
    context: vscode.ExtensionContext | null = null;
    constructor(_context: vscode.ExtensionContext) {
        this.context = _context;
        if (!AuthService.instance) {
            AuthService.instance = this;
        }
    }

    static getInstance(context: vscode.ExtensionContext) {
        if (AuthService.instance) { return AuthService.instance; }
        else {
            const instance = new AuthService(context);
            AuthService.instance = instance;
            return instance;
        }
    }

    async loadInfo() {
        const { username, token, instance, auth } = this.loadStaticData();
        if (!(username && token && instance)) {
            await new AuthProcessDialog(this.context!).init();
            const { username, token, instance, auth } = this.loadStaticData();
            return { username, token, instance, auth };
        }
        return { username, token, instance, auth };
    }

    private loadStaticData() {
        const username = this.context!.globalState.get(KEY_USERNAME) || '';
        const token = this.context!.globalState.get(KEY_TOKEN) || '';
        const instance = this.context!.globalState.get(KEY_INSTANCE) as string || '';
        const auth = btoa(`${username}:${token}`);
        return { username, token, instance, auth };
    }
}