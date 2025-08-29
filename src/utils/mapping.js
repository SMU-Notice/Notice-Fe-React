export function mapLocationToBuildingId(location, BUILDINGS) {
    const b = Object.values(BUILDINGS).find((x) => x.name === location);
    return b ? b.id : null;
  }