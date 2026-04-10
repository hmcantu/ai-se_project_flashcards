document.querySelectorAll(".accordion__header").forEach((button) => {
  button.addEventListener("click", () => {
    const accordionItem = button.parentElement;
    const isActive = accordionItem.classList.contains("accordion__item_active");

    // Close all other items
    document.querySelectorAll(".accordion__item").forEach((item) => {
      item.classList.remove("accordion__item_active");
    });

    // Toggle current item
    if (!isActive) {
      accordionItem.classList.add("accordion__item_active");
    }
  });
});
