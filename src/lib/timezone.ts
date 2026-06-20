export function getTimezone(lat: number, lng: number): string {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const tzlookup = require("tz-lookup");
    return tzlookup(lat, lng) as string;
  } catch {
    return "UTC";
  }
}
