import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Droplets, Building2, HeartHandshake } from "lucide-react";
import orphanImg from "@/assets/orphan-education.jpg";
import waterImg from "@/assets/water-project.jpg";
import communityImg from "@/assets/community-dev.jpg";
import reliefImg from "@/assets/emergency-relief.jpg";

const programs = [
  {
    icon: GraduationCap,
    title: "Orphan Support & Education",
    description: "Tuition, supplies, meals, and safe learning spaces for vulnerable children.",
    image: orphanImg,
    color: "bg-forest",
  },
  {
    icon: Droplets,
    title: "Water & Sanitation",
    description: "Boreholes, clean water systems, and hygiene programs for communities.",
    image: waterImg,
    color: "bg-blue-600",
  },
  {
    icon: Building2,
    title: "Community Development",
    description: "Building classrooms, dormitories, clinics, and staff housing.",
    image: communityImg,
    color: "bg-amber-600",
  },
  {
    icon: HeartHandshake,
    title: "Emergency Relief",
    description: "Food packages, shelter, and medical support during crises.",
    image: reliefImg,
    color: "bg-red-600",
  },
];

export function ProgramsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold text-sm font-medium mb-4">
            Our Programs
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Creating Lasting Impact
          </h2>
          <p className="text-muted-foreground text-lg">
            We focus on sustainable programs that empower communities and create long-term positive change.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((program, index) => (
            <div
              key={program.title}
              className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-500"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/90 via-forest-dark/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${program.color} text-primary-foreground mb-4`}>
                  <program.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-semibold text-primary-foreground mb-2">
                  {program.title}
                </h3>
                <p className="text-primary-foreground/80 text-sm mb-4">
                  {program.description}
                </p>
                <Link
                  to="/programs"
                  className="inline-flex items-center gap-2 text-gold text-sm font-medium hover:gap-3 transition-all"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="default" size="lg" asChild>
            <Link to="/programs">
              View All Programs
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
