"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import axios from "axios";
import {
  Camera,
  Check,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  User,
  X
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { SessionUserType } from "~/auth";
import { authClient } from "~/auth/client";

const DEFAULT_PROFILE_URL = "https://res.cloudinary.com/nexonauts/image/upload/v1680632194/kkupgrader/placeholder_rwezi6.png";

type Props = {
  user: SessionUserType;
  serverActions: {
    handleUpdateName: (newName: string) => Promise<{ result: string; message: string }>;
    handleUpdatePassword: (old: string, newP: string) => Promise<{ result: string; message: string }>;
  };
};

export function AccountForm({ user: initialUser, serverActions }: Props) {
  const [user, setUser] = useState(initialUser);
  const { refetch } = authClient.useSession();

  // State
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState(user.name);

  const [changePassOpen, setChangePassOpen] = useState(false);
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });

  const [imageStatus, setImageStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // --- HANDLERS ---

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "");
    formData.append("folder", process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER || "");

    setImageStatus("loading");
    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      setUser({ ...user, image: res.data.secure_url });
      setImageStatus("success");
      await refetch(); // Sync session
      toast.success("Profile picture updated");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
      setImageStatus("error");
    } finally {
      setImageStatus("idle");
    }
  };

  const handleNameUpdate = async () => {
    if (tempName.trim() === user.name) {
      setEditingName(false);
      return;
    }

    toast.promise(serverActions.handleUpdateName(tempName), {
      loading: "Updating name...",
      success: (res) => {
        setUser({ ...user, name: tempName });
        setEditingName(false);
        return res.message;
      },
      error: "Failed to update name"
    });
  };

  const handlePasswordUpdate = async () => {
    if (passwords.new !== passwords.confirm) {
      toast.error("New passwords do not match");
      return;
    }

    toast.promise(serverActions.handleUpdatePassword(passwords.current, passwords.new), {
      loading: "Updating password...",
      success: () => {
        setChangePassOpen(false);
        setPasswords({ current: "", new: "", confirm: "" });
        return "Password updated successfully";
      },
      error: (err) => err?.message || "Failed to update password"
    });
  };

  return (
    <div className="space-y-8">

      {/* --- AVATAR SECTION --- */}
      <div className="bg-card/50 border border-border/50 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="relative group">
          <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
            <AvatarImage src={user.image || DEFAULT_PROFILE_URL} alt={user.name} className="object-cover" />
            <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
              {user.name[0]}
            </AvatarFallback>
          </Avatar>

          <Dialog>
            <DialogTrigger asChild>
              <button className="absolute bottom-0 right-0 p-1.5 bg-primary text-primary-foreground rounded-full shadow-md hover:bg-primary/90 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Profile Picture</DialogTitle>
                <DialogDescription>Upload a new image or remove the current one.</DialogDescription>
              </DialogHeader>

              <div className="flex flex-col items-center gap-6 py-4">
                <div className="relative h-40 w-40 rounded-full overflow-hidden border-2 border-dashed border-border flex items-center justify-center bg-muted/20 hover:bg-muted/40 transition-colors group cursor-pointer">
                  {imageStatus === "loading" ? (
                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                  ) : (
                    <Image
                      src={user.image || DEFAULT_PROFILE_URL}
                      alt="Preview"
                      fill
                      className="object-cover opacity-50 group-hover:opacity-30 transition-opacity"
                    />
                  )}
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-6 h-6 text-foreground mb-2" />
                    <span className="text-xs font-medium">Click to Upload</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleImageUpload}
                  />
                </div>

                {user.image !== DEFAULT_PROFILE_URL && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setUser({ ...user, image: DEFAULT_PROFILE_URL });
                      // Trigger backend removal if needed
                    }}
                  >
                    Remove Picture
                  </Button>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="text-center sm:text-left space-y-1">
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-muted-foreground text-sm">{user.email}</p>
          <div className="flex gap-2 justify-center sm:justify-start pt-2">
            <span className="inline-flex items-center rounded-full border border-border bg-background px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
              Personal Account
            </span>
          </div>
        </div>
      </div>

      {/* --- PERSONAL INFO --- */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <User className="w-5 h-5 text-primary" /> Personal Information
        </h3>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <div className="relative">
              <Input
                value={editingName ? tempName : user.name}
                onChange={(e) => setTempName(e.target.value)}
                disabled={!editingName}
                className={cn("pr-24", !editingName && "bg-muted/30 border-transparent")}
              />
              <div className="absolute right-1 top-1 flex gap-1">
                {editingName ? (
                  <>
                    <Button size="sm" variant="ghost" onClick={() => setEditingName(false)} className="h-8 px-2 text-muted-foreground hover:text-foreground">
                      <X className="w-4 h-4" />
                    </Button>
                    <Button size="sm" onClick={handleNameUpdate} className="h-8 px-2">
                      <Check className="w-4 h-4" />
                    </Button>
                  </>
                ) : (
                  <Button size="sm" variant="secondary" onClick={() => setEditingName(true)} className="h-8 px-3 text-xs">
                    Edit
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input value={user.email} disabled className="pl-9 bg-muted/30 border-transparent" />
              {/* Add edit email logic later if needed */}
            </div>
            <p className="text-[11px] text-muted-foreground">Email cannot be changed directly.</p>
          </div>
        </div>
      </div>

      <Separator />

      {/* --- SECURITY --- */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-primary" /> Security
        </h3>

        <div className="bg-card border border-border/50 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="space-y-1">
            <h4 className="font-medium">Password</h4>
            <p className="text-sm text-muted-foreground">Last updated 3 months ago</p>
          </div>

          {changePassOpen ? (
            <div className="w-full sm:max-w-sm space-y-3 bg-background p-4 rounded-lg border border-border animate-in fade-in zoom-in-95">
              <div className="space-y-2">
                <Label className="text-xs">Current Password</Label>
                <Input type="password" value={passwords.current} onChange={(e) => setPasswords({ ...passwords, current: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">New Password</Label>
                <Input type="password" value={passwords.new} onChange={(e) => setPasswords({ ...passwords, new: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Confirm New Password</Label>
                <Input type="password" value={passwords.confirm} onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })} />
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => setChangePassOpen(false)}>Cancel</Button>
                <Button size="sm" className="flex-1" onClick={handlePasswordUpdate}>Update</Button>
              </div>
            </div>
          ) : (
            <Button variant="outline" onClick={() => setChangePassOpen(true)}>
              <Lock className="w-4 h-4 mr-2" />
              Change Password
            </Button>
          )}
        </div>
      </div>

    </div>
  );
}