import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from 'axios';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import Layout from 'layouts/apps/layout';
import { getSession, useSession } from "next-auth/react";
import Head from 'next/head';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BiLockAlt } from "react-icons/bi";
import { CgSpinnerAlt } from "react-icons/cg";
import { LuImage, LuMail } from "react-icons/lu";
import { PiCrownSimpleBold } from "react-icons/pi";
import { SessionUserType } from 'src/types/user';
import styled from 'styled-components';



const FileUploader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 1px solid #ccc;
    background: #f4f4f4;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    margin-inline:auto;
    label{
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 0.125rem;
        font-size: 0.75rem;
        font-weight: 500;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        background: rgba(var(--light-rgb),0.05);
        color: rgba(var(--light-rgb),1);
        backdrop-filter: blur(10px);
        transition: all 0.3s ease-in-out;
    }
    &:hover {
        background: #e4e4e4;
        label{
            opacity: 1;
            visibility: visible;
        }
    }
`;
type TabItemType = {
    title: string,
    id: string,
    Component: React.ElementType
}
const TABLIST = [
    {
        title: "Profile",
        id: "profile",
        Component: Profile
    }

] as TabItemType[]

const DEFAULT_PROFILE_URL = "https://res.cloudinary.com/kanakkholwal-portfolio/image/upload/v1680632194/kkupgrader/placeholder_rwezi6.png"
export default function SettingsPage({ user: CurrentUser }: {
    user: SessionUserType
}) {

    const router = useRouter()



    return (
        <Layout user={CurrentUser}>
            <Head>
                <title>Settings</title>
            </Head>
            <div className="space-y-6 p-10 pb-16 w-full">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                    <p className="text-muted-foreground">
                        Manage your account settings and set e-mail preferences.
                    </p>
                </div>
                <Separator className="my-6" />
                <Tabs className="flex flex-col w-full space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0" defaultValue={TABLIST.find(item => item.id === router.query.defaultTab) ? router.query.defaultTab?.toString() : TABLIST[0].id}>
                    <TabsList className="-mx-4 lg:w-1/4 w-full md:flex-col md:justify-start md:h-fit gap-2 ">
                        {TABLIST.map((item: TabItemType, index) => {
                            return <TabsTrigger value={item.id} className="w-full" key={item.id}>{item.title}</TabsTrigger>
                        })}
                    </TabsList>
                    <div className="flex-1 lg:max-w-2xl">
                        {TABLIST.map((Item: TabItemType, index) => {
                            return <TabsContent value={Item.id} key={Item.id}>
                                <Item.Component user={CurrentUser} />
                            </TabsContent>
                        })}

                    </div>
                </Tabs>
            </div>



        </Layout>)
}
function Profile({ user: CurrentUser }) {
    const [user, setUser] = useState(CurrentUser);
    const { data: session, update } = useSession();
    const [currentPassword, setCurrentPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [imageStatus, setImageStatus] = useState("idle" as "idle" | "loading" | "success" | "error");


    const handleFiles = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
        if (!CLOUDINARY_UPLOAD_PRESET) {
            toast.error("CLOUDINARY_UPLOAD_PRESET is missing");
            return
        }
        const CLOUDINARY_FOLDER = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER
        if (!CLOUDINARY_FOLDER) {
            toast.error("CLOUDINARY_FOLDER is missing");
            return
        }
        const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
        if (!CLOUDINARY_CLOUD_NAME) {
            toast.error("CLOUDINARY_CLOUD_NAME is missing");
            return
        }
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        formData.append('folder', CLOUDINARY_FOLDER);

        setImageStatus("loading");
        // upload image to cloudinary and get url
        await axios(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
            method: 'POST',
            data: formData
        }).then(res => {
            const file = res.data;
            // console.log(file);
            setUser({ ...user, profileURL: file.secure_url });
            setImageStatus("success");
        }).catch(err => {
            console.log(err);
            setImageStatus("error");
        }).finally(() => {
            setImageStatus("idle");
        })

    }


    const handleChange = async (event) => {
        const { files } = event.target;

        if (files && files.length) {
            console.log(files);
            toast.promise(handleFiles(files[0]), {
                loading: 'Uploading..',
                success: 'Image uploaded successfully',
                error: 'Something went wrong',
            })
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(user);
        //  on submit change user data

        try {
            await axios.put('/api/users/' + user.id, { user })
                .then(res => {
                    console.log(res);
                    update({
                        user: res.data.user
                    })
                }).catch(err => {
                    console.log(err);
                })
        }
        catch (err) {
            console.log(err);
        }
    }
    const sendVerificationEmail = async () => {
        await axios.post('/api/users/send-verification-email', { email: user.email })
            .then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
    }
    const changePassword = async (event) => {
        event.preventDefault();
        return new Promise(async (resolve, reject) => {
            try {
                await axios.put('/api/users/' + user.id + "/change-password", {
                    currentPassword: currentPassword,
                    newPassword: confirmPassword,
                })
                    .then(res => {
                        console.log(res);
                        resolve(res);
                    }).catch(err => {
                        console.log(err);
                        reject(err);
                    })
            }
            catch (err) {
                console.log(err);
                reject(err);
            }
        })
    }

    function isImageURLValid(url) {
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
            <div>
                <h3 className="text-lg font-medium">Profile</h3>
                <p className="text-sm text-muted-foreground">
                    This is how you or others will see you on the site.
                </p>
            </div>
            <Separator />
            <div className="flex items-center justify-between gap-2 w-full mb-5">
                <div className=" flex items-center gap-2">
                    <Avatar className="h-20 w-20">
                        <AvatarImage alt={CurrentUser.name} src={user.profileURL} height={180} width={180} />
                        <AvatarFallback className="bg-primary/2">{CurrentUser.name.trim().split(" ")[0]}</AvatarFallback>
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
                                <DialogTitle>
                                    Upload a new photo
                                </DialogTitle>
                                <DialogDescription>
                                    Upload a new photo from your computer or paste a link to an image.
                                </DialogDescription>
                            </DialogHeader>
                            <FileUploader >
                                {user?.profileURL ?
                                    <Image width={150} height={150}
                                        alt={user.name} src={user.profileURL}
                                    /> : <Image width={150} height={150}
                                        alt={"user profile image"} src={"https://res.cloudinary.com/kanakkholwal-portfolio/image/upload/v1680632194/kkupgrader/placeholder_rwezi6.png"} />}
                                <label htmlFor="imageUpload">
                                    <span>Upload</span>
                                    <span>Profile Picture</span>
                                    <span>Click or Drop</span>
                                    <span>Image Here</span>
                                    <input type="file" hidden accept="image/*" id="imageUpload" onChange={handleChange} />
                                </label>
                            </FileUploader>
                            <div className="flex items-center gap-2 w-full">
                                <div className='relative grow'>
                                    <Label className='absolute top-1/2 -translate-y-1/2 left-4 z-50'>

                                        {imageStatus === "loading" ? <CgSpinnerAlt className="w-4 h-4 animate-spin" /> : <LuImage className={`w-4 h-4 ${imageStatus === "success" && "text-green-500"} ${imageStatus === "error" && "text-red-500"}`} />}
                                    </Label>
                                    <Input
                                        id="profileURL"
                                        placeholder="Enter image URL"
                                        type="url"
                                        autoCorrect="off"
                                        className='pl-12 !py-3 pr-5 !mt-0'
                                        value={user?.profileURL} onChange={async (e) => {
                                            const url = e.target.value;
                                            setImageStatus("loading");
                                            await isImageURLValid(url).then(valid => {
                                                if (valid) {
                                                    setUser({
                                                        ...user,
                                                        profileURL: url
                                                    })
                                                }
                                                else {
                                                    toast.error("Invalid Image URL");

                                                }
                                            }).catch(err => {
                                                console.log(err);
                                                setImageStatus("error");
                                                toast.error("Invalid Image URL");
                                            }).finally(() => {
                                                setImageStatus("idle");
                                            })

                                        }}
                                        variant="ghost"
                                    />
                                </div>

                                <Button size="sm" variant="slate" onClick={() => {
                                    try {
                                        update({
                                            ...session,
                                            user: {
                                                ...CurrentUser,
                                                profileURL: user.profileURL
                                            }
                                        })
                                        toast.success("Profile picture updated successfully");
                                    }
                                    catch (err) {
                                        console.log(err);
                                        toast.error("Something went wrong");
                                    }
                                }}
                                    disabled={imageStatus === "loading" || imageStatus === "error" || user?.profileURL === DEFAULT_PROFILE_URL}
                                >

                                    Save
                                </Button>
                            </div>

                        </DialogContent>
                    </Dialog>

                    <Button size="sm" variant="slate" onClick={() => {
                        setUser({ ...user, profileURL: DEFAULT_PROFILE_URL })
                    }}>
                        Remove photo
                    </Button>
                </div>
            </div>
            <div className="w-full mb-5">
                <h3 className="font-bold">
                    Full Name
                </h3>
                <p className="text-sm text-muted-foreground">
                    Your full name, or the name you go by.
                </p>
                <div className="flex items-center gap-2 mt-2">
                    <Input placeholder="Enter your full name" value={user?.name} onChange={(e) => setUser({
                        ...user,
                        name: e.target.value
                    })}
                        variant="ghost"
                    />
                    <Button size="sm" variant="slate">
                        Save
                    </Button>
                </div>

            </div>
            <div className="w-full mb-5">
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

            </div>
            <div className="w-full mb-5">
                <h3 className="font-bold">
                    Password
                </h3>
                <p className="text-sm text-muted-foreground">
                    Modify your account's current password.
                </p>
                <div className="flex items-center gap-2 mt-2">
                    <div className='relative grow'>
                        <Label className='absolute top-1/2 -translate-y-1/2 left-4 z-50'>
                            <BiLockAlt className='w-4 h-4' />
                        </Label>
                        <Input
                            id="currentPassword"
                            placeholder="Enter your current password"
                            type="text"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            className='pl-12 !py-3 pr-5 !mt-0'
                            value={currentPassword} required
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            variant="ghost"
                        />
                    </div>
                    <div className='relative grow'>
                        <Label className='absolute top-1/2 -translate-y-1/2 left-4 z-50'>
                            <BiLockAlt className='w-4 h-4' />
                        </Label>
                        <Input
                            id="password"
                            placeholder="Enter your new password"
                            type="text"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            className='pl-12 !py-3 pr-5 !mt-0'
                            value={confirmPassword} required
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            variant="ghost"
                        />
                    </div>
                    <Button size="sm" variant="slate"
                        onClick={changePassword}

                        disabled={currentPassword === confirmPassword || currentPassword.trim() === "" || confirmPassword.trim().length < 6}>
                        Save
                    </Button>
                </div>

            </div>
            <div className="w-full mb-5">
                <h3 className="font-bold">
                    Account Type
                </h3>
                <p className="text-sm text-muted-foreground">
                    {CurrentUser?.account_type === "premium" ? "You are a premium user. You have access to all features." : "You are a free user. You have limited access to features."}
                </p>
                {CurrentUser?.account_type === "premium" ? <div className="flex items-center gap-2 mt-5">
                    <Link href="/pricing">
                        <Button size="sm" variant="gradient">
                            <PiCrownSimpleBold className="w-4 h-4 mr-2" />
                            Upgrade to Premium
                        </Button>
                    </Link>
                </div> : null}

            </div>

            {/* <p>
                <Badge nature={CurrentUser?.account_type === "premium" ? "success" : "warning"} className="g-0">
                    {user?.account_type}
                </Badge>
                <Badge nature={CurrentUser?.verified === true ? "success" : "warning"} className="g-0">
                    {user.verified === true ? "Verified" : "Email not verified"}<MdVerified />
                </Badge>
            </p>
            {CurrentUser?.verified === false && <p className="text-muted small">Your email is not verified. Please verify your email to get access to all features.</p>}
            {CurrentUser?.verified === false && <p className="text-muted small">You can send verification email again if you didn't receive it.</p>}
            <span className="verify" onClick={() => {
                toast.promise(sendVerificationEmail(), {
                    loading: "Sending Email..",
                    success: "Email sent successfully",
                    error: "Something went wrong"
                })
            }}
                hidden={CurrentUser?.verified === true}
            >
                Send Verification Email
            </span> */}

        </div>)
}


export async function getServerSideProps(context) {


    const session = await getSession(context);

    if (!session)
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }



    return {
        props: { user: session.user },

    }
}