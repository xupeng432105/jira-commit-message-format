// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { IssueView } from './views/issue-view';
import { AuthProcessDialog } from './views/auth-process-dialog';
import { registerCommand_Auth } from './commands/auth';
import { registerCommand_Format } from './commands/format';
import { KEY_INSTANCE, KEY_TOKEN, KEY_USERNAME } from './key';
import { registerCommand_ViewIssue } from './commands/view-issue';
import { registerCommand_LoadStatus } from './commands/status';


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(...[
		registerCommand_Auth(context),
		registerCommand_Format(context),
		registerCommand_ViewIssue(context),
		registerCommand_LoadStatus(context)
	]);

	if (context.globalState.get(KEY_INSTANCE)
		&& context.globalState.get(KEY_USERNAME)
		&& context.globalState.get(KEY_TOKEN)
	) {
		new IssueView(context);
	} else {
		await new AuthProcessDialog(context).init();
		new IssueView(context);
	}
}

// This method is called when your extension is deactivated
export function deactivate() { }
