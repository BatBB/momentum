import i18next from 'i18next';

i18next.init({
  lng: 'en', 
  debug: true,
  resources: {
    en: {
      translation: {
        "greeting": "Good"
      }
    }
  }
});

document.querySelector('.greeting').textContent = i18next.t('greeting');