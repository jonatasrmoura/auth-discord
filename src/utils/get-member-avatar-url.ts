export function getMemberAvatarUrl(
  guildId: string,
  userId: string,
  memberAvatar: string | null
): string {
  if (memberAvatar) {
    return `https://cdn.discordapp.com/guilds/${guildId}/users/${userId}/avatars/${memberAvatar}.png`;
  } else {
    return "https://pbs.twimg.com/profile_images/1609033758497202176/7QBpkbA5_400x400.jpg";
  }
}
