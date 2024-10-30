export function formatReleaseDate(date) {
  return new Date(date).toLocaleDateString("en-Us", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
