const { wp } = require("./wordpress");
const { getDirectusClient } = require("./directus");
const interviewsMappings = require(`./mappings/interviews.json`);
const filesMappings = require(`./mappings/files.json`);

const reverseMappings = {};
for (var key in interviewsMappings) {
  reverseMappings[interviewsMappings[key]] = key;
}

const updateResources = async (resourceName, startIndex, resourcesCount) => {
  wp.resourcesAPI = wp.registerRoute("wp/v2", `/${resourceName}/(?P<id>)`);

  const updateResource = ({ id, payload }) =>
    wp
      .resourcesAPI()
      .id(id)
      .update(payload)
      .then(res => {
        console.log(
          `Success updating resource ${payload.fields.name} with ID ${id}`,
        );
      })
      .catch(err => {
        console.log(
          `Error updating resource ${payload.fields.name} with ID ${id}`,
          err,
        );
      });

  const directusClient = await getDirectusClient();

  wp.resourcesAPI()
    .perPage(40)
    .get()
    .then(async res => {
      const wordpressResources = res.slice(
        startIndex,
        startIndex + resourcesCount,
      );
      const slides = await directusClient.getItems("slides", { limit: 10000 });
      for (const wordpressResource of wordpressResources) {
        const oldId = reverseMappings[wordpressResource.id];
        const resourceSlides = slides.data
          .filter(s => s.interview_id.data.id == oldId)
          .map(s => ({
            image: filesMappings[s.image.data.id],
            time: s.time,
          }))
          .sort((s1, s2) => s1.time - s2.time);
        await updateResource({
          id: wordpressResource.id,
          payload: {
            fields: {
              ...wordpressResource.acf,
              slides: resourceSlides,
            },
          },
        });
      }
    })
    .catch(err => console.log(err));
};
updateResources("interviews", 30, 10);
