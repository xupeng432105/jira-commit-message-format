import * as vscode from 'vscode';
import { IssueTreeDataProvider } from './issue-tree-data-provider';
import { registerCommand_Reload } from '../commands/reload-data';

export class IssueView {
    public static webview: vscode.TreeView<vscode.TreeItem> | null = null;
    private context: vscode.ExtensionContext;
    private registered = false;

    public treeViewProvider : IssueTreeDataProvider | null = null;
    constructor(_context: vscode.ExtensionContext) {
        this.context = _context;
        IssueView.webview = this.init();
        if(!this.registered) {
            this.context.subscriptions.push(registerCommand_Reload(this.context, this));
            this.registered = true;
        }
    }

     init() {
        let treeViewProvider = new IssueTreeDataProvider(this.context);
        this.treeViewProvider = treeViewProvider;
        return vscode.window.createTreeView('issues', {
            treeDataProvider: treeViewProvider
        });
    }
}