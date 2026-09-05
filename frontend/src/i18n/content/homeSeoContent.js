/**
 * International SEO Content, Meta Definitions, Semantic Keywords, and FAQs
 * for the 10 target locales: en, hi, fil, pt, id, uk, th, es, fr, de.
 * 
 * Complies with strict native search intent, natural phrasing, and zero keyword stuffing.
 */

export const homeSeoContent = {
  en: {
    primaryKeyword: 'keyboard tester',
    seoTitle: 'Keyboard Tester – Test Your Keyboard Online | KeyCheck',
    seoDesc: 'Test your keyboard online for free with instant visual feedback. Check every key, test rollover and stuck keys in your browser.',
    h1: 'Test Your Keyboard',
    twoLineBio: 'Test your keyboard online for free and check every key in real time. Find keys that are not responding, stuck, or behaving incorrectly right in your browser.',
    semanticKeywords: [
      'keyboard tester',
      'keyboard test',
      'keyboard test online',
      'test keyboard',
      'online keyboard checker',
      'check keyboard',
      'keyboard key test',
      'test keyboard keys',
      'laptop keyboard test'
    ],
    guide: {
      title: 'How to Test Your Keyboard Online',
      sections: [
        {
          heading: 'How to Test a Keyboard Step-by-Step',
          content: 'Begin by pressing any key on your physical keyboard. The corresponding key on the interactive visual tester will light up immediately. Press through your keys systematically—from numbers and letters to function and modifier keys—to verify complete coverage.'
        },
        {
          heading: 'How the Keyboard Tester Works',
          content: 'The tester operates directly in your web browser by listening to native JavaScript KeyboardEvents (keydown, keyup, and code). It requires zero software installations, administrative permissions, or drivers, providing instantaneous visual feedback with total privacy.'
        },
        {
          heading: 'Testing Laptop vs Desktop PC Keyboards',
          content: 'Whether testing an integrated laptop membrane keyboard (Windows or Mac) or an external mechanical desktop keyboard, KeyCheck supports full layout switching. You can toggle between Full, Main, Function, and Navigation clusters to match your exact hardware form factor.'
        },
        {
          heading: 'Multi-Key Rollover and Anti-Ghosting',
          content: 'Press multiple keys simultaneously to see how many concurrent inputs your hardware and operating system support. This identifies hardware matrix ghosting limits common in standard membrane office keyboards compared to N-Key rollover gaming keyboards.'
        },
        {
          heading: 'Why Keys Fail and Troubleshooting Steps',
          content: 'When a key fails to register, the root cause is typically physical debris beneath the keycap, switch oxidation, operating system shortcut intercepts, or driver conflicts. Try testing another browser, cleaning the key mechanism, or resetting active OS hotkeys.'
        }
      ]
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        {
          q: 'How can I test my keyboard online?',
          a: 'Simply open this page and begin typing on your physical keyboard. Each key you press lights up in real time on the virtual layout, confirming that the signal is successfully transmitted to your browser.'
        },
        {
          q: 'How do I know if a keyboard key is working?',
          a: 'When you press a working key, its virtual counterpart immediately highlights and changes state to tested. If you press a key repeatedly and the virtual key stays unhighlighted, that key is not sending an event.'
        },
        {
          q: 'Can I test a laptop keyboard with this tool?',
          a: 'Yes, this tool works for all laptop keyboards including Windows laptops, MacBooks, Chromebooks, and Linux laptops. Use the layout and platform controls at the top to match your operating system.'
        },
        {
          q: 'Can I test multiple keyboard keys at once?',
          a: 'Yes, you can press several keys simultaneously to test rollover capacity. We also provide a dedicated Multi-Key Test page for in-depth ghosting diagnostics.'
        },
        {
          q: 'Why is one key on my keyboard not working?',
          a: 'Single-key failure is often caused by dust or liquid residue trapped in the switch, a broken mechanical leaf, or an operating system global hotkey overriding the key before the browser receives it.'
        }
      ]
    }
  },

  hi: {
    primaryKeyword: 'कीबोर्ड टेस्ट',
    seoTitle: 'कीबोर्ड टेस्ट – ऑनलाइन कीबोर्ड टेस्टर और की चेक | KeyCheck',
    seoDesc: 'मुफ्त में अपने कीबोर्ड का ऑनलाइन टेस्ट करें। हर कुंजी (key) को रियल-टाइम में चेक करें और अटकी या खराब कीज़ का तुरंत पता लगाएं।',
    h1: 'अपना कीबोर्ड टेस्ट करें',
    twoLineBio: 'अपने कीबोर्ड का ऑनलाइन फ्री टेस्ट करें और प्रत्येक कुंजी को रियल टाइम में जांचें। किसी भी गैर-जिम्मेदार, अटकी या खराब काम करने वाली की (key) को सीधे अपने ब्राउज़र में पहचानें।',
    semanticKeywords: [
      'कीबोर्ड टेस्ट',
      'कीबोर्ड टेस्टर',
      'कीबोर्ड ऑनलाइन टेस्ट',
      'कीबोर्ड चेक',
      'ऑनलाइन कीबोर्ड चेकर',
      'लैपटॉप कीबोर्ड टेस्ट',
      'कीबोर्ड कीज टेस्ट',
      'कीबोर्ड बटन टेस्ट'
    ],
    guide: {
      title: 'ऑनलाइन कीबोर्ड टेस्ट कैसे करें',
      sections: [
        {
          heading: 'कीबोर्ड जांचने की आसान प्रक्रिया',
          content: 'अपने फिजिकल कीबोर्ड का कोई भी बटन दबाएं। स्क्रीन पर वर्चुअल कीबोर्ड का वही बटन तुरंत हाइलाइट हो जाएगा। वर्णमाला, संख्याएं और फंक्शन कीज़ को एक-एक करके दबाकर अपने कीबोर्ड की पूरी जांच करें।'
        },
        {
          heading: 'यह ऑनलाइन कीबोर्ड टेस्टर कैसे काम करता है',
          content: 'यह टूल सीधे आपके ब्राउज़र में जावास्क्रिप्ट कीबोर्ड इवेंट्स के माध्यम से काम करता है। इसके लिए किसी सॉफ्टवेयर, ड्राइवर या डाउनलोड की आवश्यकता नहीं होती, और आपका सारा टाइपिंग डेटा पूरी तरह सुरक्षित रहता है।'
        },
        {
          heading: 'लैपटॉप और कंप्यूटर कीबोर्ड की टेस्टिंग',
          content: 'चाहे आपका लैपटॉप इन-बिल्ट कीबोर्ड हो या अलग से जुड़ा मैकेनिकल या यूएसबी कीबोर्ड, आप ऊपर दिए गए लेआउट और मोड विकल्पों से अपने कीबोर्ड के प्रकार (फुल, मेन, फंक्शन) के अनुसार जांच कर सकते हैं।'
        },
        {
          heading: 'मल्टी-की और एंटी-घोस्टिंग टेस्ट',
          content: 'एक साथ कई बटन दबाकर देखें कि आपका कीबोर्ड एक साथ कितने इनपुट ले सकता है। इससे गेमिंग या तेज टाइपिंग के दौरान की-कन्फ्लिक्ट (Ghosting) की समस्या को आसानी से पकड़ा जा सकता है।'
        },
        {
          heading: 'कीबोर्ड का बटन काम न करने के कारण और समाधान',
          content: 'यदि कोई बटन स्क्रीन पर नहीं चमकता, तो इसका कारण धूल-मिट्टी, स्विच की खराबी, ऑपरेटिंग सिस्टम का कोई शॉर्टकट या ड्राइवर की समस्या हो सकती है। कीकैप साफ करें या दूसरे ब्राउज़र में जांचें।'
        }
      ]
    },
    faq: {
      title: 'अक्सर पूछे जाने वाले सवाल (FAQ)',
      items: [
        {
          q: 'मैं अपने कीबोर्ड का ऑनलाइन टेस्ट कैसे कर सकता हूँ?',
          a: 'बस इस पेज पर आएं और अपने कीबोर्ड का कोई भी बटन दबाना शुरू करें। दबाया गया बटन स्क्रीन पर तुरंत रंग बदल लेगा, जिससे पुष्टि होगी कि बटन सही काम कर रहा है।'
        },
        {
          q: 'मुझे कैसे पता चलेगा कि कोई की (key) काम कर रही है या खराब है?',
          a: 'यदि बटन दबाने पर स्क्रीन पर संबंधित की का रंग बदलता है, तो वह ठीक है। यदि बार-बार दबाने पर भी कोई प्रतिक्रिया न हो, तो वह बटन खराब या अटका हुआ हो सकता है।'
        },
        {
          q: 'क्या मैं इससे अपने लैपटॉप का कीबोर्ड चेक कर सकता हूँ?',
          a: 'हाँ, यह टूल डेल, एचपी, लेनोवो, मैकबुक और अन्य सभी लैपटॉप कीबोर्ड की जांच के लिए पूरी तरह अनुकूल है।'
        },
        {
          q: 'क्या एक साथ कई बटन दबाकर टेस्ट किया जा सकता है?',
          a: 'हाँ, आप एक साथ कई कीज़ दबाकर कीबोर्ड के रोलओवर और एंटी-घोस्टिंग की क्षमता का परीक्षण कर सकते हैं।'
        },
        {
          q: 'अगर कीबोर्ड की कोई एक की काम न करे तो क्या करें?',
          a: 'सबसे पहले बटन के नीचे फंसी धूल या गंदगी को साफ करें, कंप्यूटर को रीस्टार्ट करें या जांचें कि क्या किसी सॉफ्टवेयर शॉर्टकट ने उस की को ब्लॉक तो नहीं किया है।'
        }
      ]
    }
  },

  fil: {
    primaryKeyword: 'keyboard test',
    seoTitle: 'Keyboard Test Online – Subukan at I-check ang Keyboard | KeyCheck',
    seoDesc: 'Subukan ang iyong keyboard online nang libre. I-check ang bawat pindutan sa real time at tukuyin ang mga sirang keys o stuck buttons sa browser.',
    h1: 'Subukan ang Iyong Keyboard',
    twoLineBio: 'Subukan ang iyong keyboard online nang libre at suriin ang bawat pindutan sa real time. Tukuyin agad ang mga pindutang hindi gumagana o nagla-lag diretso sa iyong browser.',
    semanticKeywords: [
      'keyboard test',
      'keyboard tester',
      'keyboard test online',
      'test keyboard',
      'subukan ang keyboard',
      'i-check ang keyboard',
      'laptop keyboard test',
      'mga pindutan ng keyboard'
    ],
    guide: {
      title: 'Paano Subukan ang Keyboard Online',
      sections: [
        {
          heading: 'Hakbang-hakbang na Pagsusuri ng Keyboard',
          content: 'Pindutin ang anumang key sa iyong pisikal na keyboard. Agad na iilaw ang kaukulang pindutan sa visual na tester. Isa-isahing pindutin ang mga letra, numero, at function keys para masuri ang buong keyboard.'
        },
        {
          heading: 'Paano Gumagana ang Keyboard Tester',
          content: 'Gumagana ang tester nang direkta sa iyong browser gamit ang mga native JavaScript KeyboardEvent. Hindi kailangan mag-download o mag-install ng anumang software o driver, at ligtas ang bawat pagpindot.'
        },
        {
          heading: 'Pagsusuri ng Laptop vs Desktop PC Keyboard',
          content: 'Maaari mong gamitin ang tool na ito para sa built-in keyboard ng laptop o external mechanical keyboard sa PC. Gamitin ang mga toggle sa itaas upang pumili sa pagitan ng Windows, Mac, at iba\'t ibang layout.'
        },
        {
          heading: 'Multi-Key Rollover at Ghosting Test',
          content: 'Subukang pumindot ng maraming keys nang sabay-sabay upang makita kung ilang pindot ang kayang basahin ng iyong hardware. Mahalaga ito para sa mga gamer at mabilis mag-type.'
        },
        {
          heading: 'Bakit Hindi Gumagana ang Pindutan at Paano Ayusin',
          content: 'Kung hindi umiilaw ang isang pindutan, maaaring may alikabok o dumi sa ilalim ng keycap, sira ang switch, o may hotkey conflict sa operating system. Subukang linisin ang key o i-restart ang browser.'
        }
      ]
    },
    faq: {
      title: 'Mga Madalas Itanong (FAQ)',
      items: [
        {
          q: 'Paano ko susubukan ang aking keyboard online?',
          a: 'Buksan lamang ang pahinang ito at simulan ang pagpindot sa iyong keyboard. Bawat pindot ay agad na magpapakita ng kulay sa virtual na layout sa screen.'
        },
        {
          q: 'Paano malalaman kung gumagana ang isang keyboard key?',
          a: 'Kapag pinindot mo ang gumaganang key, agad itong magkukulay sa screen. Kung paulit-ulit mong pinipindot at walang lumilitaw na kulay, hindi ito nababasa ng computer.'
        },
        {
          q: 'Pwede ko bang i-test ang keyboard ng laptop dito?',
          a: 'Oo, pwedeng-pwede ito sa kahit anong laptop—kabilang ang Windows laptops, MacBooks, at Chromebooks.'
        },
        {
          q: 'Maaari bang mag-test ng maraming keys nang sabay-sabay?',
          a: 'Oo, suportado ang simultaneous keypress testing upang masukat ang key rollover at matukoy ang ghosting.'
        },
        {
          q: 'Bakit hindi gumagana ang isang pindutan sa aking keyboard?',
          a: 'Kadalasan itong sanhi ng naipong dumi sa switch, sirang mechanical spring o membrane, o naka-assign na system shortcut na humaharang sa input.'
        }
      ]
    }
  },

  pt: {
    primaryKeyword: 'teste de teclado',
    seoTitle: 'Teste de Teclado Online – Testar Teclado e Teclas Grátis | KeyCheck',
    seoDesc: 'Faça um teste de teclado online gratuito no seu navegador. Verifique cada tecla em tempo real e descubra teclas presas, falhas ou travadas instantaneamente.',
    h1: 'Teste Seu Teclado',
    twoLineBio: 'Faça o teste de teclado online gratuitamente e confira cada tecla em tempo real. Identifique teclas que não respondem, falham ou estão travadas direto pelo seu navegador.',
    semanticKeywords: [
      'teste de teclado',
      'teste de teclado online',
      'testador de teclado',
      'testar teclado',
      'checar teclado',
      'teste de teclas',
      'teste de teclado notebook',
      'testar teclas do teclado'
    ],
    guide: {
      title: 'Como Fazer o Teste de Teclado Online',
      sections: [
        {
          heading: 'Passo a Passo para Testar Seu Teclado',
          content: 'Pressione qualquer tecla no seu teclado físico. A tecla correspondente na tela acenderá imediatamente. Pressione sequencialmente todas as letras, números e teclas especiais para garantir que o teclado esteja 100% operacional.'
        },
        {
          heading: 'Como Funciona o Testador no Navegador',
          content: 'A ferramenta capta os eventos KeyboardEvent nativos do navegador de forma rápida e segura. Não exige download nem instalação de drivers e nenhum dado digitado é enviado para servidores externos.'
        },
        {
          heading: 'Testar Teclado de Notebook vs Teclado Mecânico de PC',
          content: 'Compatível tanto com teclados integrados de notebooks quanto com teclados mecânicos ou de membrana para PC desktop. Você pode alternar layouts (QWERTY, ABNT2, etc.) e modos de exibição facilmente.'
        },
        {
          heading: 'Teste de Anti-Ghosting e Rollover de Teclas',
          content: 'Pressione várias teclas ao mesmo tempo para verificar quantas entradas simultâneas o teclado consegue registrar. Isso ajuda a identificar limitações de matriz em jogos ou digitação ágil.'
        },
        {
          heading: 'Causas de Teclas Que Não Respondem e Como Resolver',
          content: 'Se uma tecla não acende, o problema pode ser acúmulo de poeira sob o switch, desgaste do contato elétrico, conflito de atalhos do Windows/Mac ou problema no driver de entrada.'
        }
      ]
    },
    faq: {
      title: 'Perguntas Frequentes (FAQ)',
      items: [
        {
          q: 'Como posso fazer o teste de teclado online?',
          a: 'Basta acessar esta página e pressionar as teclas do seu teclado físico. As teclas correspondentes mudarão de cor na tela instantaneamente.'
        },
        {
          q: 'Como saber se uma tecla do teclado está funcionando?',
          a: 'Uma tecla que funciona muda de estado e cor no teclado virtual assim que é pressionada. Se você apertar e nada acontecer na tela, a tecla não está registrando sinal.'
        },
        {
          q: 'Posso testar o teclado do meu notebook?',
          a: 'Sim, você pode testar qualquer teclado de notebook, seja Windows, MacBook, Linux ou Chromebook sem nenhuma configuração prévia.'
        },
        {
          q: 'Consigo testar várias teclas juntas ao mesmo tempo?',
          a: 'Sim, a ferramenta suporta testes de rolagem e teclas simultâneas para verificar o suporte a anti-ghosting.'
        },
        {
          q: 'Por que uma tecla do meu teclado parou de funcionar?',
          a: 'As causas mais comuns incluem poeira sob a tecla, switch danificado, sujeira nos contatos da membrana ou atalhos do sistema operacional capturando a tecla.'
        }
      ]
    }
  },

  id: {
    primaryKeyword: 'tes keyboard',
    seoTitle: 'Tes Keyboard Online – Cek Keyboard Laptop & PC Cepat | KeyCheck',
    seoDesc: 'Tes keyboard online gratis untuk cek semua tombol laptop dan PC secara real time. Temukan tombol keyboard yang rusak, macet, atau tidak merespons di browser.',
    h1: 'Tes Keyboard Anda',
    twoLineBio: 'Uji performa dan tes keyboard online secara gratis untuk memeriksa setiap tombol. Temukan tombol yang macet, tidak merespons, atau error langsung melalui browser Anda.',
    semanticKeywords: [
      'tes keyboard',
      'test keyboard',
      'tes keyboard online',
      'tes keyboard laptop',
      'cek keyboard',
      'cek tombol keyboard',
      'keyboard checker online',
      'tes keyboard pc'
    ],
    guide: {
      title: 'Panduan Lengkap Cara Tes Keyboard Online',
      sections: [
        {
          heading: 'Langkah Mudah Mengetes Tombol Keyboard',
          content: 'Tekan tombol apa saja pada keyboard fisik Anda. Tombol yang sesuai pada layar akan langsung menyala secara visual. Uji satu per satu tombol huruf, angka, fungsi, dan tombol pengubah untuk memeriksa seluruh tombol.'
        },
        {
          heading: 'Cara Kerja Alat Tes Keyboard Ini',
          content: 'Alat ini bekerja langsung di browser Anda melalui JavaScript KeyboardEvents. Tidak memerlukan unduhan, instalasi aplikasi, atau hak administrator, serta menjaga privasi input Anda secara menyeluruh.'
        },
        {
          heading: 'Tes Keyboard Laptop vs Keyboard PC Eksternal',
          content: 'Alat ini mendukung keyboard bawaan laptop (Asus, Acer, Lenovo, HP, MacBook) maupun keyboard mekanikal dan membran PC desktop eksternal. Anda dapat menyesuaikan tata letak dan mode tampilan di menu atas.'
        },
        {
          heading: 'Uji Multi-Key Rollover dan Anti-Ghosting',
          content: 'Tekan beberapa tombol sekaligus untuk melihat berapa banyak input yang dapat dideteksi bersamaan. Fitur ini sangat berguna bagi para gamer untuk memastikan fitur anti-ghosting berfungsi baik.'
        },
        {
          heading: 'Penyebab Tombol Keyboard Rusak dan Solusinya',
          content: 'Jika tombol tidak merespons, penyebab umumnya adalah debu di bawah switch, keausan membran karet, atau adanya pintasan sistem operasi yang mengunci tombol tersebut. Bersihkan tombol atau coba mulai ulang peramban.'
        }
      ]
    },
    faq: {
      title: 'Pertanyaan yang Sering Diajukan (FAQ)',
      items: [
        {
          q: 'Bagaimana cara tes keyboard online lewat browser?',
          a: 'Cukup buka halaman ini dan mulailah mengetik di keyboard Anda. Setiap tombol yang Anda tekan akan langsung menyala pada tampilan keyboard virtual di layar.'
        },
        {
          q: 'Bagaimana mengetahui apakah tombol keyboard masih berfungsi?',
          a: 'Tombol yang berfungsi normal akan langsung berubah warna saat ditekan. Jika tombol ditekan berulang kali namun tidak menyala, tombol tersebut tidak mengirimkan sinyal.'
        },
        {
          q: 'Apakah alat ini bisa digunakan untuk tes keyboard laptop?',
          a: 'Bisa, alat ini cocok untuk segala jenis laptop termasuk Windows, MacBook, dan Chromebook tanpa perlu instalasi aplikasi.'
        },
        {
          q: 'Bisakah saya menguji beberapa tombol keyboard sekaligus?',
          a: 'Ya, Anda bisa menekan banyak tombol secara bersamaan untuk mengecek kapasitas rollover dan mendeteksi adanya ghosting.'
        },
        {
          q: 'Mengapa ada salah satu tombol keyboard yang tidak merespons?',
          a: 'Hal ini biasanya disebabkan oleh kotoran atau cairan di bawah tombol, kerusakan fisik pada switch, atau konflik tombol pintas pada sistem operasi.'
        }
      ]
    }
  },

  uk: {
    primaryKeyword: 'тест клавіатури',
    seoTitle: 'Тест клавіатури онлайн – Перевірка кожної клавіші | KeyCheck',
    seoDesc: 'Зробіть тест клавіатури онлайн безкоштовно прямо у браузері. Перевірте кожну клавішу в реальному часі, виявіть залипання кнопок та несправності.',
    h1: 'Перевірте свою клавіатуру',
    twoLineBio: 'Пройдіть тест клавіатури онлайн безкоштовно та перевірте кожну кнопку в реальному часі. Виявляйте непрацюючі, залиплі чи некоректні клавіші прямо у своєму браузері.',
    semanticKeywords: [
      'тест клавіатури',
      'перевірка клавіатури',
      'тест клавіатури онлайн',
      'перевірити клавіатуру',
      'перевірка кнопок клавіатури',
      'тест клавіатури ноутбука',
      'онлайн чекер клавіатури'
    ],
    guide: {
      title: 'Як перевірити клавіатуру онлайн',
      sections: [
        {
          heading: 'Покрокова перевірка кожної кнопки',
          content: 'Натисніть будь-яку клавішу на вашій фізичній клавіатурі. Відповідна клавіша на екрані миттєво підсвітиться. Послідовно натискайте літери, цифри та функціональні кнопки для повної діагностики.'
        },
        {
          heading: 'Як працює онлайн-тестер клавіатури',
          content: 'Сервіс працює безпосередньо у браузері за допомогою стандартних подій JavaScript KeyboardEvent. Не потрібно завантажувати стороннє програмне забезпечення чи драйвери, а ваші натискання залишаються конфіденційними.'
        },
        {
          heading: 'Перевірка клавіатури ноутбука та стаціонарного ПК',
          content: 'Інструмент підтримує як вбудовані мембранні клавіатури ноутбуків (Windows, MacBook), так і зовнішні механічні клавіатури для ПК. Ви можете легко змінювати розкладку та режими перегляду.'
        },
        {
          heading: 'Тест одночасних натискань та Anti-Ghosting',
          content: 'Затискайте кілька клавіш одночасно, щоб дізнатися максимальну кількість підтримуваних одночасних сигналів. Це допоможе виявити апаратні обмеження матриці клавіатури.'
        },
        {
          heading: 'Чому клавіша не працює та що робити',
          content: 'Якщо кнопка не реагує, причиною може бути пил під ковпачком, поломка механічного перемикача, системні гарячі клавіші ОС або збій драйвера. Очистіть клавішу та спробуйте ще раз.'
        }
      ]
    },
    faq: {
      title: 'Поширені запитання (FAQ)',
      items: [
        {
          q: 'Як перевірити клавіатуру онлайн у браузері?',
          a: 'Просто відкрийте цю сторінку та почніть натискати клавіші. Кожна справна кнопка одразу ж змінить свій колір на віртуальній клавіатурі на екрані.'
        },
        {
          q: 'Як зрозуміти, що кнопка клавіатури працює справно?',
          a: 'Справна кнопка миттєво підсвічується зеленим чи синім кольором при натисканні. Якщо реакції немає, кнопка не надсилає сигнал у систему.'
        },
        {
          q: 'Чи можна перевірити клавіатуру ноутбука?',
          a: 'Так, тестер ідеально підходить для будь-яких ноутбуків на Windows, macOS, Linux та ChromeOS.'
        },
        {
          q: 'Чи можна тестувати кілька кнопок одночасно?',
          a: 'Так, ви можете натискати кілька клавіш одночасно для перевірки підтримки Multi-Key Rollover та виявлення ефекту залипання/гостингу.'
        },
        {
          q: 'Чому одна клавіша на клавіатурі раптово перестала працювати?',
          a: 'Найчастіше це викликано забрудненням контактів, окисленням світча або перехопленням клавіші системною програмою чи гарячою комбінацією.'
        }
      ]
    }
  },

  th: {
    primaryKeyword: 'ทดสอบคีย์บอร์ด',
    seoTitle: 'ทดสอบคีย์บอร์ดออนไลน์ – เทสคีย์บอร์ด เช็คปุ่มเสีย | KeyCheck',
    seoDesc: 'ทดสอบคีย์บอร์ดออนไลน์ฟรี เช็คปุ่มคีย์บอร์ดเสีย ปุ่มเบิ้ล หรือปุ่มค้างได้แบบเรียลไทม์บนเบราว์เซอร์ ใช้งานได้ทั้งโน้ตบุ๊กและ PC',
    h1: 'ทดสอบคีย์บอร์ดของคุณ',
    twoLineBio: 'ทดสอบคีย์บอร์ดออนไลน์ฟรีและตรวจสอบทุกปุ่มได้แบบเรียลไทม์ ตรวจหาปุ่มที่กดไม่ติด ปุ่มค้าง หรือทำงานผิดปกติได้ทันทีบนเบราว์เซอร์ของคุณ',
    semanticKeywords: [
      'ทดสอบคีย์บอร์ด',
      'เทสคีย์บอร์ด',
      'ทดสอบแป้นพิมพ์',
      'ทดสอบคีย์บอร์ดออนไลน์',
      'เช็คปุ่มคีย์บอร์ด',
      'เช็คคีย์บอร์ดโน๊ตบุ๊ค',
      'ตรวจสอบแป้นพิมพ์',
      'เทสปุ่มกด'
    ],
    guide: {
      title: 'วิธีทดสอบคีย์บอร์ดออนไลน์แบบละเอียด',
      sections: [
        {
          heading: 'ขั้นตอนการทดสอบปุ่มคีย์บอร์ด',
          content: 'กดปุ่มใดก็ได้บนแป้นพิมพ์ของคุณ ปุ่มบนหน้าจอจะสว่างขึ้นทันที ทดลองกดปุ่มตัวอักษร ตัวเลข ปุ่มฟังก์ชัน (F1-F12) และปุ่มพิเศษให้ครบทุกปุ่มเพื่อเช็คความพร้อมใช้งาน'
        },
        {
          heading: 'หลักการทำงานของเครื่องมือทดสอบ',
          content: 'ระบบทำงานผ่านเบราว์เซอร์โดยตรงด้วย JavaScript KeyboardEvents ไม่จำเป็นต้องดาวน์โหลดหรือลงโปรแกรมใดๆ ข้อมูลการกดปุ่มทั้งหมดจะประมวลผลอยู่บนเครื่องของคุณอย่างปลอดภัย'
        },
        {
          heading: 'ทดสอบคีย์บอร์ดโน้ตบุ๊กและคีย์บอร์ดคอมพิวเตอร์ตั้งโต๊ะ',
          content: 'รองรับแป้นพิมพ์ของโน้ตบุ๊กทุกรุ่น (Windows และ Mac) รวมถึงคีย์บอร์ด Mechanical และคีย์บอร์ดทั่วไป สามารถสลับโหมดเลย์เอาต์ (Full, Main, Function) ได้ตามต้องการ'
        },
        {
          heading: 'การทดสอบการกดพร้อมกัน (Anti-Ghosting & Key Rollover)',
          content: 'ลองกดหลายๆ ปุ่มพร้อมกันเพื่อตรวจสอบว่าคีย์บอร์ดรองรับการส่งสัญญาณพร้อมกันได้กี่คีย์ ช่วยให้เกมเมอร์ตรวจสอบปัญหาปุ่มบล็อกหรือกดไม่ติดขณะเล่นเกม'
        },
        {
          heading: 'สาเหตุที่ปุ่มคีย์บอร์ดกดไม่ติดและแนวทางแก้ไข',
          content: 'หากปุ่มใดไม่ตอบสนอง มักเกิดจากเศษฝุ่น สิ่งสกปรกใต้ปุ่ม สวิตช์ปุ่มสึกหรอ หรือปุ่มลัดของระบบปฏิบัติการ ลองทำความสะอาดหรือสลับเบราว์เซอร์เพื่อตรวจสอบซ้ำ'
        }
      ]
    },
    faq: {
      title: 'คำถามที่พบบ่อย (FAQ)',
      items: [
        {
          q: 'วิธีทดสอบคีย์บอร์ดออนไลน์ทำอย่างไร?',
          a: 'เพียงเปิดหน้านี้แล้วเริ่มกดปุ่มบนคีย์บอร์ดของคุณได้ทันที ปุ่มที่ใช้งานได้จะเปลี่ยนสีบนหน้าจออย่างรวดเร็ว'
        },
        {
          q: 'จะทราบได้อย่างไรว่าปุ่มคีย์บอร์ดทำงานได้ปกติ?',
          a: 'เมื่อกดปุ่มแล้วปุ่มบนหน้าจอเปลี่ยนสถานะเป็นสีเขียวหรือสีที่กำหนด แสดงว่าปุ่มนั้นทำงานปกติ หากกดแล้วไม่มีการเปลี่ยนแปลงแสดงว่าปุ่มนั้นมีปัญหา'
        },
        {
          q: 'สามารถใช้ทดสอบคีย์บอร์ดโน้ตบุ๊กได้หรือไม่?',
          a: 'สามารถใช้ได้กับโน้ตบุ๊กทุกยี่ห้อ ทั้งระบบ Windows, MacBook และ Chromebook โดยไม่ต้องตั้งค่าเพิ่มเติม'
        },
        {
          q: 'สามารถทดสอบการกดปุ่มหลายๆ ปุ่มพร้อมกันได้ไหม?',
          a: 'ได้แน่นอน คุณสามารถกดหลายปุ่มพร้อมกันเพื่อทดสอบระบบ Anti-Ghosting และ Key Rollover ได้ทันที'
        },
        {
          q: 'ทำไมปุ่มบนคีย์บอร์ดถึงกดไม่ติดบางปุ่ม?',
          a: 'สาเหตุหลักเกิดจากฝุ่นผงใต้ปุ่มกด สวิตช์กลไกเสียหาย หรือมีคีย์ลัดของระบบปฏิบัติการดักจับการกดปุ่มนั้นไว้'
        }
      ]
    }
  },

  es: {
    primaryKeyword: 'prueba de teclado',
    seoTitle: 'Prueba de Teclado Online – Test de Teclado y Teclas | KeyCheck',
    seoDesc: 'Haz una prueba de teclado online gratis y verifica cada tecla en tiempo real. Detecta teclas atascadas, teclas que no responden o fallos en tu navegador.',
    h1: 'Prueba tu Teclado',
    twoLineBio: 'Realiza una prueba de teclado online gratis para verificar cada tecla en tiempo real. Detecta teclas que no responden, atascadas o con fallos directamente en tu navegador.',
    semanticKeywords: [
      'prueba de teclado',
      'test de teclado',
      'probador de teclado',
      'prueba de teclado online',
      'probar teclado',
      'test de teclado online',
      'comprobar teclado',
      'test de teclas'
    ],
    guide: {
      title: 'Cómo Probar tu Teclado Online Paso a Paso',
      sections: [
        {
          heading: 'Instrucciones para Probar Cada Tecla',
          content: 'Pulsa cualquier tecla en tu teclado físico. La tecla correspondiente en el diseño interactivo se iluminará al instante. Recorre sistemáticamente las letras, números y teclas especiales para comprobar todo el teclado.'
        },
        {
          heading: 'Cómo Funciona este Probador de Teclado',
          content: 'La herramienta opera directamente en tu navegador mediante eventos estándar KeyboardEvent de JavaScript. No requiere descargas, programas adicionales ni permisos especiales, manteniendo total privacidad.'
        },
        {
          heading: 'Prueba en Teclados de Portátiles vs Teclados de PC',
          content: 'Funciona a la perfección tanto en teclados integrados de ordenadores portátiles como en teclados mecánicos o de membrana externos. Puedes alternar la vista entre teclado completo, compacto o sección de funciones.'
        },
        {
          heading: 'Pulsación Simultánea y Anti-Ghosting',
          content: 'Mantén pulsadas varias teclas a la vez para comprobar cuántas pulsaciones simultáneas admite tu teclado. Es ideal para jugadores que necesitan verificar el soporte de rollover de sus teclas.'
        },
        {
          heading: 'Por Qué una Tecla No Responde y Cómo Solucionarlo',
          content: 'Si una tecla no se ilumina, puede deberse a polvo o suciedad debajo de la tecla, desgaste del switch, un conflicto con atajos del sistema operativo o un problema de controladores.'
        }
      ]
    },
    faq: {
      title: 'Preguntas Frecuentes (FAQ)',
      items: [
        {
          q: '¿Cómo puedo probar mi teclado online?',
          a: 'Solo tienes que abrir esta página y empezar a presionar las teclas de tu teclado físico. Las teclas activas se iluminarán en pantalla de forma instantánea.'
        },
        {
          q: '¿Cómo sé si una tecla del teclado funciona correctamente?',
          a: 'Una tecla que funciona se resalta de inmediato en el teclado virtual. Si presionas una tecla repetidamente y no reacciona, esa tecla no está enviando la señal.'
        },
        {
          q: '¿Puedo probar el teclado de mi ordenador portátil?',
          a: 'Sí, es compatible con todo tipo de portátiles con Windows, macOS, Linux y ChromeOS sin necesidad de instalar nada.'
        },
        {
          q: '¿Es posible probar varias teclas al mismo tiempo?',
          a: 'Sí, puedes pulsar varias teclas de forma simultánea para evaluar la capacidad de rollover y detectar efecto ghosting.'
        },
        {
          q: '¿Por qué una de las teclas de mi teclado no responde?',
          a: 'Las causas más habituales son suciedad acumulada bajo el mecanismo, un interruptor defectuoso o un atajo de teclado del sistema que bloquea el evento en el navegador.'
        }
      ]
    }
  },

  fr: {
    primaryKeyword: 'test clavier',
    seoTitle: 'Test Clavier en Ligne – Tester les Touches de Clavier | KeyCheck',
    seoDesc: 'Faites un test de clavier en ligne gratuit pour vérifier chaque touche en temps réel. Détectez les touches bloquées, inactives ou défectueuses dans votre navigateur.',
    h1: 'Testez votre Clavier',
    twoLineBio: 'Testez votre clavier en ligne gratuitement et vérifiez chaque touche en temps réel. Repérez instantanément les touches inactives, bloquées ou défaillantes directement dans votre navigateur.',
    semanticKeywords: [
      'test clavier',
      'test de clavier',
      'tester clavier',
      'test clavier en ligne',
      'testeur de clavier',
      'tester les touches du clavier',
      'verifier clavier',
      'test clavier pc portable'
    ],
    guide: {
      title: 'Comment Tester votre Clavier en Ligne',
      sections: [
        {
          heading: 'Tester les Touches Étape par Étape',
          content: 'Appuyez sur n\'importe quelle touche de votre clavier physique. La touche correspondante sur le schéma virtuel s\'allume immédiatement. Parcourez l\'ensemble des lettres, chiffres et touches spéciales pour un diagnostic complet.'
        },
        {
          heading: 'Fonctionnement du Testeur de Clavier',
          content: 'L\'outil fonctionne directement dans votre navigateur web grâce aux événements natifs KeyboardEvent de JavaScript. Aucun téléchargement ni installation de pilote n\'est nécessaire, garantissant rapidité et confidentialité.'
        },
        {
          heading: 'Claviers d\'Ordinateurs Portables et Claviers PC',
          content: 'Que vous testiez le clavier intégré d\'un ordinateur portable ou un clavier mécanique de bureau (AZERTY, QWERTY), vous pouvez ajuster la disposition et le mode d\'affichage depuis la barre supérieure.'
        },
        {
          heading: 'Test Multi-Touches et Rollover (Anti-Ghosting)',
          content: 'Maintenez plusieurs touches enfoncées simultanément pour vérifier combien de signaux votre clavier peut transmettre à la fois. Ce test est indispensable pour les gamers et la frappe rapide.'
        },
        {
          heading: 'Causes des Touches Non Réactives et Solutions',
          content: 'Si une touche ne s\'allume pas, la cause est généralement de la poussière sous la touche, un switch mécanique défectueux ou un raccourci clavier du système d\'exploitation interceptant l\'événement.'
        }
      ]
    },
    faq: {
      title: 'Foire Aux Questions (FAQ)',
      items: [
        {
          q: 'Comment faire un test de clavier en ligne?',
          a: 'Ouvrez simplement cette page et tapez sur votre clavier physique. Chaque touche pressée s\'illumine immédiatement sur le clavier virtuel à l\'écran.'
        },
        {
          q: 'Comment savoir si une touche de clavier fonctionne correctement?',
          a: 'Si la touche s\'allume dès que vous appuyez dessus, elle fonctionne parfaitement. Si aucune réaction n\'apparaît après plusieurs frappes, la touche ne transmet pas de signal.'
        },
        {
          q: 'Peut-on tester le clavier d\'un ordinateur portable?',
          a: 'Oui, l\'outil prend en charge tous les ordinateurs portables (Windows, MacBook, Chromebook) sans configuration préalable.'
        },
        {
          q: 'Est-il possible de tester plusieurs touches simultanément?',
          a: 'Oui, vous pouvez presser plusieurs touches à la fois pour vérifier la capacité de rollover et détecter l\'effet de ghosting.'
        },
        {
          q: 'Pourquoi une touche de mon clavier ne répond-elle plus?',
          a: 'Les causes les plus fréquentes sont de la poussière coincée dans le mécanisme, une membrane ou un switch abîmé, ou un raccourci système prioritaire.'
        }
      ]
    }
  },

  de: {
    primaryKeyword: 'Tastatur testen',
    seoTitle: 'Tastatur Test Online – Tastatur und Tasten Testen | KeyCheck',
    seoDesc: 'Tastatur online kostenlos testen und jede Taste in Echtzeit überprüfen. Finden Sie nicht reagierende, klemmende oder defekte Tasten direkt im Browser.',
    h1: 'Testen Sie Ihre Tastatur',
    twoLineBio: 'Testen Sie Ihre Tastatur online kostenlos und prüfen Sie jede Taste in Echtzeit. Finden Sie nicht reagierende, klemmende oder fehlerhafte Tasten direkt in Ihrem Browser.',
    semanticKeywords: [
      'Tastatur testen',
      'Tastatur Test',
      'Tastatur Tester',
      'Tastaturtest online',
      'Tastatur überprüfen',
      'Tasten testen',
      'Laptop Tastatur testen',
      'Tastatur Funktionstest'
    ],
    guide: {
      title: 'So testen Sie Ihre Tastatur online',
      sections: [
        {
          heading: 'Schritt-für-Schritt Tastaturprüfung',
          content: 'Drücken Sie eine beliebige Taste auf Ihrer physischen Tastatur. Die entsprechende Taste auf der virtuellen Anzeige leuchtet sofort auf. Prüfen Sie Buchstaben, Ziffern und Funktionstasten der Reihe nach für einen vollständigen Funktionstest.'
        },
        {
          heading: 'Funktionsweise des Online-Tastaturtesters',
          content: 'Das Tool arbeitet direkt in Ihrem Browser über native JavaScript KeyboardEvents. Es erfordert keinerlei Downloads, Treiber oder Administratorrechte und schützt Ihre Eingabedaten vollkommen lokal.'
        },
        {
          heading: 'Laptop-Tastatur vs. Desktop-PC-Tastatur',
          content: 'Geeignet sowohl für integrierte Laptop-Tastaturen als auch für externe mechanische USB-Tastaturen. Passen Sie Layout (QWERTZ, QWERTY) und Tastengruppen ganz einfach über die Menüleiste an.'
        },
        {
          heading: 'Mehrfachtastendruck und Anti-Ghosting prüfen',
          content: 'Drücken Sie mehrere Tasten gleichzeitig, um die Rollover-Kapazität Ihrer Tastatur zu ermitteln. Dadurch erkennen Sie mögliche Ghosting-Einschränkungen bei Office-Tastaturen im Vergleich zu Gaming-Tastaturen.'
        },
        {
          heading: 'Ursachen für defekte Tasten und Fehlerbehebung',
          content: 'Reagiert eine Taste nicht, liegt dies meist an Staub unter der Tastenkappe, einem beschädigten Schalter oder Tastenkombinationen des Betriebssystems. Reinigen Sie die Taste oder testen Sie in einem anderen Browser.'
        }
      ]
    },
    faq: {
      title: 'Häufig gestellte Fragen (FAQ)',
      items: [
        {
          q: 'Wie kann ich meine Tastatur online testen?',
          a: 'Öffnen Sie diese Seite und tippen Sie auf Ihrer Tastatur. Jede gedrückte Taste wird sofort auf dem Bildschirm farblich hervorgehoben.'
        },
        {
          q: 'Wie erkenne ich, ob eine Taste ordnungsgemäß funktioniert?',
          a: 'Eine funktionierende Taste wechselt beim Drücken sofort den Status auf der virtuellen Tastatur. Bleibt die Taste unbeleuchtet, wird kein Signal empfangen.'
        },
        {
          q: 'Kann ich damit die Tastatur meines Laptops testen?',
          a: 'Ja, dieser Test funktioniert mit allen Notebooks unter Windows, macOS, Linux und ChromeOS ohne zusätzliche Software.'
        },
        {
          q: 'Kann ich mehrere Tasten gleichzeitig testen?',
          a: 'Ja, Sie können mehrere Tasten gleichzeitig drücken, um Key-Rollover und Anti-Ghosting zu überprüfen.'
        },
        {
          q: 'Warum reagiert eine einzelne Taste auf meiner Tastatur nicht mehr?',
          a: 'Häufige Ursachen sind Staub oder Flüssigkeitsrückstände im Switch, ein mechanischer Defekt oder System-Shortcuts, die die Taste abfangen.'
        }
      ]
    }
  }
};
