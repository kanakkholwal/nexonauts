"use client";
import Button from "components/buttons";
import State from "components/state";
import { useSession } from "next-auth/react";
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import { useState } from "react";
import styled from "styled-components";

import axios from "axios";
import { FormAlert, FormElement, FormGroup, Input, Label, Select, TextArea } from "components/form-elements";
import Footer from 'layouts/common/footer';
import Header from 'layouts/common/header';
import Hero from 'layouts/common/hero';


const ContactWrapper = styled.div`
width: 100%;
max-width: var(--max-width);
margin-inline: auto;
margin-top: 125px;
display: flex;
align-items: stretch;
justify-content: center;
padding: 1rem;
.FormWrapper{
    background: var(--card-bg);
    padding: 1rem;
    width:100%;
    ${FormGroup}{
        gap:0.25rem;
    ${FormElement}{
        flex: 1 1 auto;
    }
    }
    ${FormElement}{
        margin: 0.5rem 0;
    }
}
h2{
    font-size: 3rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
}
h3{
    font-size: 1.25rem;
    font-weight: 600;
    color: rgba(var(--grey-rgb), 0.9);
    margin-bottom: 1rem;
}

&>*{
    flex: auto;
}
img{
    width: 100%;
    margin-bottom: 1rem;
    max-width: 540px;
    filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.2));

    
}
&>div:has(>img){
    text-align: left;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    @media screen and (max-width: 1068px){
        display: none;
    }
}
`;
const isEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
export default function Contact() {
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);

    const [state, setState] = useState({
        loader: {
            type: "indeterminate",
            shape: "linear",
            show: false,
        },
        alert: {
            open: false,
            message: "",
            nature: "success",
        }

    });
    const [formState, setFormState] = useState({
        name: {
            value: "",
            isValid: false,
            touched: false,
        },
        message: {
            value: "",
            isValid: false,
            touched: false,
        },
        email: {
            value: "",
            isValid: false,
            touched: false,
        },
        category: {
            value: "Select one",
            isValid: false,
            touched: false,
        },
        companyName: "",
        phoneNumber: ""
    })


    const sendMessage = async (e) => {
        // validate the inputs first before sending the request
        e.preventDefault();
        if (!formState.name.value || !formState.message.value || !isEmail(formState.email.value) || !formState.name.value) {
            setFormState({ ...formState, name: { value: "", isValid: false, touched: false }, message: { value: "", isValid: false, touched: false }, email: { value: "", isValid: false, touched: false }, category: "Select one", companyName: "", phoneNumber: "" });
            return;
        }
        // loading 
        setState({ ...state, loader: { ...state.loader, show: true } });


        await axios.post("/api/messages", {
                name: formState.name.value,
                message: formState.message.value,
                email: formState.email.value,
                category: formState.category.value,
                companyName: formState.companyName,
                phoneNumber: formState.phoneNumber
            }
        ).then((res) => {
            setFormState({ ...formState, name: { value: "", isValid: false, touched: false }, message: { value: "", isValid: false, touched: false }, email: { value: "", isValid: false, touched: false }, category: "Select one", companyName: "", phoneNumber: "" });
            setState({
                alert: {
                    open: true,
                    message: "Message sent successfully",
                    nature: "success"
                }, loader: { type: "indeterminate", shape: "linear", show: true }
            });


        }).catch((err) => {
            console.log(err);
            setState({
                alert: {
                    open: true,
                    message: err.message ?? "Something went wrong",
                    nature: "danger",
                }, loader: { type: "indeterminate", shape: "linear", show: true }
            });
        }).finally(() => {
            setTimeout(() => {
                setState({
                    alert: {
                        open: false,
                        message: "",
                        nature: "success",
                    }, loader: { type: "indeterminate", shape: "linear", show: false }
                });
            }, 2000);
        })



    }
    // useEffect(() =>{
    //     registerView({ title: "Contact", type: "page", slug: "/contact" })
    // },[])
    return (
        <>
            
            <NextSeo
            title={`Contact Us | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`}
        />
            <Header/>
            <Hero 
                title="Contact Us"
                path={[
                    {
                        name:"Contact",
                        path:"/contact"
                    }
                ]}
            />
            <ContactWrapper>
                <div className="FormWrapper">
                    <h2>Let's talk</h2>

                    <h3>Love to hear from you,
                        Get in touch</h3>
                    <FormGroup>
                        <FormElement>
                            <Label htmlFor="name">Name</Label>
                            <Input type="text" id="name" name="name" placeholder="John Doe"
                            level={true}
                                value={formState.name.value}
                                onChange={e => setFormState({ ...formState, name: { ...formState.name, value: e.target.value, isValid: e.target.value.length > 3, touched: true } })}
                            />
                            {formState.name.touched && !formState.name.isValid && <FormAlert>Name must be between 1 and 100 characters</FormAlert>}

                        </FormElement>
                        <FormElement>
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" id="email" name="email" placeholder="user@example.com"
                                value={formState.email.value}
                                level={true}
                                onChange={e => setFormState({ ...formState, email: { ...formState.email, value: e.target.value, isValid: isEmail(e.target.value), touched: true } })}
                            />
                            {formState.email.touched && !formState.email.isValid && <FormAlert>Please enter a valid email address</FormAlert>}
                        </FormElement>
                    </FormGroup>
                    <FormGroup>
                        <FormElement>
                            <Label htmlFor="company_name">Company Name</Label>
                            <Input type="text" id="company_name" name="company_name" placeholder="Fancy Army"
                                value={formState.companyName}
                                level={true}
                                onChange={(e) => setFormState({ ...formState, companyName: e.target.value })} />


                        </FormElement>
                        <FormElement>
                            <Label htmlFor="Phone">Phone</Label>
                            <Input type="tel" id="Phone" name="Phone" placeholder="888 888 888 8"
                             level={true}
                                value={formState.phoneNumber}
                                
                                onChange={(e) => setFormState({ ...formState, phoneNumber: e.target.value })} />

                        </FormElement>
                    </FormGroup>
                    <FormGroup>
                        <FormElement>
                            <Label htmlFor="chat_about">What would you like to chat about?</Label>
                            <Select options={[
                                { value: "Select one", label: "Select one" },
                                { value: "Brand Strategy", label: "Brand Strategy" },
                                { value: "Marketing / Ads", label: "Marketing / Ads" },
                                { value: "Development", label: "Development" },
                                { value: "Design / UX&UI", label: "Design / UX&UI" },
                                { value: "Other", label: "Other" },
                            ]} 
                            value={"Select one"}
                            onChange={(option) =>{
                                if(option.value === "Select one"){
                                    setFormState({ ...formState, category: {...formState.category,isValid:false,touched:true} });
                                return;
                                }
                                setFormState({ ...formState, category: {...formState.category,value:option.value,touched:true} });

                            }} />
                            {
                                (formState.category.value === "Select one" || formState.category.isValid === false) &&
                                <FormAlert>Please select a category</FormAlert>
                            }

                        </FormElement>
                    </FormGroup>
                    <FormElement>
                        <Label htmlFor="message">Message</Label>
                        <TextArea id="message" name="message" placeholder="Enter your message"
                            cols={60}
                            rows={10}
                            value={formState.message.value}
                            level={true}
                            onChange={(e) => {
                                setFormState({ ...formState, message: {...formState.message,value:e.target.value,touched:true,isValid:e.target.value.length > 30} })
                            }}
                        />
                        {formState.message.touched && !formState.message.isValid && <FormAlert>Message should be atleast 30 characters long</FormAlert>}

                    </FormElement>
                    <State  {...state} />
                    <FormElement>
                        <Button type="submit" size="lg" onClick={sendMessage} rounded={true} >Send Message</Button>
                    </FormElement>
                </div>
                <div>
                    <Image src="/contact.svg" alt="Contact Us" width={540} height={540} />
                </div>
            </ContactWrapper>

            <Footer  />
        </>
    )
}