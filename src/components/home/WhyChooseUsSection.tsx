import { CheckCircle2, Shield, Clock, Globe, Heart, TrendingUp } from "lucide-react";

const features = [
  {
    icon: CheckCircle2,
    title: "100% Verified Projects",
    description: "Every project undergoes rigorous verification to ensure authenticity and need.",
  },
  {
    icon: Shield,
    title: "Transparent Process",
    description: "Complete transparency in fund allocation and project implementation.",
  },
  {
    icon: Clock,
    title: "Fast Assessment",
    description: "Quick evaluation and response to urgent community needs.",
  },
  {
    icon: Globe,
    title: "Global Partnerships",
    description: "Strong network of partners across 12+ countries worldwide.",
  },
  {
    icon: Heart,
    title: "Compassionate Approach",
    description: "Every decision is guided by empathy and genuine care.",
  },
  {
    icon: TrendingUp,
    title: "Long-Term Impact",
    description: "Focus on sustainable solutions that create lasting change.",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="py-24 bg-secondary geometric-pattern">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by Communities Worldwide
          </h2>
          <p className="text-muted-foreground text-lg">
            Our commitment to transparency, integrity, and impact sets us apart in humanitarian work.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
