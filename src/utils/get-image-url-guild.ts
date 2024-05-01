export function getImageUrlGuild(guildId: string, icon: string | null): string {
  if (icon) {
    return `https://cdn.discordapp.com/icons/${guildId}/${icon}.png`;
  } else {
    return "https://pbs.twimg.com/profile_images/1609033758497202176/7QBpkbA5_400x400.jpg";
  }
}
