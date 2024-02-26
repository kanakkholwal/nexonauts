import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BackgroundBeams } from "src/components/animations/background-beams";


export default function Page() {

    return (
        <div className="h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
            <div className="max-w-2xl mx-auto p-4">
                <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
                    Coming Soon
                </h1>
                <p></p>
                <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
                    We are working hard to bring you the best experience. Stay tuned!
                </p>
                <div className="flex justify-center gap-4 mt-8">
                    <Button size="lg" asChild>
                        <Link href="/">Go Home
                        </Link>
                    </Button>
                </div>

            </div>
            <BackgroundBeams />
        </div>
    )
}