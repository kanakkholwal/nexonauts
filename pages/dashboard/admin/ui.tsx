import { GetSessionParams, getSession } from "next-auth/react";
import DashboardPage from "components/dashboard-page";
import Button from "components/buttons";
import Badge from "components/topography/badge";
import {Input} from "components/form-elements";
import Head from "next/head";
import { sessionType } from "@/src/types/session";
import styled from "styled-components";

const Wrapper = styled.div`
    background: var(--card-bg);
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom:1rem;
    .title{
        font-size: 1.5rem;
        padding-bottom: 0.75rem;
        border-bottom: 1px solid var(--border-color);
    }
    h3{
        text-transform: capitalize;
        font-size: 1.25rem;
    }
    
`;

const variants = ["theme","primary","secondary","info","warning","danger","success","dark","light"]
const btn =   [ {
    name: 'size',
    examples:["lg","normal","sm"].map((item, index) => {
        return {
            name: item,
            options:{
                nature: "theme",
                size: item,
            }
        }
    })

},{
        name: 'Curves ',
        examples:[
            {
                name: 'Rounded ',
                options:{
                    rounded: true,
                }
            },
            {
                name: 'Pill ',
                options:{
                    pill: true,
                }
            },
            
        ]
    },
    {
        name: 'Nature',
        examples:variants.map((item, index) => {
            return {
                name: item,
                options:{
                    nature: item,
                }
            }
        })

    },
    {
        name: 'Level',
        examples:variants.map((item, index) => {
            return {
                name: item,
                options:{
                    nature: item,
                    level: true,
                }
            }
        })

    },
    {
        name: 'outlined',
        examples:variants.map((item, index) => {
            return {
                name: item,
                options:{
                    nature: item,
                    outlined: true,
                }
            }
        })

    },
    {
        name: 'fill',
        examples:variants.map((item, index) => {
            return {
                name: item,
                options:{
                    nature: item,
                    fill: true,
                }
            }
        })

    },
   
    {
        name: 'Loading ',
        examples:variants.map((item, index) => {
            return {
                name: item,
                options:{
                    nature: item,
                    loading: true,
                }
            }
        })

    },
    {
        name: 'disabled ',
        examples:variants.map((item, index) => {
            return {
                name: item,
                options:{
                    nature: item,
                    disabled: true,
                }
            }
        })

    },
];

const badges = [
    {
        name: 'Nature',
        examples:variants.map((item, index) => {
            return {
                name: item,
                options:{
                    nature: item,
                }
            }
        })
    },
    {
        name: 'noBorder',
        examples:variants.map((item, index) => {
            return {
                name: item,
                options:{
                    nature: item,
                    noBorder: true,
                }
            }
        })
    },
    {
        name: 'Filled',
        examples:variants.map((item, index) => {
            return {
                name: item,
                options:{
                    nature: item,
                    fill: true,
                }
            }
        })
    },
    {
        name: 'Curves ',
        examples:[
            {
                name: "Pill",
                options:{
                    pill: true,
                }
            },
            {
                name: "rounded",
                options:{
                    rounded: true,
                }
            },
            {
                name: "dot",
                options:{
                    dot: true,
                }
            },
        ]
    },
    
];
const inputs = [
    {
        name: 'Nature',
        examples:[
            {
            name: "noBorder",
            options:{
                noBorder: true,
            }
        },
            {
            name: "floating",
            options:{
                floating: true,
            }
        },
            {
            name: "Large",
            options:{
                lg: true,
            }
        },
            {
            name: "Small",
            options:{
                sm: true,
            }
        },
    ].map((item, index) => {
            return {
                name: item.name,
                options:item.options
            }
        }
    )},

]

export default function Dashboard({ user }) {
  


    return (
        <>
            <Head>
                <title>UI Page</title>
            </Head>
            <DashboardPage
                user={user}
                headerChildren={<span className="h5">UI Page</span>} 
            >
                <Wrapper id="buttons">
                    <h2 className="title">Buttons</h2>
                    {btn.map((item, index) => {
                        return <div key={index} className="my-4">
                            <h3>{item.name}</h3>
                            {item.examples.map((example, index) => {
                                return (<Button {...example.options} key={index}>
                                    {example.name}
                                </Button>)
                            })
                            }
                        </div>
                    })}
                </Wrapper>
                <Wrapper id="badges">
                    <h2 className="title">Badges</h2>
                    {badges.map((item, index) => {
                        return <div key={index} className="my-4">
                            <h3>{item.name}</h3>
                            {item.examples.map((example, index) => {
                                return (<Badge {...example.options} key={index}>
                                    {example.name}
                                </Badge>)
                            })
                            }
                        </div>
                    })}
                </Wrapper>
                <Wrapper id="inputs">
                    <h2 className="title">Badges</h2>
                    {inputs.map((item, index) => {
                        return <div key={index} className="my-4">
                            <h3>{item.name}</h3>
                            {item.examples.map((example, index) => {
                                return (<Input className="mb-2" {...example.options} placeholder={example.name} key={index} />)
                            })
                            }
                        </div>
                    })}
                </Wrapper>


            </DashboardPage>
          
        </>
    )
}


export async function getServerSideProps(context: GetSessionParams | undefined) {


    const session = (await getSession(context)) as sessionType | null;

    if (!session)
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }

    if (session.user.role !== 'admin') {
        console.log("You are not admin");
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false
            }
        }
    }
 

    return {
        props: { user: session.user },
    }
}