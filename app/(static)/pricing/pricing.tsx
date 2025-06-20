
import { BsStars } from "react-icons/bs";

import { AnimatedShinyText } from "@/components/animated/animated-shiny-text";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/utils/link";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <>
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
        <div className="text-center space-y-3">
          <div className="group rounded-full border bg-card max-w-fit mx-auto">
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <BsStars className="inline-block size-4 mr-2 text-yellow-300 transition-transform duration-600 ease-in-out group-hover:rotate-180" />
              <span>
                Get started Now
              </span>
            </AnimatedShinyText>
          </div>
          <p
            className="mx-auto font-medium text-base max-w-[38rem] text-muted-foreground"
            data-aos="zoom-in-up"
            data-aos-delay={100}
          >
            At Nexonauts, we offer flexible plans tailored to suit every
            developer, whether you're an individual creator, a growing team, or
            an enterprise seeking comprehensive solutions.
          </p>
        </div>
        <PricingTable />
      </div>
    </>
  );
}

const pricing_plans = [
  {
    title: "Free",
    price: "$0",
    is_popular: false,
    features: [
      "Basic access to search engine for tool discovery",
      "Limited marketplace browsing",
      "Submission of one tool to our platform",
      "Essential resource directory access",
    ],
  },
  {
    title: "Pro",
    price: "$4.99",
    is_popular: true,
    features: [
      "Full access to advanced search engine for comprehensive tool discovery",
      "Expanded marketplace access with selling capabilities",
      "Submission of up to five tools",
      "Enhanced resource directory for learning",
    ],
  },
  {
    title: "Premium",
    price: "$9.99",
    is_popular: false,
    features: [
      "All features from Pro plan",
      "Increased visibility in the marketplace.",
      "Submission of up to fifteen tools",
      "Priority support and exclusive resources",
    ],
  },
]

function PricingTable() {
  return (
    <section className=" w-full py-12  flex items-center justify-center">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3 md:gap-8">
          {pricing_plans.map((plan, index) => {
            return (
              <div
                key={index}
                className={cn(
                  'relative flex flex-col p-6 bg-card shadow-lg rounded-2xl justify-between border',
                  plan.is_popular
                    ? "border-primary hover:border-primary/80 shadow-primary/20 hover:shadow-xl"
                    : "border-border hover:border-primary",
                  'transition-all duration-300 hover:translate-y-[-16px]'
                )}
              >
                {plan.is_popular && (
                  <Badge variant="gradient_purple" className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    Popular
                  </Badge>
                )}
                <div>
                  <h3 className="text-2xl font-bold text-center">{plan.title}</h3>
                  <div className="mt-4 text-center text-muted-foreground">
                    <span className="text-4xl font-bold">{plan.price}</span>/ month
                  </div>
                  <ul className="my-4 space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <span className="scale-[0.8] size-6 bg-green-500 rounded-full mr-2  aspect-square inline-flex items-center justify-center">
                          <IconCheck className="text-white size-4" />
                        </span>
                        <span className="text-foreground/80 text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <ButtonLink
                    variant={plan.is_popular ? "gradient_purple" : "outline"}
                    size="lg"
                    rounded="full"
                    width="full"
                    href={`/signup?=plan${plan.title.toLowerCase()}`}

                  >
                    Get Started
                  </ButtonLink>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}

function IconCheck(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
