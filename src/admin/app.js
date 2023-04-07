import MenuLogo from './extensions/gb-logo-w.png';

const config = {
  locales: [
    // 'ar',
    // 'fr',
    // 'cs',
    // 'de',
    // 'dk',
    // 'es',
    // 'he',
    // 'id',
    // 'it',
    // 'ja',
    // 'ko',
    // 'ms',
    // 'nl',
    // 'no',
    // 'pl',
    // 'pt-BR',
    // 'pt',
    // 'ru',
    // 'sk',
    // 'sv',
    // 'th',
    // 'tr',
    // 'uk',
    // 'vi',
    // 'zh-Hans',
    // 'zh',
  ],
};

const bootstrap = (app) => {
  console.log(app);
};

export default {
  config: {
    translations: {
      en: {
        'app.components.LeftMenu.navbrand.title': 'Golfklúbbur',
        'app.components.LeftMenu.navbrand.workplace': 'Borgarness'
      }
    },
    menu: {
      logo: MenuLogo
    },
    // Replace the Strapi logo in auth (login) views
    auth: {
      logo: MenuLogo,
    },
    head: {
          favicon: MenuLogo,
      },
  },
  bootstrap,
};