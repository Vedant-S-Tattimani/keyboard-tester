/**
 * Detects if the current platform is macOS or iOS.
 * Utilizes userAgentData if available (modern browsers) falling back to userAgent matching.
 * @returns {boolean}
 */
export const isMac = () => {
  if (typeof window === 'undefined') return false;
  if (navigator.userAgentData) {
    return /macOS|Mac/i.test(navigator.userAgentData.platform);
  }
  return /Mac|iPod|iPhone|iPad/i.test(navigator.userAgent);
};
