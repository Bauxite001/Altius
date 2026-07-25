import { useState, useEffect, useRef } from 'react';

interface Props {
  end: number;
  suffix?: string;
  duration?: number;
  label: string;
  icon?: React.ReactNode;
}

export default function AnimatedCounter({ end, suffix = '', duration = 2000, label, icon }: Props) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(end);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  return (
    <div ref={ref} className="text-center">
      {icon && <div className="flex justify-center mb-3">{icon}</div>}
      <div className="font-display text-4xl lg:text-5xl font-bold text-white">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-emerald-200 text-sm mt-2 font-medium">{label}</div>
    </div>
  );
}
