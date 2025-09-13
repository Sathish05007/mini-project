//Category script
  document.addEventListener('DOMContentLoaded', () => {
    const box = document.getElementById('categoryBox');
    const btnLeft = document.getElementById('btnLeft');
    const btnRight = document.getElementById('btnRight');

    if (!box || !btnLeft || !btnRight) {
      console.error('Missing elements: ensure #categoryBox, #btnLeft and #btnRight exist');
      return;
    }

    // Scroll step — responsive (70% of visible width) with a fallback
    const getStep = () => Math.max(100, Math.round(box.clientWidth * 0.7));

    btnLeft.addEventListener('click', () => {
      box.scrollBy({ left: -getStep(), behavior: 'smooth' });
      // update state after the smooth scroll has time to move
      setTimeout(updateButtons, 100);
    });

    btnRight.addEventListener('click', () => {
      box.scrollBy({ left: getStep(), behavior: 'smooth' });
      setTimeout(updateButtons, 100);
    });

    // enable/disable buttons depending on scroll position
    function updateButtons() {
      // small epsilon for float rounding
      const atStart = box.scrollLeft <= 1;
      const atEnd = box.scrollLeft + box.clientWidth >= box.scrollWidth - 1;
      btnLeft.disabled = atStart;
      btnRight.disabled = atEnd;
    }

    // update while user scrolls (drag/swipe)
    box.addEventListener('scroll', () => {
      if (typeof updateButtons._ticking === 'undefined' || !updateButtons._ticking) {
        updateButtons._ticking = true;
        requestAnimationFrame(() => {
          updateButtons();
          updateButtons._ticking = false;
        });
      }
    });

    // initial state
    updateButtons();

  });
