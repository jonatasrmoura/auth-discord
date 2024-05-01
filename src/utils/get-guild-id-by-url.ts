export function getGuildIdByUrl(url: string): string {
  const partesDaUrl: string[] = url.split("/");
  const ultimoElemento: string = partesDaUrl[partesDaUrl.length - 1];
  return ultimoElemento;
}
