export const keyboardLimitationsContent = {
  en: {
    subtitle: "What browser-based keyboard tests can and cannot detect.",
    howItWorksTitle: "How Browser Testing Works",
    howItWorksP1: "Web-based keyboard testers like KeyCheck operate by listening to DOM events (keydown and keyup) dispatched by your web browser. When you press a key, the hardware sends a signal to your OS, the OS translates it, and the browser exposes it to the website.",
    howItWorksP2: "Because we sit at the very end of this chain, we can only report what the browser allows us to see.",
    canDetectTitle: "What We CAN Detect",
    canDetectItems: [
      { label: "Key presses:", text: "Whether a key successfully registers an input to the computer." },
      { label: "Physical Location:", text: "Using KeyboardEvent.code, we can often determine the physical position of the key pressed (e.g., Left Shift vs Right Shift), regardless of your layout." },
      { label: "Interpreted Values:", text: "Using KeyboardEvent.key, we can see what character your OS intended to type." },
      { label: "Browser-Level Ghosting:", text: "We can detect if multiple keys are simultaneously registered by the browser using our", linkText: "Ghosting Test", linkUrl: "/ghosting-test" },
      { label: "Modifier States:", text: "Whether Shift, Ctrl, Alt, or Meta are held down." }
    ],
    cannotDetectTitle: "What We CANNOT Detect (Hardware Limitations)",
    cannotDetectIntro: "Browsers do not have direct access to your keyboard's hardware or USB connection. Therefore, we cannot detect:",
    cannotDetectItems: [
      {
        label: "True Hardware Anti-Ghosting / N-Key Rollover (NKRO):",
        text: "If your keyboard hardware fails to send a keycode because of a matrix limitation (hardware ghosting), the browser simply receives nothing. We can show you how many keys registered, but we cannot diagnose why a key failed to register at the hardware level."
      },
      {
        label: "Switch Health & Electrical Faults:",
        text: "We cannot tell if a mechanical switch is failing, corroded, or double-clicking (chattering) at the hardware level unless it results in multiple distinct browser events."
      },
      {
        label: "USB Polling Rate & Firmware Latency:",
        text: "Browsers process events through the main thread. Measuring exact millisecond latency or 1000Hz polling rates is impossible via standard web APIs due to OS and browser overhead."
      },
      {
        label: "Hardware Debounce:",
        text: "How the keyboard firmware handles switch bounce is entirely hidden from the PC."
      }
    ],
    interceptionTitle: "OS and Browser Interception",
    interceptionIntro: "Some keys are intercepted by your Operating System or Browser before the website ever sees them. For example:",
    interceptionItems: [
      {
        badge: "Fn",
        label: "Fn (Function) Keys:",
        text: "The Fn key is purely hardware-level on most laptops and keyboards. It never sends a scan code to the PC."
      },
      {
        badge: "Ctrl+Alt+Del, Win+L",
        label: "System Shortcuts:",
        text: "Ctrl+Alt+Del, Win+L (Windows lock), and macOS power buttons are handled by the OS and cannot be observed."
      },
      {
        badge: "F5, Ctrl+T, Ctrl+W",
        label: "Browser Shortcuts:",
        text: "F5 (Refresh), Ctrl+T (New Tab), and Ctrl+W (Close Tab) are often intercepted by the browser, though we attempt to prevent default behavior where permitted."
      }
    ],
    goToTestButton: "Go to Keyboard Test"
  },
  hi: {
    subtitle: "ब्राउज़र-आधारित कीबोर्ड परीक्षण क्या पहचान सकते हैं और क्या नहीं।",
    howItWorksTitle: "ब्राउज़र परीक्षण कैसे काम करता है",
    howItWorksP1: "KeyCheck जैसे वेब-आधारित कीबोर्ड टेस्टर आपके वेब ब्राउज़र द्वारा प्रेषित DOM इवेंट्स (keydown और keyup) को सुनकर कार्य करते हैं। जब आप कोई कुंजी दबाते हैं, तो हार्डवेयर आपके OS को सिग्नल भेजता है, OS इसे अनुवादित करता है, और ब्राउज़र इसे वेबसाइट को प्रस्तुत करता है।",
    howItWorksP2: "क्योंकि हम इस श्रृंखला के अंत में स्थित हैं, हम केवल वही रिपोर्ट कर सकते हैं जो ब्राउज़र हमें देखने की अनुमति देता है।",
    canDetectTitle: "हम क्या पहचान सकते हैं",
    canDetectItems: [
      { label: "की प्रेस:", text: "क्या कुंजी सफलतापूर्वक कंप्यूटर में इनपुट दर्ज कर रही है।" },
      { label: "भौतिक स्थान:", text: "KeyboardEvent.code का उपयोग करके, हम अक्सर दबाई गई कुंजी की भौतिक स्थिति (उदा. बायाँ Shift बनाम दायाँ Shift) निर्धारित कर सकते हैं, चाहे आपका लेआउट कुछ भी हो।" },
      { label: "व्याख्यायित मान:", text: "KeyboardEvent.key का उपयोग करके, हम देख सकते हैं कि आपका OS किस वर्ण को टाइप करना चाहता था।" },
      { label: "ब्राउज़र-स्तरीय घोस्टिंग:", text: "हम पता लगा सकते हैं कि क्या एक साथ कई कुंजियाँ ब्राउज़र द्वारा पंजीकृत हैं, हमारे", linkText: "घोस्टिंग टेस्ट", linkUrl: "/ghosting-test" },
      { label: "संशोधक स्थितियाँ:", text: "क्या Shift, Ctrl, Alt, या Meta दबाकर रखे गए हैं।" }
    ],
    cannotDetectTitle: "हम क्या नहीं पहचान सकते (हार्डवेयर सीमाएँ)",
    cannotDetectIntro: "ब्राउज़रों के पास आपके कीबोर्ड के हार्डवेयर या USB कनेक्शन तक सीधी पहुँच नहीं होती। इसलिए, हम निम्नलिखित का पता नहीं लगा सकते:",
    cannotDetectItems: [
      {
        label: "वास्तविक हार्डवेयर एंटी-घोस्टिंग / एन-की रोलओवर (NKRO):",
        text: "यदि आपका कीबोर्ड हार्डवेयर मैट्रिक्स सीमा (हार्डवेयर घोस्टिंग) के कारण कीकोड भेजने में विफल रहता है, तो ब्राउज़र को कुछ भी प्राप्त नहीं होता। हम दिखा सकते हैं कि कितनी कुंजियाँ पंजीकृत हुईं, लेकिन यह निदान नहीं कर सकते कि कोई कुंजी हार्डवेयर स्तर पर क्यों विफल रही।"
      },
      {
        label: "स्विच स्थिति और विद्युत दोष:",
        text: "हम यह नहीं बता सकते कि कोई मैकेनिकल स्विच हार्डवेयर स्तर पर विफल हो रहा है, संक्षारित है, या डबल-क्लिक (चैटरिंग) कर रहा है, जब तक कि यह एकाधिक विशिष्ट ब्राउज़र घटनाओं का कारण न बने।"
      },
      {
        label: "USB पोलिंग दर और फर्मवेयर विलंबता:",
        text: "ब्राउज़र मुख्य थ्रेड के माध्यम से घटनाओं को संसाधित करते हैं। OS और ब्राउज़र ओवरहेड के कारण मानक वेब API के माध्यम से सटीक मिलीसेकंड विलंबता या 1000Hz पोलिंग दर मापना असंभव है।"
      },
      {
        label: "हार्डवेयर डिबाउंस:",
        text: "कीबोर्ड फर्मवेयर स्विच बाउंस को कैसे संभालता है यह पूरी तरह से पीसी से छिपा होता है।"
      }
    ],
    interceptionTitle: "OS और ब्राउज़र अवरोधन",
    interceptionIntro: "कुछ कुंजियों को वेबसाइट देखने से पहले ही आपके ऑपरेटिंग सिस्टम या ब्राउज़र द्वारा रोक लिया जाता है। उदाहरण के लिए:",
    interceptionItems: [
      {
        badge: "Fn",
        label: "Fn (फ़ंक्शन) कुंजियाँ:",
        text: "Fn कुंजी अधिकांश लैपटॉप और कीबोर्ड पर विशुद्ध रूप से हार्डवेयर स्तर पर होती है। यह कभी भी पीसी को स्कैन कोड नहीं भेजती है।"
      },
      {
        badge: "Ctrl+Alt+Del, Win+L",
        label: "सिस्टम शॉर्टकट:",
        text: "Ctrl+Alt+Del, Win+L (Windows लॉक), और macOS पावर बटन OS द्वारा संभाले जाते हैं और उनका अवलोकन नहीं किया जा सकता है।"
      },
      {
        badge: "F5, Ctrl+T, Ctrl+W",
        label: "ब्राउज़र शॉर्टकट:",
        text: "F5 (रिफ्रेश), Ctrl+T (नया टैब), और Ctrl+W (टैब बंद करें) अक्सर ब्राउज़र द्वारा रोक लिए जाते हैं, हालाँकि हम अनुमति मिलने पर डिफ़ॉल्ट व्यवहार को रोकने का प्रयास करते हैं।"
      }
    ],
    goToTestButton: "कीबोर्ड टेस्ट पर जाएं"
  },
  fil: {
    subtitle: "Kung ano ang kayang at hindi kayang matukoy ng browser-based na keyboard test.",
    howItWorksTitle: "Paano Gumagana ang Browser Testing",
    howItWorksP1: "Ang mga web-based na keyboard tester tulad ng KeyCheck ay gumagana sa pamamagitan ng pakikinig sa mga DOM event (keydown at keyup) na ipinapadala ng iyong web browser. Kapag pinindot mo ang isang key, nagpapadala ang hardware ng signal sa iyong OS, isinasalin ito ng OS, at inilalantad ito ng browser sa website.",
    howItWorksP2: "Dahil nasa dulo kami ng kadenang ito, maaari lamang naming iulat kung ano ang pinapahintulutan ng browser na makita namin.",
    canDetectTitle: "Ano ang MAAARI Naming Matukoy",
    canDetectItems: [
      { label: "Mga pagpindot ng key:", text: "Kung matagumpay na nagrerehistro ang isang key ng input sa computer." },
      { label: "Pisikal na Lokasyon:", text: "Gamit ang KeyboardEvent.code, madalas naming matukoy ang pisikal na posisyon ng pinindot na key (hal., Kaliwang Shift vs Kanang Shift), anuman ang iyong layout." },
      { label: "Na-interpret na Halaga:", text: "Gamit ang KeyboardEvent.key, makikita namin kung anong karakter ang nilayon ng iyong OS na i-type." },
      { label: "Browser-Level Ghosting:", text: "Maaari naming matukoy kung maraming key ang sabay-sabay na naitala ng browser gamit ang aming", linkText: "Ghosting Test", linkUrl: "/ghosting-test" },
      { label: "Mga Modifier State:", text: "Kung ang Shift, Ctrl, Alt, o Meta ay pinipigilang nakapindot." }
    ],
    cannotDetectTitle: "Ano ang HINDI Namin Matukoy (Mga Limitasyon sa Hardware)",
    cannotDetectIntro: "Walang direktang access ang mga browser sa hardware o koneksyon sa USB ng iyong keyboard. Samakatuwid, hindi namin matutukoy ang:",
    cannotDetectItems: [
      {
        label: "Tunay na Hardware Anti-Ghosting / N-Key Rollover (NKRO):",
        text: "Kung nabigo ang hardware ng iyong keyboard na magpadala ng keycode dahil sa limitasyon sa matrix (hardware ghosting), walang natatanggap ang browser. Maipapakita namin kung gaano karaming key ang naitala, ngunit hindi namin masuri kung bakit nabigo ang isang key sa antas ng hardware."
      },
      {
        label: "Kalusugan ng Switch at Mga Depektong Elektrikal:",
        text: "Hindi namin masasabi kung ang isang mechanical switch ay nasisira, kinakalawang, o nagdo-double click (chattering) sa antas ng hardware maliban kung nagreresulta ito sa maraming magkakahiwalay na browser event."
      },
      {
        label: "USB Polling Rate at Firmware Latency:",
        text: "Pinoproseso ng mga browser ang mga event sa pamamagitan ng main thread. Ang pagsukat ng eksaktong millisecond latency o 1000Hz polling rate ay imposible sa pamamagitan ng karaniwang web API dahil sa overhead ng OS at browser."
      },
      {
        label: "Hardware Debounce:",
        text: "Kung paano pinangangasiwaan ng firmware ng keyboard ang switch bounce ay ganap na nakatago mula sa PC."
      }
    ],
    interceptionTitle: "Pagharang ng OS at Browser",
    interceptionIntro: "Ang ilang mga key ay hinaharang ng iyong Operating System o Browser bago pa man ito makita ng website. Halimbawa:",
    interceptionItems: [
      {
        badge: "Fn",
        label: "Fn (Function) Keys:",
        text: "Ang Fn key ay purely hardware-level sa karamihan ng mga laptop at keyboard. Hindi ito nagpapadala ng scan code sa PC kailanman."
      },
      {
        badge: "Ctrl+Alt+Del, Win+L",
        label: "Mga Shortcut ng Sistema:",
        text: "Ang Ctrl+Alt+Del, Win+L (Windows lock), at power buttons ng macOS ay pinangangasiwaan ng OS at hindi maaaring maobserbahan."
      },
      {
        badge: "F5, Ctrl+T, Ctrl+W",
        label: "Mga Shortcut ng Browser:",
        text: "Ang F5 (Refresh), Ctrl+T (Bagong Tab), at Ctrl+W (Isara ang Tab) ay kadalasang hinaharang ng browser, bagama't sinusubukan naming pigilan ang default na gawi kung pinahihintulutan."
      }
    ],
    goToTestButton: "Pumunta sa Keyboard Test"
  },
  pt: {
    subtitle: "O que os testes de teclado baseados em navegador podem e não podem detectar.",
    howItWorksTitle: "Como Funciona o Teste no Navegador",
    howItWorksP1: "Testadores de teclado baseados na web, como o KeyCheck, operam ouvindo eventos DOM (keydown e keyup) disparados pelo seu navegador. Quando você pressiona uma tecla, o hardware envia um sinal ao seu sistema operacional, o SO o traduz e o navegador o expõe ao site.",
    howItWorksP2: "Como estamos no final dessa cadeia, só podemos relatar o que o navegador nos permite ver.",
    canDetectTitle: "O Que PODEMOS Detectar",
    canDetectItems: [
      { label: "Pressionamento de teclas:", text: "Se uma tecla registra com sucesso uma entrada no computador." },
      { label: "Localização Física:", text: "Usando KeyboardEvent.code, frequentemente podemos determinar a posição física da tecla pressionada (ex.: Shift Esquerdo vs Shift Direito), independentemente do seu layout." },
      { label: "Valores Interpretados:", text: "Usando KeyboardEvent.key, podemos ver qual caractere seu sistema operacional pretendia digitar." },
      { label: "Ghosting no Nível do Navegador:", text: "Podemos detectar se várias teclas são registradas simultaneamente pelo navegador usando nosso", linkText: "Teste de Ghosting", linkUrl: "/ghosting-test" },
      { label: "Estados de Modificadores:", text: "Se Shift, Ctrl, Alt ou Meta estão pressionados." }
    ],
    cannotDetectTitle: "O Que NÃO PODEMOS Detectar (Limitações de Hardware)",
    cannotDetectIntro: "Os navegadores não têm acesso direto ao hardware ou à conexão USB do seu teclado. Portanto, não podemos detectar:",
    cannotDetectItems: [
      {
        label: "Verdadeiro Anti-Ghosting de Hardware / N-Key Rollover (NKRO):",
        text: "Se o hardware do seu teclado não enviar um código de tecla devido a uma limitação de matriz (ghosting de hardware), o navegador simplesmente não recebe nada. Podemos mostrar quantas teclas foram registradas, mas não podemos diagnosticar por que uma tecla falhou no nível de hardware."
      },
      {
        label: "Saúde do Switch e Falhas Elétricas:",
        text: "Não podemos dizer se um switch mecânico está falhando, oxidado ou dando duplo clique (chattering) no nível de hardware, a menos que isso resulte em múltiplos eventos distintos no navegador."
      },
      {
        label: "Taxa de Polling USB e Latência do Firmware:",
        text: "Os navegadores processam eventos através da thread principal. Medir a latência exata em milissegundos ou taxas de polling de 1000Hz é impossível via APIs web padrão devido ao overhead do SO e do navegador."
      },
      {
        label: "Debounce de Hardware:",
        text: "A forma como o firmware do teclado lida com o bounce do switch é totalmente oculta do PC."
      }
    ],
    interceptionTitle: "Interceptação pelo SO e pelo Navegador",
    interceptionIntro: "Algumas teclas são interceptadas pelo seu Sistema Operacional ou Navegador antes mesmo que o site as veja. Por exemplo:",
    interceptionItems: [
      {
        badge: "Fn",
        label: "Teclas Fn (Função):",
        text: "A tecla Fn opera exclusivamente no nível de hardware na maioria dos notebooks e teclados. Ela nunca envia um código de varredura para o PC."
      },
      {
        badge: "Ctrl+Alt+Del, Win+L",
        label: "Atalhos do Sistema:",
        text: "Ctrl+Alt+Del, Win+L (bloqueio do Windows) e botões de energia do macOS são tratados pelo SO e não podem ser observados."
      },
      {
        badge: "F5, Ctrl+T, Ctrl+W",
        label: "Atalhos do Navegador:",
        text: "F5 (Atualizar), Ctrl+T (Nova Aba) e Ctrl+W (Fechar Aba) são frequentemente interceptados pelo navegador, embora tentemos evitar o comportamento padrão quando permitido."
      }
    ],
    goToTestButton: "Ir para o Teste de Teclado"
  },
  id: {
    subtitle: "Apa yang dapat dan tidak dapat dideteksi oleh tes keyboard berbasis browser.",
    howItWorksTitle: "Cara Kerja Pengujian di Browser",
    howItWorksP1: "Penguji keyboard berbasis web seperti KeyCheck beroperasi dengan mendengarkan event DOM (keydown dan keyup) yang dikirimkan oleh browser web Anda. Saat Anda menekan tombol, perangkat keras mengirimkan sinyal ke OS Anda, OS menerjemahkannya, dan browser mengeksposnya ke situs web.",
    howItWorksP2: "Karena kami berada di ujung paling akhir dari rantai ini, kami hanya dapat melaporkan apa yang diizinkan oleh browser untuk kami lihat.",
    canDetectTitle: "Apa yang BISA Kami Deteksi",
    canDetectItems: [
      { label: "Penekanan tombol:", text: "Apakah suatu tombol berhasil mendaftarkan input ke komputer." },
      { label: "Lokasi Fisik:", text: "Menggunakan KeyboardEvent.code, kami sering kali dapat menentukan posisi fisik tombol yang ditekan (misalnya, Shift Kiri vs Shift Kanan), terlepas dari tata letak Anda." },
      { label: "Nilai yang Diinterpretasikan:", text: "Menggunakan KeyboardEvent.key, kami dapat melihat karakter apa yang ingin diketik oleh OS Anda." },
      { label: "Ghosting Tingkat Browser:", text: "Kami dapat mendeteksi jika beberapa tombol terdaftar secara bersamaan oleh browser menggunakan", linkText: "Tes Ghosting", linkUrl: "/ghosting-test" },
      { label: "Status Tombol Pengubah:", text: "Apakah Shift, Ctrl, Alt, atau Meta sedang ditekan." }
    ],
    cannotDetectTitle: "Apa yang TIDAK BISA Kami Deteksi (Keterbatasan Perangkat Keras)",
    cannotDetectIntro: "Browser tidak memiliki akses langsung ke perangkat keras keyboard atau koneksi USB Anda. Oleh karena itu, kami tidak dapat mendeteksi:",
    cannotDetectItems: [
      {
        label: "Anti-Ghosting Perangkat Keras Sejati / N-Key Rollover (NKRO):",
        text: "Jika perangkat keras keyboard Anda gagal mengirim kode tombol karena batasan matriks (ghosting perangkat keras), browser tidak menerima apa pun. Kami dapat menunjukkan berapa banyak tombol yang terdaftar, tetapi kami tidak dapat mendiagnosis mengapa suatu tombol gagal terdaftar di tingkat perangkat keras."
      },
      {
        label: "Kesehatan Switch & Kerusakan Listrik:",
        text: "Kami tidak dapat mengetahui apakah sakelar mekanis mengalami kegagalan, berkarat, atau melakukan klik ganda (chattering) di tingkat perangkat keras kecuali jika menghasilkan beberapa event browser yang berbeda."
      },
      {
        label: "Polling Rate USB & Latensi Firmware:",
        text: "Browser memproses event melalui thread utama. Mengukur latensi milidetik yang tepat atau polling rate 1000Hz tidak mungkin dilakukan melalui API web standar karena overhead OS dan browser."
      },
      {
        label: "Debounce Perangkat Keras:",
        text: "Cara firmware keyboard menangani pantulan sakelar sepenuhnya tersembunyi dari PC."
      }
    ],
    interceptionTitle: "Intersepsi OS dan Browser",
    interceptionIntro: "Beberapa tombol dicegat oleh Sistem Operasi atau Browser Anda sebelum situs web dapat melihatnya. Misalnya:",
    interceptionItems: [
      {
        badge: "Fn",
        label: "Tombol Fn (Fungsi):",
        text: "Tombol Fn sepenuhnya berada di tingkat perangkat keras pada sebagian besar laptop dan keyboard. Tombol ini tidak pernah mengirimkan scan code ke PC."
      },
      {
        badge: "Ctrl+Alt+Del, Win+L",
        label: "Pintasan Sistem:",
        text: "Ctrl+Alt+Del, Win+L (kunci Windows), dan tombol daya macOS ditangani oleh OS dan tidak dapat diamati."
      },
      {
        badge: "F5, Ctrl+T, Ctrl+W",
        label: "Pintasan Browser:",
        text: "F5 (Muat Ulang), Ctrl+T (Tab Baru), dan Ctrl+W (Tutup Tab) sering kali dicegat oleh browser, meskipun kami mencoba mencegah perilaku default jika diizinkan."
      }
    ],
    goToTestButton: "Buka Tes Keyboard"
  },
  uk: {
    subtitle: "Що браузерні тести клавіатури можуть і чого не можуть виявити.",
    howItWorksTitle: "Як працює тестування в браузері",
    howItWorksP1: "Веб-тестери клавіатури, такі як KeyCheck, працюють шляхом прослуховування подій DOM (keydown та keyup), що надсилаються вашим веб-браузером. Коли ви натискаєте клавішу, обладнання надсилає сигнал вашій ОС, ОС перекладає його, а браузер передає його веб-сайту.",
    howItWorksP2: "Оскільки ми знаходимося в самому кінці цього ланцюжка, ми можемо повідомити лише те, що дозволяє нам бачити браузер.",
    canDetectTitle: "Що ми МОЖЕМО виявити",
    canDetectItems: [
      { label: "Натискання клавіш:", text: "Чи успішно клавіша реєструє введення в комп'ютер." },
      { label: "Фізичне розташування:", text: "Використовуючи KeyboardEvent.code, ми часто можемо визначити фізичне положення натиснутої клавіші (наприклад, лівий Shift проти правого Shift), незалежно від вашої розкладки." },
      { label: "Інтерпретовані значення:", text: "Використовуючи KeyboardEvent.key, ми бачимо, який саме символ ваша ОС мала намір надрукувати." },
      { label: "Гостинг на рівні браузера:", text: "Ми можемо виявити, чи реєструються одночасно кілька клавіш браузером за допомогою нашого", linkText: "Тесту на гостинг", linkUrl: "/ghosting-test" },
      { label: "Стани модифікаторів:", text: "Чи утримуються клавіші Shift, Ctrl, Alt або Meta." }
    ],
    cannotDetectTitle: "Що ми НЕ МОЖЕМО виявити (Обмеження апаратного забезпечення)",
    cannotDetectIntro: "Браузери не мають прямого доступу до апаратного забезпечення або USB-з'єднання вашої клавіатури. Тому ми не можемо виявити:",
    cannotDetectItems: [
      {
        label: "Справжній апаратний Anti-Ghosting / N-Key Rollover (NKRO):",
        text: "Якщо обладнання вашої клавіатури не надсилає код клавіші через матричне обмеження (апаратний гостинг), браузер просто нічого не отримує. Ми можемо показати, скільки клавіш зареєстровано, але не можемо діагностувати, чому клавіша не спрацювала на апаратному рівні."
      },
      {
        label: "Справність перемикачів та електричні несправності:",
        text: "Ми не можемо визначити, чи виходить з ладу механічний перемикач, чи він окислився, або чи є подвійне клацання (брязкіт контактів) на апаратному рівні, якщо це не призводить до кількох окремих подій браузера."
      },
      {
        label: "Частота опитування USB та затримка прошивки:",
        text: "Браузери обробляють події через головний потік. Вимірювання точної мілісекундної затримки або частоти опитування 1000 Гц неможливе за допомогою стандартних веб-API через накладні витрати ОС та браузера."
      },
      {
        label: "Апаратний дебаунс:",
        text: "Те, як прошивка клавіатури обробляє брязкіт контактів перемикача, повністю приховано від комп'ютера."
      }
    ],
    interceptionTitle: "Перехоплення ОС та браузером",
    interceptionIntro: "Деякі клавіші перехоплюються вашою операційною системою або браузером ще до того, як веб-сайт їх побачить. Наприклад:",
    interceptionItems: [
      {
        badge: "Fn",
        label: "Клавіші Fn (функціональні):",
        text: "Клавіша Fn на більшості ноутбуків і клавіатур працює виключно на апаратному рівні. Вона ніколи не надсилає скан-код на ПК."
      },
      {
        badge: "Ctrl+Alt+Del, Win+L",
        label: "Системні комбінації:",
        text: "Ctrl+Alt+Del, Win+L (блокування Windows) і кнопки живлення macOS обробляються ОС і не можуть бути зафіксовані."
      },
      {
        badge: "F5, Ctrl+T, Ctrl+W",
        label: "Комбінації клавіш браузера:",
        text: "F5 (Оновити), Ctrl+T (Нова вкладка) та Ctrl+W (Закрити вкладку) часто перехоплюються браузером, хоча ми намагаємося запобігти стандартній поведінці, де це дозволено."
      }
    ],
    goToTestButton: "Перейти до тесту клавіатури"
  },
  th: {
    subtitle: "สิ่งที่การทดสอบคีย์บอร์ดผ่านเบราว์เซอร์สามารถและไม่สามารถตรวจจับได้",
    howItWorksTitle: "การทดสอบผ่านเบราว์เซอร์ทำงานอย่างไร",
    howItWorksP1: "เครื่องมือทดสอบคีย์บอร์ดบนเว็บอย่าง KeyCheck ทำงานโดยการดักฟังเหตุการณ์ DOM (keydown และ keyup) ที่ส่งมาจากเว็บเบราว์เซอร์ของคุณ เมื่อคุณกดปุ่ม ฮาร์ดแวร์จะส่งสัญญาณไปยังระบบปฏิบัติการ ระบบปฏิบัติการจะแปลงสัญญาณ และเบราว์เซอร์จะส่งต่อไปยังเว็บไซต์",
    howItWorksP2: "เนื่องจากเราอยู่ที่ปลายสุดของกระบวนการนี้ เราจึงสามารถรายงานได้เฉพาะสิ่งที่เบราว์เซอร์อนุญาตให้เราเห็นเท่านั้น",
    canDetectTitle: "สิ่งที่เราสามารถตรวจจับได้",
    canDetectItems: [
      { label: "การกดปุ่ม:", text: "ปุ่มนั้นลงทะเบียนการป้อนข้อมูลไปยังคอมพิวเตอร์สำเร็จหรือไม่" },
      { label: "ตำแหน่งทางกายภาพ:", text: "การใช้ KeyboardEvent.code ทำให้เราสามารถระบุตำแหน่งทางกายภาพของปุ่มที่กดได้บ่อยครั้ง (เช่น Shift ซ้าย กับ Shift ขวา) ไม่ว่าเลย์เอาต์ของคุณจะเป็นแบบใด" },
      { label: "ค่าที่แปลผลแล้ว:", text: "การใช้ KeyboardEvent.key ทำให้เราเห็นว่าระบบปฏิบัติการของคุณต้องการพิมพ์ตัวอักษรใด" },
      { label: "Ghosting ระดับเบราว์เซอร์:", text: "เราสามารถตรวจจับได้ว่ามีการลงทะเบียนหลายปุ่มพร้อมกันโดยเบราว์เซอร์หรือไม่ โดยใช้", linkText: "การทดสอบ Ghosting", linkUrl: "/ghosting-test" },
      { label: "สถานะปุ่มปรับเปลี่ยน (Modifier):", text: "ปุ่ม Shift, Ctrl, Alt หรือ Meta กำลังถูกกดค้างไว้หรือไม่" }
    ],
    cannotDetectTitle: "สิ่งที่เราไม่สามารถตรวจจับได้ (ข้อจำกัดด้านฮาร์ดแวร์)",
    cannotDetectIntro: "เบราว์เซอร์ไม่สามารถเข้าถึงฮาร์ดแวร์คีย์บอร์ดหรือการเชื่อมต่อ USB ได้โดยตรง ดังนั้นเราจึงไม่สามารถตรวจจับสิ่งต่อไปนี้ได้:",
    cannotDetectItems: [
      {
        label: "Anti-Ghosting ฮาร์ดแวร์ที่แท้จริง / N-Key Rollover (NKRO):",
        text: "หากฮาร์ดแวร์คีย์บอร์ดของคุณไม่สามารถส่งคีย์โค้ดเนื่องจากข้อจำกัดของเมทริกซ์ (ฮาร์ดแวร์ ghosting) เบราว์เซอร์จะไม่ได้รับข้อมูลใดๆ เราสามารถแสดงให้คุณเห็นว่ามีปุ่มลงทะเบียนกี่ปุ่ม แต่เราไม่สามารถวินิจฉัยได้ว่าทำไมปุ่มถึงล้มเหลวในระดับฮาร์ดแวร์"
      },
      {
        label: "สภาพสวิตช์และข้อผิดพลาดทางไฟฟ้า:",
        text: "เราไม่สามารถบอกได้ว่าสวิตช์เชิงกลกำลังจะเสีย เป็นสนิม หรือเกิดอาการเบิ้ล (chattering) ในระดับฮาร์ดแวร์ เว้นแต่จะทำให้เกิดเหตุการณ์ในเบราว์เซอร์หลายครั้งติดต่อกัน"
      },
      {
        label: "อัตรา Polling Rate ของ USB และความหน่วงของเฟิร์มแวร์:",
        text: "เบราว์เซอร์ประมวลผลเหตุการณ์ผ่านเธรดหลัก การวัดความหน่วงระดับมิลลิวินาทีที่แน่นอนหรืออัตราการสำรวจ 1000Hz นั้นเป็นไปไม่ได้ผ่าน Web API มาตรฐาน เนื่องจากมีค่าโอเวอร์เฮดของระบบปฏิบัติการและเบราว์เซอร์"
      },
      {
        label: "Hardware Debounce:",
        text: "วิธีที่เฟิร์มแวร์ของคีย์บอร์ดจัดการกับการเด้งกลับของสวิตช์นั้นถูกซ่อนจากพีซีอย่างสมบูรณ์"
      }
    ],
    interceptionTitle: "การดักจับโดยระบบปฏิบัติการและเบราว์เซอร์",
    interceptionIntro: "บางปุ่มจะถูกดักจับโดยระบบปฏิบัติการหรือเบราว์เซอร์ของคุณก่อนที่เว็บไซต์จะได้รับข้อมูล เช่น:",
    interceptionItems: [
      {
        badge: "Fn",
        label: "ปุ่ม Fn (ฟังก์ชัน):",
        text: "ปุ่ม Fn ทำงานในระดับฮาร์ดแวร์อย่างแท้จริงบนแล็ปท็อปและคีย์บอร์ดส่วนใหญ่ โดยจะไม่ส่ง scan code ไปยังพีซีเลย"
      },
      {
        badge: "Ctrl+Alt+Del, Win+L",
        label: "คีย์ลัดของระบบ:",
        text: "Ctrl+Alt+Del, Win+L (ล็อกหน้าจอ Windows) และปุ่มเปิด/ปิดของ macOS ได้รับการจัดการโดยระบบปฏิบัติการและไม่สามารถตรวจสอบได้"
      },
      {
        badge: "F5, Ctrl+T, Ctrl+W",
        label: "คีย์ลัดของเบราว์เซอร์:",
        text: "F5 (รีเฟรช), Ctrl+T (แท็บใหม่) และ Ctrl+W (ปิดแท็บ) มักจะถูกดักจับโดยเบราว์เซอร์ แม้ว่าเราจะพยายามป้องกันการทำงานเริ่มต้นในกรณีที่ได้รับอนุญาตก็ตาม"
      }
    ],
    goToTestButton: "ไปที่การทดสอบคีย์บอร์ด"
  },
  es: {
    subtitle: "Lo que las pruebas de teclado basadas en navegador pueden y no pueden detectar.",
    howItWorksTitle: "Cómo funcionan las pruebas en el navegador",
    howItWorksP1: "Los comprobadores de teclado basados en la web como KeyCheck funcionan escuchando los eventos del DOM (keydown y keyup) emitidos por su navegador web. Cuando presiona una tecla, el hardware envía una señal a su sistema operativo, el SO la traduce y el navegador la expone al sitio web.",
    howItWorksP2: "Debido a que nos encontramos al final de esta cadena, solo podemos informar lo que el navegador nos permite ver.",
    canDetectTitle: "Lo que SÍ podemos detectar",
    canDetectItems: [
      { label: "Pulsaciones de teclas:", text: "Si una tecla registra con éxito una entrada en el ordenador." },
      { label: "Ubicación física:", text: "Mediante KeyboardEvent.code, a menudo podemos determinar la posición física de la tecla presionada (p. ej., Shift izquierdo vs Shift derecho), independientemente de su distribución." },
      { label: "Valores interpretados:", text: "Mediante KeyboardEvent.key, podemos ver qué carácter pretendía escribir su sistema operativo." },
      { label: "Ghosting a nivel de navegador:", text: "Podemos detectar si el navegador registra varias teclas simultáneamente mediante nuestra", linkText: "Prueba de Ghosting", linkUrl: "/ghosting-test" },
      { label: "Estados de modificadores:", text: "Si Shift, Ctrl, Alt o Meta se mantienen presionados." }
    ],
    cannotDetectTitle: "Lo que NO podemos detectar (Limitaciones de hardware)",
    cannotDetectIntro: "Los navegadores no tienen acceso directo al hardware ni a la conexión USB de su teclado. Por lo tanto, no podemos detectar:",
    cannotDetectItems: [
      {
        label: "Verdadero Anti-Ghosting de hardware / N-Key Rollover (NKRO):",
        text: "Si el hardware de su teclado no envía un código de tecla debido a una limitación de la matriz (ghosting de hardware), el navegador simplemente no recibe nada. Podemos mostrarle cuántas teclas se registraron, pero no podemos diagnosticar por qué una tecla falló a nivel de hardware."
      },
      {
        label: "Estado de los interruptores y fallos eléctricos:",
        text: "No podemos saber si un interruptor mecánico está fallando, sulfatado o haciendo doble clic (chattering) a nivel de hardware a menos que genere múltiples eventos distintos en el navegador."
      },
      {
        label: "Tasa de sondeo USB y latencia del firmware:",
        text: "Los navegadores procesan eventos a través del hilo principal. Medir la latencia exacta en milisegundos o frecuencias de muestreo de 1000 Hz es imposible mediante las API web estándar debido a la sobrecarga del SO y del navegador."
      },
      {
        label: "Rebote de hardware (Debounce):",
        text: "La forma en que el firmware del teclado gestiona el rebote del interruptor está completamente oculta para el ordenador."
      }
    ],
    interceptionTitle: "Intercepción del sistema operativo y del navegador",
    interceptionIntro: "Algunas teclas son interceptadas por su sistema operativo o navegador antes de que el sitio web pueda verlas. Por ejemplo:",
    interceptionItems: [
      {
        badge: "Fn",
        label: "Teclas Fn (Función):",
        text: "La tecla Fn opera puramente a nivel de hardware en la mayoría de los portátiles y teclados. Nunca envía un código de escaneo al ordenador."
      },
      {
        badge: "Ctrl+Alt+Del, Win+L",
        label: "Atajos del sistema:",
        text: "Ctrl+Alt+Supr, Win+L (bloqueo de Windows) y los botones de encendido de macOS son gestionados por el SO y no se pueden observar."
      },
      {
        badge: "F5, Ctrl+T, Ctrl+W",
        label: "Atajos del navegador:",
        text: "F5 (Actualizar), Ctrl+T (Nueva pestaña) y Ctrl+W (Cerrar pestaña) a menudo son interceptados por el navegador, aunque intentamos evitar el comportamiento predeterminado cuando está permitido."
      }
    ],
    goToTestButton: "Ir a la prueba de teclado"
  },
  fr: {
    subtitle: "Ce que les tests de clavier sur navigateur peuvent et ne peuvent pas détecter.",
    howItWorksTitle: "Fonctionnement des tests sur navigateur",
    howItWorksP1: "Les testeurs de clavier en ligne comme KeyCheck fonctionnent en écoutant les événements DOM (keydown et keyup) émis par votre navigateur web. Lorsque vous appuyez sur une touche, le matériel envoie un signal à votre système d'exploitation, l'OS le traduit et le navigateur le transmet au site web.",
    howItWorksP2: "Puisque nous sommes tout au bout de cette chaîne, nous ne pouvons signaler que ce que le navigateur nous permet de voir.",
    canDetectTitle: "Ce que nous POUVONS détecter",
    canDetectItems: [
      { label: "Frappes de touches :", text: "Si une touche enregistre avec succès une entrée sur l'ordinateur." },
      { label: "Emplacement physique :", text: "En utilisant KeyboardEvent.code, nous pouvons souvent déterminer la position physique de la touche enfoncée (ex. Shift gauche vs Shift droit), quelle que soit votre disposition." },
      { label: "Valeurs interprétées :", text: "En utilisant KeyboardEvent.key, nous pouvons voir quel caractère votre système d'exploitation souhaitait saisir." },
      { label: "Ghosting au niveau du navigateur :", text: "Nous pouvons détecter si plusieurs touches sont enregistrées simultanément par le navigateur grâce à notre", linkText: "Test de Ghosting", linkUrl: "/ghosting-test" },
      { label: "États des modificateurs :", text: "Si Shift, Ctrl, Alt ou Meta sont maintenus enfoncés." }
    ],
    cannotDetectTitle: "Ce que nous NE POUVONS PAS détecter (Limitations matérielles)",
    cannotDetectIntro: "Les navigateurs n'ont pas d'accès direct au matériel ou à la connexion USB de votre clavier. Par conséquent, nous ne pouvons pas détecter :",
    cannotDetectItems: [
      {
        label: "Véritable Anti-Ghosting matériel / N-Key Rollover (NKRO) :",
        text: "Si le matériel de votre clavier ne parvient pas à envoyer un code de touche en raison d'une limitation de matrice (ghosting matériel), le navigateur ne reçoit tout simplement rien. Nous pouvons vous montrer combien de touches ont été enregistrées, mais pas diagnostiquer pourquoi une touche a échoué au niveau matériel."
      },
      {
        label: "État des switches et défauts électriques :",
        text: "Nous ne pouvons pas savoir si un switch mécanique est défaillant, oxydé ou fait un double-clic (chattering) au niveau matériel, à moins que cela ne génère plusieurs événements de navigateur distincts."
      },
      {
        label: "Taux de scrutation USB (Polling Rate) et latence du firmware :",
        text: "Les navigateurs traitent les événements via le thread principal. Mesurer la latence exacte en millisecondes ou des taux de 1000 Hz est impossible via les API web standard en raison de la charge du système et du navigateur."
      },
      {
        label: "Antirebond matériel (Debounce) :",
        text: "La manière dont le firmware du clavier gère le rebond des touches est totalement invisible pour l'ordinateur."
      }
    ],
    interceptionTitle: "Interception par le système d'exploitation et le navigateur",
    interceptionIntro: "Certaines touches sont interceptées par votre système d'exploitation ou votre navigateur avant même que le site ne puisse les voir. Par exemple :",
    interceptionItems: [
      {
        badge: "Fn",
        label: "Touches Fn (Fonction) :",
        text: "La touche Fn fonctionne purement au niveau matériel sur la plupart des ordinateurs portables et claviers. Elle n'envoie jamais de scan code au PC."
      },
      {
        badge: "Ctrl+Alt+Del, Win+L",
        label: "Raccourcis système :",
        text: "Ctrl+Alt+Suppr, Win+L (verrouillage Windows) et les boutons d'alimentation macOS sont gérés par le système d'exploitation et ne peuvent pas être observés."
      },
      {
        badge: "F5, Ctrl+T, Ctrl+W",
        label: "Raccourcis du navigateur :",
        text: "F5 (Actualiser), Ctrl+T (Nouvel onglet) et Ctrl+W (Fermer l'onglet) sont souvent interceptés par le navigateur, bien que nous tentions d'empêcher le comportement par défaut lorsque cela est autorisé."
      }
    ],
    goToTestButton: "Aller au test de clavier"
  },
  de: {
    subtitle: "Was browserbasierte Tastaturtests erkennen können und was nicht.",
    howItWorksTitle: "So funktioniert das Testen im Browser",
    howItWorksP1: "Webbasierte Tastaturtester wie KeyCheck überwachen DOM-Ereignisse (keydown und keyup), die von Ihrem Webbrowser ausgelöst werden. Wenn Sie eine Taste drücken, sendet die Hardware ein Signal an Ihr Betriebssystem, das Betriebssystem übersetzt es und der Browser stellt es der Website bereit.",
    howItWorksP2: "Da wir uns am Ende dieser Kette befinden, können wir nur das erfassen, was der Browser uns anzeigt.",
    canDetectTitle: "Was wir erkennen KÖNNEN",
    canDetectItems: [
      { label: "Tastendrücke:", text: "Ob eine Taste erfolgreich eine Eingabe an den Computer übermittelt." },
      { label: "Physische Position:", text: "Mithilfe von KeyboardEvent.code können wir häufig die physische Position der gedrückten Taste bestimmen (z. B. linke Umschalttaste vs. rechte Umschalttaste), unabhängig von Ihrem Layout." },
      { label: "Interpretierte Werte:", text: "Mithilfe von KeyboardEvent.key können wir sehen, welches Zeichen Ihr Betriebssystem beabsichtigt hat zu tippen." },
      { label: "Ghosting auf Browserebene:", text: "Wir können feststellen, ob mehrere Tasten gleichzeitig vom Browser registriert werden, indem Sie unseren", linkText: "Ghosting-Test", linkUrl: "/ghosting-test" },
      { label: "Modifikatortasten-Zustände:", text: "Ob Umschalt-, Strg-, Alt- oder Meta-Tasten gedrückt gehalten werden." }
    ],
    cannotDetectTitle: "Was wir NICHT erkennen können (Hardware-Einschränkungen)",
    cannotDetectIntro: "Browser haben keinen direkten Zugriff auf die Hardware oder die USB-Verbindung Ihrer Tastatur. Daher können wir Folgendes nicht erkennen:",
    cannotDetectItems: [
      {
        label: "Echtes Hardware-Anti-Ghosting / N-Key-Rollover (NKRO):",
        text: "Wenn Ihre Tastatur-Hardware aufgrund einer Matrixbeschränkung (Hardware-Ghosting) keinen Tastencode sendet, empfängt der Browser schlicht nichts. Wir können Ihnen anzeigen, wie viele Tasten registriert wurden, jedoch nicht analysieren, warum eine Taste auf Hardwareebene fehlgeschlagen ist."
      },
      {
        label: "Zustand mechanischer Schalter & elektrische Fehler:",
        text: "Wir können auf Hardwareebene nicht feststellen, ob ein Schalter defekt oder korrodiert ist oder doppelt auslöst (Chattering), es sei denn, dies führt zu mehreren separaten Browserereignissen."
      },
      {
        label: "USB-Polling-Rate & Firmware-Latenz:",
        text: "Browser verarbeiten Ereignisse über den Hauptthread. Das Messen exakter Millisekunden-Latenzen oder 1000-Hz-Polling-Raten ist über Standard-Web-APIs aufgrund von OS- und Browser-Overhead nicht möglich."
      },
      {
        label: "Hardware-Debounce:",
        text: "Wie die Tastatur-Firmware das Schalterprellen (Bounce) handhabt, bleibt dem PC vollständig verborgen."
      }
    ],
    interceptionTitle: "Abfangen durch Betriebssystem und Browser",
    interceptionIntro: "Einige Tasten werden von Ihrem Betriebssystem oder Browser abgefangen, bevor die Website sie empfangen kann. Zum Beispiel:",
    interceptionItems: [
      {
        badge: "Fn",
        label: "Fn-Tasten (Funktion):",
        text: "Die Fn-Taste arbeitet bei den meisten Laptops und Tastaturen rein auf Hardwareebene. Sie sendet niemals einen Scan-Code an den PC."
      },
      {
        badge: "Ctrl+Alt+Del, Win+L",
        label: "System-Tastenkombinationen:",
        text: "Strg+Alt+Entf, Win+L (Windows sperren) und macOS-Einschalttasten werden vom Betriebssystem verarbeitet und können nicht erfasst werden."
      },
      {
        badge: "F5, Ctrl+T, Ctrl+W",
        label: "Browser-Tastenkombinationen:",
        text: "F5 (Aktualisieren), Strg+T (Neuer Tab) und Strg+W (Tab schließen) werden häufig vom Browser abgefangen, wenngleich wir versuchen, das Standardverhalten zu unterdrücken, wo dies zulässig ist."
      }
    ],
    goToTestButton: "Zum Tastaturtest"
  }
};
