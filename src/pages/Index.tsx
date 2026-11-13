import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { JourneyIntroSection, ServicesSection, StepByStepPathwaySection, ServiceDetailsSection } from "@/components/home/ServicesSection";
import {
  WhyChooseUsSection,
  PilotTrainingInIndiaSection,
} from "@/components/home/WhyChooseUsSection";
import { WorldMapSection } from "@/components/home/WorldMapSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { CTASection } from "@/components/home/CTASection";
import { HOME_FAQS } from "@/lib/homeFaqs";

const HOME_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.flystar.co.in/#webpage",
      name: "DGCA Ground Classes in Delhi | CPL & ATPL Training – Flystar",
      url: "https://www.flystar.co.in/",
      isPartOf: { "@id": "https://www.flystar.co.in/#website" },
      about: { "@id": "https://www.flystar.co.in/#organization" },
      description:
        "DGCA CPL and ATPL ground classes in Dwarka, Delhi. Explore aviation subjects, exam preparation, RTR(A) training and career guidance at Flying Star Aviator.",
      inLanguage: "en-IN",
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.flystar.co.in/#faq-home",
      mainEntity: HOME_FAQS.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      })),
    },
  ],
};

const Index = () => {
  return (
    <Layout>
      
        {/* Title, description, canonical and OG are set centrally by useMeta. */}
        <script type="application/ld+json">{JSON.stringify(HOME_SCHEMA)}</script>
      
      <HeroSection />
      <JourneyIntroSection />
      <ServicesSection />
      <StepByStepPathwaySection />
      <ServiceDetailsSection />
      <WhyChooseUsSection />
      <PilotTrainingInIndiaSection />
      <WorldMapSection />
      <TestimonialsSection />
      <PartnersSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
