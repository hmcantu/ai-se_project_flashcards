const deleteModal = document.querySelector("#delete-modal");
const confirmBtn = document.querySelector("#confirm-delete");
const cancelBtn = document.querySelector("#cancel-delete");

let onConfirmCallback = null;

export function openModal(onConfirm) {
  onConfirmCallback = onConfirm;
  const deleteModal = document.querySelector("#delete-modal");
  
  if (deleteModal) {
    deleteModal.classList.add("modal_opened");
    setupModalListeners(deleteModal);
  }
}

export function closeModal() {
  const deleteModal = document.querySelector("#delete-modal");
  if (deleteModal) {
    deleteModal.classList.remove("modal_opened");
  }
  onConfirmCallback = null;
}

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