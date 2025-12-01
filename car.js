// car.js — подсчёт стоимости выбранных автомобилей
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const calcBtn = document.getElementById('calcBtn');
    const resetBtn = document.getElementById('resetBtn');
    const totalEl = document.getElementById('total');
    const selectedEl = document.getElementById('selectedList');

    function calculate() {
      const boxes = document.querySelectorAll('input.car[type="checkbox"]');
      let sum = 0;
      const names = [];

      boxes.forEach(cb => {
        if (cb.checked) {
          const raw = cb.value || cb.dataset.price || '0';
          const num = parseFloat(raw.toString().replace(/\s+/g, '').replace(',', '.')) || 0;
          sum += num;
          const name = cb.dataset.name || (cb.closest('label') && cb.closest('label').textContent.trim()) || 'Автомобиль';
          names.push(name);
        }
      });

      totalEl.textContent = (sum ? sum.toLocaleString('ru-RU') + ' ₽' : '0 ₽');
      selectedEl.textContent = (names.length ? names.join(', ') : 'Ничего не выбрано');
    }

    // Кнопка "Цена"
    if (calcBtn) calcBtn.addEventListener('click', calculate);

    // Кнопка "Сброс"
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        document.querySelectorAll('input.car[type="checkbox"]').forEach(cb => cb.checked = false);
        calculate();
      });
    }

    // Автоматический пересчёт при изменении чекбоксов
    document.addEventListener('change', function (e) {
      if (e.target && e.target.matches('input.car[type="checkbox"]')) calculate();
    });

    // Начальный подсчёт
    calculate();
  });
})();
