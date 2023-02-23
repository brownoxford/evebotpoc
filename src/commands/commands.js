const { Collection } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

// getDirectories produces a list of absolute paths for all child directories
// in the given source path.
const getDirectories = (source) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => path.join(source, dirent.name));

// loadCommand loads and validates a command from the provided directory. Valid
// commands are added to the given collection keyed on command name.
const loadCommand = (directory, collection) => {
  let command;
  try {
    command = require(directory);
  } catch {
    const commandName = path.basename(directory);
    console.warn(`[WARNING] "require" failed for command "${commandName}"`);
    return;
  }

  for (const property in ["data", "execute"]) {
    if (!Object.prototype.hasOwnProperty.call(command, property)) {
      console.warn(
        `[WARNING] Command "${directory}" is missing the required "${property}" property`
      );
      return;
    }
  }

  collection.set(command.data.name, command);
};

// load iterates over command directories and returns a collection of valid
// command objects keyed by name.
const load = () => {
  console.log(`loading commands from ${__dirname}`);
  const collection = new Collection();
  getDirectories(__dirname).map((directory) =>
    loadCommand(directory, collection)
  );
  return collection;
};

module.exports = {
  load,
};
