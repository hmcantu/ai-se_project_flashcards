const modal = document.querySelector('.modal');
const cancelBtn = modal.querySelector('.modal__cancel-btn');
const confirmBtn = modal.querySelector('.modal__confirm-btn');

/**
 * Closes the modal and cleans up
 */
export function closeModal() {
  modal.classList.remove('modal_opened');
}

/**
 * @param {Function} action
 */
export function openModal(action) {
  modal.classList.add('modal_opened');

  const handleConfirm = () => {
    action();
    closeModal();
    confirmBtn.removeEventListener('click', handleConfirm);
  };

  confirmBtn.addEventListener('click', handleConfirm, { once: true });
}

cancelBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});