const { migrateResources } = require("./common/resources");
const filesMappings = require(`./mappings/files.json`);
const originsMappings = require(`./mappings/origins.json`);
const destinationsMappings = require(`./mappings/destinations.json`);
const eggsMappings = require(`./mappings/eggs.json`);

const dResourceToWResource = o => ({
  oldId: o.id,
  title: o.name,
  fields: {
    name: o.name,
    sound: o.sound ? filesMappings[o.sound.data.id] : undefined,
    image: o.image ? filesMappings[o.image.data.id] : undefined,
    origin: o.origin_id ? originsMappings[o.origin_id.data.id] : undefined,
    destination: o.destination_id
      ? destinationsMappings[o.destination_id.data.id]
      : undefined,
    parent: o.parent,
    location: {
      lat: o.location.split(",")[0],
      lng: o.location.split(",")[1],
    },
    egg: o.egg_id ? eggsMappings[o.egg_id.data.id] : undefined,
    top: o.top,
    left: o.left,
  },
});

migrateResources("interviews", dResourceToWResource, 30, 10);
