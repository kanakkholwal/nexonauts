"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function ErrorActions() {
    const router = useRouter();


    return <>

    

            <div className="mt-5 flex justify-center items-center gap-3">
                <Button variant="outline"
                    onClick={() => router.back()}
                >
                    Go Back
                </Button>
                <Button asChild>
                    <Link href="/">Go to Home</Link>
                </Button>
            </div>

    </>
}