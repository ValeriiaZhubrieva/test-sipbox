import "./app.min.js";
import "./category.min2.js";
/* empty css              */
/* empty css             */
function miniSelect(selParent, selOptions) {
  const selParents = document.querySelectorAll(selParent);
  if (selParents.length) {
    selParents.forEach((selBlock) => {
      const selDropdownButton = selBlock.querySelector(".sel-block__current");
      const selDropdownButtonSpan = selBlock.querySelector(".sel-block__current-value");
      const selTitles = selBlock.querySelectorAll(selOptions);
      let isOpen = false;
      function closeDropdown() {
        selBlock.classList.remove("sel-open");
        isOpen = false;
        document.removeEventListener("click", handleDocumentClick);
      }
      function handleDocumentClick(e) {
        if (!selBlock.contains(e.target)) {
          closeDropdown();
        }
      }
      selDropdownButton.addEventListener("click", (e) => {
        e.stopPropagation();
        isOpen = !isOpen;
        selBlock.classList.toggle("sel-open", isOpen);
        if (isOpen) {
          document.addEventListener("click", handleDocumentClick);
        } else {
          document.removeEventListener("click", handleDocumentClick);
        }
      });
      selTitles.forEach((item) => {
        item.addEventListener("click", function(e) {
          e.stopPropagation();
          selDropdownButtonSpan.innerHTML = item.innerHTML;
          closeDropdown();
          selTitles.forEach((otherItem) => otherItem.classList.toggle("is-active", otherItem === item));
        });
      });
    });
  }
}
miniSelect("[data-sel-block]", "[data-sel-btn]");
