import React, { useEffect, useRef } from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = () => {
  const backgroundRef = useRef(null);
  const circlesRef = useRef([]);
  const requestRef = useRef();
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const circles = [];
    const numCircles = 8;
    const canvas = backgroundRef.current;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mousePos.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    // Inicializar círculos con posiciones aleatorias
    for (let i = 0; i < numCircles; i++) {
      circles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: 15 + Math.random() * 20,
        speedX: 0,
        speedY: 0,
        trail: []
      });
    }
    circlesRef.current = circles;

    const animate = () => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      circlesRef.current.forEach((circle, index) => {
        const dx = mousePos.current.x - circle.x;
        const dy = mousePos.current.y - circle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        circle.speedX = circle.speedX * 0.98 + (dx / distance) * 0.5;
        circle.speedY = circle.speedY * 0.98 + (dy / distance) * 0.5;

        circle.x += circle.speedX;
        circle.y += circle.speedY;

        circle.trail.push({ x: circle.x, y: circle.y });

        if (circle.trail.length > 10) {
          circle.trail.shift();
        }

        circle.trail.forEach((point, i) => {
          ctx.beginPath();
          ctx.arc(point.x, point.y, circle.size * (i / circle.trail.length), 0, Math.PI * 2);
          ctx.fillStyle = '#000000';
          ctx.globalAlpha = (i / circle.trail.length) * 0.3;
          ctx.fill();
          ctx.closePath();
        });

        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
        ctx.fillStyle = '#000000';
        ctx.globalAlpha = 0.4;
        ctx.fill();
        ctx.closePath();
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return <canvas ref={backgroundRef} className="animated-background" />;
};

export default AnimatedBackground;