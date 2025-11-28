"use client";

import { TagInput, type Tag } from "@/components/custom/tag-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Loader2,
  Undo2,
  User,
  Globe,
  Hash
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { useSession } from "src/auth/client";
import { IconComponents, icons } from "src/lib/profile/icons";
import type { SessionUserType } from "~/auth";

// --- TYPES ---
interface CreateProfileResponse {
  success: boolean;
  message: string;
  data: Record<string, unknown> | null;
}

interface CreateProfileProps {
  user: SessionUserType;
  createProfile: (payload: {
    username: string;
    bio: string;
    socials: { name: string; url: string }[];
    interests: string[];
  }) => Promise<CreateProfileResponse>;
}

const SOCIALS = icons;

export default function CreateProfileForm({ user, createProfile }: CreateProfileProps) {
  const { refetch } = useSession();

  const [profile, setProfile] = React.useState({
    username: user.username || "",
    bio: "",
    socials: SOCIALS.map((key) => ({ name: key, url: "" })),
  });

  const [step, setStep] = React.useState(0);
  const [status, setStatus] = React.useState<"onboarding" | "loading" | "success" | "error">("onboarding");
  const [tags, setTags] = React.useState<Tag[]>([]);

  const handleSubmit = async () => {
    setStatus("loading");

    try {
      const res = await createProfile({
        username: profile.username,
        bio: profile.bio,
        socials: profile.socials.filter((social) => social.url.trim().length > 0),
        interests: tags.map((tag) => tag.text),
      });

      if (res.success && res.data) {
        await refetch();
        setStatus("success");
        toast.success(res.message);
      } else {
        setStatus("error");
        toast.error(res.message);
      }
    } catch (e) {
      setStatus("error");
      toast.error(e instanceof Error ? e.message : "Error Creating Profile");
    }
  };

  // --- RENDER HELPERS ---
  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8 px-1">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center">
          <div
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold transition-all duration-300",
              step === i
                ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                : step > i
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
            )}
          >
            {step > i ? <Check className="w-4 h-4" /> : i + 1}
          </div>
          {i < 2 && (
            <div
              className={cn(
                "w-12 h-0.5 mx-2 rounded-full transition-colors duration-300",
                step > i ? "bg-primary" : "bg-muted"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-card/80 backdrop-blur-xl border border-border/50 shadow-2xl rounded-2xl p-8 animate-in fade-in zoom-in-95 duration-500">

      {/* Header */}
      <div className="text-center mb-8">
        <Image
          height={48}
          width={48}
          className="mx-auto mb-4 rounded-xl shadow-lg"
          src="/logo-square.png" // Assuming standard logo path
          alt="logo"
        />
        <h1 className="text-2xl font-bold tracking-tight">
          {status === "success" ? "You're all set!" : "Setup your Identity"}
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          {status === "success"
            ? "Your developer profile is now live."
            : "Complete these steps to join the ecosystem."}
        </p>
      </div>

      {status !== "success" && status !== "error" && renderStepIndicator()}

      {/* --- STEP 0: IDENTITY --- */}
      {step === 0 && status === "onboarding" && (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold ml-1">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  placeholder="johndoe"
                  value={profile.username}
                  onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                  className="pl-9"
                />
              </div>
              <p className="text-[11px] text-muted-foreground pl-1">Unique handle for your profile URL.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold ml-1">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about what you build..."
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="min-h-[100px] resize-none"
              />
              <p className="text-[11px] text-muted-foreground pl-1">Brief description of your skills and focus.</p>
            </div>
          </div>

          <Button
            className="w-full"
            onClick={() => {
              if (!profile.username.trim() || profile.username.length < 3) {
                toast.error("Username must be at least 3 characters.");
                return;
              }
              if (!profile.bio.trim()) {
                toast.error("Please enter a bio.");
                return;
              }
              setStep(1);
            }}
          >
            Continue <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      )}

      {/* --- STEP 1: SOCIALS --- */}
      {step === 1 && status === "onboarding" && (
        <div className="space-y-6">
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
            {SOCIALS.map((key, index) => {
              const Icon = IconComponents[key] || Globe;
              return (
                <div key={key} className="space-y-1.5">
                  <Label className="text-xs capitalize flex items-center gap-2">
                    <Icon className="w-3 h-3" /> {key}
                  </Label>
                  <Input
                    placeholder={`https://${key}.com/...`}
                    value={profile.socials[index].url}
                    onChange={(e) => {
                      const newSocials = [...profile.socials];
                      newSocials[index].url = e.target.value;
                      setProfile({ ...profile, socials: newSocials });
                    }}
                    className="h-9 text-sm"
                  />
                </div>
              );
            })}
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep(0)}>Back</Button>
            <Button
              className="flex-1"
              onClick={() => {
                const hasSocials = profile.socials.some(s => s.url.trim().length > 0);
                if (!hasSocials) {
                  toast.error("Please add at least one social link.");
                  return;
                }
                setStep(2);
              }}
            >
              Continue <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* --- STEP 2: INTERESTS --- */}
      {step === 2 && status === "onboarding" && (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="p-4 bg-muted/30 rounded-xl border border-border/50 text-center">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 text-primary">
                <Hash className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm mb-1">What are you into?</h3>
              <p className="text-xs text-muted-foreground">Add tags like React, AI, Design...</p>
            </div>

            <div className="space-y-2">
              <Label className="sr-only">Interests</Label>
              <TagInput
                placeholder="Type and press enter..."
                tags={tags}
                setTags={setTags}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
            <Button className="flex-1" onClick={handleSubmit}>
              Create Profile <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* --- LOADING STATE --- */}
      {status === "loading" && (
        <div className="py-12 flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            </div>
          </div>
          <p className="text-sm font-medium animate-pulse">Building your identity...</p>
        </div>
      )}

      {/* --- SUCCESS STATE --- */}
      {status === "success" && (
        <div className="space-y-6">
          {/* Mini Profile Preview Card */}
          <div className="bg-gradient-to-br from-card to-muted border border-border/50 rounded-xl p-6 shadow-sm flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-gradient-to-tr from-primary via-purple-500 to-blue-500 rounded-full mb-4 p-1">
              <div className="w-full h-full bg-background rounded-full flex items-center justify-center text-2xl font-bold">
                {profile.username.charAt(0).toUpperCase()}
              </div>
            </div>
            <h3 className="font-bold text-lg">@{profile.username}</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{profile.bio}</p>

            <div className="flex gap-2 mt-4 justify-center flex-wrap">
              {tags.slice(0, 3).map(tag => (
                <span key={tag.id} className="text-[10px] px-2 py-1 bg-muted rounded-full border border-border">{tag.text}</span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button className="w-full" size="lg" asChild>
              <Link href="/dashboard">
                Enter Dashboard <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href={`/devs/${profile.username}`} target="_blank">
                View Public Profile <ArrowUpRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      )}

      {/* --- ERROR STATE --- */}
      {status === "error" && (
        <div className="py-8 text-center space-y-4">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto text-red-600 dark:text-red-400">
            <Undo2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Something went wrong</h3>
            <p className="text-sm text-muted-foreground mt-1">We couldn't create your profile.</p>
          </div>
          <Button
            variant="secondary"
            onClick={() => { setStatus("onboarding"); setStep(0); }}
          >
            Try Again
          </Button>
        </div>
      )}

    </div>
  );
}