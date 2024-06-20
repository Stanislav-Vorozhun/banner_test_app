"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const supportedLanguages = ["de", "en", "es", "fr", "pt", "ja"];

  // Определяем язык системы + параметры lang из строки запроса
  const systemLanguage = navigator.language.slice(0, 2);
  const urlParams = new URLSearchParams(window.location.search);
  let selectedLanguage = urlParams.get("lang") || systemLanguage;

  // Проверяем язык на поддержку
  if (!supportedLanguages.includes(selectedLanguage)) {
    selectedLanguage = "en";
  }

  const allPrices = {
    YEARLY_ACCESS_PER_YEAR: "$39.99",
    YEARLY_ACCES_PER_WEEK: "$0.48",
    WEEKLY_ACCESS: "$6.99",
  };

  loadLanguageContent(selectedLanguage);

  // Подгружаем языковые строки в зависимости от выбранного языка
  function loadLanguageContent(language) {
    fetch(`langs/${language}.json`)
      .then((response) => response.json())
      .then((data) => {
        updateLanguageContent(data, allPrices);
      })
      .catch((error) => {
        console.error("Error loading language content:", error);
        if (language !== "en") {
          loadLanguageContent("en");
        }
      });
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
        let translatedText = data[dataKey] || dataKey;

        // Заменяем значения плейсхолдеров, если они есть
        if (dataKey === "Just {{price}} per year") {
          translatedText = translatedText.replace(
            "{{price}}",
            replacements.YEARLY_ACCESS_PER_YEAR
          );
        } else if (dataKey === "{{price}} <br>per week") {
          translatedText = translatedText.replace(
            "{{price}}",
            replacements.WEEKLY_ACCESS
          );
        }

        element.innerHTML = translatedText;
      }
    }

    // Обновляем дополнительную цену отдельно
    const yearlyPricePerWeekElement =
      document.getElementById("yearlyPricePerWeek");
    if (yearlyPricePerWeekElement) {
      const yearlyPricePerWeekText =
        data["{{price}} <br>per week"] || "{{price}} <br>per week";
      yearlyPricePerWeekElement.innerHTML = yearlyPricePerWeekText.replace(
        "{{price}}",
        replacements.YEARLY_ACCES_PER_WEEK
      );
    }
    updateBestOfferText(data["BEST OFFER"]);
  }

  //Обновляем текст псевдоэлемента Best Offer
  function updateBestOfferText(translatedText) {
    const styleSheet = document.styleSheets[0];
    const ruleIndex = Array.from(styleSheet.cssRules).findIndex(
      (rule) => rule.selectorText === ".pricing__option--yearly::after"
    );

    const newContent = `"${translatedText}"`;

    if (ruleIndex !== -1) {
      styleSheet.cssRules[ruleIndex].style.content = newContent;
    } else {
      styleSheet.insertRule(
        `.pricing__option--yearly::after { content: ${newContent}; }`,
        styleSheet.cssRules.length
      );
    }
  }

  const weeklyOption = document.querySelector(".pricing__option--weekly");
  const yearlyOption = document.querySelector(".pricing__option--yearly");
  const continueButton = document.getElementById("continue");

  weeklyOption.addEventListener("click", () => {
    toggleActiveClass(weeklyOption, yearlyOption);
  });

  yearlyOption.addEventListener("click", () => {
    toggleActiveClass(yearlyOption, weeklyOption);
  });

 
  continueButton.addEventListener("click", () => {
    const activeOption = yearlyOption.classList.contains("active")
      ? "https://www.apple.com/"
      : "https://www.google.com/";
    window.location.href = activeOption;
  });

  function toggleActiveClass(selectedOption, otherOption) {
    selectedOption.classList.add("active");
    otherOption.classList.remove("active");
  }
});
