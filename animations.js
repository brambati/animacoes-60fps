// ─────────────────────────────────────────────
// Web Animations API: performance de CSS com controle de JS
// ─────────────────────────────────────────────
const reduzir = matchMedia('(prefers-reduced-motion: reduce)').matches;

// 1. Animação básica
const box = document.querySelector('.palco .box:not(.box-seq)');
const animation = box.animate(
  [
    { transform: 'translateX(0) scale(1)', opacity: 1 },
    { transform: 'translateX(min(70vw, 760px)) scale(1.2)', opacity: 0.8 },
  ],
  {
    duration: 800,
    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    iterations: Infinity,
    direction: 'alternate',
    fill: 'both',
  }
);
if (reduzir) animation.pause();

// 2. Controles programáticos
document.getElementById('btn-pause').addEventListener('click', () => {
  animation.playState === 'running' ? animation.pause() : animation.play();
});
document.getElementById('btn-reverse').addEventListener('click', () => animation.reverse());
document.getElementById('btn-fast').addEventListener('click', () => {
  animation.playbackRate = animation.playbackRate === 2 ? 1 : 2;
});

// 3. Encadeamento com .finished (uma Promise)
async function sequencia(el) {
  await el.animate(
    [{ transform: 'translateX(300px)', opacity: 0 }, { transform: 'translateX(0)', opacity: 1 }],
    { duration: 400, easing: 'ease-out', fill: 'forwards' }
  ).finished;

  await el.animate(
    [{ transform: 'scale(1)' }, { transform: 'scale(1.15)' }, { transform: 'scale(1)' }],
    { duration: 300, easing: 'ease-in-out' }
  ).finished;

  console.log('Sequência completa!');
}
document.getElementById('btn-seq').addEventListener('click', () => sequencia(document.querySelector('.box-seq')));

// 4. Entradas no scroll: IntersectionObserver + WAAPI
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.animate(
      [
        { opacity: 0, transform: 'translateY(24px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ],
      {
        duration: reduzir ? 0 : 500,
        easing: 'ease-out',
        fill: 'forwards',
        delay: Number(entry.target.dataset.delay) || 0,
      }
    );
    observer.unobserve(entry.target);
  });
}, { rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.fade-in-up').forEach((el) => observer.observe(el));
