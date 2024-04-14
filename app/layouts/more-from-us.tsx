import { Button } from "@/components/ui/button";
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import devToolsImg from "src/assets/images/dev-tools.png";

type FeatureType = {
    title: string
    description: string
    list: React.ReactNode[]
    url: string
    image: StaticImageData | string
}
const features: FeatureType[] = [
    {
        title: "Tool Scout",
        description: "Discover new tools and resources to make your developer life easier. Search and filter tools to find the perfect one for your needs.",
        list: [
            "🏆 Curated list of tools",
            "🔍 Search and filter tools",
            "🚀 Submit your own tool"
        ],
        url: "/scout",
        image:devToolsImg
    }
]

export default function MoreFromUs({omit}: {omit?: string[]}) {

    return (
        <section id="more-from-us" className="w-full grow mx-auto px-4 sm:px-12 xl:max-w-7xl xl:px-0 relative @container my-10">
            <h2 className="text-center text-4xl font-bold mb-4">More From Us</h2>

            {features.map((feature) => {
                if (omit && omit.includes(feature.url)) return null
                return <div className="grid grid-cols-1 @2xl:grid-cols-2 gap-4 items-center" key={feature.url}>
                    <div className="p-4 space-y-5 flex flex-col justify-around items-start">
                        <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                        <p className="text-lg font-light">{feature.description}</p>
                        <hr />
                        <div className="space-y-2">
                            {feature.list.map((item, index) => {
                                return <div key={index} className="flex items-center space-x-2 text-lg font-medium">
                                    {item}
                                </div>
                            })}
                        </div>
                        <Button size="lg" width="xs" asChild>
                            <Link href={feature.url} title={feature.title}>
                                Learn More
                            </Link>
                        </Button>
                    </div>
                    <div className="p-4">
                        <Image src={feature.image} alt={feature.title} className="w-full h-auto" width={720} height={480}/>
                    </div>
                </div>
            })}

        </section>)
}