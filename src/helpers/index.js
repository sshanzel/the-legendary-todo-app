export function errorToString(error) {
  if (Array.isArray(error)) return error[0].message;
  if (typeof error === "string") return error;

  return error;
}
