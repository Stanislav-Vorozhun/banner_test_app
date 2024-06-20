// redirecting the user to different URLs
export function setupContinueButton() {
  const continueButton = document.getElementById("continue");
  const yearlyOption = document.querySelector(".pricing__option--yearly");
  // const weeklyOption = document.querySelector(".pricing__option--weekly");

  continueButton.addEventListener("click", () => {
    const activeOption = yearlyOption.classList.contains("active")
      ? "https://www.apple.com/"
      : "https://www.google.com/";
    window.location.href = activeOption;
  });
}
