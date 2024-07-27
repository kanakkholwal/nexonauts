"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { updateProfileInput } from "./actions";
import { profileType, useProfileStore } from "./store";

const SOCIALS = [
  { name: "twitter", url: "" },
  { name: "gitHub", url: "" },
  { name: "linkedIn", url: "" },
  { name: "website", url: "" },
];

type Props = {
  updateProfile: (data: updateProfileInput) => Promise<any>;
};

export function ProfileEditor({ updateProfile }: Props) {
  const profile = useProfileStore((state) => state.profile) as profileType;
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedSocial, setSelectedSocial] = useState<string>(
    SOCIALS.filter((social) => {
      return !profile.socials.find((s) => s.name === social.name);
    })[0]?.name || "none"
  );

  return (
    <>
      <div className="space-y-6 my-5">
        <div className="grid grid-cols-1 gap-2">
          <Label htmlFor="bio" className="mb-0">
            Bio
          </Label>
          <Textarea
            id="bio"
            placeholder="Tell us about yourself"
            rows={5}
            variant="glass"
            value={profile?.bio}
            onChange={(e) =>
              useProfileStore.setState({
                profile: { ...profile, bio: e.target.value },
              })
            }
          />
        </div>
        <div className="grid grid-cols-1 gap-2">
          {profile.socials.map((social, index) => {
            return (
              <div key={index} className="grid grid-cols-1 gap-1">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor={`social-${index}`}
                    className="capitalize mb-0"
                  >
                    {social.name}
                  </Label>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => {
                      const newSocials = profile.socials.filter(
                        (_, i) => i !== index
                      );
                      useProfileStore.setState({
                        profile: { ...profile, socials: newSocials },
                      });
                    }}
                  >
                    Remove
                  </Button>
                </div>
                <Input
                  id={`social-${index}`}
                  placeholder="https://example.com"
                  variant="glass"
                  value={social.url}
                  onChange={(e) => {
                    const newSocials = [...profile.socials];
                    newSocials[index] = {
                      name: social.name,
                      url: e.target.value,
                    };
                    useProfileStore.setState({
                      profile: { ...profile, socials: newSocials },
                    });
                  }}
                />
              </div>
            );
          })}
          {selectedSocial !== "none" && (
            <div className="flex items-center justify-items-stretch gap-2">
              <Select
                onValueChange={(value) => {
                  setSelectedSocial(value);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Add Social" />
                </SelectTrigger>
                <SelectContent>
                  {SOCIALS.filter((social) => {
                    return !profile.socials.find((s) => s.name === social.name);
                  }).map((social, index) => {
                    return (
                      <SelectItem
                        key={index}
                        value={social.name}
                        className="capitalize"
                      >
                        {social.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => {
                  useProfileStore.setState({
                    profile: {
                      ...profile,
                      socials: profile.socials
                        .filter((s) => s.name !== selectedSocial)
                        .concat({ name: selectedSocial, url: "" }),
                    },
                  });
                  const availableSocials = SOCIALS.filter((social) => {
                    return !profile.socials.find((s) => s.name === social.name);
                  });
                  if (availableSocials.length > 1)
                    setSelectedSocial(availableSocials[0].name);
                  else setSelectedSocial("none");
                }}
              >
                Add
              </Button>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            onClick={() => {
              console.log(profile);
              setLoading(true);
              toast
                .promise(
                  updateProfile({
                    username: profile.username,
                    data: {
                      bio: profile.bio,
                      socials: profile.socials,
                      interests: profile.interests,
                    },
                  }),
                  {
                    loading: "Updating profile...",
                    success: "Profile updated successfully",
                    error: "Failed to update profile",
                  }
                )
                .finally(() => setLoading(false));
            }}
            disabled={loading}
          >
            {loading && <LoaderCircle className="animate-spin" size={16} />}
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </>
  );
}
export function ProfileView() {
  const profile = useProfileStore((state) => state.profile) as profileType;

  return (
    <>
      {" "}
      <div
        id="basic_info"
        className="w-full px-4 py-8 space-y-2 flex flex-col items-center justify-center"
      >
        <Avatar className="w-40 h-40 shadow-lg">
          <AvatarImage
            src={profile.user.profilePicture}
            alt={profile.username}
            width={320}
            height={320}
            className="w-40 h-40"
          />
          <AvatarFallback className="w-40 h-40 uppercase text-xl">
            {profile.username[0] + profile.username[1]}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center justify-center space-y-2">
          <h2 className="text-2xl font-bold">{profile.user.name}</h2>
          <h3 className="text-gray-500 dark:text-slate-400 text-lg">
            @{profile.username}
          </h3>

          <p className="text-slate-500 font-medium max-w-xl text-sm text-center">
            {profile.bio}
          </p>
          {/* <SocialLinks socials={developer.socials} /> */}
        </div>
      </div>
    </>
  );
}
