import { getSession } from "next-auth/react"
import DashboardPage from "components/dashboard-page";
import Collapse from "components/collapse";
import Head from "next/head";
import State from 'components/state';
import { timeAgo } from 'lib/scripts';
import { Card } from 'components/Card';
import { MdLabelImportantOutline, MdLabelImportant } from 'react-icons/md';
import { HiOutlineChevronUp } from 'react-icons/hi';
import { BiCheck, BiCheckDouble } from 'react-icons/bi';
import useSWR from 'swr'
import axios from 'axios';
import styled from "styled-components";
import { useEffect,  useState } from "react";

const Header = styled.div`
padding:0.5rem 0.75rem;
transition:all 0.25s ease;
display:flex;
align-items:center;
justify-content:space-between;
gap:0.25rem;
&>div{
    display:flex;
    align-items:center;
    gap:0.25rem;
}
span{
    font-size:1rem;
    font-weight:600;
}
span[email]{
    opacity:0.9;
    font-weight:500;
}
span[class]{
    cursor:pointer;
    padding:0.25rem;
    height:28px;
    aspect-ratio:1;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius:50%;
    transition:all 0.25s ease-in-out;
    &:hover{
        background:rgba(var(--theme-rgb),0.1);
        scale:1.1;
    }
}
span.IMPORTANT{

    ${({ type }) => type === "IMPORTANT" ? `
     color:rgba(var(--warning-rgb),1);
    `: `
     color:rgba(var(--theme-rgb),0.8);
    `}
}
span.READ{
    ${({ read }) => read === true ? `
     color:rgba(var(--success-rgb),1);
    `: `
     color:rgba(var(--theme-rgb),0.8);
    `}
}
span.TOGGLE{
    background:rgba(var(--theme-rgb),0.1);
    transition:500ms cubic-bezier(0.4, 0, 0.2, 1);
    &:hover{
        background:rgba(var(--theme-rgb),0.2);
    }
    ${({ open }) => open === true ? `
     color:rgba(var(--success-rgb),1);
     transform:rotate(180deg);
     
    `: `
     color:rgba(var(--theme-rgb),0.8);
     transform:rotate(0deg);
    `}
    
}
`;
const Body = styled.div`
margin:0 0.75rem;
border-top:1px solid rgba(var(--muted-rgb),0.22);
flex-grow: 1;
`;
const MessageCard = styled.div`
border-bottom:1px solid rgba(var(--muted-rgb),0.1);
${({ read }) => {
        if (!read) {
            return `
        background:rgba(var(--theme-rgb),0.1);
        `
        }
        else {
            return `
            background:rgba(var(--light-rgb),0.8);
        `
        }
    }}
`;

const fetcher = url => axios.get(url).then(res => res.data)

export default function Messages({ user }) {

    const { data, error, isLoading } = useSWR('/api/admin/messages', fetcher)

    const [messages, setMessages] = useState(data?.messages);

    const messageRead = (index,read) =>{
        setMessages((messages) =>{
            const newMessages = [...messages];
            newMessages[index].read = !read;
            return newMessages;
        })
    }
    const messageType = (index,type) =>{
        setMessages((messages) =>{
            const newMessages = [...messages];
            newMessages[index].type = type === "IMPORTANT" ? "NORMAL" : "IMPORTANT";
            return newMessages;
        })
    }
    const updateMessage = async (data) => {
        const {messageId} = data;

        if (!messageId)
            return;
      
        const {read,type} = data;
        

        await axios.put("/api/admin/messages", { messageId,read :read ?? true,type })
        .then(({data}) =>{
            console.log(data);
        })
        .catch(err =>{
            console.log(err);
        })


    }

    useEffect(() => {
        if (data) {
            if (data.messages !== messages)
                setMessages(data.messages);
        }

    }, [data])


    return (
        <>
            <Head>
                <title>All Messages</title>
            </Head>
            <DashboardPage user={user}>
                <State loader={{ type: "indeterminate", show: isLoading, }} alert={{
                    type: error ? "danger" : "success",
                    message: error ? error.message : "Messages loaded successfully",
                    show: error ? true : false
                }} />
                <Card style={{
                    opacity: isLoading ? 0.5 : 1,
                    pointerEvents: isLoading ? "none" : "auto",
                    padding: "0.5rem"
                }}>
                    {data && data.messages.length > 0 ? messages?.sort((a, b) => {
                            return new Date(b.createdAt) - new Date(a.createdAt);
                        }).map((message,index) => {
           

                            return <Message key={index}  {...message} index={index}  messageRead={messageRead} messageType={messageType} updateMessage={updateMessage}/>
                        }) : "No Messages yet"}
                </Card>

            </DashboardPage>
        </>
    )
}

function Message({ name, email, type, message, read, createdAt,index, _id,updateMessage,messageRead,messageType}){
    const [open, setOpen] = useState(false);

    return (
        <MessageCard  read={read} open={open}>
            <Header type={type} read={read} open={open}>
                <div>
                    <span className="IMPORTANT" onClick={(e) => {
                        e.stopPropagation();
                        messageType(index, type)
                        updateMessage({ messageId: _id, type: type === "IMPORTANT" ? "NORMAL" : "IMPORTANT" });
                    }}>{type === "IMPORTANT" ? <MdLabelImportant /> : <MdLabelImportantOutline />}</span>
                    <span>{name}</span>
                    <span email="true"> : {email}</span>
                </div>
                <div>

                    <span className="READ" onClick={(e) => {
                        e.stopPropagation();
                        messageRead(index, read)
                        updateMessage({ messageId: _id, read: !read });
                    }}>{read === true ? <BiCheckDouble /> : <BiCheck />}</span>
                    <span>{timeAgo(new Date(createdAt))}</span>
                    <span className="TOGGLE"  onClick={(e) =>{
                        e.stopPropagation();
                        setOpen(!open);
                    }}><HiOutlineChevronUp /></span>
                </div>
            </Header>
            <Collapse visible={open}>
            <Body>
                    <p>{message}</p>
            </Body>
            </Collapse>
        </MessageCard>
    )
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