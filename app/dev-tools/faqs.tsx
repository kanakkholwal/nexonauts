"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle, Mail, MessageCircle } from "lucide-react";

export function FAQs() {
  return (
    <section className="py-24 px-6 relative bg-gradient-to-b from-background to-muted/20">

      {/* --- Header --- */}
      <div className="max-w-2xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6">
          <HelpCircle className="w-3 h-3" />
          Support Center
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-muted-foreground">
          Everything you need to know about the Nexonauts ecosystem, marketplace, and tools.
        </p>
      </div>

      {/* --- Accordion --- */}
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="border-b border-border/50 px-2 data-[state=open]:bg-muted/30 transition-colors rounded-lg"
            >
              <AccordionTrigger className="text-left text-base md:text-lg font-medium hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6 pr-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* --- Contact CTA --- */}
      <div className="mt-20 max-w-3xl mx-auto text-center bg-card border border-border/50 rounded-2xl p-8 shadow-sm">
        <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
        <p className="text-muted-foreground mb-6">
          Can't find the answer you're looking for? Our team is here to help.
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" className="gap-2">
            <Mail className="w-4 h-4" />
            Email Support
          </Button>
          <Button className="gap-2">
            <MessageCircle className="w-4 h-4" />
            Join Discord
          </Button>
        </div>
      </div>
    </section>
  );
}

// Updated Content for Marketplace + AI + Portfolio Context
export const faqs = [
  {
    question: "What is the difference between the Basic Tools and AI Agents?",
    answer:
      "Our 'Basic Tools' are client-side utilities (like converters, formatters, and minifiers) that run instantly in your browser. Our 'Specialized AI Agents' are advanced applications designed to handle complex workflows, such as generating YouTube thumbnails, writing SEO-optimized articles, or automating social media posts.",
  },
  {
    question: "How does the Designer Marketplace work?",
    answer:
      "The Marketplace is a hub for high-quality UI resources. Designers can list their UI kits, templates, and icon sets. If you already sell on Gumroad, you can use our one-click integration to import your products and start showcasing them to the Nexonauts developer community immediately.",
  },
  {
    question: "Is the Developer Portfolio feature free?",
    answer:
      "Yes! Every user gets a free, customizable single-page portfolio. It automatically pulls data from your GitHub profile to showcase your contributions, repositories, and activity graph, acting as a live, verified resume for recruiters.",
  },
  {
    question: "Can I use the generated assets for commercial projects?",
    answer:
      "Generally, yes. Tools and generators (like CSS generators or image optimizers) produce output that you own completely. For items purchased in the Marketplace (like UI Kits), usage rights depend on the specific license provided by the creator (e.g., Personal vs. Commercial license).",
  },
  {
    question: "Do you store the code or files I process in the tools?",
    answer:
      "Privacy is our priority. Most of our utility tools (formatters, minifiers) run entirely in your browser (client-side), meaning your code or files never leave your computer. For AI tools that require server processing, data is discarded immediately after generation.",
  },
  {
    question: "How do I submit a tool to the directory?",
    answer:
      "We love open source! If you have built a useful web tool, you can submit it via our 'Submit Tool' form in the dashboard. Our team reviews submissions for quality and security before publishing them to the ecosystem.",
  },
  {
    question: "What specific 'Fashion Assistant' or niche tools are coming?",
    answer:
      "We are currently training specialized models for niche industries. This includes a Fashion Stylist agent that suggests outfits based on trends, and a Code Refactor agent that updates legacy codebases. These features are in beta and rolling out soon.",
  },
];