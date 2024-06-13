"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";
import { useFormStore } from "./store";

export default function SubmitForm() {
  return (
    <div className="flex-auto w-full">
      <div className="grid gap-5 w-full">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            placeholder="Name"
            variant="fluid"
            value={useFormStore((state) => state.name)}
            onChange={(e) => useFormStore.setState({ name: e.target.value })}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Email"
            variant="fluid"
            value={useFormStore((state) => state.email)}
            onChange={(e) => useFormStore.setState({ email: e.target.value })}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="website">Website/ Twitter / Linkedin Url</Label>
          <Input
            type="url"
            id="website"
            placeholder="Enter any of your website, twitter or linkedin url"
            variant="fluid"
            value={useFormStore((state) => state.website)}
            onChange={(e) => useFormStore.setState({ website: e.target.value })}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="github_username">Github Username</Label>
          <Input
            type="text"
            id="github_username"
            placeholder="Github Username"
            variant="fluid"
            value={useFormStore((state) => state.github_username)}
            onChange={(e) =>
              useFormStore.setState({ github_username: e.target.value })
            }
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="github_repo">Github Repo Url</Label>
          <Input
            type="url"
            id="github_repo"
            placeholder="Github Repo Url"
            variant="fluid"
            value={useFormStore((state) => state.github_repo)}
            onChange={(e) =>
              useFormStore.setState({ github_repo: e.target.value })
            }
          />
        </div>
      </div>
      <div className="flex justify-center items-center w-full gap-1.5 mt-5">
        <Button
          type="submit"
          disabled={true}
          // disabled={!useFormStore(state => state.name) || !useFormStore(state => state.email) || !useFormStore(state => state.github_username) || !useFormStore(state => state.github_repo)}
          onClick={() => console.log(useFormStore.getState())}
        >
          Submit Tool
          <Send className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
