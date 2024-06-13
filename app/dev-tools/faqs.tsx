import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function FAQs() {
  return (
    <div className="w-full grow mx-auto px-4 sm:px-12 xl:max-w-6xl xl:px-0 pt-[70px] relative">
      <h1 className="text-4xl font-bold mb-5">Frequently Asked Questions</h1>
      <Accordion type="single" collapsible>
        {faqs.map((faq, index) => {
          return (
            <AccordionItem key={index} value={'faq_' + index}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
export const faqs = [
  {
    question: 'What types of developer tools are available on Nexonauts.com?',
    answer:
      'Nexonauts.com offers a curated selection of developer tools encompassing various programming languages, frameworks, utilities, and resources.',
  },
  {
    question:
      'Are the developer tools on Nexonauts.com created by the platform or sourced from external projects?',
    answer:
      'We feature a mix of tools developed by Nexonauts.com and carefully selected open-source projects.',
  },
  // {
  //   "question": "How do you ensure the quality and reliability of the developer tools featured on Nexonauts.com?",
  //   "answer": "We meticulously vet and review each tool before featuring it on our platform."
  // },
  {
    question:
      'Can I contribute my own developer tools to be featured on Nexonauts.com?',
    answer:
      'Absolutely! We welcome contributions from developers who wish to share their tools with the community.',
  },
  // {
  //   "question": "Are the developer tools free to use on Nexonauts.com?",
  //   "answer": "Yes, the majority of the tools featured on Nexonauts.com are available for free use."
  // },
  // {
  //   "question": "How frequently are new developer tools added to Nexonauts.com?",
  //   "answer": "We strive to regularly update our collection with new and innovative tools."
  // },
  {
    question:
      'Can I provide feedback or report issues about a specific developer tool on Nexonauts.com?',
    answer:
      'Yes, we encourage users to provide feedback, report issues, or suggest improvements for any tool featured on our platform.',
  },
  // {
  //   "question": "Are there any restrictions on using or modifying the developer tools available on Nexonauts.com?",
  //   "answer": "The usage and modification of each tool might be governed by its individual licensing terms."
  // },
  {
    question:
      'How can I stay updated about new developer tools or platform updates on Nexonauts.com?',
    answer:
      "Stay tuned to our platform's announcements, newsletters, or follow us on our social media channels.",
  },
  {
    question:
      'What should I do if I encounter any difficulties using a developer tool on Nexonauts.com?',
    answer:
      "Please reach out to our support team. We'll do our best to assist you or address any concerns you might have.",
  },
];
