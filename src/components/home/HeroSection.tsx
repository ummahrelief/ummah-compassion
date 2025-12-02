import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users, Globe } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Humanitarian aid workers helping communities"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-gradient" />
      </div>

      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0 geometric-pattern opacity-30" />

      {/* Content */}
      <div className="container relative mx-auto px-4 py-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 border border-gold/30 mb-8 animate-fade-up">
            <Heart className="w-4 h-4 text-gold fill-gold" />
            <span className="text-sm font-medium text-gold">
              Making a Difference Since 2015
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Ummah Relief &<br />
            <span className="text-gradient-gold">Development Fund</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 font-light animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Compassion in Action. Hope for Every Community.
          </p>

          {/* Description */}
          <p className="text-primary-foreground/80 text-lg mb-10 max-w-2xl leading-relaxed animate-fade-up" style={{ animationDelay: "0.3s" }}>
            We are a global humanitarian organization dedicated to uplifting vulnerable communities through education, clean water, orphan support, community development, and emergency relief.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-12 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <Button variant="hero" size="lg" asChild>
              <Link to="/apply">
                Apply for Support
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <Link to="/partnerships">Partner With Us</Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <Link to="/programs">Our Projects</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-lg animate-fade-up" style={{ animationDelay: "0.5s" }}>
            {[
              { icon: Globe, value: "12+", label: "Countries" },
              { icon: Users, value: "400+", label: "Children" },
              { icon: Heart, value: "18+", label: "Projects" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="w-6 h-6 text-gold mx-auto mb-2" />
                <div className="text-2xl font-display font-bold text-primary-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-foreground/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-gold/50 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-gold rounded-full animate-pulse-soft" />
        </div>
      </div>
    </section>
  );
}
