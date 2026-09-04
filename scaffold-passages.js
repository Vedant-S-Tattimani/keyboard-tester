const fs = require('fs');
const path = require('path');
const passagesDir = path.join('frontend', 'src', 'utils', 'typingPassages');
if (!fs.existsSync(passagesDir)) fs.mkdirSync(passagesDir, {recursive: true});

const langs = ['en', 'hi', 'es', 'fr', 'de', 'pt', 'it', 'ja', 'ko', 'zh', 'ar', 'he', 'ru', 'bn', 'ta', 'te'];
langs.forEach(lang => {
  const content = `export const ${lang}Passages = [
  "Test passage for ${lang} 1.",
  "Test passage for ${lang} 2."
];\n`;
  fs.writeFileSync(path.join(passagesDir, lang + '.js'), content);
});

// Create index.js in typingPassages
let indexContent = langs.map(l => `import { ${l}Passages } from './${l}';`).join('\n') + '\n\n';
indexContent += 'export const passages = {\n' + langs.map(l => `  ${l}: ${l}Passages`).join(',\n') + '\n};\n\n';
indexContent += `export const getRandomPassage = (lang = 'en') => {
  const p = passages[lang] || passages.en;
  return p[Math.floor(Math.random() * p.length)];
};\n`;
fs.writeFileSync(path.join(passagesDir, 'index.js'), indexContent);

// Copy en and hi real passages over
const enContent = `export const enPassages = [
  "Good software is not built by adding everything at once. It is built by solving the right problem clearly, then improving the details that matter. Simplicity is often the most difficult thing to achieve, but it is always worth the effort when you look at the final product.",
  "The rapid evolution of web technologies has transformed how we interact with information. We went from static pages to dynamic, responsive applications that run seamlessly across devices. This journey was powered by open standards and a community committed to sharing knowledge.",
  "Typing quickly is a useful skill, but typing accurately is even more important. It is much easier to increase your speed once you have mastered the placement of every key without looking down. Muscle memory takes time to develop, so practice consistently and stay patient.",
  "Every problem you encounter while coding is an opportunity to learn something new. The moments of deepest frustration are usually followed by moments of profound clarity. Embrace the challenge, break it down into smaller pieces, and tackle them one at a time until it works.",
  "Design is not just what it looks like and feels like. Design is how it works. A beautiful interface means nothing if the user cannot figure out how to accomplish their goal. Prioritize usability, clarity, and performance above purely aesthetic choices."
];`;
fs.writeFileSync(path.join(passagesDir, 'en.js'), enContent);

const hiContent = `export const hiPassages = [
  "अच्छा सॉफ्टवेयर एक साथ सब कुछ जोड़कर नहीं बनाया जाता है। यह सही समस्या को स्पष्ट रूप से हल करने और फिर महत्वपूर्ण विवरणों में सुधार करके बनाया जाता है। सादगी अक्सर हासिल करने के लिए सबसे कठिन चीज होती है, लेकिन अंतिम उत्पाद को देखते समय यह हमेशा प्रयास के लायक होती है।",
  "वेब प्रौद्योगिकियों के तेजी से विकास ने हमारे सूचना के साथ बातचीत करने के तरीके को बदल दिया है। हम स्थिर पृष्ठों से गतिशील, उत्तरदायी अनुप्रयोगों की ओर बढ़े जो सभी उपकरणों पर सुचारू रूप से चलते हैं। यह यात्रा खुले मानकों और ज्ञान साझा करने के लिए प्रतिबद्ध समुदाय द्वारा संचालित थी।",
  "तेजी से टाइप करना एक उपयोगी कौशल है, लेकिन सटीक टाइपिंग और भी महत्वपूर्ण है। एक बार जब आप नीचे देखे बिना हर कुंजी के स्थान पर महारत हासिल कर लेते हैं, तो अपनी गति बढ़ाना बहुत आसान हो जाता है। मांसपेशियों की स्मृति विकसित होने में समय लगता है, इसलिए लगातार अभ्यास करें और धैर्य रखें।",
  "कोडिंग करते समय आपके सामने आने वाली हर समस्या कुछ नया सीखने का अवसर है। सबसे गहरी निराशा के क्षण आमतौर पर गहन स्पष्टता के क्षणों के बाद आते हैं। चुनौती को स्वीकार करें, इसे छोटे टुकड़ों में तोड़ें, और जब तक यह काम न करे तब तक एक-एक करके उनसे निपटें।"
];`;
fs.writeFileSync(path.join(passagesDir, 'hi.js'), hiContent);
