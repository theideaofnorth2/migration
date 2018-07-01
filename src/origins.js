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
    zoom: o.zoom,
    location: {
      lat: o.location.split(",")[0],
      lng: o.location.split(",")[1],
    },
    zoomer_4: o.zoomer_4 ? filesMappings[o.zoomer_4.data.id] : undefined,
    zoomer_6: o.zoomer_6 ? filesMappings[o.zoomer_6.data.id] : undefined,
    zoomer_8: o.zoomer_8 ? filesMappings[o.zoomer_8.data.id] : undefined,
    zoomer_10: o.zoomer_10 ? filesMappings[o.zoomer_10.data.id] : undefined,
    zoomer_12: o.zoomer_12 ? filesMappings[o.zoomer_12.data.id] : undefined,
    zoomer_13: o.zoomer_13 ? filesMappings[o.zoomer_13.data.id] : undefined,
    zoomer_14: o.zoomer_14 ? filesMappings[o.zoomer_14.data.id] : undefined,
  },
});

migrateResources("origins", dResourceToWResource, 1, 10);
