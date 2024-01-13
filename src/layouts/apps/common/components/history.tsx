import styled from "styled-components"
import { GrClose } from "react-icons/gr"
import { useState, useEffect } from "react";
import Image from "next/image";
import { SessionUserType } from "src/types/user";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";

const BackDrop = styled.div`
width:100vw;
min-height:100vh;
height:100%;
position: fixed;
inset:0;
z-index: 9999;
`;
const Wrapper = styled.div`
position: fixed;
right:0;
top:0;
bottom:0;
transition: all 0.5s cubic-bezier(0.5, -0.5, 0.1, 1.5);
z-index: 10991;
padding:1rem;

&.closing{
    transform: translateX(100%);
    opacity: 0;
    visibility: hidden;
}
&.opening{
    transform: translateX(0);
    opacity: 1;
    visibility: visible;
}
.close{
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 10px;
    cursor: pointer;
    font-size: 1rem;
    color: #000;
    transition: all 0.5s cubic-bezier(0.5, -0.5, 0.1, 1.5);
    &:hover{
        color: #f00;
    }
}
`;
const HistoryWrapper = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
margin-top:1rem;
gap: 0.5rem;
padding: 0.5rem;
overflow-y: auto;


`
export default function History({
    visible,
    setVisible,
    service_name,
    user

}: {
    visible: boolean,
    setVisible: Function,
    service_name: string,
    user: SessionUserType
}) {
    const [data, setData] = useState<{
        user_id: string,
        service_name: string,
        data: {
            user_inputs: {
                [key: string]: string
            },
            api_output: {
                answer: string
            }
        },
        timestamp: string
    }[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // useEffect(() => {
    //     if (visible) {
    //         fetch(`https://api.app.textify.ai/dashboard/user/${user?.id}/all/${service_name}`)
    //             .then(res => res.json())
    //             .then(response => {
    //                 console.log(response);
    //                 setData(response);
    //             })
    //             .catch(error => console.log(error))
    //             .finally(() => setLoading(false));
    //     }

    // }, [visible]);
    return (<>
        {visible ? <BackDrop className="backdrop-blur bg-background-80 inset-0" onClick={() => setVisible(false)} /> : null}
        <Wrapper className={(visible ? "opening" : "closing") + " border-l bg-background p-6 w-[3/4] h-full max-w-[728px]"}>
            <div className="header flex flex-row justify-between items-center px-3">
                <Button variant="ghost" size="icon" className="close" onClick={() => setVisible(false)}><GrClose /></Button>
                <h3 className="font-bold text-lg">App History</h3>
            </div>
            <HistoryWrapper>
                {((data === null || data.length === 0) && !loading) ? <>
                    <Image
                        src="/no-data.png"
                        width={200}
                        height={200}
                        alt="No history found"
                    />
                    <p>No history found</p>
                </> : null}
                {data?.sort((a: any, b: any) => {
                    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
                }).map((usage: any, index: number) => {
                    return (
                        <Card key={index} className="w-full">
                            <CardHeader>
                                <CardTitle className="capitalize">
                                    {usage.service_name.replace(/_/g, " ")}
                                </CardTitle>
                                <CardDescription>
                                    <p className="timestamp">On {new Date(usage.timestamp).toLocaleString()}</p>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                
                                    <div className="flex flex-col items-start gap-1 mt-2">
                                        <Table className="border rounded-md">
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-[100px]">Key</TableHead>
                                                    <TableHead className="text-right">Value</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {Object.keys(usage.data.user_inputs).map((key: string, index: number) => {
                                                    return <TableRow key={index}>
                                                        <TableCell className="font-medium capitalize">{key.replace(/_/g, " ")}</TableCell>
                                                        <TableCell className="text-right ">{usage.data.user_inputs[key]}</TableCell>
                                                    </TableRow>
                                                })}
                                            </TableBody>
                                        </Table>

                                    </div>
                               
                                <div className=" border rounded-md p-4 my-3">
                                    <h5 className="font-semibold">Output</h5>
                                    <p>
                                        {usage.data.api_output.answer}
                                    </p>
                                </div>
                            </CardContent>

                        </Card>
                    )
                })}
            </HistoryWrapper>
        </Wrapper>
    </>)
}