document.addEventListener("DOMContentLoaded", () => {
  const totalElements = document.querySelectorAll("[data-fixed-hide]");
  const fixedElement = document.querySelector("[data-fixed-block]");
  if (!totalElements.length || !fixedElement) return;
  const observer = new IntersectionObserver(
    (entries) => {
      let anyIntersecting = false;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anyIntersecting = true;
        }
      });
      if (anyIntersecting) {
        fixedElement.classList.add("visible");
      } else {
        fixedElement.classList.remove("visible");
      }
    },
    {
      threshold: 0.2
    }
  );
  totalElements.forEach((el) => observer.observe(el));
});
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
function updateGridPlaceholders() {
  const container = document.querySelector(".compound__body");
  if (!container) {
    console.warn("Контейнер .compound__body не найден");
    return;
  }
  const items = container.querySelectorAll(".compound__item");
  const existingPlaceholders = container.querySelectorAll(".grid-placeholder");
  existingPlaceholders.forEach((placeholder) => placeholder.remove());
  const computedStyle = getComputedStyle(container);
  const gridColumns = computedStyle.gridTemplateColumns.split(" ").length;
  if (!gridColumns || gridColumns === 0) {
    console.warn("Не удалось определить количество колонок");
    return;
  }
  const rows = Math.ceil(items.length / gridColumns);
  const totalCells = gridColumns * rows;
  const emptyCells = totalCells - items.length;
  for (let i = 0; i < emptyCells; i++) {
    const placeholder = document.createElement("div");
    placeholder.classList.add("grid-placeholder");
    container.appendChild(placeholder);
  }
}
document.addEventListener("DOMContentLoaded", updateGridPlaceholders);
const debouncedUpdate = debounce(updateGridPlaceholders, 200);
window.addEventListener("resize", debouncedUpdate);
const starGroups = document.querySelectorAll(".options-rating");
if (starGroups.length) {
  starGroups.forEach((group) => {
    const items = group.querySelectorAll(".options-rating__item");
    items.forEach((item, index) => {
      const input = item.querySelector(".options-rating__input");
      input.addEventListener("change", () => {
        items.forEach((el) => el.classList.remove("is-active"));
        for (let i = 0; i <= index; i++) {
          items[i].classList.add("is-active");
        }
      });
    });
  });
}
