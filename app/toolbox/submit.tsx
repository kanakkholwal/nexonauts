import Head from "next/head";
import axios from "axios";
import Footer from "components/layouts/footer";

import {
    DirectoryPageNavBar,
    DirectoryPageHeader,
    DirectoryPageContainer,
    SubmitToolContainer,
    Wave
} from "src/layouts/directory-page";

import Button, { IconButton } from "components/buttons"
import Link from "next/link";
import { Input, Select, TextArea, Label, FormElement, FormGroup } from "components/form-elements";

import { IoLogoInstagram, IoLogoGithub, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io5";
import { RiArrowRightUpLine } from "react-icons/ri"
import { ImSpinner10 } from "react-icons/im"
import { CgMenuRightAlt } from "react-icons/cg"
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
const SocialMedia = [
    {
        name: "Github",
        icon: <IoLogoGithub />,
        url: "https://github.com/kkupgrader",
    },
    {
        name: "Instagram",
        icon: <IoLogoInstagram />,
        url: "https://www.instagram.com/kanakkholwal/",
    },
    {
        name: "LinkedIn",
        icon: <IoLogoLinkedin />,
        url: "https://www.linkedin.com/in/kanak-kholwal/",
    },
    {
        name: "Twitter",
        icon: <IoLogoTwitter />,
        url: "https://twitter.com/KanakKholwal",
    },
]


export default function AiDirectory({

}) {

    const [settings, setSettings] = useState<{
        show: boolean;
    }>({
        show: false,
    });
    const [tool, setTool] = useState<{
        name: string,
        link: string,
        pricing_type: string,
        description: string,
        author_name: string,
        author_email: string,
    }>({
        name: "",
        link: "",
        pricing_type: "",
        description: "",
        author_name: "",
        author_email: "",
    });
    const [state, setState] = useState<{
        loading: boolean,
        error: boolean,
        success: boolean,
        message: string,
    }>({
        loading: false,
        error: false,
        success: false,
        message: "",
    });
    const submitTool = async () => {

        return new Promise(async (resolve, reject) => {
            await axios.post("/api/public-tools/submit", {
                name: tool.name,
                link: tool.link,
                pricing_type: tool.pricing_type,
                description: tool.description,
                author: {
                    name: tool.author_name,
                    email: tool.author_email,
                }
            }).then((response) => {
                resolve(response.data);
                setState((prevState) => {
                    return {
                        ...prevState,
                        success: true,
                        message: response.data.message,
                    }
                })
            }).catch((error) => {
                console.log(error);
                setState((prevState) => {
                    return {
                        ...prevState,
                        error: true,
                        message: error.message,
                    }
                })
                reject(error);
            })
                .finally(() => {
                    setState((prevState) => {
                        return {
                            ...prevState,
                            loading: false,
                        }
                    })
                })
        })
    }




    return (
        <>
            <Head>
                <title>Submit | AI directory</title>
            </Head>
            <DirectoryPageContainer>
                <DirectoryPageHeader>
                    <DirectoryPageNavBar>
                        <Link href="/directory" className="Title">
                            AI Directory
                        </Link>
                        <div className="LinkList">
                            <Link href="/">
                                Home
                            </Link>
                            <Link href="/apps">
                                Services
                            </Link>
                            <Link href="/tools">
                                Tools
                            </Link>
                            <Link href="/blog">
                                Blog
                            </Link>
                        </div>
                        <Link href="/directory/submit" className="Submit">
                            Submit
                        </Link>

                    </DirectoryPageNavBar>
                    <Wave />
                </DirectoryPageHeader>
                <SubmitToolContainer>
                    <h1 className="Title">
                        Submit your tool
                    </h1>
                    <p className="subtitle">
                        Submit your tool to the AI directory. We will review your tool and add it to the directory.
                    </p>
                    <FormGroup>
                        <FormElement>
                            <Label htmlFor="your_name">Your Name</Label>
                            <Input type="text" id="your_name" name="your_name" level={true} placeholder="Enter your name"
                                onChange={(event) => {
                                    setTool((prevTool) => {
                                        return {
                                            ...prevTool,
                                            author_name: event.target.value
                                        }
                                    })
                                }
                                }
                                value={tool.author_name}
                            />
                        </FormElement>
                        <FormElement>
                            <Label htmlFor="your_mail">Your Email</Label>
                            <Input type="email" id="your_mail" name="your_mail" level={true} placeholder="Enter your email"
                                onChange={(event) => {
                                    setTool((prevTool) => {
                                        return {
                                            ...prevTool,
                                            author_email: event.target.value
                                        }
                                    })
                                }
                                }
                                value={tool.author_email}

                            />
                        </FormElement>
                    </FormGroup>
                    <FormElement>
                        <Label htmlFor="tool_name">Tool Name</Label>
                        <Input type="text" id="tool_name" name="tool_name" level={true} placeholder="Enter Tool Name"
                            onChange={(event) => {

                                setTool((prevTool) => {
                                    return {
                                        ...prevTool,
                                        name: event.target.value
                                    }
                                })
                            }
                            }
                            value={tool.name}

                        />
                    </FormElement>
                    <FormElement>
                        <Label htmlFor="tool_link">Tool Link</Label>
                        <Input type="text" id="tool_link" name="tool_link" level={true} placeholder="Enter Tool Link"
                            onChange={(event) => {
                                setTool((prevTool) => {
                                    return {
                                        ...prevTool,
                                        link: event.target.value
                                    }
                                })
                            }
                            }
                            value={tool.link}

                        />
                    </FormElement>
                    <FormElement>
                        <Label htmlFor="tool_pricing_type">Select Tool Pricing Type</Label>
                        <Select
                            id="tool_pricing_type" name="tool_pricing_type" level={true} placeholder="Select Tool Pricing Type"
                            value={tool.pricing_type}
                            options={[
                                {
                                    value: "free",
                                    label: "Free"
                                },
                                {
                                    value: "paid",
                                    label: "Paid"
                                },
                                {
                                    value: "freemium",
                                    label: "Freemium"
                                },
                                {
                                    value: "open-source",
                                    label: "Open Source"
                                },
                                {
                                    value: "github",
                                    label: "Github"
                                },
                                {
                                    value: "google-colab",
                                    label: "Google Colab"
                                },
                                {
                                    value: "other",
                                    label: "Other"
                                },
                            ]}
                            onChange={(option) => {
                                console.log(option);
                                setTool((prevTool) => {
                                    return {
                                        ...prevTool,
                                        pricing_type: option.value
                                    }
                                }
                                )

                            }}
                        />
                    </FormElement>
                    <FormElement>
                        <Label htmlFor="tool_description">Tool Description</Label>
                        <TextArea
                            onChange={(event) => {
                                setTool((prevTool) => {
                                    return {
                                        ...prevTool,
                                        description: event.target.value
                                    }
                                })
                            }
                            }
                            value={tool.description}
                            id="tool_description" name="tool_description" level={true} placeholder="Enter Tool Description" rows={8} />
                    </FormElement>
                    <div className="footer">
                        <div className={"spinner " + (state.loading ? "loading" : "")}>
                            <ImSpinner10 />
                        </div>
                        <Button type="button"
                            onClick={() => {

                                toast.promise(submitTool(), {
                                    loading: 'Submitting Tool...',
                                    success: (data: any) => {
                                        console.log(data);
                                        return data.message;
                                    },
                                    error: (error) => {
                                        console.log(error);
                                        return error.message;
                                    },
                                });
                            }}

                            loading={state.loading}

                        >
                            Submit your Tool <RiArrowRightUpLine size={20} />
                        </Button>
                    </div>
                </SubmitToolContainer>



            </DirectoryPageContainer>
            <Footer socialMedia={SocialMedia} />

            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
        </>
    )
}


export async function getServerSideProps(context: any) {

    let data = {
        type: "idle",
        message: ""
    } as {
        type: string,
        message: string
    };





    return {
        props: {

            data,
        },

    }
}