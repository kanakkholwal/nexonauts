"use client";
import { TagInput, type Tag } from "@/components/custom/tag-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, ArrowUpRight, Undo2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { BiError } from "react-icons/bi";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IconComponents, icons } from "src/lib/profile/icons";
import type { SessionUserType } from "src/types/user";

const SOCIALS = icons;

if (SOCIALS.length === 0) {
  throw new Error("SOCIALS must contain at least one element");
}

export default function CreateProfile({
  user,
  createProfile,
}: {
  user: SessionUserType;
  createProfile: (payload: {
    username: string;
    bio: string;
    socials: {
      name: string;
      url: string;
    }[];
    interests: string[];
  }) => Promise<{
    success: boolean;
    message: string;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    data: Record<string, any> | null;
  }>;
}) {
  const { data: session, update } = useSession();

  const [profile, setProfile] = React.useState({
    username: user.username,
    bio: "",
    socials: SOCIALS.map((key) => {
      return {
        name: key,
        url: "",
      };
    }),
  });
  const [step, setStep] = React.useState(0);
  const [status, setStatus] = React.useState<
    "onboarding" | "loading" | "success" | "error"
  >("onboarding");

  const [tags, setTags] = React.useState<Tag[]>([]);

  const handleSubmit = async () => {
    toast.promise(
      createProfile({
        username: profile.username,
        bio: profile.bio,
        socials: profile.socials.filter(
          (social) => social.url.trim().length > 0
        ),
        interests: tags.map((tag) => tag.text),
      }).then(async (res) => {
        if (res.success && res.data) {
          console.log(res.data);
          toast.promise(
            update({
              expires: session?.expires,
              user: {
                ...user,
                username: res.data?.username,
                profile: res.data?._id,
              },
            }),
            {
              loading: "Updating User...",
              // biome-ignore lint/suspicious/noExplicitAny: <explanation>
              success: (res: any) => {
                console.log(res);
                return res?.message || "User Updated Successfully";
              },
              error: (e:unknown) => {
                setStatus("error");
                if (e instanceof Error) {
                  return e.message;
                }
                console.log(e);
                return "Error Updating User";
              },
            }
          );

          setStatus("success");
          toast.success(res.message);
        } else {
          setStatus("error");
          toast.error(res.message);
        }
      }),
      {
        loading: "Creating Profile...",
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        success: (res: any) => {
          console.log(res);
          return res?.message || "Profile Created Successfully";
        },
        error: (e:unknown) => {
          setStatus("error");
          if(e instanceof Error) {
            return e.message;
          }
          console.log(e);
          return "Error Creating Profile";
        },
      }
    );

    // .catch((e) => {
    //   setStatus("error");
    //   toast.error(e.message);
    // }).finally(() => {
    //   setStep(3);

    // })
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex items-center justify-between px-6 py-2 mx-auto">
        <Image
          height={120}
          width={300}
          className="h-24 w-24 dark:invert"
          src="/logo-square-with-bg.svg"
          alt="logo"
        />
      </div>
      <div className="w-full max-w-md bg-card p-5 rounded-xl border">
        <div className="grid grid-cols-1 gap-4">
          {step === 0 && (
            <>
              <div className="flex flex-col items-start">
                <Label htmlFor="username">Username</Label>
                <Input
                  name="username"
                  id="username"
                  placeholder="Username"
                  value={profile.username}
                  className="w-full"
                  onChange={(e) =>
                    setProfile({ ...profile, username: e.target.value })
                  }
                />
                <p className="text-[0.8rem] text-muted-foreground">
                  This is your username, it will be used to identify you in the
                  community. This can only be set once.
                </p>
              </div>

              <div className="flex flex-col items-start">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  name="bio"
                  id="bio"
                  placeholder="Bio"
                  value={profile.bio}
                  className="w-full"
                  onChange={(e) =>
                    setProfile({ ...profile, bio: e.target.value })
                  }
                />
                <p className="text-[0.8rem] text-muted-foreground">
                  This is your bio, it will be shown on your profile page.
                </p>
              </div>

              <div className="flex justify-between  items-center mt-5 gap-2">
                <Button
                  transition="damped"
                  onClick={() => {
                    if (profile.username.trim().length === 0) {
                      toast.error("Please enter a username.");
                      return;
                    }
                    if (profile.username.length < 5) {
                      toast.error(
                        "Username must be at least 5 characters long."
                      );
                      return;
                    }
                    if (profile.bio.length === 0) {
                      toast.error("Please enter a bio.");
                      return;
                    }
                    setStep(step + 1);
                  }}
                  className="w-full"
                >
                  Next Step
                  <ArrowRight size={16} className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <h4 className="text-lg font-semibold text-center">Socials</h4>
              {SOCIALS.map((key, index) => {
                const Icon = IconComponents[key];
                return (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  <div className="relative" key={`socials.${index}.url`}>
                    <Label className="absolute top-1/2 -translate-y-1/2 left-4 z-50">
                      <Icon className="h-4 w-4" />
                    </Label>
                    <Input
                      name={`socials.${index}.url`}
                      placeholder={`${key} URL`}
                      className="w-full pl-10"
                      value={profile.socials[index].url}
                      onChange={(e) => {
                        setProfile({
                          ...profile,
                          socials: profile.socials.map((social, i) => {
                            if (i === index) {
                              return {
                                name: key,
                                url: e.target.value,
                              };
                            }
                            return social;
                          }),
                        });
                      }}
                    />
                  </div>
                );
              })}
              <div className="flex justify-between  items-center mt-5 gap-2">
                <Button
                  onClick={() => {
                    if (
                      profile.socials.filter(
                        (social) => social.url.trim().length > 0
                      ).length === 0
                    ) {
                      toast.error("Please add at least one social.");
                      return;
                    }
                    setStep(step + 1);
                  }}
                  className="w-full"
                >
                  Next Step
                  <ArrowRight size={16} className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div className="flex flex-col items-start gap-2">
                <Label className="text-left">Interests</Label>
                <TagInput
                  placeholder="Enter a topic"
                  className="w-full"
                  setTags={setTags}
                  tags={tags}
                />
                <p className="text-[0.8rem] text-muted-foreground">
                  These are the topics that you&apos;re interested in. (e.g.
                  JavaScript, React, Node.js, etc.). You can add up to 5 topics.
                  {/* biome-ignore lint/style/noUnusedTemplateLiteral: <explanation> */}
                          {`\n`}
                  These will be used to recommend you posts and users.
                </p>
              </div>

              <div className="flex justify-between  items-center mt-5 gap-2">
                <Button
                  className="w-full"
                  type="submit"
                  onClick={(e) => {
                    if (tags.length === 0) {
                      toast.error("Please add at least one interest.");
                      return;
                    }
                    e.preventDefault();
                    if (tags.length === 0) {
                      setStatus("error");
                      toast.error("Please add at least one interest.");
                      return;
                    }
                    if (profile.socials.length === 0) {
                      setStatus("error");
                      toast.error("Please add at least one social.");
                      return;
                    }

                    setStep(step + 1);
                    setStatus("loading");

                    handleSubmit();
                  }}
                >
                  Create Profile
                </Button>
              </div>
            </>
          )}
          {step === 3 ? (
            <>
              <div className="flex justify-center items-center gap-2 flex-col">
                {status === "success" ? (
                  <>
                    <FaRegCircleCheck className="text-green-500 h-16 w-16 mt-5" />
                    <h1 className="text-3xl font-semibold text-center">
                      Profile Created!
                    </h1>
                    <p className="text-center text-sm">
                      Your profile is live now{" "}
                      <Link
                        href={`/devs/${profile.username}`}
                        target="_blank"
                        className="text-primary hover:underline"
                      >
                        @{profile.username}
                      </Link>
                    </p>
                  </>
                ) : null}
                {status === "error" ? (
                  <>
                    <BiError className="text-red-500 h-16 w-16" />
                    <h1 className="text-3xl font-semibold text-center">
                      Error Creating Profile
                    </h1>
                  </>
                ) : null}
                {status === "loading" ? (
                  <>
                    {/* <Player
                      autoplay
                      loop
                      src="https://lottie.host/e0889207-1cec-443b-82fb-092a7fb0a688/qlNwDc7orS.json"
                      style={{ height: "300px", width: "300px" }}
                    /> */}
                    <h1 className="text-3xl font-semibold text-center">
                      Creating Profile...
                    </h1>
                  </>
                ) : null}
              </div>
              <div className="flex justify-between  items-center mt-5 gap-2">
                {status === "success" ? (
                  <>
                    <Button className="w-full" variant="default_light" asChild>
                      <Link href={"/dashboard"}>
                        Go to Dashboard
                        <ArrowRight size={16} className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button className="w-full" variant="default" asChild>
                      <Link href={`/devs/${profile.username}`} target="_blank">
                        Go to Profile
                        <ArrowUpRight size={16} className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </>
                ) : null}

                {status === "loading" ? (
                  <>
                    <Button
                      className="w-full"
                      variant="default_light"
                      disabled={status === "loading"}
                    >
                      Creating Profile...
                    </Button>
                  </>
                ) : null}
                {status === "error" ? (
                  <>
                    <Button
                      onClick={() => {
                        setStep(0);
                        setStatus("onboarding");
                      }}
                      className="w-full"
                    >
                      <Undo2 size={16} className="mr-2 h-4 w-4" />
                      Retry
                    </Button>
                  </>
                ) : null}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
