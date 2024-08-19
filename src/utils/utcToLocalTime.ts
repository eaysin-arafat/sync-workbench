export function convertUTCToLocalTime(utcTime: string): string {
  const date = new Date(utcTime); // Convert the UTC time string to a Date object
  const localYear: number = date.getFullYear();
  const localMonth: string = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
  const localDay: string = String(date.getDate()).padStart(2, "0");

  return `${localYear}-${localMonth}-${localDay}`;
}
