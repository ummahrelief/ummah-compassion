import { useEffect, useState, useRef } from "react";
import { Users, Building, Globe, Handshake } from "lucide-react";

const stats = [
  { icon: Building, value: 18, suffix: "+", label: "Community Projects" },
  { icon: Users, value: 400, suffix: "+", label: "Children Supported" },
  { icon: Globe, value: 12, suffix: "+", label: "Countries Reached" },
  { icon: Handshake, value: 50, suffix: "+", label: "Verified Partners" },
];

function AnimatedCounter({ value, suffix, duration = 2000 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = value;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, value, duration]);

  return (
    <div ref={ref} className="font-display text-5xl md:text-6xl font-bold text-primary-foreground">
      {count}
      <span className="text-gold">{suffix}</span>
    </div>
  );
}

export function ImpactSection() {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 geometric-pattern opacity-10" />

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/20 text-gold text-sm font-medium mb-4">
            Our Impact
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Transforming Lives Together
          </h2>
          <p className="text-primary-foreground/80 text-lg">
            Every number represents a life changed, a community empowered, and hope restored.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-8 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur-sm"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <stat.icon className="w-10 h-10 text-gold mx-auto mb-4" />
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="text-primary-foreground/70 mt-2 text-sm md:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
