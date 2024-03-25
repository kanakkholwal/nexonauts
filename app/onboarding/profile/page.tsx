"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function CreateProfile() {
    const [step, setStep] = useState(0);

    const [profile, setProfile] = useState({
        username: '',
        bio: '',
        socials: {
            twitter: '',
            instagram: '',
            linkedin: '',
            github: '',
            youtube: '',
            website: '',
        },
        interests: [],
    })


    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-full max-w-md glassmorphism p-5 rounded-xl ">
                <div className="grid grid-cols-1 gap-4">
                    {step === 0 && (<>
                        <div className="flex flex-col gap-2">
                                <Label htmlFor="username">
                                    Username
                                </Label>
                            <Input id="username" placeholder="Username"
                                value={profile.username}
                                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                            />
                            <p className="text-xs text-gray-500">
                                {"This is your username, it will be used to identify you in the community. This can only be set once."}
                            </p>
                        </div>
                        <div>
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea id="bio" placeholder="Bio" />
                        </div>
                        <div>
                            <Label htmlFor="bio_link">Bio Link</Label>
                            <Input id="bio_link" placeholder="Bio Link" />
                        </div></>)}
                    {step === 1 && (<>
                        {Object.keys({
                            twitter: 'Twitter',
                            instagram: 'Instagram',
                            linkedin: 'Linkedin',
                            github: 'Github',
                            youtube: 'Youtube',
                            website: 'Website',
                        }).map((key) => {
                            return (
                                <div key={key}>
                                    <Label htmlFor={key}>{key}</Label>
                                    <Input id={key} placeholder={key} />
                                </div>
                            );
                        })}
                    </>)}
                    {step === 2 && (<>
                        {Object.keys({
                            twitter: 'Twitter',
                            instagram: 'Instagram',
                            linkedin: 'Linkedin',
                            github: 'Github',
                            youtube: 'Youtube',
                            website: 'Website',
                        }).map((key) => {
                            return (
                                <div key={key}>
                                    <Label htmlFor={key}>{key}</Label>
                                    <Input id={key} placeholder={key} />
                                </div>
                            );
                        })}
                    </>)}
                </div>
                <div className="flex justify-between  items-center mt-5 gap-2">
                    <Button onClick={() => setStep(step - 1)} disabled={step === 0} variant="outline">Back</Button>
                    <Button onClick={() => setStep(step + 1)} disabled={step === 2} className="w-full">Next</Button>
                </div>
            </div>

        </div>
    )
}