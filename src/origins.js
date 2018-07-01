const { migrateResources } = require("./common/resources");

const dResourceToWResource = o => ({
  oldId: o.id,
  title: o.name,
  fields: {
    name: o.name,
    native_name: o.native_name,
    image: 76,
    // image: o.image ? o.image.data.id : undefined,
    vertical: o.vertical,
    horizontal: o.horizontal,
    zoom: o.zoom,
    location: {
      lat: o.location.split(",")[0],
      lng: o.location.split(",")[1],
    },
  },
});

migrateResources("origins", dResourceToWResource, 0, 1);
