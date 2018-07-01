const { migrateResources } = require("./common/resources");
const filesMappings = require(`./mappings/files.json`);

const dResourceToWResource = o => ({
  oldId: o.id,
  title: o.name,
  fields: {
    name: o.name,
    native_name: o.native_name,
    image: o.image ? filesMappings[o.image.data.id] : undefined,
    vertical: o.vertical,
    horizontal: o.horizontal,
    location: {
      lat: o.location.split(",")[0],
      lng: o.location.split(",")[1],
    },
  },
});

migrateResources("destinations", dResourceToWResource, 20, 10);
