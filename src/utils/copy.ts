export async function copyValueToClipboard(value: string) {
  await navigator.clipboard.writeText(value);
}
