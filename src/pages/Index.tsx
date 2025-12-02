import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { ProgramsSection } from "@/components/home/ProgramsSection";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { ImpactSection } from "@/components/home/ImpactSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ProgramsSection />
      <WhyChooseUsSection />
      <ImpactSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
