'use strict';

document.addEventListener("DOMContentLoaded", function () {

  const supportedLanguages = ["de", "en", "es", "fr", "pt", "ja"];

  // Определяем язык системы + параметры lang  из строки запроса
  const systemLanguage = navigator.language.slice(0, 2);
  const urlParams = new URLSearchParams(window.location.search);
  let selecetedLanguage = urlParams.get("lang") || systemLanguage;

  //  Проверяем язык на поддержку
  if (!supportedLanguages.includes(selecetedLanguage)) {
    selecetedLanguage = "en";
  }

  loadLanguageContent(selecetedLanguage);

  // Подгружаем языковые строки в зависимости от выбранного
  function loadLanguageContent(language) {
    fetch(`langs/${language}.json`)
      .then((response) => response.json())
      .then((data) => {
        const price = "19.99";
        updateLanguageContent(data, { price });
      })
      .catch(error => {
        console.error("Error loading language content:", error);
        if (language !== "en") {
          loadLanguageContent("en");
        }
      })
  }

  // Обновляем содержимое ключевых элементов
  function updateLanguageContent(data, replacements) {
    const elements = {
      access: "Get Unlimited <br>Access",
      artCreation: "Unlimited Art <br>Creation",
      styles: "Exclusive <br>Styles",
      avatars: "Magic Avatars <br>With 20% Off",
      yearlyAccess: "YEARLY ACCESS",
      bestOffer: "BEST OFFER",
      yearlyPrice: "Just {{price}} per year",
      weeklyAccess: "WEEKLY ACCESS",
      weeklyPrice: "{{price}} <br>per week",
      terms: "Terms of Use",
      privacy: "Privacy Policy",
      restore: "Restore",
      continue: "Continue",
    };

    for (const [elementId, dataKey] of Object.entries(elements)) {
      const element = document.getElementById(elementId);
      if (element) {
        element.innerHTML = replacePlaceholders(data[dataKey], replacements);
      }
    }
  }

  // Заменяем значения в строке на значения из словаря
  function replacePlaceholders(text, replacements) {
    return text.replace(/\{\{(\w+)\}\}/g, (_, key) => replacements[key] || "");
  }
});
