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

const HOME_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.flystar.co.in/#webpage",
      name: "DGCA-Approved Pilot Training in Delhi | CPL & ATPL Courses",
      url: "https://www.flystar.co.in/",
      isPartOf: { "@id": "https://www.flystar.co.in/#website" },
      about: { "@id": "https://www.flystar.co.in/#organization" },
      description:
        "DGCA-approved pilot training in Delhi for CPL and ATPL aspirants with expert instructors and placement-focused guidance.",
      inLanguage: "en-IN",
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.flystar.co.in/#faq-home",
      mainEntity: [
        {
          "@type": "Question",
          name: "What pilot training courses does Flying Star Aviator offer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Flying Star Aviator offers DGCA-focused CPL and ATPL ground training programs with counselling support for pilot career pathways.",
          },
        },
        {
          "@type": "Question",
          name: "Where is Flying Star Aviator located?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Flying Star Aviator is based in Dwarka, Delhi, and serves aspiring pilots from across India.",
          },
        },
      ],
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
