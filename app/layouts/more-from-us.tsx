import { Button } from "@/components/ui/button";
import Link from 'next/link';

type FeatureType = {
    title: string
    description: string
    list: React.ReactNode[]
    url: string
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
        url: "/scout"
    }
]

export default function MoreFromUs() {

    return (
        <section id="more-from-us" className="w-full grow mx-auto px-4 sm:px-12 xl:max-w-7xl xl:px-0 relative @container my-10">
            <h2 className="text-center text-4xl font-bold mb-4">More From Us</h2>

            {features.map((feature, index) => {
                return <div className="grid grid-cols-1 @2xl:grid-cols-2 gap-4" key={feature.url}>
                    <div className="p-4 space-y-5">
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
                        <Button asChild>
                            <Link href={feature.url} title={feature.title}>
                                Learn More
                            </Link>
                        </Button>
                    </div>
                    <div className="p-4">
                        <img src="/images/undraw/undraw_developer_activity.svg" alt={feature.title} className="w-full" />
                    </div>
                </div>
            })}

        </section>)
}