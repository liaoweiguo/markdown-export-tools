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

### 0.0.16

- Fixed PDF table border issue by moving CSS to external file and using cssPath option
- Created separate table-styles.css file for better CSS management
- Improved reliability of CSS application in generated PDFs

### 0.0.15

- Enhanced PDF table border styling with more specific CSS selectors and !important flags
- Improved table appearance in exported PDF documents with better spacing and background colors
- Added alternating row colors for better readability

### 0.0.14

- Fixed PDF export table rendering issue by adding CSS styles for table borders
- Added proper table styling (borders, padding, background color) for PDF output
- Improved visual appearance of tables in exported PDF documents

### 0.0.13

- Fixed "buffer is not supported by this platform" error by using 'nodebuffer' output type
- Reverted to correct output type for Node.js environment compatibility
- Ensured consistent plugin usage with tablePlugin.tablePlugin

### 0.0.12

- Fixed "Cannot read properties of undefined (reading 'preprocess')" error by correcting @mdast2docx/table plugin usage
- Updated plugin import to use tablePlugin.tablePlugin instead of destructuring import
- Improved error handling in Word export functionality

### 0.0.11

- Improved Word export functionality with better Markdown formatting support
- Integrated remark-gfm and @mdast2docx/table for enhanced Markdown feature support
- Updated Word export to properly handle tables, strikethrough, and other GFM features
- Fixed async/await usage in Word export command

### 0.0.10

- Fixed "command 'markdown-export-tools.exportToPdf' not found" error by removing ES6 import statements
- Resolved module import conflicts between ES6 and CommonJS syntax
- Cleaned up duplicate dependencies in package.json

### 0.0.9

- Added remark-gfm support for better Markdown parsing (tables, strikethrough, etc.)
- Integrated @mdast2docx/table plugin for proper table support in Word documents
- Improved Markdown feature support in Word export

### 0.0.8

- Fixed data type handling for Blob to Buffer conversion
- Improved error messages and debugging information
- Enhanced compatibility with different Node.js environments

### 0.0.7

- Fixed "The 'data' argument must be of type string or an instance of Buffer" error by using 'nodebuffer' output type
- Updated to use correct output type for Node.js environment
- Added proper buffer type checking before file writing

### 0.0.6

- Fixed "buffer is not supported by this platform" error by removing explicit output type specification
- Updated to use default output type ("buffer") for Node.js environment
- Improved file writing with synchronous method for better error handling

### 0.0.5

- Fixed "Cannot `parse` without `Parser`" error by correctly using remarkParse.default
- Resolved import issue with remark-parse module in ES modules context
- Improved error handling and debugging information

### 0.0.4

- Fixed "Cannot `parse` without `Parser`" error by correctly implementing unified and remark-parse
- Improved Markdown to Word conversion process with proper AST parsing
- Updated extension to use buffer output for DOCX file generation
- Enhanced error handling and debugging capabilities

### 0.0.3

- Fixed "mdToDocx is not a function" error by correctly importing and using the toDocx function
- Added unified and remark-parse dependencies for proper Markdown AST parsing
- Improved error handling for Word export functionality

### 0.0.2

- Updated Word export functionality to use md-to-docx for proper Markdown formatting
- Improved documentation and usage instructions

### 0.0.1

Initial release of Markdown Export Tools
- Export Markdown files to PDF
- Export Markdown files to Word with proper formatting using md-to-docx