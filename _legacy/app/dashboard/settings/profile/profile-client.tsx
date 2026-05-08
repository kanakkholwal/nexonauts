"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Github,
  Globe,
  Linkedin,
  Loader2,
  Plus,
  Save,
  Terminal,
  Trash2,
  Twitter
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { updateProfileInput } from "./actions";
import { profileType, useProfileStore } from "./store";

// --- TYPES ---
const AVAILABLE_SOCIALS = [
  { name: "twitter", icon: Twitter },
  { name: "gitHub", icon: Github },
  { name: "linkedIn", icon: Linkedin },
  { name: "website", icon: Globe },
];

type Props = {
  updateProfile: (data: updateProfileInput) => Promise<any>;
};

// --- EDITOR COMPONENT ---
export function ProfileEditor({ updateProfile }: Props) {
  const profile = useProfileStore((state) => state.profile) as profileType;
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedSocialToAdd, setSelectedSocialToAdd] = useState<string>("");

  const availableToAdd = AVAILABLE_SOCIALS.filter(
    (s) => !profile.socials.find((ps) => ps.name === s.name)
  );

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateProfile({
        username: profile.username,
        data: {
          bio: profile.bio,
          socials: profile.socials,
          interests: profile.interests,
        },
      });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* Bio Section */}
      <div className="space-y-3">
        <Label htmlFor="bio" className="text-sm font-medium">Bio</Label>
        <Textarea
          id="bio"
          placeholder="Tell the world who you are and what you build..."
          rows={6}
          className="resize-none transition-colors border-border/50 focus:border-primary/50"
          value={profile?.bio || ""}
          onChange={(e) =>
            useProfileStore.setState({
              profile: { ...profile, bio: e.target.value },
            })
          }
        />
        <p className="text-xs text-muted-foreground text-right">
          {(profile?.bio || "").length}/500 characters
        </p>
      </div>

      <Separator />

      {/* Socials Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Connected Accounts</Label>
        </div>

        <div className="space-y-3">
          {profile.socials.map((social, index) => {
            // Find icon dynamically
            const socialDef = AVAILABLE_SOCIALS.find(s => s.name === social.name);
            const Icon = socialDef?.icon || Globe;

            return (
              <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-muted/20 border border-border/50 group hover:border-primary/30 transition-colors">
                <div className="h-10 w-10 rounded-lg bg-background flex items-center justify-center border border-border/50 shrink-0">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold capitalize mb-1">{social.name}</p>
                  <Input
                    variant="glass"
                    placeholder="https://..."
                    className="h-8 text-sm bg-transparent border-none shadow-none px-2 focus-visible:ring-0 placeholder:text-muted-foreground/50"
                    value={social.url}
                    onChange={(e) => {
                      const newSocials = [...profile.socials];
                      newSocials[index] = { ...social, url: e.target.value };
                      useProfileStore.setState({ profile: { ...profile, socials: newSocials } });
                    }}
                  />
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => {
                    const newSocials = profile.socials.filter((_, i) => i !== index);
                    useProfileStore.setState({ profile: { ...profile, socials: newSocials } });
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            );
          })}

          {profile.socials.length === 0 && (
            <div className="text-center py-8 border-2 border-dashed border-border/50 rounded-xl bg-muted/10 text-muted-foreground text-sm">
              No social links added yet.
            </div>
          )}
        </div>

        {/* Add Social Bar */}
        {availableToAdd.length > 0 && (
          <div className="flex items-center gap-2 mt-4">
            <Select
              value={selectedSocialToAdd}
              onValueChange={setSelectedSocialToAdd}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                {availableToAdd.map((s) => (
                  <SelectItem key={s.name} value={s.name} className="capitalize">
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="secondary"
              disabled={!selectedSocialToAdd}
              onClick={() => {
                if (!selectedSocialToAdd) return;
                useProfileStore.setState({
                  profile: {
                    ...profile,
                    socials: [...profile.socials, { name: selectedSocialToAdd, url: "" }],
                  },
                });
                setSelectedSocialToAdd("");
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Link
            </Button>
          </div>
        )}
      </div>

      <div className="pt-4 flex justify-end">
        <Button
          onClick={handleSave}
          disabled={loading}
          size="lg"
          className="w-full sm:w-auto min-w-[150px] shadow-lg shadow-primary/20"
        >
          {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}

// --- PREVIEW COMPONENT ---
export function ProfileView() {
  const profile = useProfileStore((state) => state.profile) as profileType;

  return (
    <div className="w-full flex flex-col items-center text-center p-8 pb-12 bg-[url('/grid-pattern.svg')] bg-top bg-no-repeat bg-[length:100%_auto]">

      {/* Status Badge */}
      <div className="w-full flex justify-end mb-4">
        <Badge variant="outline" className="bg-background/50 backdrop-blur text-xs font-mono gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          PREVIEW_MODE
        </Badge>
      </div>

      {/* Avatar */}
      <div className="relative mb-6 group cursor-default">
        <div className="absolute -inset-4 rounded-full border border-dashed border-border/60 animate-[spin_12s_linear_infinite]" />
        <Avatar className="w-32 h-32 border-4 border-background shadow-2xl relative z-10">
          <AvatarImage
            src={profile.user.profilePicture}
            alt={profile.username}
            className="object-cover"
          />
          <AvatarFallback className="text-4xl font-bold bg-primary/10 text-primary">
            {profile.username?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="absolute bottom-1 right-1 z-20 bg-background text-foreground p-1.5 rounded-full border border-border shadow-sm">
          <Terminal className="w-4 h-4" />
        </div>
      </div>

      {/* Identity */}
      <div className="space-y-2 mb-8 max-w-xs mx-auto">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">{profile.user.name}</h2>
        <p className="text-sm font-medium text-primary bg-primary/5 px-2 py-0.5 rounded-md inline-block">
          @{profile.username}
        </p>

        <p className="text-sm text-muted-foreground leading-relaxed pt-2 min-h-[3rem]">
          {profile.bio || <span className="italic opacity-50">No bio set...</span>}
        </p>
      </div>

      {/* Socials Preview */}
      <div className="flex flex-wrap justify-center gap-3">
        {profile.socials.map((social, i) => {
          const Icon = AVAILABLE_SOCIALS.find(s => s.name === social.name)?.icon || Globe;
          return (
            <div
              key={i}
              className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground border border-transparent"
              title={social.name}
            >
              <Icon className="w-5 h-5" />
            </div>
          )
        })}
        {profile.socials.length === 0 && (
          <div className="text-xs text-muted-foreground/50 py-2">No active connections</div>
        )}
      </div>

      {/* Footer Decor */}
      <div className="w-16 h-1 bg-border/50 rounded-full mx-auto mt-10" />
    </div>
  );
}