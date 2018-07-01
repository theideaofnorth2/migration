const { wp } = require("./wordpress");
const { getDirectusClient } = require("./directus");
const { saveWpResourceId } = require("./mappings");

module.exports.migrateResources = async (
  resourceName,
  dResourceToWResource,
  startIndex,
  resourcesCount,
) => {
  wp.resourcesAPI = wp.registerRoute("wp/v2", `/${resourceName}/`);

  const createResource = ({ oldId, title, fields }) =>
    wp
      .resourcesAPI()
      .create({
        title,
        fields,
        status: "publish",
      })
      .then(res => {
        console.log(
          `Success creating resource with ID ${oldId}, new ID is ${res.id}`,
        );
        saveWpResourceId(resourceName, oldId, res.id);
      })
      .catch(err => {
        console.log(`Error creating resource with ID ${oldId}`, err);
      });

  const directusClient = await getDirectusClient();

  directusClient
    .getItems(resourceName)
    .then(async res => {
      const resources = res.data.slice(startIndex, startIndex + resourcesCount);
      const wordpressResources = resources.map(dResourceToWResource);
      for (const wordpressResource of wordpressResources) {
        await createResource(wordpressResource);
      }
    })
    .catch(err => console.log(err));
};
