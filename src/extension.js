const path = require('path');
const vscode = require('vscode');

function stripWorkspaceFolder(currentFilename, workspaceFolder) {
    if (workspaceFolder && currentFilename.indexOf(workspaceFolder) === 0) {
        return currentFilename.slice(workspaceFolder.length);
    } else {
        return currentFilename;
    }
}

function stripExcessDirectoryLevels(currentFilename, separator, directoryLevelsToPreserve) {
    const filenameParts = currentFilename.split(separator);
    const startingIndex = filenameParts.length - 1 - directoryLevelsToPreserve;
    const boundedStartingIndex = Math.min(Math.max(startingIndex, 1), filenameParts.length - 1);
    return filenameParts.slice(boundedStartingIndex).join(separator);
}


function mapExtensions(currentFilename, separator, patterns) {
	const filenameParts = currentFilename.split(separator);
	let basename = filenameParts[filenameParts.length - 1];

	if (patterns) {
				var found = false;

        patterns.forEach(function(pattern) {
					let from_ext = pattern.from;
					let to_ext = pattern.to;

					if ( found == false && path.extname( basename ) == "." + from_ext ) {
							currentFilename = path.basename( basename, from_ext ) + to_ext;
							found = true;
						}
        });
    }

    return currentFilename;
}

function buildPrefix(currentFilename, workspaceFolder, separator, config) {
    currentFilename = stripWorkspaceFolder(currentFilename, workspaceFolder);
    currentFilename = stripExcessDirectoryLevels(currentFilename, separator, config.directoryLevelsToPreserve);
    currentFilename = mapExtensions(currentFilename, separator, config.patternsToMap);

    return currentFilename;
}

function showRelatedFiles() {
    const document = vscode.window.activeTextEditor && vscode.window.activeTextEditor.document;

    let prefix;
    if (document) {
        const currentFilename = document.fileName;
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
        const maybeWorkspaceFolder = workspaceFolder ? workspaceFolder.uri.path : '';
        const separator = path.sep;
        const config = vscode.workspace.getConfiguration('quickOpenRelatedFiles');

        prefix = buildPrefix(currentFilename, maybeWorkspaceFolder, separator, config);
    } else {
        prefix = '';
    }

    vscode.commands.executeCommand('workbench.action.quickOpen', prefix);
}

function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('quickOpenRelatedFiles.show', showRelatedFiles));
}

module.exports.buildPrefix = buildPrefix;
module.exports.activate = activate;
