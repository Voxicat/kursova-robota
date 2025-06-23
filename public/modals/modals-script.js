document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('server-modal');
  const modalClose = document.getElementById('modal-close');
  const modalName = document.getElementById('modal-server-name');
  const modalIp = document.getElementById('modal-server-ip');
  const modalMap = document.getElementById('modal-server-map');

  modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  const cards = document.querySelectorAll('.server-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const name = card.dataset.name;
      const ip = card.dataset.ip;
      const mapurl = card.dataset.mapurl;

      modalName.textContent = name;
      modalIp.textContent = ip;
      modalMap.href = mapurl;

      modal.style.display = 'flex';
    });
  });
});
