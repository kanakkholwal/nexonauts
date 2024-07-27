import { Button } from "@/components/ui/button";
import newsletter from "./newsletter-bg.svg";
export default function NewLetter() {
  return (
    <section
      id="newsletter"
      className="w-full h-[400px] max-w-7xl mx-auto flex flex-col items-center justify-center bg-center bg-cover bg-no-repeat relative overflow-hidden rounded-lg shadow-lg dark:shadow-neutral/50 my-10"
      // style={{
      //   backgroundImage: `url(${newsletter.src})`,
      // }}
    >
      <h2 className="text-4xl font-bold text-neutral-200">
        Subscribe to our Newsletter
      </h2>
      <p className="text-lg text-neutral-400">
        Get the latest news and updates from our blog
      </p>
      <div className="flex gap-3 items-stretch mt-4 mx-auto justify-center w-full">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full max-w-sm px-4 py-2 rounded-lg bg-[hsla(0,0%,85%,0.2)] text-neutral-200 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:border-primary"
        />
        <Button variant="light" size="lg" rounded="full">
          Subscribe
        </Button>
      </div>
    </section>
  );
}
