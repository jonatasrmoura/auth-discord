export function getUserName(userName: string): string {
  return userName.replace(/\d+/g, "");
}
