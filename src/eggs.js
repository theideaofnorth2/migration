const { migrateResources } = require("./common/resources");
const filesMappings = require(`./mappings/files.json`);
const originsMappings = require(`./mappings/origins.json`);

const dResourceToWResource = o => ({
  oldId: o.id,
  title: o.name,
  fields: {
    name: o.name,
    video: o.video,
    image: o.image ? filesMappings[o.image.data.id] : undefined,
    origin: o.origin ? originsMappings[o.origin.data.id] : undefined,
    location: {
      lat: o.location.split(",")[0],
      lng: o.location.split(",")[1],
    },
  },
});

migrateResources("eggs", dResourceToWResource, 1, 2);
