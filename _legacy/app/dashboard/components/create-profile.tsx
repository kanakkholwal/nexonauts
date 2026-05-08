import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import NoProfile from "./no-profile.svg";

export default function CreateProfile() {
  return (
    <>
      <div className="w-full glassmorphism_light p-5 py-10 rounded-xl flex flex-col justify-center items-center gap-2">
        <Image
          src={NoProfile}
          width={300}
          height={300}
          alt="No Profile"
          draggable={false}
        />
        <h2 className="text-2xl font-semibold mt-5">
          You don{`'`}t have a profile yet
        </h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
          Create a profile to connect with other developers
        </p>
        <Button className="mt-5 w-full max-w-sm" size="lg">
          <Link href={"/onboarding/profile?next=/dashboard"}>
            Create Profile Now
          </Link>
        </Button>
      </div>
    </>
  );
}
