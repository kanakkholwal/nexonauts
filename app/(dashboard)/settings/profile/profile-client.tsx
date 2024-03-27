"use client";
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
import { useState } from "react";
import { profileType, useProfileStore } from "./store";

const SOCIALS = [
    { name: 'twitter', url: '' },
    { name: 'gitHub', url: '' },
    { name: 'linkedIn', url: '' },
    { name: 'website', url: '' },
];


export function ProfileEditor() {
    const profile = useProfileStore(state => state.profile) as profileType;
    const [selectedSocial, setSelectedSocial] = useState<string>(SOCIALS.filter((social) => {
        return !profile.socials.find(s => s.name === social.name);
    })[0]?.name || "none");

    return (<>
        <div className="space-y-6 my-5">
            <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="bio" className="mb-0">Bio</Label>
                <Textarea id="bio" placeholder="Tell us about yourself" rows={5} variant="fluid"
                    value={profile?.bio}
                    onChange={e => useProfileStore.setState({ profile: { ...profile, bio: e.target.value } })} />
            </div>
            <div className="grid grid-cols-1 gap-2">
                {profile.socials.map((social, index) => {
                    return (<div key={index} className="grid grid-cols-1 gap-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor={`social-${index}`} className="capitalize mb-0">{social.name}</Label>
                            <Button variant="link" size="sm" onClick={() => {
                                const newSocials = profile.socials.filter((_, i) => i !== index);
                                useProfileStore.setState({ profile: { ...profile, socials: newSocials } });
                            }}>
                                Remove
                            </Button>
                        </div>
                        <Input id={`social-${index}`} placeholder="https://example.com"
                            value={social.url}
                            onChange={e => {
                                const newSocials = [...profile.socials];
                                newSocials[index] = { name: social.name, url: e.target.value };
                                useProfileStore.setState({ profile: { ...profile, socials: newSocials } });
                            }} />
                    </div>)
                })}
                {selectedSocial !== "none" && (<div className="flex items-center justify-items-stretch gap-2">
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
                                return !profile.socials.find(s => s.name === social.name);
                            }).map((social, index) => {
                                return (<SelectItem key={index} value={social.name} className="capitalize">
                                    {social.name}
                                </SelectItem>)
                            })}
                        </SelectContent>
                    </Select>
                    <Button variant="outline" onClick={() => {
                        useProfileStore.setState({ profile: { 
                            ...profile, 
                            socials:profile.socials.filter((s) => s.name !== selectedSocial).concat({ name: selectedSocial, url: ''})
                        } });
                        const availableSocials = SOCIALS.filter((social) => {
                            return !profile.socials.find(s => s.name === social.name);
                        });
                        if(availableSocials.length > 1)
                            setSelectedSocial(availableSocials[0].name)
                        else
                            setSelectedSocial("none")
                    }}>
                        Add
                    </Button>
                </div>)}
            </div>


        </div>
    </>)
}