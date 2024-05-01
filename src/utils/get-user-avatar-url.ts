export function getUserAvatarUrl(
  userId: string,
  userAvatar: string | null
): string {
  if (userAvatar) {
    return `https://cdn.discordapp.com/avatars/${userId}/${userAvatar}.png`;
  } else {
    return "https://pbs.twimg.com/profile_images/1609033758497202176/7QBpkbA5_400x400.jpg";
  }
}
