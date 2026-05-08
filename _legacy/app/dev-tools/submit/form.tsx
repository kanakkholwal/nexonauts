"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, Link as LinkIcon, Mail, Send, User } from "lucide-react";
import { useFormStore } from "./store";

// Helper component for form field with icon
const FieldWrapper = ({ children, icon: Icon }: { children: React.ReactNode; icon: React.ElementType }) => (
  <div className="relative">
    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
      <Icon className="w-4 h-4" />
    </div>
    <div className="[&>input]:pl-10">
      {children}
    </div>
  </div>
);

export default function SubmitForm() {
  const formState = useFormStore();

  // Simple validation check
  const isValid =
    formState.name.trim() !== "" &&
    formState.email.trim() !== "" &&
    (formState.website.trim() !== "" || formState.github_repo.trim() !== "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form data:", useFormStore.getState());
    // Add your actual submission logic here (e.g., API call)
    alert("Thanks for submitting! Check console for data.");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* --- Section 1: About You --- */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider pb-2 border-b border-border/50">
          About You
        </h3>
        <div className="grid gap-5">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="name">Your Name</Label>
            <FieldWrapper icon={User}>
              <Input
                type="text"
                id="name"
                placeholder="Jane Doe"
                value={formState.name}
                onChange={(e) => useFormStore.setState({ name: e.target.value })}
                className="bg-background/50"
              />
            </FieldWrapper>
          </div>

          <div className="grid w-full items-center gap-2">
            <Label htmlFor="email">Email Address</Label>
            <FieldWrapper icon={Mail}>
              {/* Make sure Mail icon is imported from lucide-react */}
              <Input
                type="email"
                id="email"
                placeholder="jane@example.com"
                value={formState.email}
                onChange={(e) => useFormStore.setState({ email: e.target.value })}
                className="bg-background/50"
              />
            </FieldWrapper>
            <p className="text-xs text-muted-foreground">We&apos;ll only use this to notify you about your submission.</p>
          </div>
        </div>
      </div>

      {/* --- Section 2: Project Links --- */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider pb-2 border-b border-border/50">
          Project Links
        </h3>
        <div className="grid gap-5">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="website">Portfolio / Social URL</Label>
            <FieldWrapper icon={LinkIcon}>
              <Input
                type="url"
                id="website"
                placeholder="https://twitter.com/yourhandle"
                value={formState.website}
                onChange={(e) => useFormStore.setState({ website: e.target.value })}
                className="bg-background/50"
              />
            </FieldWrapper>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="github_username">GitHub Username</Label>
              <FieldWrapper icon={Github}>
                <Input
                  type="text"
                  id="github_username"
                  placeholder="janedoe"
                  value={formState.github_username}
                  onChange={(e) =>
                    useFormStore.setState({ github_username: e.target.value })
                  }
                  className="bg-background/50"
                />
              </FieldWrapper>
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="github_repo">Repository URL <span className="text-destructive">*</span></Label>
              <FieldWrapper icon={LinkIcon}>
                <Input
                  type="url"
                  id="github_repo"
                  placeholder="https://github.com/..."
                  value={formState.github_repo}
                  onChange={(e) =>
                    useFormStore.setState({ github_repo: e.target.value })
                  }
                  required // Added basic HTML required attribute
                  className="bg-background/50"
                />
              </FieldWrapper>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">At least one project link or repository URL is required.</p>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full font-semibold text-base"
        // Removed the hardcoded disabled={true} so you can test the UI state
        disabled={!isValid}
      >
        Submit for Review
        <Send className="w-4 h-4 ml-2" />
      </Button>
    </form>
  );
}