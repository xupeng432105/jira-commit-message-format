import * as vscode from 'vscode';
import { loadIssues } from '../services/issue.service';
import { AuthService } from '../services/auth.service';
import { IssueView } from './issue-view';

export class IssueTreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
    private _treeData: vscode.TreeItem[] = [];
    context: vscode.ExtensionContext;
    issueView: IssueView;
    private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined | void> = new vscode.EventEmitter<vscode.TreeItem | undefined | void>();
    readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined | void> = this._onDidChangeTreeData.event;

    constructor(_context: vscode.ExtensionContext, _issueView: IssueView) {
        this.context = _context;
        this.issueView = _issueView;
    }

    getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
        return element;
    }

    async getChildren(element?: vscode.TreeItem): Promise<vscode.TreeItem[]> {
        const { auth, instance } = await AuthService.getInstance(this.context).loadInfo();
        let data = await loadIssues(auth, instance);
        // const _testData = testData.issues;
        // let data = _testData;
        if (data && data instanceof Array) {
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
            this._treeData = treeData;
        } else {
            this.issueView.stopAutoReload();
        }

        return this._treeData;
    }

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }
}