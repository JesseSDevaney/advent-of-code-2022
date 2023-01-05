import * as fs from "node:fs";

// ******** PROCEDURAL CODE **********

const input = fs.readFileSync("./puzzleInput.txt", "utf-8");
const commands = parseToCommands(input);

const fileTree = buildFileTree(commands);
const filteredDirectories = getDirectoriesLessThanOrEqual(fileTree, 100000);

const sumOfFilteredDirectories = filteredDirectories.reduce(
  (acc, dir) => acc + dir.size,
  0
);

console.log(sumOfFilteredDirectories);

// ******** FUNCTIONS **********
// parse input to atomic commands with a standard format
// commands: [command1, command2, command3, ...]
function parseToCommands(input) {
  const commandRegex =
    /\$[ \t](?<commandName>cd|ls)[ \t]*(?<commandInput>.*)?|(?<filePrefix>dir|\d+)[ \t](?<fileName>.*)/g;
  const matchedInput = [...input.matchAll(commandRegex)];

  const commands = [];
  for (const match of matchedInput) {
    const { commandName, commandInput, filePrefix, fileName } = match.groups;

    // if command, create command and add to array
    if (commandName) {
      const command = createCommand(commandName, commandInput);
      commands.push(command);
    }

    // if file, add to output attribute of previous command
    if (filePrefix && fileName) {
      const lastCommandIndex = commands.length - 1;
      commands[lastCommandIndex].output.push({
        filePrefix,
        fileName,
      });
    }
  }

  return commands;
}

// command: { name, input, output: [] }
function createCommand(name, input) {
  return {
    name,
    input,
    output: [],
  };
}

function buildFileTree(commands) {
  const CHANGE_DIRECTORY = "cd";
  const LIST_FILES = "ls";

  const fileTree = {
    name: "/",
    parentDirectory: null,
    childDirectories: [],
    files: [],
  };
  let activeDirectory = fileTree;

  for (const command of commands) {
    if (command.name === CHANGE_DIRECTORY) {
      if (command.input === "/") {
        activeDirectory = fileTree;
        continue;
      }

      if (command.input === "..") {
        activeDirectory = activeDirectory.parentDirectory;
        continue;
      }

      const directory = createDirectory(command.input, activeDirectory);
      activeDirectory.childDirectories.push(directory);
      activeDirectory = directory;
    }

    if (command.name === LIST_FILES) {
      const files = parseFiles(command.output);
      activeDirectory.files = files ?? [];
    }
  }

  return fileTree;
}

function createDirectory(name, parentDirectory = null) {
  const directory = {
    name,
    parentDirectory,
    childDirectories: [],
    files: [],
  };

  return directory;
}

// input is an array of objects with shape
// { filePrefix, fileName }
function parseFiles(input) {
  const FILE_SIZE_REGEX = /\d+/;
  const files = [];

  for (const line of input) {
    if (FILE_SIZE_REGEX.test(line.filePrefix)) {
      const file = createFile(line.filePrefix, line.fileName);
      files.push(file);
    }
  }

  return files;
}

function createFile(fileSize, fileName) {
  return {
    name: fileName,
    size: Number(fileSize),
  };
}

function getDirectoriesLessThanOrEqual(rootDirectory, sizeLimit) {
  const directorySizes = getDirectorySizes(rootDirectory);

  const filteredBySize = directorySizes.filter(
    ({ name, size }) => size <= sizeLimit
  );

  return filteredBySize;
}

function getDirectorySizes(directory) {
  const directorySizes = [];

  let sizeOfDirectory = 0;
  const sumOfDirectFiles = directory.files.reduce(
    (acc, file) => acc + file.size,
    0
  );

  if (directory.childDirectories.length === 0) {
    sizeOfDirectory = sumOfDirectFiles;
    return [{ name: directory.name, size: sizeOfDirectory }];
  }

  for (let childDirectory of directory.childDirectories) {
    const childDirectorySize = getDirectorySizes(childDirectory);
    directorySizes.push(...childDirectorySize);
  }

  sizeOfDirectory =
    sumOfDirectFiles + directorySizes.reduce((acc, dir) => acc + dir.size, 0);

  directorySizes.push({ name: directory.name, size: sizeOfDirectory });

  return directorySizes;
}
