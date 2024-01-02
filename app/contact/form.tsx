"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { FormAlert } from "components/form-elements";
import { useState } from "react";

const isEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
export function ContactForm() {
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
            setFormState({
                ...formState, name: { value: "", isValid: false, touched: false }, message: { value: "", isValid: false, touched: false }, email: { value: "", isValid: false, touched: false },
                category: {
                    value: "Select one",
                    isValid: false,
                    touched: false,
                }, companyName: "", phoneNumber: ""
            });
            return;
        }


        await axios.post("/api/messages", {
            name: formState.name.value,
            message: formState.message.value,
            email: formState.email.value,
            category: formState.category.value,
            companyName: formState.companyName,
            phoneNumber: formState.phoneNumber
        })
        



    }
    return (<div className="grid gap-4 w-full">
        <div className="flex gap-4 w-full items-center justify-evenly flex-col lg:flex-row">
            <div className="grid gap-1.5 grow w-full">
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" name="name" placeholder="John Doe"
                    variant="fluid"
                    value={formState.name.value}
                    onChange={e => setFormState({ ...formState, name: { ...formState.name, value: e.target.value, isValid: e.target.value.length > 3, touched: true } })}
                />
                {formState.name.touched && !formState.name.isValid && <FormAlert>Name must be between 1 and 100 characters</FormAlert>}

            </div>
            <div className="grid gap-1.5 grow w-full">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" name="email" placeholder="user@example.com"
                    value={formState.email.value}
                    variant="fluid"
                    onChange={e => setFormState({ ...formState, email: { ...formState.email, value: e.target.value, isValid: isEmail(e.target.value), touched: true } })}
                />
                {formState.email.touched && !formState.email.isValid && <FormAlert>Please enter a valid email address</FormAlert>}
            </div>
        </div>
        <div>
            <div>
                <Label htmlFor="company_name">Company Name</Label>
                <Input type="text" id="company_name" name="company_name" placeholder="Fancy Army"
                    value={formState.companyName}
                    variant="fluid"
                    onChange={(e) => setFormState({ ...formState, companyName: e.target.value })} />


            </div>
            <div>
                <Label htmlFor="Phone">Phone</Label>
                <Input type="tel" id="Phone" name="Phone" placeholder="888 888 888 8"
                    variant="fluid"
                    value={formState.phoneNumber}

                    onChange={(e) => setFormState({ ...formState, phoneNumber: e.target.value })} />

            </div>
        </div>
        <div className="grid gap-1.5">

            <Label htmlFor="chat_about">What would you like to chat about?</Label>
            <div className="flex flex-wrap gap-4 w-full justify-around">
                {[
                    "Brand Strategy", "Marketing / Ads", "Careers", "Development", "Design / UX&UI", "Other"
                ].map((item, index) => {
                    return (<label key={index} className="text-slate-700 cursor-pointer has-[:checked]:ring-primary/50 has-[:checked]:text-primary has-[:checked]:bg-primary/10 flex justify-between items-center gap-6 rounded-lg p-4 ring-1 ring-transparent hover:bg-slate-100">
                        {item}
                        <input type="radio" onChange={(e) => {

                        }} name="chat_about" value={item} className="box-content h-1.5 w-1.5 appearance-none rounded-full border-[5px] border-white bg-white bg-clip-padding outline-none ring-1 ring-primary/50 checked:border-primary checked:ring-primary" />
                    </label>)
                })}
            </div>
        </div>


        <div className="grid gap-1.5">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" placeholder="Enter your message"
                cols={60}
                rows={10}
                value={formState.message.value}
                variant="fluid"
                onChange={(e) => {
                    setFormState({ ...formState, message: { ...formState.message, value: e.target.value, touched: true, isValid: e.target.value.length > 30 } })
                }}
            />
            {formState.message.touched && !formState.message.isValid && <FormAlert>Message should be atleast 30 characters long</FormAlert>}

        </div>
        <div>
            <Button type="submit" size="lg" onClick={sendMessage}  >Send Message</Button>
        </div>

    </div>)
}
