import { AiOutlineRead } from "react-icons/ai";
import { BsStars, BsTextareaT } from "react-icons/bs";
import { FcIdea, FcInspection, FcOpenedFolder } from "react-icons/fc";
import { TfiWrite } from "react-icons/tfi";

type FeatureType = {
  Icon: React.ElementType;
  title: string;
  description: string;
};
const features_for_generalpurpose = [
  {
    Icon: TfiWrite,
    title: "Writing Assistant",
    description:
      "Our AI writing tool analyzes your content, suggests improvements",
  },
  {
    Icon: AiOutlineRead,
    title: "Reading Assistant",
    description:
      "Our AI Reading tool analyzes your content, suggests improvements",
  },
  {
    Icon: BsTextareaT,
    title: "Text Analysis",
    description:
      "Our AI Text Analysis tool analyzes your content, suggests improvements",
  },
] as FeatureType[];
const features_for_devs = [
  {
    Icon: FcInspection,
    title: "Stuck on a Application Development?",
    description:
      "Use our tools to automate your application development micro tasks",
  },
  {
    Icon: FcIdea,
    title: "Create your own AI",
    description:
      "Don't like our AI tool? Create your own AI tool with our AI Builder",
  },
  {
    Icon: FcOpenedFolder,
    title: "Need a generic Feature?",
    description:
      "Use our open source CLI (CodeGenX) on Web to get boilerplate code",
  },
] as FeatureType[];

export default function SectionFeatures() {
  return (
    <section className="overflow-hidden pt-17.5 lg:pt-22.5 xl:pt-27.5 scroll-mt-17">
      <div className="max-w-[1222px] mx-auto px-4 sm:px-8 xl:px-0">
        <div className="mb-16 text-center relative z-10" data-aos="fade-up">
          <span className="hero-subtitle-gradient shadow-lg  relative  mb-4 font-medium text-sm inline-flex items-center gap-2 py-2 px-3 rounded-full">
            <BsStars className="text-md" />
            <span className="hero-subtitle-text">Main Features</span>
          </span>
          <h2 className=" mb-4 text-2xl font-extrabold sm:text-4xl xl:text-heading-2">
            Key Features of AI Tool
          </h2>
          <p className="max-w-[714px] mx-auto font-medium">
            A Complete Solution for AI Powered Apps
          </p>
        </div>
        <div className="relative">
          <div className="features-row-border rotate-90 w-1/2 h-[1px] absolute top-1/2 left-1/2 -translate-y-1/2 lg:-translate-x-1/3 lg:left-1/4 hidden lg:block" />
          <div className="features-row-border rotate-90 w-1/2 h-[1px] absolute top-1/2 right-1/2 -translate-y-1/2 lg:right-[8.3%] hidden lg:block" />

          <div className="flex flex-wrap justify-center">
            {features_for_generalpurpose.map(
              (Feature: FeatureType, index: number) => {
                return (
                  <div className="w-full sm:w-1/2 lg:w-1/3 " key={index}>
                    <div className="group relative overflow-hidden text-center py-8 sm:py-10 xl:py-15 px-4 lg:px-8 xl:px-13 ">
                      <span className="group-hover:opacity-100 opacity-0 features-bg absolute w-full h-full left-0 top-0 z-[-1]"></span>
                      <span className="icon-border group-hover:shadow-lg group-hover:bg-white relative max-w-[80px] bg-slate-100 w-full h-20 rounded-full inline-flex items-center justify-center mb-8 mx-auto">
                        <Feature.Icon className="w-6 h-6" />
                      </span>
                      <h4 className="font-semibold text-lg mb-4">
                        {Feature.title}
                      </h4>
                      <p className="font-medium">{Feature.description}</p>
                    </div>
                  </div>
                );
              }
            )}
          </div>
          <div className="features-row-border w-full h-[1px]"></div>
          <div className="flex flex-wrap justify-center">
            {features_for_devs.map((Feature: FeatureType, index: number) => {
              return (
                <div className="w-full sm:w-1/2 lg:w-1/3 " key={index}>
                  <div className="group relative overflow-hidden text-center py-8 sm:py-10 xl:py-15 px-4 lg:px-8 xl:px-13 ">
                    <span className="group-hover:opacity-100 opacity-0 features-bg absolute w-full h-full left-0 top-0 z-[-1] rotate-180"></span>
                    <span className="icon-border group-hover:shadow-lg group-hover:bg-white relative max-w-[80px] bg-slate-100 w-full h-20 rounded-full inline-flex items-center justify-center mb-8 mx-auto">
                      <Feature.Icon className="w-6 h-6" />
                    </span>
                    <h4 className="font-semibold text-lg mb-4">
                      {Feature.title}
                    </h4>
                    <p className="font-medium">{Feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
