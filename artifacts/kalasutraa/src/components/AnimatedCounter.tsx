import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

export function AnimatedCounter({ 
  value, 
  duration = 2,
  suffix = '',
}: { 
  value: number; 
  duration?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (duration * 1000);

        if (progress < 1) {
          // easeOutExpo
          const current = value * (1 - Math.pow(2, -10 * progress));
          setCount(Math.floor(current));
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(value);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [value, duration, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
}
