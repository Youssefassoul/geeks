import { addDays, format } from "date-fns";

export function showDateOperations() {
  const now = new Date();
  console.log("Current Date:", now);

  const futureDate = addDays(now, 5);
  const formatted = format(futureDate, "yyyy-MM-dd HH:mm:ss");

  console.log("Date + 5 days:", formatted);
}
