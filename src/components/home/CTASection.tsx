import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-forest via-forest-light to-forest p-12 md:p-20">
          {/* Pattern */}
          <div className="absolute inset-0 geometric-pattern opacity-20" />

          {/* Content */}
          <div className="relative text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/20 mb-8">
              <Heart className="w-8 h-8 text-gold fill-gold" />
            </div>

            <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
              Join Us in Building a Stronger, Kinder, and More Empowered{" "}
              <span className="text-gradient-gold">Ummah</span>
            </h2>

            <p className="text-primary-foreground/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Whether you're seeking support or looking to make a difference, we're here to help create lasting positive change together.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/apply">
                  Apply for Support
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <a href="/#disbursement">Track Disbursement</a>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <Link to="/partnerships">Become a Partner</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
