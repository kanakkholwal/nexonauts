import DashboardPage, { Header } from "components/dashboard-page";
import Head from 'next/head';
import Button from 'components/buttons';
import Tabs from 'components/Tabs';
import Alert from 'components/alert';
import Image from 'next/image';
import Link from 'next/link';
import { IndeterminateLinearLoader as Loader } from 'components/Loader';
import { Card } from 'components/Card';
import axios from 'axios';
import { useState } from 'react';
import { getSession } from "next-auth/react"

import { FileInput, FormElement, Label, Input, FormGroup } from 'components/form-elements';
import { registerView } from "lib/analytics";
import { useEffect } from "react";



const EditProfile = ({user: CurrentUser }) =>{
    const [user, setUser] = useState(CurrentUser);
    const [state, setState] = useState({
        loading: false,

        alert: {
            open: false,
            message: "",
            type: ""
        }
    });
    const handleFiles = async (files) => {
        setState({ ...state, loading: true });

        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
        formData.append('folder', process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER);


        // upload image to cloudinary and get url
        await axios(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
            method: 'POST',
            data: formData
        }).then(res => {
            const file = res.data;
            // console.log(file);
            setUser({ ...user, profileURl: file.secure_url });
            setState({
                alert: {
                    open: true,
                    message: "Image uploaded successfully",
                    type: "success"
                }, loading: false
            });
        }).catch(err => {
            console.log(err);
            setState({
                alert: {
                    open: true,
                    message: err?.message || "Something went wrong",
                    type: "danger"
                }, loading: false
            });

        })





    }


    const handleChange = async (event) => {
        const { files } = event.target;

        if (files && files.length) {
            console.log(files);
            handleFiles(files);
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(user);

        setState({ ...state, loading: true });
        try {
            await axios.put('/api/users/' + user.id, { user })
                .then(res => {
                    console.log(res);
                    if (res.data.success) {
                        setState({
                            alert: {
                                open: true,
                                message: "User updated successfully",
                                type: "success"
                            }, loading: false
                        });
                    }
                }).catch(err => {
                    console.log(err);
                    setState({
                        alert: {
                            open: true,
                            message: err?.message || "Something went wrong",
                            type: "danger"
                        }, loading: false
                    });

                })
        }
        catch (err) {
            console.log(err);
            setState({
                alert: {
                    open: true,
                    message: err?.message || "Something went wrong",
                    type: "danger"
                }, loading: false
            });
        }
    }
    useEffect(() =>{
        registerView({ title: "Profile", type: "dashboard", slug: "/dashboard/profile" })
    },[])


    return (<Card>

        <FormGroup style={{ justifyContent: "flex-start" }}>

            <FormElement>
                <div>
                    {user?.profileURl ? <Image width={150} height={150} alt={user.title || "user profile image"} src={user.profileURl ?? "https://res.cloudinary.com/kanakkholwal-portfolio/image/upload/v1680632194/kkupgrader/placeholder_rwezi6.png"} style={{ maxHeight: "400px", }} /> : null}
                </div>
            </FormElement>
            <FormElement>
                <Label htmlFor="profile-pic">Upload a Picture</Label>
                <FileInput accept="image/*" id="profile-pic" onChange={handleChange} />
                <Label htmlFor="profile-pic-url">or Enter a url</Label>
                <Input placeholder="Enter or paste picture url from external source..." id="profile-pic-url" value={user.profileURl ?? "https://res.cloudinary.com/kanakkholwal-portfolio/image/upload/v1680632194/kkupgrader/placeholder_rwezi6.png"} onChange={(e) => setUser({
                    ...user,
                    profileURl: e.target.value
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
        </FormGroup>
        <FormGroup>
            <Alert nature={state.alert.type} open={state.alert.open}>{state.alert.message}</Alert>
            {state.loading ? <Loader /> : null}
            <Button size="sm" nature="primary" onClick={handleSubmit}>Save Profile</Button>
            <Button size="sm" nature="danger" as={Link} href="/dashboard">Cancel</Button>

        </FormGroup>
    </Card>)
}
const ChangePassword = ({user: CurrentUser }) =>{
   
    
    const [state, setState] = useState({
        loading: false,

        alert: {
            open: false,
            message: "",
            type: ""
        }
    });
        const [currentPassword,setCurrentPassword] = useState("");
        const [password,setPassword] = useState("");
        const [confirmPassword,setConfirmPassword] = useState("");
            
    const handleSubmit = async (event) => {
        event.preventDefault();

        if(confirmPassword !== password) 
        {
            setState({
                alert: {
                    open: true,
                    message: err?.message || "New Password and Confirm Password must be the same",
                    type: "danger"
                }, loading: false
            });
            return 
        }


        setState({ ...state, loading: true });
        try {
            await axios.put('/api/users/' + user.id+"/change-password", {
                 currentPassword,
                 newPassword:password,
                 })
                .then(res => {
                    console.log(res);
                    if (res.data.user) {
                        setState({
                            alert: {
                                open: true,
                                message: res.data.message,
                                type: "success"
                            }, loading: false
                        });
                    }
                }).catch(err => {
                    console.log(err);
                    setState({
                        alert: {
                            open: true,
                            message: err?.message || "Something went wrong",
                            type: "danger"
                        }, loading: false
                    });

                })
        }
        catch (err) {
            console.log(err);
            setState({
                alert: {
                    open: true,
                    message: err?.message || "Something went wrong",
                    type: "danger"
                }, loading: false
            });
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
            <Alert nature={state.alert.type} open={state.alert.open}>{state.alert.message}</Alert>
            {state.loading ? <Loader /> : null}
            <Button size="sm" nature="primary" onClick={handleSubmit}>Change Password</Button>
            <Button size="sm" nature="danger" as={Link} href="/dashboard">Cancel</Button>
        </FormGroup>
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
                    title:"Edit Profile",
                    content:<EditProfile user={CurrentUser} />
                },
                {
                    title:"Change Password",
                    content:<ChangePassword user={CurrentUser} />
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
        props: { user :session.user},

    }
}