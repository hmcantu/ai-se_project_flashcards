const modal = document.querySelector('.modal');
const cancelBtn = modal?.querySelector('.modal__cancel-btn');
const confirmBtn = modal?.querySelector('.modal__confirm-btn');

export function closeModal() {
  if (modal) {
    modal.classList.remove('modal_opened');
  }
}

export function openModal(action) {
  if (!modal || !confirmBtn) return;

  modal.classList.add('modal_opened');

  const handleConfirm = () => {
    action();
    closeModal();
  };

  confirmBtn.addEventListener('click', handleConfirm, { once: true });
}

if (cancelBtn) {
  cancelBtn.addEventListener('click', closeModal);
}

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}