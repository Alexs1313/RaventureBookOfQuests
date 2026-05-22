/** Per-character delay; scales down for longer passages. */
export const typewriterCharDelay = (textLength: number) => {
  if (textLength <= 80) {
    return 38;
  }
  if (textLength <= 200) {
    return 28;
  }
  if (textLength <= 400) {
    return 20;
  }
  return Math.max(12, Math.floor(7500 / textLength));
};
