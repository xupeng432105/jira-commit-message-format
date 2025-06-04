import * as vscode from 'vscode';
import { IssueTreeDataProvider } from './issue-tree-data-provider';
import { registerCommand_Reload } from '../commands/reload';

export class IssueView {
    public static webview: vscode.TreeView<vscode.TreeItem> | null = null;
    public static registered = false;
    public static intervalId: any = null;
    private static instance: IssueView;
    private context: vscode.ExtensionContext;

    public treeViewProvider: IssueTreeDataProvider | null = null;

    constructor(_context: vscode.ExtensionContext) {

        this.context = _context;

        IssueView.webview = this.init();

        if (!IssueView.registered) {
            this.context.subscriptions.push(registerCommand_Reload(this.context, this));
            IssueView.registered = true;
        }

        this.startAutoReload();

        if (!IssueView.instance) { IssueView.instance = this; }
    }

    init() {
        let treeViewProvider = new IssueTreeDataProvider(this.context, this);
        this.treeViewProvider = treeViewProvider;
        return vscode.window.createTreeView('issues', {
            treeDataProvider: treeViewProvider
        });
    }

    stopAutoReload() {
        clearInterval(IssueView.intervalId);
    }

    startAutoReload() {
        this.stopAutoReload();
        IssueView.intervalId = setInterval(() => {
            vscode.commands.executeCommand('JCF.reload');
        }, 1000 * 10);
    }

    public static getInstance() {
        return IssueView.instance;
    }
}