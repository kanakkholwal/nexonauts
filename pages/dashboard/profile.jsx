import DashboardPage, { Header } from "components/dashboard-page";
import Head from 'next/head';
import Button from 'components/buttons';
import Tabs from 'components/Tabs';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from 'components/Card';
import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';
import { getSession } from "next-auth/react"
import toast, { Toaster } from 'react-hot-toast';

import { FormElement, Label, Input, FormGroup } from 'components/form-elements';
import { registerView } from "lib/analytics";
import { useEffect } from "react";

const Wrapper = styled(Card)`
flex-direction: row;
justify-content:space-evenly;
align-items: center;
flex-wrap:wrap;
`;

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

const EditProfile = ({ user: CurrentUser }) => {
    const [user, setUser] = useState(CurrentUser);

    const handleFiles = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
        formData.append('folder', process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER);


        // upload image to cloudinary and get url
        await axios(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
            method: 'POST',
            data: formData
        }).then(res => {
            const file = res.data;
            // console.log(file);
            setUser({ ...user, profileURL: file.secure_url });
        }).catch(err => {
            console.log(err);
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

        try {
            await axios.put('/api/users/' + user.id, { user })
                .then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        registerView({ title: "Profile", type: "dashboard", slug: "/dashboard/profile" })
    }, [])


    return (
        <>


            <Wrapper>

                
                    <FormGroup style={{ justifyContent: "flex-start" ,flexDirection:"column"}}>

                        <FileUploader>
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

                        <FormElement>
              
                            <Label htmlFor="profile-pic-url" className="small">or Enter a url</Label>
                            <Input placeholder="Enter or paste picture url from external source..." id="profile-pic-url" size="sm" value={user.profileURL ?? "https://res.cloudinary.com/kanakkholwal-portfolio/image/upload/v1680632194/kkupgrader/placeholder_rwezi6.png"} onChange={(e) => setUser({
                                ...user,
                                profileURL: e.target.value
                            })} />
                        </FormElement>
                    </FormGroup>
             
                    <FormGroup>
                        <FormElement>
                            <Label htmlFor="name">Your Name</Label>
                            <Input placeholder="Enter your name." id="name" value={user?.name} onChange={(e) => setUser({
                                ...user,
                                name: e.target.value
                            })} />
                        </FormElement>
                        <FormElement>
                            <Label htmlFor="profile-pic-url">Your Email</Label>
                            <Input placeholder="email" type="email" id="email" value={user?.email} onChange={(e) => setUser({
                                ...user,
                                email: e.target.value
                            })} />
                        </FormElement>
                    </FormGroup>    <FormGroup>

                        <Button size="sm" nature="primary" onClick={(event) => {
                            toast.promise(handleSubmit(event), {
                                loading: 'Updating..',
                                success: 'User updated successfully',
                                error: 'Something went wrong',
                            })
                        }}>Save Profile</Button>
                        <Button size="sm" nature="danger" as={Link} href="/dashboard">Cancel</Button>
                    </FormGroup>



            </Wrapper>
            <Toaster
                position="top-center"
            />
        </>)
}
const ChangePassword = ({ user }) => {


    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put('/api/users/' + user.id + "/change-password", {
                currentPassword,
                newPassword: password,
            })
                .then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })
        }
        catch (err) {
            console.log(err);
        }
    }
    return (<Card>

        <FormGroup>
            <FormElement>
                <Label htmlFor="currentPassword">Enter Current Password</Label>
                <Input placeholder="Enter Current Password" type="text" id="currentPassword"
                    value={currentPassword} required
                    onChange={(e) => setCurrentPassword(e.target.value)} />
            </FormElement>
            <FormElement>
                <Label htmlFor="password">Enter new Password</Label>
                <Input placeholder="Enter new password" id="password"
                    value={password} required
                    onChange={(e) => setPassword(e.target.value)} />
            </FormElement>
            <FormElement>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input placeholder="Confirm Password" type="text" id="confirmPassword"
                    value={confirmPassword} required
                    onChange={(e) => setConfirmPassword(e.target.value)} />
            </FormElement>
        </FormGroup>
        <FormGroup>
            <Button size="sm" nature="primary" onClick={(event) => {
                if (confirmPassword !== password) {
                    toast.error("Passwords do not match");
                    return
                }
                toast.promise(handleSubmit(event), {
                    loading: 'Updating..',
                    success: 'User updated successfully',
                    error: 'Something went wrong',
                })
            }}>Change Password</Button>
            <Button size="sm" nature="danger" as={Link} href="/dashboard">Cancel</Button>
        </FormGroup>
        <Toaster
            position="top-center"
        />
    </Card>)
}

export default function ProfilePage({ user: CurrentUser }) {




    return (
        <DashboardPage user={CurrentUser}>
            <Head>
                <title>Edit Profile</title>
            </Head>

            <Tabs
                TabList={[
                    {
                        title: "Edit Profile",
                        content: <EditProfile user={CurrentUser} />
                    },
                    {
                        title: "Change Password",
                        content: <ChangePassword user={CurrentUser} />
                    }
                ]}

            />

        </DashboardPage>)
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