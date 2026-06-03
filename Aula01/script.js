// 3. A mágica acontece aqui — 3 linhas!
function animar() {

  // gsap.to() anima um elemento para um estado
  // Primeiro argumento: qual elemento (.card)
  // Segundo argumento: o que muda e como

  gsap.to(".card", {

    // Move 100px para a direita no eixo X
    x: 100,

    // Faz aparecer do zero (opacity 0 → 1)
    opacity: 1,

    // Duração da animação em segundos
    duration: 0.6,

    // Tipo de aceleração (easing) — "power2.out"
    // faz começar rápido e desacelerar no fim
    ease: "power2.out"

  });
}

// BÔNUS: gsap.from() faz o caminho contrário
// O elemento começa no estado descrito e vai
// para o estado atual no CSS
gsap.from(".card", {
  y: -50,      // começa 50px acima
  opacity: 0,  // começa invisível
  duration: 0.8
});