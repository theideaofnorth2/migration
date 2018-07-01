const fs = require("fs");

module.exports.saveWpResourceId = (resourceName, oldId, newId) => {
  delete require.cache[require.resolve(`../mappings/${resourceName}.json`)];
  const currentMappings = require(`../mappings/${resourceName}.json`);
  const mappings = {
    ...currentMappings,
    [oldId]: newId,
  };
  fs.writeFileSync(
    `./src/mappings/${resourceName}.json`,
    JSON.stringify(mappings),
    "utf8",
  );
};
