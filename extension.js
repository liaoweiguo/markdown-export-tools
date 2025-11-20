// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const markdownpdf = require('markdown-pdf');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const util = require('util');
const os = require('os');
const crypto = require('crypto');
const execPromise = util.promisify(exec);

// Global reference to extension path for resource access
let extensionPath = null;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Store extension path for later use
	extensionPath = context.extensionPath;

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "markdown-export-tools" is now active!');

	// Register the export to PDF command
	let exportToPdfDisposable = vscode.commands.registerCommand('markdown-export-tools.exportToPdf', function () {
		// Get the currently active text editor
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showErrorMessage('No active editor found!');
			return;
		}

		// Check if the current file is a markdown file
		if (editor.document.languageId !== 'markdown') {
			vscode.window.showErrorMessage('The current file is not a Markdown file!');
			return;
		}

		// Get the file path
		const filePath = editor.document.fileName;
		const fileName = path.basename(filePath, '.md');
		const fileDir = path.dirname(filePath);
		
		// Create the output path
		const outputPath = path.join(fileDir, `${fileName}.pdf`);

		// Show progress message
		vscode.window.withProgress({
			location: vscode.ProgressLocation.Notification,
			title: "Exporting to PDF...",
			cancellable: false
		}, async (progress, token) => {
			return new Promise((resolve) => {
				// Use cssPath option to reference the external CSS file
				markdownpdf({ cssPath: path.join(__dirname, 'table-styles.css') }).from(filePath).to(outputPath, () => {
					vscode.window.showInformationMessage(`PDF exported successfully: ${outputPath}`);
					resolve();
				});
			});
		});
	});

    // 修改 exportToWordDisposable 的实现，使用 Pandoc 和临时文件 + 自定义参考文档
    let exportToWordDisposable = vscode.commands.registerCommand('markdown-export-tools.exportToWord', async function () {
        // Get the currently active text editor
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found!');
            return;
        }

        // Check if the current file is a markdown file
        if (editor.document.languageId !== 'markdown') {
            vscode.window.showErrorMessage('The current file is not a Markdown file!');
            return;
        }

        // Get the file path
        const filePath = editor.document.fileName;
        const fileName = path.basename(filePath, '.md');
        const fileDir = path.dirname(filePath);
        
        // Create the output path
        const outputPath = path.join(fileDir, `${fileName}.docx`);

        // Show progress message
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Exporting to Word Docx (using Pandoc)...",
            cancellable: false
        }, async (progress, token) => {
            let tempInputFile = null;
            try {
                // Read the markdown content
                let markdownContent = editor.document.getText();
                
                // Add CSS styles for tables
                const tableCss = `
<style>
table {
  border-collapse: collapse !important;
  width: 100% !important;
  margin: 5px 0 !important;
}

table, th, td {
  border: 1px solid #000 !important;
}

th, td {
  padding: 4px !important;
  text-align: left !important;
}

th {
  background-color: #f2f2f2 !important;
  font-weight: bold !important;
}

tr:nth-child(even) {
  background-color: #f9f9f9 !important;
}
</style>
`;
                // markdownContent = tableCss + markdownContent;
                
                // Create a temporary markdown file for input
                const tempDir = os.tmpdir();
                const tempFileName = `temp-md-${crypto.randomBytes(8).toString('hex')}.md`;
                tempInputFile = path.join(tempDir, tempFileName);
                
                // Write markdown content to temp file
                fs.writeFileSync(tempInputFile, markdownContent, 'utf8');
                
                // Get path to bundled reference.docx (place it in your extension root)
                const referenceDocPath = path.join(extensionPath, 'template.docx');
                
                // Check if reference doc exists
                if (!fs.existsSync(referenceDocPath)) {
                    throw new Error('template.docx not found in extension folder. Please create it with custom table styles.');
                }
                
                // Prepare Pandoc command using the temp file and reference doc for styling
                const pandocCommand = `pandoc "${tempInputFile}" -f markdown -t docx --reference-doc="${referenceDocPath}" -o "${outputPath}"`;
                
                // Execute Pandoc
                const { stdout, stderr } = await execPromise(pandocCommand);
                
                if (stderr && !stderr.includes('Warning:') && !stderr.includes('Note:')) {
                    throw new Error(stderr);
                }
                
                vscode.window.showInformationMessage(`Word document exported successfully: ${outputPath}`);
            } catch (error) {
                // Check if Pandoc is not installed
                if (error.message.includes('spawn pandoc ENOENT') || error.message.includes('command not found')) {
                    vscode.window.showErrorMessage('Pandoc is not installed or not in PATH. Please install Pandoc from https://pandoc.org/installing.html');
                } else if (error.message.includes('reference.docx not found')) {
                    vscode.window.showErrorMessage(error.message + '\n\nHow to create reference.docx:\n1. Open Word, insert a table (e.g., 2x2).\n2. Select the table, go to Table Design > Borders > All Borders (set to black, 1pt).\n3. Save as reference.docx in your extension folder.\n4. Pandoc will apply this style to all tables.');
                } else {
                    vscode.window.showErrorMessage('Error exporting to Word: ' + error.message);
                }
                console.error(error);
            } finally {
                // Clean up temp file if it exists
                if (tempInputFile && fs.existsSync(tempInputFile)) {
                    fs.unlinkSync(tempInputFile);
                }
            }
        });
    });

    context.subscriptions.push(exportToPdfDisposable);
	context.subscriptions.push(exportToWordDisposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}