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

export const calculateCorrectCharacters = (userInput, passage) => {
  let correct = 0;
  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] === passage[i]) {
      correct++;
    }
  }
  return correct;
};
