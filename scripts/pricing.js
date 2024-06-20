
// Interactive switching between pricing options on the page
export function setupPricingOptions() {
  const weeklyOption = document.querySelector(".pricing__option--weekly");
  const yearlyOption = document.querySelector(".pricing__option--yearly");

  weeklyOption.addEventListener("click", () => {
    toggleActiveClass(weeklyOption, yearlyOption);
  });

  yearlyOption.addEventListener("click", () => {
    toggleActiveClass(yearlyOption, weeklyOption);
  });

  function toggleActiveClass(selectedOption, otherOption) {
    selectedOption.classList.add("active");
    otherOption.classList.remove("active");
  }
}