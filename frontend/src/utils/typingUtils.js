export const calculateWPM = (correctCharacters, elapsedSeconds) => {
  if (elapsedSeconds <= 0) return 0;
  const elapsedMinutes = elapsedSeconds / 60;
  const words = correctCharacters / 5;
  return Math.round(words / elapsedMinutes);
};

export const calculateAccuracy = (correctCharacters, totalCharacters) => {
  if (totalCharacters === 0) return 0;
  return Math.round((correctCharacters / totalCharacters) * 1000) / 10;
};

// Split a string into visible graphemes (handling emoji, ligatures, etc.)
export const splitGraphemes = (text) => {
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
    return Array.from(segmenter.segment(text)).map(s => s.segment);
  }
  // Fallback to Array.from which handles basic surrogate pairs but not all complex clusters
  return Array.from(text);
};

export const calculateCorrectCharacters = (userInput, passage) => {
  const userGraphemes = splitGraphemes(userInput);
  const passageGraphemes = splitGraphemes(passage);
  
  let correct = 0;
  for (let i = 0; i < userGraphemes.length; i++) {
    if (userGraphemes[i] === passageGraphemes[i]) {
      correct++;
    }
  }
  return correct;
};
