# Overview

In a large project, related files often have similar names, but they tend to be
long and tedious to type when navigating the codebase.

This extension is modified from an extension by Mike Schreifels at
https://github.com/schreifels/vscode-quick-open-related-files.git.

### Usage

By default, you can list related files for the currently open file using the
`⌘+.` keyboard shortcut or by selecting "Quick Open Related Files" in the
command palette.

You can customize the keyboard shortcut by adding this to `keybindings.json`:

```json
{
  "command": "quickOpenRelatedFiles.show",
  "key": "cmd+."
}
```

### Configuration

There are a couple options to customize how the extension manipulates the
current path before pre-populating the quick open menu. See the
`contributes.configuration` section of the `package.json` file for more details.

## Changelog

### 1.0.0

* Initial release

## For developers

Clone the repo, `npm install`, and open the directory in VS Code. For your
convenience, it comes preconfigured with the "Launch Extension" and
"Launch Tests" launch configurations.
