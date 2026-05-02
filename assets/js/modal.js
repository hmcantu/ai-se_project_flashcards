/** @type {Function|null} Stores the callback function to be executed upon confirmation */
let onConfirmCallback = null;

/**
 * Opens the confirmation modal and assigns the provided callback function.
 * @param {Function} onConfirm - The function to run if the user clicks the confirm button.
 * @returns {void}
 */
export function openModal(onConfirm) {
  onConfirmCallback = onConfirm;
  const deleteModal = document.querySelector("#delete-modal");
  
  if (deleteModal) {
    deleteModal.classList.add("modal_opened");
    setupModalListeners(deleteModal);
  }
}

/**
 * Closes the confirmation modal and resets the confirm callback.
 * @returns {void}
 */
export function closeModal() {
  const deleteModal = document.querySelector("#delete-modal");
  if (deleteModal) {
    deleteModal.classList.remove("modal_opened");
  }
  onConfirmCallback = null;
}

/**
 * Sets up event listeners for the modal buttons and overlay click.
 * Uses the .onclick property to ensure single listener attachment.
 * @param {HTMLElement} modal - The modal DOM element.
 * @returns {void}
 */
function setupModalListeners(modal) {
  const confirmBtn = modal.querySelector("#confirm-delete");
  const cancelBtn = modal.querySelector("#cancel-delete");

  if (confirmBtn) {
    confirmBtn.onclick = () => {
      if (onConfirmCallback) {
        onConfirmCallback();
      }
      closeModal();
    };
  }

  if (cancelBtn) {
    cancelBtn.onclick = closeModal;
  }

  modal.onclick = (e) => {
    if (e.target === modal) {
      closeModal();
    }
  };
}