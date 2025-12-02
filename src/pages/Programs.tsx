import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GraduationCap, Droplets, Building2, HeartHandshake, ArrowRight, BookOpen, Home, Stethoscope, Package } from "lucide-react";
import orphanImg from "@/assets/orphan-education.jpg";
import waterImg from "@/assets/water-project.jpg";
import communityImg from "@/assets/community-dev.jpg";
import reliefImg from "@/assets/emergency-relief.jpg";

const programs = [
  {
    id: "education",
    icon: GraduationCap,
    title: "Education Support",
    description: "Empowering the next generation through quality education and comprehensive support.",
    image: orphanImg,
    features: [
      { icon: BookOpen, text: "Classroom construction and renovation" },
      { icon: Package, text: "School supplies and learning materials" },
      { icon: GraduationCap, text: "Scholarships for vulnerable students" },
      { icon: HeartHandshake, text: "Orphan care and support programs" },
    ],
  },
  {
    id: "water",
    icon: Droplets,
    title: "Water & Sanitation",
    description: "Providing access to clean water and improving sanitation for healthier communities.",
    image: waterImg,
    features: [
      { icon: Droplets, text: "Borehole construction and maintenance" },
      { icon: Droplets, text: "Clean water distribution systems" },
      { icon: Home, text: "Sanitation facilities construction" },
      { icon: HeartHandshake, text: "Hygiene education programs" },
    ],
  },
  {
    id: "community",
    icon: Building2,
    title: "Community Development",
    description: "Building infrastructure that supports sustainable community growth and development.",
    image: communityImg,
    features: [
      { icon: Home, text: "Dormitory construction" },
      { icon: Building2, text: "Staff housing development" },
      { icon: Stethoscope, text: "Community health centers" },
      { icon: Building2, text: "Multi-purpose community centers" },
    ],
  },
  {
    id: "relief",
    icon: HeartHandshake,
    title: "Humanitarian Aid",
    description: "Rapid response to emergencies with essential supplies and support services.",
    image: reliefImg,
    features: [
      { icon: Package, text: "Food distribution programs" },
      { icon: HeartHandshake, text: "Emergency response teams" },
      { icon: Home, text: "Temporary shelter provision" },
      { icon: Stethoscope, text: "Medical supplies and support" },
    ],
  },
];

const Programs = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-gold/20 text-gold text-sm font-medium mb-6">
              Our Programs
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Creating Lasting Impact
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              We focus on sustainable programs that empower communities and create long-term positive change through education, water access, development, and emergency relief.
            </p>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-24">
            {programs.map((program, index) => (
              <div
                key={program.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="relative rounded-2xl overflow-hidden shadow-card">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full aspect-[4/3] object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center shadow-lg">
                        <program.icon className="w-7 h-7 text-gold" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                    {program.title}
                  </h2>
                  <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                    {program.description}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {program.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-4 rounded-xl bg-secondary"
                      >
                        <feature.icon className="w-5 h-5 text-gold flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Button variant="default" asChild>
                      <Link to="/apply">
                        Request Support
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/partnerships">Partner With Us</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary geometric-pattern">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Whether you need support for your community or want to contribute to our mission, we're here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="gold" size="lg" asChild>
              <Link to="/apply">Apply for Support</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Programs;
