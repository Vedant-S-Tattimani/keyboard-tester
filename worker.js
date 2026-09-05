const seoData = {
  en: {
    title: 'Keyboard Tester – Test Your Keyboard Online | KeyCheck',
    desc: 'Test your keyboard online for free with instant visual feedback. Check every key, test rollover and stuck keys in your browser.',
    h1: 'Test Your Keyboard',
    intro: 'Test your keyboard online for free and check every key in real time. Find keys that are not responding, stuck, or behaving incorrectly right in your browser.'
  },
  hi: {
    title: 'कीबोर्ड टेस्ट – ऑनलाइन कीबोर्ड टेस्टर और की चेक | KeyCheck',
    desc: 'मुफ्त में अपने कीबोर्ड का ऑनलाइन टेस्ट करें। हर कुंजी (key) को रियल-टाइम में चेक करें और अटकी या खराब कीज़ का तुरंत पता लगाएं।',
    h1: 'अपना कीबोर्ड टेस्ट करें',
    intro: 'अपने कीबोर्ड का ऑनलाइन फ्री टेस्ट करें और प्रत्येक कुंजी को रियल टाइम में जांचें। किसी भी गैर-जिम्मेदार, अटकी या खराब काम करने वाली की (key) को सीधे अपने ब्राउज़र में पहचानें।'
  },
  fil: {
    title: 'Keyboard Test Online – Subukan at I-check ang Keyboard | KeyCheck',
    desc: 'Subukan ang iyong keyboard online nang libre. I-check ang bawat pindutan sa real time at tukuyin ang mga sirang keys o stuck buttons sa browser.',
    h1: 'Subukan ang Iyong Keyboard',
    intro: 'Subukan ang iyong keyboard online nang libre at suriin ang bawat pindutan sa real time. Tukuyin agad ang mga pindutang hindi gumagana o nagla-lag diretso sa iyong browser.'
  },
  pt: {
    title: 'Teste de Teclado Online – Testar Teclado e Teclas Grátis | KeyCheck',
    desc: 'Faça um teste de teclado online gratuito no seu navegador. Verifique cada tecla em tempo real e descubra teclas presas, falhas ou travadas instantaneamente.',
    h1: 'Teste Seu Teclado',
    intro: 'Faça o teste de teclado online gratuitamente e confira cada tecla em tempo real. Identifique teclas que não respondem, falham ou estão travadas direto pelo seu navegador.'
  },
  id: {
    title: 'Tes Keyboard Online – Cek Keyboard Laptop & PC Cepat | KeyCheck',
    desc: 'Tes keyboard online gratis untuk cek semua tombol laptop dan PC secara real time. Temukan tombol keyboard yang rusak, macet, atau tidak merespons di browser.',
    h1: 'Tes Keyboard Anda',
    intro: 'Uji performa dan tes keyboard online secara gratis untuk memeriksa setiap tombol. Temukan tombol yang macet, tidak merespons, atau error langsung melalui browser Anda.'
  },
  uk: {
    title: 'Тест клавіатури онлайн – Перевірка кожної клавіші | KeyCheck',
    desc: 'Зробіть тест клавіатури онлайн безкоштовно прямо у браузері. Перевірте кожну клавішу в реальному часі, виявіть залипання кнопок та несправності.',
    h1: 'Перевірте свою клавіатуру',
    intro: 'Пройдіть тест клавіатури онлайн безкоштовно та перевірте кожну кнопку в реальному часі. Виявляйте непрацюючі, залиплі чи некоректні клавіші прямо у своєму браузері.'
  },
  th: {
    title: 'ทดสอบคีย์บอร์ดออนไลน์ – เทสคีย์บอร์ด เช็คปุ่มเสีย | KeyCheck',
    desc: 'ทดสอบคีย์บอร์ดออนไลน์ฟรี เช็คปุ่มคีย์บอร์ดเสีย ปุ่มเบิ้ล หรือปุ่มค้างได้แบบเรียลไทม์บนเบราว์เซอร์ ใช้งานได้ทั้งโน้ตบุ๊กและ PC',
    h1: 'ทดสอบคีย์บอร์ดของคุณ',
    intro: 'ทดสอบคีย์บอร์ดออนไลน์ฟรีและตรวจสอบทุกปุ่มได้แบบเรียลไทม์ ตรวจหาปุ่มที่กดไม่ติด ปุ่มค้าง หรือทำงานผิดปกติได้ทันทีบนเบราว์เซอร์ของคุณ'
  },
  es: {
    title: 'Prueba de Teclado Online – Test de Teclado y Teclas | KeyCheck',
    desc: 'Haz una prueba de teclado online gratis y verifica cada tecla en tiempo real. Detecta teclas atascadas, teclas que no responden o fallos en tu navegador.',
    h1: 'Prueba tu Teclado',
    intro: 'Realiza una prueba de teclado online gratis para verificar cada tecla en tiempo real. Detecta teclas que no responden, atascadas o con fallos directamente en tu navegador.'
  },
  fr: {
    title: 'Test Clavier en Ligne – Tester les Touches de Clavier | KeyCheck',
    desc: 'Faites un test de clavier en ligne gratuit pour vérifier chaque touche en temps réel. Détectez les touches bloquées, inactives ou défectueuses dans votre navigateur.',
    h1: 'Testez votre Clavier',
    intro: 'Testez votre clavier en ligne gratuitement et vérifiez chaque touche en temps réel. Repérez instantanément les touches inactives, bloquées ou défaillantes directement dans votre navigateur.'
  },
  de: {
    title: 'Tastatur Test Online – Tastatur und Tasten Testen | KeyCheck',
    desc: 'Tastatur online kostenlos testen und jede Taste in Echtzeit überprüfen. Finden Sie nicht reagierende, klemmende oder defekte Tasten direkt im Browser.',
    h1: 'Testen Sie Ihre Tastatur',
    intro: 'Testen Sie Ihre Tastatur online kostenlos und prüfen Sie jede Taste in Echtzeit. Finden Sie nicht reagierende, klemmende oder fehlerhafte Tasten direkt in Ihrem Browser.'
  }
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // If it is a static asset with a file extension (css, js, svg, png, etc.), serve directly
    if (/\.[a-zA-Z0-9]+$/.test(url.pathname) && !url.pathname.endsWith('.html')) {
      return env.ASSETS.fetch(request);
    }

    // Otherwise serve index.html with HTMLRewriter enhancements for localized SEO
    const indexUrl = new URL('/index.html', request.url);
    let response = await env.ASSETS.fetch(new Request(indexUrl.toString(), request));

    // Fallback if response is redirect
    if (response.status >= 300 && response.status < 400) {
      const loc = response.headers.get('Location');
      if (loc && loc !== url.pathname) {
        response = await env.ASSETS.fetch(new Request(new URL(loc, request.url).toString(), request));
      }
    }

    const langMatch = url.pathname.match(/^\/(en|hi|fil|pt|id|uk|th|es|fr|de)(\/|$)/);
    const lang = langMatch ? langMatch[1] : (url.pathname === '/' ? 'en' : null);

    if (lang && seoData[lang] && typeof HTMLRewriter !== 'undefined') {
      const data = seoData[lang];
      const canonicalUrl = `${url.origin}/${lang}`;
      const fallbackHtml = `
        <header class="mb-12 text-center max-w-2xl mx-auto space-y-4 mt-4 md:mt-8" style="text-align: center; margin: 2rem auto; padding: 0 1rem;">
          <h1 class="text-3xl font-bold tracking-tight text-primary uppercase" style="font-size: 1.875rem; font-weight: 700;">${data.h1}</h1>
          <p class="text-muted-foreground text-sm leading-relaxed whitespace-pre-line" style="color: #6b7280; font-size: 0.875rem; line-height: 1.625; margin-top: 1rem;">${data.intro}</p>
        </header>
      `;

      return new HTMLRewriter()
        .on('html', {
          element(el) {
            el.setAttribute('lang', lang);
          }
        })
        .on('title', {
          element(el) {
            el.setInnerContent(data.title);
          }
        })
        .on('meta[name="description"]', {
          element(el) {
            el.setAttribute('content', data.desc);
          }
        })
        .on('link[rel="canonical"]', {
          element(el) {
            el.setAttribute('href', canonicalUrl);
          }
        })
        .on('div#root', {
          element(el) {
            el.setInnerContent(fallbackHtml, { html: true });
          }
        })
        .transform(response);
    }

    return response;
  }
};
