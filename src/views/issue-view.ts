import * as vscode from 'vscode';
import { loadIssues } from '../issue.service';
import { KEY_INSTANCE, KEY_TOKEN, KEY_USERNAME } from '../key';
import { testData } from '../test/test-data.test';

export class IssueView {
    public static webview: vscode.TreeView<vscode.TreeItem> | null = null;
    private context: vscode.ExtensionContext;
    constructor(_context: vscode.ExtensionContext) {
        this.context = _context;
        IssueView.webview = this.init();
}

    init() {
        const username = this.context.globalState.get(KEY_USERNAME) || '';
        const token = this.context.globalState.get(KEY_TOKEN) || '';
        const instance = this.context.globalState.get(KEY_INSTANCE) as string || '';
        const auth = btoa(`${username}:${token}`);
        if(!instance || !username || !token) {
            vscode.window.showErrorMessage('Please fill jira information firstly.');
            return null;
        }
        return vscode.window.createTreeView('issues', {
            treeDataProvider: {
                getTreeItem: (element: vscode.TreeItem) => {
                    return element;
                },
                getChildren: async () => {
                    let data = await loadIssues(auth, instance) || [];
                    // const _testData = testData.issues;
                    // let data = _testData;
                    const treeData: vscode.TreeItem[] = data.map(issue => {
                        const item: (vscode.TreeItem) = new vscode.TreeItem('Jira Issues', vscode.TreeItemCollapsibleState.Expanded);
                        item.label = `${issue.priority} [${issue.type}] ${issue.key} - ${issue.summary}`;
                        // item.iconPath = issue.source.fields.issuetype.iconUrl;
                        item.collapsibleState = vscode.TreeItemCollapsibleState.None;
                        item.contextValue = issue as any;
                        item.tooltip = new vscode.MarkdownString(`**${issue.key}**\n${issue.summary}\n_Status: ${issue.status}_`);
                        item.accessibilityInformation = {
                            label: `Jira Issue: ${issue.key} - ${issue.summary} (${issue.status})`
                        };
                        return item;
                    });
                    return treeData;
                },
            }
        });
    }
}