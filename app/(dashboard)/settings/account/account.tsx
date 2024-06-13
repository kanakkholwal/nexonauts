'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Pencil, Save, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BiLockAlt } from 'react-icons/bi';
import { CgSpinnerAlt } from 'react-icons/cg';
import { LuImage } from 'react-icons/lu';
import { SessionUserType } from 'src/types/user';

const DEFAULT_PROFILE_URL =
  'https://res.cloudinary.com/kanakkholwal-portfolio/image/upload/v1680632194/kkupgrader/placeholder_rwezi6.png';

type Props = {
  user: SessionUserType;
  serverActions: {
    handleUpdateName: (newName: string) => Promise<{
      result: string;
      message: string;
    }>;
    handleUpdatePassword: (
      oldPassword: string,
      newPassword: string
    ) => Promise<{
      result: string;
      message: string;
    }>;
  };
};
export function AccountForm({ user: CurrentUser, serverActions }: Props) {
  const { handleUpdateName } = serverActions;
  const [user, setUser] = useState(CurrentUser);
  const { data: session, update } = useSession();
  const [currentPassword, setCurrentPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [editingName, setEditingName] = useState(false);
  // const [editingEmail, setEditingEmail] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [imageStatus, setImageStatus] = useState(
    'idle' as 'idle' | 'loading' | 'success' | 'error'
  );

  const handleFiles = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const CLOUDINARY_UPLOAD_PRESET =
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    if (!CLOUDINARY_UPLOAD_PRESET) {
      toast.error('CLOUDINARY_UPLOAD_PRESET is missing');
      return;
    }
    const CLOUDINARY_FOLDER = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER;
    if (!CLOUDINARY_FOLDER) {
      toast.error('CLOUDINARY_FOLDER is missing');
      return;
    }
    const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (!CLOUDINARY_CLOUD_NAME) {
      toast.error('CLOUDINARY_CLOUD_NAME is missing');
      return;
    }
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', CLOUDINARY_FOLDER);

    setImageStatus('loading');
    // upload image to cloudinary and get url
    await axios(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        data: formData,
      }
    )
      .then((res) => {
        const file = res.data;
        // console.log(file);
        setUser({ ...user, profilePicture: file.secure_url });
        setImageStatus('success');
      })
      .catch((err) => {
        console.log(err);
        setImageStatus('error');
      })
      .finally(() => {
        setImageStatus('idle');
      });
  };

  const handleChange = async (event) => {
    const { files } = event.target;

    if (files && files.length) {
      console.log(files);
      toast.promise(handleFiles(files[0]), {
        loading: 'Uploading..',
        success: 'Image uploaded successfully',
        error: 'Something went wrong',
      });
    }
  };

  const changePassword = async (event) => {
    event.preventDefault();
    if (currentPassword === confirmPassword) {
      toast.error("New password can't be same as old password");
      return;
    }
    if (currentPassword.trim() === '' || confirmPassword.trim().length < 6) {
      toast.error('Invalid password');
      return;
    }
    toast
      .promise(
        serverActions.handleUpdatePassword(currentPassword, confirmPassword),
        {
          loading: 'Updating password..',
          success: 'Password updated successfully',
          error: 'Something went wrong',
        }
      )
      .finally(() => {
        setCurrentPassword('');
        setConfirmPassword('');
        setEditingPassword(false);
      });
  };

  async function isImageURLValid(url: string): Promise<boolean> {
    return fetch(url)
      .then((response) => {
        // Check if the HTTP status code is in the 200 range (success)
        if (response.status >= 200 && response.status < 300) {
          // Check the content type in the response headers
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.startsWith('image/')) {
            return true; // It's a valid image URL
          }
        }
        return false; // It's not a valid image URL
      })
      .catch(() => {
        return false; // An error occurred (e.g., network issue)
      });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2 w-full mb-5 flex-wrap">
        <div className=" flex items-center gap-2">
          <Avatar className="h-20 w-20">
            <AvatarImage
              alt={CurrentUser.name}
              src={user.profilePicture.toString()}
              height={180}
              width={180}
            />
            <AvatarFallback className="bg-slate-200 dark:bg-slate-900 text-4xl">
              {CurrentUser.name[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-bold mb-0">{CurrentUser.name}</h4>
            <p className="text-sm text-muted-foreground">{CurrentUser.email}</p>
          </div>
        </div>
        <div className="flex gap-1 items-center justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="slate">
                Upload new photo
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload a new photo</DialogTitle>
                <DialogDescription>
                  Upload a new photo from your computer or paste a link to an
                  image.
                </DialogDescription>
              </DialogHeader>
              <div className="group flex justify-center items-center relative overflow-hidden w-[150px] h-[150px] rounded-full border border-border bg-slate-100 dark:bg-slate-900 duration-300 hover:border-primary mx-auto cursor-pointer">
                {user?.profilePicture ? (
                  <Image
                    width={150}
                    height={150}
                    alt={user.name}
                    src={user.profilePicture.toString()}
                  />
                ) : (
                  <Image
                    width={150}
                    height={150}
                    alt={'user profile image'}
                    src={
                      'https://res.cloudinary.com/nexonauts/image/upload/v1680632194/kkupgrader/placeholder_rwezi6.png'
                    }
                  />
                )}
                <label
                  htmlFor="imageUpload"
                  className="absolute inset-0 flex justify-center items-center flex-col gap-1 text-xs cursor-pointer backdrop-blur-sm duration-300 text-slate-600 opacity-0 group-hover:opacity-100 visibility-hidden group-hover:visible"
                >
                  <span>Upload</span>
                  <span>Profile Picture</span>
                  <span>Click or Drop</span>
                  <span>Image Here</span>
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    id="imageUpload"
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="flex items-center gap-2 w-full">
                <div className="relative grow">
                  <Label className="absolute top-1/2 -translate-y-1/2 left-4 z-50">
                    {imageStatus === 'loading' ? (
                      <CgSpinnerAlt className="w-4 h-4 animate-spin" />
                    ) : (
                      <LuImage
                        className={`w-4 h-4 ${imageStatus === 'success' && 'text-green-500'} ${imageStatus === 'error' && 'text-red-500'}`}
                      />
                    )}
                  </Label>
                  <Input
                    id="profilePicture"
                    placeholder="Enter image URL"
                    type="url"
                    autoCorrect="off"
                    className="pl-12 !py-3 pr-5 !mt-0"
                    value={user.profilePicture.toString()}
                    onChange={async (e) => {
                      const url = e.target.value;
                      setImageStatus('loading');
                      await isImageURLValid(url)
                        .then((valid) => {
                          if (valid) {
                            setUser({
                              ...user,
                              profilePicture: url,
                            });
                          } else {
                            toast.error('Invalid Image URL');
                          }
                        })
                        .catch((err) => {
                          console.log(err);
                          setImageStatus('error');
                          toast.error('Invalid Image URL');
                        })
                        .finally(() => {
                          setImageStatus('idle');
                        });
                    }}
                    variant="glass"
                  />
                </div>

                <Button
                  size="sm"
                  variant="slate"
                  onClick={() => {
                    try {
                      update({
                        ...session,
                        user: {
                          ...CurrentUser,
                          profilePicture: user.profilePicture,
                        },
                      });
                      toast.success('Profile picture updated successfully');
                    } catch (err) {
                      console.log(err);
                      toast.error('Something went wrong');
                    }
                  }}
                  disabled={
                    imageStatus === 'loading' ||
                    imageStatus === 'error' ||
                    user?.profilePicture === DEFAULT_PROFILE_URL
                  }
                >
                  Save
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            size="sm"
            variant="slate"
            onClick={() => {
              setUser({ ...user, profilePicture: DEFAULT_PROFILE_URL });
            }}
          >
            Remove photo
          </Button>
        </div>
      </div>
      <div className="w-full mb-5">
        <h3 className="font-bold">Full Name</h3>
        <p className="text-sm text-muted-foreground">
          Your full name, or the name you go by.
        </p>
        <div className="flex items-center gap-2 mt-2">
          <Input
            placeholder="Enter your full name"
            value={user.name}
            onChange={(e) =>
              setUser({
                ...user,
                name: e.target.value,
              })
            }
            variant="glass"
            disabled={!editingName}
          />
          <Button
            size={'icon'}
            variant="default_light"
            onClick={() => {
              if (!editingName) {
                setEditingName(true);
                return;
              }

              handleUpdateName(user.name).then((res) => {
                if (res.result === 'success') {
                  toast.success(res.message);
                  update({
                    ...session,
                    user: {
                      ...CurrentUser,
                      name: user.name,
                    },
                  });
                  setEditingName(false);
                }
              });
            }}
          >
            {editingName ? (
              <Save className="w-4 h-4" />
            ) : (
              <Pencil className="w-4 h-4" />
            )}
          </Button>
          {editingName && (
            <Button
              size={'icon'}
              variant="destructive_light"
              onClick={() => {
                setEditingName(false);
              }}
            >
              {' '}
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
      {/* <div className="w-full mb-5">
                <h3 className="font-bold">
                    Contact Email
                </h3>
                <p className="text-sm text-muted-foreground">
                    Manage your email address for account notifications and invoices.
                </p>
                <div className="flex items-center gap-2 mt-2">
                    <div className='relative grow'>
                        <Label className='absolute top-1/2 -translate-y-1/2 left-4 z-50'>
                            <LuMail className='w-4 h-4' />
                        </Label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            className='pl-12 !py-3 pr-5 !mt-0'
                            value={user?.email} onChange={(e) => setUser({
                                ...user,
                                email: e.target.value
                            })}
                            variant="ghost"
                        />
                    </div>
                    <Button size="sm" variant="slate">
                        Save
                    </Button>
                </div>

            </div> */}
      <div className="w-full mb-5">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h3 className="font-bold">Password</h3>
            <p className="text-sm text-muted-foreground">
              Change your password. Make sure it's at least 6 characters long.
            </p>
          </div>
          <div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setEditingPassword(!editingPassword);
              }}
            >
              Change Password
            </Button>
          </div>
        </div>
        {editingPassword && (
          <div className="flex items-center gap-2 mt-2">
            <div className="relative grow">
              <Label className="absolute top-1/2 -translate-y-1/2 left-4 z-50">
                <BiLockAlt className="w-4 h-4" />
              </Label>
              <Input
                id="currentPassword"
                placeholder="Enter your current password"
                type="text"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                className="pl-12 !py-3 pr-5 !mt-0"
                value={currentPassword}
                required
                onChange={(e) => setCurrentPassword(e.target.value)}
                variant="glass"
              />
            </div>
            <div className="relative grow">
              <Label className="absolute top-1/2 -translate-y-1/2 left-4 z-50">
                <BiLockAlt className="w-4 h-4" />
              </Label>
              <Input
                id="password"
                placeholder="Enter your new password"
                type="text"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                className="pl-12 !py-3 pr-5 !mt-0"
                value={confirmPassword}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                variant="glass"
              />
            </div>
            <Button
              size="icon"
              variant="default_light"
              onClick={changePassword}
              disabled={
                currentPassword === confirmPassword ||
                currentPassword.trim() === '' ||
                confirmPassword.trim() === '' ||
                confirmPassword.trim().length < 6 ||
                currentPassword.trim().length < 6
              }
            >
              <Save className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
