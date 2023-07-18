import DashboardPage from "components/dashboard-page";
import Head from 'next/head';
import Button from 'components/buttons';
import Image from 'next/image';
import { Card } from 'components/Card';
import Badge from 'components/topography/badge';
import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';
import { getSession } from "next-auth/react"
import toast, { Toaster } from 'react-hot-toast';
import {MdVerified} from "react-icons/md";
import { FormElement, Label, Input, FormGroup,FormAlert } from 'components/form-elements';
import { registerView } from "lib/analytics";
import { useEffect } from "react";

const ProfileCard = styled(Card)`
flex-direction: column;
animation:none;
opacity:1;
visibility:visible;
max-width:20rem;
align-items: center;
img{
    border-radius:50%;
    width:150px;
    aspect-ratio:1/1;
    margin-bottom:1rem;
    overflow:hidden;
}
.verify{
    font-size:0.875rem;
    font-weight:500;
    cursor:pointer;
    padding:0.25rem 0.5rem;
    color:var(--info);
    opacity:0.75;
    &:hover{
        text-decoration:underline;
        opacity:1;
    }
}
`;
const EditPanel = styled(Card)`
flex-direction: column;
animation:none;
opacity:1;
visibility:visible;
align-items: center;
max-width:728px;
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
        //  on submit change user data

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
    const sendVerificationEmail = async () => {
        await axios.post('/api/users/send-verification-email', { email: user.email })
            .then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
    }
    useEffect(() => {
        registerView({ title: "Profile", type: "dashboard", slug: "/dashboard/profile" })
    }, [])


    return (
        <div className="d-flex g-2 flex-wrap align-items-start justify-content-center">
            <ProfileCard>
                {CurrentUser?.profileURL ?
                    <Image width={150} height={150}
                        alt={CurrentUser.name} src={CurrentUser.profileURL}
                    /> : <Image width={150} height={150}
                        alt={"user profile image"} src={"https://res.cloudinary.com/kanakkholwal-portfolio/image/upload/v1680632194/kkupgrader/placeholder_rwezi6.png"} />}
                <h3>{CurrentUser.name}</h3>
                <h6 className="text-muted">@{CurrentUser.username}</h6>
                <p className="mb-3">{CurrentUser.email}</p>
                <p>
                    <Badge nature={CurrentUser?.account_type === "premium" ? "success" : "warning"} className="g-0">
                        {user?.account_type}
                    </Badge>
                    <Badge nature={CurrentUser?.verified === true ? "success" : "warning"} className="g-0">
                        {user.verified === true ? "Verified" : "Email not verified"}<MdVerified />
                    </Badge>
                </p>
                    <span className="verify" onClick={() =>{
                        toast.promise(sendVerificationEmail(),{
                            loading:"Sending Email..",
                            success:"Email sent successfully",
                            error:"Something went wrong"
                        })
                    }}>
                        Send Verification Email
                    </span>
            </ProfileCard>

            <EditPanel>

                
                    <FormGroup style={{ justifyContent: "flex-start" ,flexDirection:"column",gap:"0"}}>
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
                       
                    
                    </FormGroup>
             
                    <FormGroup className="g-0 justify-content-end">
                        <FormElement sm={true}>
                            <Label sm={true} htmlFor="name">Your Name</Label>
                            <Input  sm={true}  placeholder="Enter your name." id="name" value={user?.name} onChange={(e) => setUser({
                                ...user,
                                name: e.target.value
                            })} />
                        </FormElement>
                        <FormElement  sm={true} >
                            <Label  sm={true}  htmlFor="username">Your Username</Label>
                            <Input  sm={true}  placeholder="username" type="text" id="username" value={"@"+user?.username} 
                                onChange={(e) =>{
                                    setUser({
                                        ...user,
                                        username: e.target.value.split("@")[1] ?? CurrentUser?.username
                                    })
                                }}
                            />
                        </FormElement>
                    </FormGroup>    
                    <FormGroup className="g-1 justify-content-end">

                        <Button size="sm" nature="dark" onClick={(event) => {
                            toast.promise(handleSubmit(event), {
                                loading: 'Updating..',
                                success: 'User updated successfully',
                                error: 'Something went wrong',
                            })
                        }}>Save Profile</Button>
                        <Button size="sm" nature="danger" level={true} onClick={() =>{
                            setUser(CurrentUser);
                        }}>reset</Button>
                    </FormGroup>

                        <hr/>
<ChangePassword user={CurrentUser} />
            </EditPanel>
            <Toaster
                position="top-center"
            />
        </div>)
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
    return (<>

        <FormGroup className="g-0">
            <FormElement sm={true}>
                <Label  sm={true}  htmlFor="currentPassword">Enter Current Password</Label>
                <Input  sm={true} placeholder="Enter Current Password" type="text" id="currentPassword"
                    value={currentPassword} required
                    onChange={(e) => setCurrentPassword(e.target.value)} />
            </FormElement>
            <FormElement  sm={true}>
                <Label  sm={true} htmlFor="password">Enter new Password</Label>
                <Input sm={true} placeholder="Enter new password" id="password"
                    value={password} required
                    onChange={(e) => setPassword(e.target.value)} />
            </FormElement>
            <FormElement  sm={true}>
                <Label  sm={true} htmlFor="confirmPassword">Confirm Password</Label>
                <Input  sm={true} placeholder="Confirm Password" type="text" id="confirmPassword"
                    value={confirmPassword} required
                    onChange={(e) => setConfirmPassword(e.target.value)} />
                    {confirmPassword !== password && <FormAlert nature="danger">Passwords do not match</FormAlert>}
                    {currentPassword === password && confirmPassword.length  > 0 &&<FormAlert nature="danger">Old Password and New Must be different</FormAlert>}
            </FormElement>
        </FormGroup>
        <FormGroup  className="g-0 justify-content-end">
            <Button size="sm"
            nature="dark"
            disabled={currentPassword === "" || password === "" || confirmPassword === ""}
            
             onClick={(event) => {
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
        </FormGroup>
        <Toaster
            position="top-center"
        />
    </>)
}

export default function ProfilePage({ user: CurrentUser }) {




    return (
        <DashboardPage user={CurrentUser}
        headerChildren={
            <span className="h6">Edit Profile</span>
        }>
            <Head>
                <title>Edit Profile</title>
            </Head>
<EditProfile user={CurrentUser} />
            

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