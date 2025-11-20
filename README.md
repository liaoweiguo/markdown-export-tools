# Markdown Export Tools

A Visual Studio Code extension that provides tools to export Markdown files to PDF and Word formats.

## Features

- Export Markdown files to PDF with proper table borders and styling
- Export Markdown files to Word (.docx) with proper formatting
- Support for advanced Markdown features (tables, strikethrough, task lists, etc.)

## Usage

1. Open a Markdown file in VS Code
2. Right-click in the editor or explorer
3. Select either "Markdown: Export to PDF" or "Markdown: Export to Word"
4. The exported file will be saved in the same directory as the original Markdown file

## Requirements

- Visual Studio Code 1.74.0 or higher

## Installation

### You need to have pandoc to export to Word format. 
1. Download and install pandoc from [https://pandoc.org/installing.html](https://pandoc.org/installing.html).
2. for macOS, you can also use Homebrew:
   ```bash
   brew install pandoc
   ```
3. for Linux, you can use your package manager, e.g., for Ubuntu:
   ```bash
   sudo apt-get install pandoc
   ```
4. for Windows, you can use Chocolatey:
   ```bash
   choco install pandoc
   ```

### From VSIX (Recommended)

1. Download the `.vsix` file from the releases page
2. In VS Code, go to the Extensions view (`Ctrl+Shift+X`)
3. Click on the "..." menu and select "Install from VSIX..."
4. Select the downloaded `.vsix` file
5. Reload VS Code when prompted

### From Source

1. Clone or download this repository
2. Run `npm install` in the project directory
3. Run `vsce package` to create the `.vsix` file
4. Install the generated `.vsix` file following the steps above

## Implementation Details

- Uses `markdown-pdf` for PDF export with custom CSS for table styling
- Uses `md-to-docx` with `unified`, `remark-parse`, and `remark-gfm` for Word export with proper Markdown formatting support
- Includes `@mdast2docx/table` plugin for proper table support in Word documents

## Known Limitations

- Large files may take some time to export
- Complex Markdown extensions may not be fully supported

## Release Notes

### 0.0.15

- Enhanced PDF table border styling with more specific CSS selectors and !important flags
- Improved table appearance in exported PDF documents with better spacing and background colors
- Added alternating row colors for better readability

### 0.0.14

- Fixed PDF export table rendering issue by adding CSS styles for table borders
- Added proper table styling (borders, padding, background color) for PDF output
- Improved visual appearance of tables in exported PDF documents

### 0.0.9

- Added remark-gfm support for better Markdown parsing (tables, strikethrough, etc.)
- Integrated @mdast2docx/table plugin for proper table support in Word documents
- Improved Markdown feature support in Word export

### 0.0.1

Initial release of Markdown Export Tools
- Export Markdown files to PDF
- Export Markdown files to Word with proper formatting using md-to-docx