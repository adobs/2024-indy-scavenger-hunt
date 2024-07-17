import  { useEffect } from 'react';
import './Fireworks.css';

const Fireworks = () => {
  useEffect(() => {
    const createFirework = () => {
      const firework = document.createElement('div');
      firework.className = 'firework';
      firework.style.left = `${Math.random() * 100}vw`;
      firework.style.top = `${Math.random() * 100}vh`;

      const colors = ['#FF0000', '#00FFFF', '#00FF00', '#FFFF00', '#800080', '#FFA500', '#FFC0CB'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      firework.style.backgroundColor = randomColor;
      firework.style.boxShadow = `0 0 60px 20px ${randomColor}`;
      
      document.body.appendChild(firework);

      setTimeout(() => {
        firework.remove();
      }, 1000);
    };

    const interval = setInterval(createFirework, 500);
    return () => clearInterval(interval);
  }, []);

  return null;
};

export default Fireworks;
