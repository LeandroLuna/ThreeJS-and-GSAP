import { gsap } from 'gsap';

const element = document.getElementById('name');
let name = element.innerHTML;

const colors = ['#FF0000', '#00FF00', 'orange', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', 'transparent', 'red', '#000080', '#FFC0CB', '#808080'];

element.innerHTML = '';

const letters = name.split('');

letters.forEach((letter, index) => {
  const span = document.createElement('span');
  span.textContent = letter;
  span.style.opacity = 0;
  span.style.transform = 'translateY(-100%)';
  const letterSpacing = index <= 7 ? `${13 * index}px` : `${(13 * (index - 1))}px`;    
  span.style.marginLeft = letterSpacing;
  span.style.color = colors[index];
  element.appendChild(span);

  gsap.to(span, { translateY: 0, opacity: 1, duration: 1, delay: 0.1 * index });
});
