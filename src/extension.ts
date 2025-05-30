// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { IssueView } from './views/issue-view';
import { registerCommand_Auth } from './commands/auth';
import { registerCommand_Format } from './commands/format';
import { registerCommand_ViewIssue } from './commands/view-issue';
import { registerCommand_LoadStatus } from './commands/status';
import { AuthService } from './services/auth.service';


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

	new AuthService(context);

	context.subscriptions.push(...[
		registerCommand_Auth(context),
		registerCommand_Format(context),
		registerCommand_ViewIssue(context),
		registerCommand_LoadStatus(context),
	]);
	const { auth, instance, username, token } = await AuthService.getInstance(context).loadInfo();
	const issueView = new IssueView(context);
	// if (context.globalState.get(KEY_INSTANCE)
	// 	&& context.globalState.get(KEY_USERNAME)
	// 	&& context.globalState.get(KEY_TOKEN)
	// ) {
	// 	const issueView = new IssueView(context);
	// } else {
	// 	await new AuthProcessDialog(context).init();
	// 	new IssueView(context);
	// }
}

// This method is called when your extension is deactivated
export function deactivate() { }
