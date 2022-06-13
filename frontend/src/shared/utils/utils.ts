export const getFormattedDate = (date?: string) => {
  if (date) {
    return new Date(date).toDateString();
  }
  return "";
}
