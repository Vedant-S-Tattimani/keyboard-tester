export const passages = [
  "Good software is not built by adding everything at once. It is built by solving the right problem clearly, then improving the details that matter. Simplicity is often the most difficult thing to achieve, but it is always worth the effort when you look at the final product.",
  "The rapid evolution of web technologies has transformed how we interact with information. We went from static pages to dynamic, responsive applications that run seamlessly across devices. This journey was powered by open standards and a community committed to sharing knowledge.",
  "Typing quickly is a useful skill, but typing accurately is even more important. It is much easier to increase your speed once you have mastered the placement of every key without looking down. Muscle memory takes time to develop, so practice consistently and stay patient.",
  "Every problem you encounter while coding is an opportunity to learn something new. The moments of deepest frustration are usually followed by moments of profound clarity. Embrace the challenge, break it down into smaller pieces, and tackle them one at a time until it works.",
  "Design is not just what it looks like and feels like. Design is how it works. A beautiful interface means nothing if the user cannot figure out how to accomplish their goal. Prioritize usability, clarity, and performance above purely aesthetic choices."
];

export const getRandomPassage = () => {
  return passages[Math.floor(Math.random() * passages.length)];
};
