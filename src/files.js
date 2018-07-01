const { wp } = require("./common/wordpress");
const { getDirectusClient } = require("./common/directus");
const { saveWpResourceId } = require("./common/mappings");

const getWpFileName = file => {
  if (file.title.indexOf(" ") !== -1 || file.title.indexOf(".") === -1)
    return file.name;
  return file.title;
};

const createFile = async ({ directusFileName, directusId, wpFileName }) =>
  wp
    .media()
    .file(`./assets/${directusFileName}`, wpFileName)
    .create()
    .then(res => {
      console.log(
        `Success creating file ${directusFileName} with ID ${directusId}, new ID is ${
          res.id
        }`,
      );
      saveWpResourceId("files", directusId, res.id);
    })
    .catch(err => {
      console.log(
        `Error creating file ${directusFileName} with ID ${directusId}`,
        err,
      );
    });

const migrateFiles = async (startIndex, filesCount) => {
  const directusClient = await getDirectusClient();

  directusClient
    .getFiles({ limit: 1000 })
    .then(async res => {
      const files = res.data
        // .filter(f => f.type === "image/jpeg") // image/jpeg | image/png | image/svg+xml | audio/x-mp3
        .slice(startIndex, startIndex + filesCount);
      for (const file of files) {
        const wpFileName = getWpFileName(file);
        await createFile({
          directusFileName: file.name,
          directusId: file.id,
          wpFileName,
        });
      }
    })
    .catch(err => console.log(err));
};

migrateFiles(475, 50);
