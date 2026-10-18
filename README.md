# Animações a 60fps

Código do vídeo **"Animações a 60fps"** do canal da [Digital Lift](https://digitallift.com.br).

Por que algumas animações travam e outras não, com demos lado a lado: `width` × `scaleX`, `left` × `translate`, entradas com `opacity` + `translateY`, `will-change` e a Web Animations API.

## Como rodar

HTML, CSS e JavaScript puros. Sirva a pasta com qualquer servidor estático:

```bash
npx serve .
```

Para ver a diferença: DevTools › Performance (grave enquanto passa o mouse nas barras) ou DevTools › Rendering › **Frame Rendering Stats**. Para as camadas: DevTools › **Layers**.

## As três regras

1. **Só anime `transform` e `opacity`.** São as únicas propriedades que o compositor anima sem passar pelo main thread. `width`, `height`, `top`, `left`, `margin` e `padding` disparam reflow; `background-color` dispara repaint. Consulte [csstriggers.com](https://csstriggers.com).
2. **`will-change` só onde realmente anima.** Ele cria a layer na GPU antes da animação (sem jank no primeiro frame), mas cada layer gasta memória de vídeo.
3. **Precisa de controle via JS? Web Animations API.** `element.animate(keyframes, options)` devolve um objeto com `play()`, `pause()`, `reverse()`, `playbackRate` e a Promise `.finished`.

| Em vez de | Use |
|---|---|
| `width: 0 → 300px` | `transform: scaleX(0 → 1)` |
| `top` / `left` | `transform: translate()` |
| `height: 0 → auto` | `opacity` + `translateY` |

## Arquivos

- `index.html`: as cinco demos
- `style.css`: transições boas e ruins lado a lado, `will-change` e `prefers-reduced-motion`
- `animations.js`: Web Animations API, controles, `.finished` e entradas com IntersectionObserver
