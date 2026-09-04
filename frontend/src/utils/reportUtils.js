export const generateReportData = (testState) => {
  const {
    layout,
    mode,
    status,
    requiredTestedCount,
    totalRequired,
    completionPercentage,
    elapsedTime,
    requiredKeys,
    testedKeys
  } = testState;

  const remainingArray = Array.from(requiredKeys || new Set())
    .filter(k => !(testedKeys || new Set()).has(k))
    .sort();

  return {
    reportVersion: 1,
    generatedAt: new Date().toISOString(),
    test: {
      layout: layout || 'QWERTY',
      mode: mode || 'FULL',
      testedKeys: requiredTestedCount || 0,
      totalTestableKeys: totalRequired || 0,
      remainingKeys: remainingArray,
      completionPercentage: completionPercentage || 0,
      durationSeconds: elapsedTime || 0,
      status: status || 'UNKNOWN'
    }
  };
};

const formatTime = (secs) => {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

export const generateReportText = (reportData) => {
  const { test } = reportData;
  return `Keyboard Diagnostic Report

Status: ${test.status}
Mode: ${test.mode}
Layout: ${test.layout}
Coverage: ${test.testedKeys}/${test.totalTestableKeys}
Completion: ${test.completionPercentage}%
Duration: ${formatTime(test.durationSeconds)}

No raw keyboard events are included.`;
};

export const downloadJSON = (data, filename) => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy to clipboard', err);
    return false;
  }
};

export const shareReport = async (text) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Keyboard Diagnostic Report',
        text: text
      });
      return true;
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Failed to share', err);
      }
      return false;
    }
  }
  return false;
};

export const formatKeyCode = (code) => {
  if (!code) return '';
  // Add spaces before capital letters (except the first one)
  return code.replace(/([A-Z])/g, ' $1').trim();
};
