import { Metadata } from "next";
import Image from "next/image";
import SubmitForm from "./form";
import illustration from "./illustration.svg";

export const metadata: Metadata = {
  title: "Submit Your Tool | Dev Tools",
  description:
    "Submit your tool to the Dev Tools directory. Share your tool with the community and get feedback from developers.",
};

export default function SubmitPage() {
  return (
    <>
      <section
        id="hero"
        className="relative mb-16 flex flex-col items-center justify-center text-center bg-cover bg-center bg-no-repeat py-32 backdrop-blur-xl"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
        >
          <div className="blur-[106px] h-56 bg-linear-to-br from-primary to-purple-400 dark:from-blue-700" />
          <div className="blur-[106px] h-32 bg-linear-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
        </div>

        <h1 className="text-4xl font-bold mb-2">Submit Your Tool</h1>
        <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
          Share your tool with the community and get feedback from developers.
        </p>
      </section>
      <div className="p-4 text-center mb-5">
        <p className="text-lg text-gray-600 dark:text-gray-400 ">
          Fill out the form below to submit your tool.
        </p>

        <p className="text-lg text-gray-600 dark:text-gray-400 ">
          Please note that all submissions are reviewed before they are added to
          the directory.
        </p>
      </div>
      <div className="flex justify-around items-stretch gap-6">
        <SubmitForm />
        <div className="w-full max-w-xl hidden md:block">
          <Image
            src={illustration}
            alt="Submit your tool"
            width={500}
            height={500}
          />
        </div>
      </div>
    </>
  );
}
