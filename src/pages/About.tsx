import { Layout } from "@/components/layout/Layout";
import { Heart, Eye, Target, CheckCircle2 } from "lucide-react";

const coreValues = [
  { title: "Transparency", description: "Open and honest in all our operations and reporting." },
  { title: "Integrity", description: "Upholding the highest ethical standards in everything we do." },
  { title: "Compassion", description: "Leading with empathy and genuine care for all communities." },
  { title: "Accountability", description: "Taking responsibility for our actions and their impact." },
  { title: "Sustainability", description: "Creating lasting solutions for long-term change." },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-gold/20 text-gold text-sm font-medium mb-6">
              About Us
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Who We Are
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              The Ummah Relief and Development Fund is an independent humanitarian and development organization dedicated to empowering communities through sustainable support programs.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Vision */}
            <div className="bg-card rounded-2xl p-10 shadow-card">
              <div className="w-16 h-16 rounded-xl bg-gold/10 flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-gold" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Our Vision
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                A world where every community has access to education, clean water, and opportunities for growth. We envision thriving communities where no one is left behind.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-card rounded-2xl p-10 shadow-card">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Our Mission
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To support vulnerable institutions and individuals with transparent, impactful, and sustainable assistance grounded in compassion and accountability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-secondary geometric-pattern">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              What Guides Us
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground text-lg">
              These principles are the foundation of everything we do.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {coreValues.map((value, index) => (
              <div
                key={value.title}
                className="bg-card rounded-xl p-6 shadow-soft hover:shadow-card transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
                <Heart className="w-10 h-10 text-gold fill-gold" />
              </div>
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-8">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-center leading-relaxed">
                Founded with a vision to create meaningful change, the Ummah Relief and Development Fund has grown from a small initiative into a global organization reaching communities across multiple continents. Our journey began with a simple belief: that every person deserves access to basic necessities and opportunities for growth.
              </p>
              <p className="text-center leading-relaxed mt-6">
                Today, we continue to expand our reach, partnering with local organizations, governments, and communities to deliver sustainable solutions that create lasting impact. Our commitment to transparency and accountability has earned us the trust of donors and beneficiaries alike.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
