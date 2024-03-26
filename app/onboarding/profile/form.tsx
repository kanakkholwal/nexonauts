"use client"
import { Tag, TagInput } from "@/components/custom/tag-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Player } from '@lottiefiles/react-lottie-player';
import { ArrowRight } from 'lucide-react';
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IconComponents, icons } from "src/lib/profile/icons";
import { SessionUserType } from "src/types/user";
import { z } from "zod";

const SOCIALS = icons

if (SOCIALS.length === 0) {
  throw new Error('SOCIALS must contain at least one element');
}
const FormSchema = z.object({
  username: z.string(),
  bio: z.string(),
  socials: z.array(z.object({
    name: z.enum(SOCIALS.map((key) => key)),
    url: z.string(),
  })),
  interests: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    })
  ).max(5),
  step: z.number(),
  status: z.enum(["onboarding", "error", "success", "loading"]),
});

export default function CreateProfile({
  user,
  createProfile
}: {
  user: SessionUserType,
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
  }>;
}) {


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: user.username,
      bio: "",
      socials: [],
      interests: [],
      step: 0,
      status: "onboarding",
    }
  });

  const [tags, setTags] = React.useState<Tag[]>([]);
  const { setValue } = form;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    form.setValue("step", step + 1);
    form.setValue("status", "loading")
    console.log(data);
    console.log(form.getValues("status"))
    toast.success("Profile Created!");
  }

  const { step } = form.watch();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex items-center justify-between px-6 py-2 mx-auto">
        <Image height={120} width={300} className="h-24 w-24 dark:invert" src="/logo-square-with-bg.svg" alt="logo" />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md bg-white/30 dark:bg-white/5 p-5 rounded-xl border">
          <div className="grid grid-cols-1 gap-4">
            {step === 0 && (<>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Username"
                        className="w-full"
                      />
                    </FormControl>
                    <FormDescription>
                      This is your username, it will be used to identify you in the community. This can only be set once.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Bio"
                        className="w-full"
                      />
                    </FormControl>
                    <FormDescription>
                      This is your bio, it will be shown on your profile page.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between  items-center mt-5 gap-2">
                <Button onClick={() => {
                  form.setValue("step", step + 1);
                }} className="w-full">
                  Next Step
                  <ArrowRight size={16} className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </>)}
            {step === 1 && (<>
              <h4 className="text-lg font-semibold text-center">Socials</h4>
              {SOCIALS.map((key, index) => {
                const Icon = IconComponents[key];
                return (
                  <FormField
                    key={key}
                    control={form.control}
                    name={`socials.${index}.url`}
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel className='absolute top-1/2 -translate-y-1/2 left-4 z-50'>
                          <Icon className="h-4 w-4" />
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={`${key} URL`}
                            className="w-full pl-10"
                          />
                        </FormControl>
                        <FormDescription>
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )
              })}
              <div className="flex justify-between  items-center mt-5 gap-2">
                <Button onClick={() => {
                  form.setValue("step", step + 1);
                }} className="w-full">
                  Next Step
                  <ArrowRight size={16} className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </>)}
            {step === 2 && (<>

              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel className="text-left">Interests</FormLabel>
                    <FormControl>
                      <TagInput
                        {...field}
                        placeholder="Enter a topic"
                        tags={tags}
                        className="w-full"
                        setTags={(newTags) => {
                          setTags(newTags);
                          setValue("interests", newTags as [Tag, ...Tag[]]);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      These are the topics that you&apos;re interested in. (e.g. JavaScript, React, Node.js, etc.). You can add up to 5 topics.
                      {`\n`}
                      These will be used to recommend you posts and users.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between  items-center mt-5 gap-2">
                <Button className="w-full" type="submit"
                  onClick={(e) => {
                    form.handleSubmit(onSubmit)(e)
                  }}
                >

                  Create Profile
                </Button>
              </div>
            </>)}
            {form.getValues("status") === "loading" ? <>
              <div className="flex justify-center items-center gap-2">
                <Player
                  autoplay
                  loop
                  src="https://lottie.host/e0889207-1cec-443b-82fb-092a7fb0a688/qlNwDc7orS.json"
                  style={{ height: '300px', width: '300px' }}
                />
              </div>
              <div className="flex justify-between  items-center mt-5 gap-2">
                <Button className="w-full"
                  variant="default_light"
                  disabled={form.getValues("status") === "loading"}>
                  Creating Profile...
                </Button>
              </div>
            </> : null}

          </div>
        </form>
      </Form>
    </div>
  )
}