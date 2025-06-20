import { Pricing } from "./pricing";

export default async function Page() {
  return (
    <>
      <div className="relative" id="home">
        <div
          aria-hidden="true"
          className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
        >
          <div className="blur-[106px] h-56 bg-linear-to-br from-primary to-purple-400 dark:from-blue-700" />
          <div className="blur-[106px] h-32 bg-linear-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
          <div className="relative pt-36 ml-auto">
            <div className="lg:w-2/3 text-center mx-auto">
              <h1 className="text-foreground font-bold text-2xl md:text-3xl xl:text-4xl">
                Our Pricing Plan
              </h1>
              <h5 className="text-muted-foreground font-medium text-base md:text-lg mt-2">
                Choose the plan that best suits your needs
              </h5>
            </div>
          </div>
        </div>
      </div>
      <Pricing />
    </>
  );
}
