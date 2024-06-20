
// Loading and updating language content on a web page
export function loadLanguageContent(language, allPrices) {
  fetch(`langs/${language}.json`)
    .then((response) => response.json())
    .then((data) => {
      updateLanguageContent(data, allPrices);
    })
    .catch((error) => {
      console.error("Error loading language content:", error);
      if (language !== "en") {
        loadLanguageContent("en", allPrices);
      }
    });
}

// updates the textual content of elements on a web page based on the received data
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

      // Replaces placeholder values, if any
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

  // Updating an additional price separately
  const yearlyPricePerWeekElement = document.getElementById("yearlyPricePerWeek");
  if (yearlyPricePerWeekElement) {
    const yearlyPricePerWeekText = data["{{price}} <br>per week"] || "{{price}} <br>per week";
    yearlyPricePerWeekElement.innerHTML = yearlyPricePerWeekText.replace(
      "{{price}}",
      replacements.YEARLY_ACCES_PER_WEEK
    );
  }
  updateBestOfferText(data["BEST OFFER"]);
}

// updates the textual content of the ::after
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