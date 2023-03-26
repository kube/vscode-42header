import * as vscode from 'vscode';
import assert from 'assert';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';


suite('Extension Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.');

  test('Insert header with correct user config', async () => {
    const tempFile = createTempCppFile();
    await vscode.workspace.getConfiguration('42header', null).update('username', 'marvin', true);
    await vscode.workspace.getConfiguration('42header', null).update('email', 'marvin@42.fr', true);
    await insertHeader(tempFile);

    const content = readFileContent(tempFile);

    const lines = content.split(os.EOL);

    const expectedUserName = vscode.workspace.getConfiguration('42header', null).get('username');
    const expectedEmail = vscode.workspace.getConfiguration('42header', null).get('email');
    const headerLine = lines[7];

    assert(lines[5].includes(`<${expectedEmail as string}>`), `Header line does not contain expected user name "${expectedEmail}"`);

    assert(lines[5].includes(` ${expectedUserName as string} `), `Header line does not contain expected user name "${expectedUserName}"`);
    assert(lines[7].includes(` ${expectedUserName as string} `), `Header line does not contain expected user name "${expectedUserName}"`);
    assert(lines[8].includes(` ${expectedUserName as string} `), `Header line does not contain expected user name "${expectedUserName}"`);

    fs.unlinkSync(tempFile);
  });

  test('Insert header on Cpp file', async () => {
    const tempFile = createTempCppFile();

    await insertHeader(tempFile);
    const content = readFileContent(tempFile);

    const expectedHeaderStart = '/******************************************************************************/';
    const expectedHeaderEnd = '/******************************************************************************/';
    const lines = content.split(os.EOL);
    const updateLine = lines[8];

    assert.strictEqual(lines[0], expectedHeaderStart);
    assert.strictEqual(lines[lines.length - 3], expectedHeaderEnd);
    await sleep(1000);
    await editFile(tempFile);

    assert.notEqual(readFileContent(tempFile).split(os.EOL)[8], updateLine);

    fs.unlinkSync(tempFile);
  });

  test('Insert header on Python file', async () => {
    const tempFile = createTempPythonFile();
    await insertHeader(tempFile);

    const content = readFileContent(tempFile);

    const expectedHeaderStart = '#******************************************************************************#';
    const expectedHeaderEnd = '#******************************************************************************#';
    const lines = content.split(os.EOL);
    const updateLine = lines[8];

    assert.strictEqual(lines[0], expectedHeaderStart);
    assert.strictEqual(lines[lines.length - 3], expectedHeaderEnd);
    await sleep(1000);
    await editFile(tempFile);

    assert.notEqual(readFileContent(tempFile).split(os.EOL)[8], updateLine);

    fs.unlinkSync(tempFile);
  });

  test('Insert header on FSharp file', async () => {
    const tempFile = createTempFSharpFile();
    await insertHeader(tempFile);

    const content = readFileContent(tempFile);

    const expectedHeaderStart = '(* ************************************************************************** *)';
    const expectedHeaderEnd = '(* ************************************************************************** *)';
    const lines = content.split(os.EOL);
    const updateLine = lines[8];

    assert.strictEqual(lines[0], expectedHeaderStart);
    assert.strictEqual(lines[lines.length - 3], expectedHeaderEnd);
    await sleep(1000);
    await editFile(tempFile);

    assert.notEqual(readFileContent(tempFile).split(os.EOL)[8], updateLine);

    fs.unlinkSync(tempFile);
  });

  test('Insert header on ini file', async () => {
    const tempFile = createTempIniFile();
    await insertHeader(tempFile);

    const content = readFileContent(tempFile);

    const expectedHeaderStart = ';; ************************************************************************** ;;';
    const expectedHeaderEnd = ';; ************************************************************************** ;;';
    const lines = content.split(os.EOL);
    const updateLine = lines[8];

    assert.strictEqual(lines[0], expectedHeaderStart);
    assert.strictEqual(lines[lines.length - 3], expectedHeaderEnd);
    await sleep(1000);
    await editFile(tempFile);

    assert.notEqual(readFileContent(tempFile).split(os.EOL)[8], updateLine);

    fs.unlinkSync(tempFile);
  });

  test('Insert header on Lua file', async () => {
    const tempFile = createTempLuaFile();
    await insertHeader(tempFile);
    const content = readFileContent(tempFile);

    const expectedHeaderStart = '-- ************************************************************************** --';
    const expectedHeaderEnd = '-- ************************************************************************** --';
    const lines = content.split(os.EOL);
    const updateLine = lines[8];

    assert.strictEqual(lines[0], expectedHeaderStart);
    assert.strictEqual(lines[lines.length - 3], expectedHeaderEnd);
    await sleep(1000);
    await editFile(tempFile);

    assert.notEqual(readFileContent(tempFile).split(os.EOL)[8], updateLine);

    fs.unlinkSync(tempFile);
  });

  test('Insert header on LaTeX file', async () => {
    const tempFile = createTempLaTeXFile();
    await insertHeader(tempFile);
    const content = readFileContent(tempFile);

    const expectedHeaderStart = '%% ************************************************************************** %%';
    const expectedHeaderEnd = '%% ************************************************************************** %%';
    const lines = content.split(os.EOL);
    const updateLine = lines[8];

    assert.strictEqual(lines[0], expectedHeaderStart);
    assert.strictEqual(lines[lines.length - 3], expectedHeaderEnd);
    await sleep(1000);
    await editFile(tempFile);

    assert.notEqual(readFileContent(tempFile).split(os.EOL)[8], updateLine);

    fs.unlinkSync(tempFile);
  });

  test('Insert header on Html file', async () => {
    const tempFile = createTempHtmlFile();
    await insertHeader(tempFile);

    const content = readFileContent(tempFile);

    const expectedHeaderStart = '<!-- ***************************************************************************';
    const expectedHeaderEnd = '**************************************************************************** -->';
    const lines = content.split(os.EOL);
    const updateLine = lines[8];

    assert.strictEqual(lines[0], expectedHeaderStart);
    assert.strictEqual(lines[lines.length - 3], expectedHeaderEnd);
    await sleep(1000);
    await editFile(tempFile);

    assert.notEqual(readFileContent(tempFile).split(os.EOL)[8], updateLine);

    fs.unlinkSync(tempFile);
  });
});

async function insertHeader(file: string) {
  const document = await vscode.workspace.openTextDocument(file);
  const editor = await vscode.window.showTextDocument(document);
  const position = new vscode.Position(0, 0);

  await vscode.commands.executeCommand('42header.insertHeader');
  await document.save();
}

async function editFile(file: string) {
  const document = await vscode.workspace.openTextDocument(file);
  const editor = await vscode.window.showTextDocument(document);
  const lastLine = document.lineAt(document.lineCount - 1);
  const endPosition = lastLine.range.end;

  editor.edit((editBuilder) => {
    editBuilder.insert(endPosition, 'int main() {\n');
  });
  await document.save();
}

function createTempCppFile() {
  const tmpFile = path.join(__dirname, `temp-${Date.now()}.cpp`);
  fs.writeFileSync(tmpFile, '');
  return tmpFile;
}

function createTempPythonFile() {
  const tmpFile = path.join(__dirname, `temp-${Date.now()}.py`);
  fs.writeFileSync(tmpFile, '');
  return tmpFile;
}

function createTempFSharpFile() {
  const tmpFile = path.join(__dirname, `temp-${Date.now()}.fs`);
  fs.writeFileSync(tmpFile, '');
  return tmpFile;
}

function createTempIniFile() {
  const tmpFile = path.join(__dirname, `temp-${Date.now()}.ini`);
  fs.writeFileSync(tmpFile, '');
  return tmpFile;
}

function createTempLuaFile() {
  const tmpFile = path.join(__dirname, `temp-${Date.now()}.lua`);
  fs.writeFileSync(tmpFile, '');
  return tmpFile;
}

function createTempLaTeXFile() {
  const tmpFile = path.join(__dirname, `temp-${Date.now()}.tex`);
  fs.writeFileSync(tmpFile, '');
  return tmpFile;
}

function createTempHtmlFile() {
  const tmpFile = path.join(__dirname, `temp-${Date.now()}.html`);
  fs.writeFileSync(tmpFile, '');
  return tmpFile;
}

function readFileContent(filePath: string) {
  return fs.readFileSync(filePath, 'utf8');
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}