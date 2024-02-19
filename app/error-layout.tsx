"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function ErrorActions() {
    const router = useRouter();


    return <>
            <div className="mt-4 flex justify-center items-center flex-wrap gap-5">
                <Button variant="outline"
                className="px-6 py-4 h-12"
                size="lg"
                    onClick={() => router.back()}
                >
                    Go Back
                </Button>
                <Button  size="lg"  className="px-6 py-4 h-12" asChild>
                    <Link href="/">Go to Home</Link>
                </Button>
            </div>

    </>
}