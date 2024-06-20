"use strict";

import { loadLanguageContent } from "./lang.js";
import { setupPricingOptions } from "./pricing.js";
import { setupContinueButton } from "./content.js";

document.addEventListener("DOMContentLoaded", function () {
  const supportedLanguages = ["de", "en", "es", "fr", "pt", "ja"];

  // Determining the system language + lang parameter from the query string
  const systemLanguage = navigator.language.slice(0, 2);
  const urlParams = new URLSearchParams(window.location.search);
  let selectedLanguage = urlParams.get("lang") || systemLanguage;

  // Checking language support
  if (!supportedLanguages.includes(selectedLanguage)) {
    selectedLanguage = "en";
  }

  const allPrices = {
    YEARLY_ACCESS_PER_YEAR: "$39.99",
    YEARLY_ACCES_PER_WEEK: "$0.48",
    WEEKLY_ACCESS: "$6.99",
  };

  loadLanguageContent(selectedLanguage, allPrices);
  setupPricingOptions();
  setupContinueButton();
});
