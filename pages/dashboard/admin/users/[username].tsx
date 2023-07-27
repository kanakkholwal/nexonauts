import { GetSessionParams, getSession } from "next-auth/react";
import DashboardPage from "components/dashboard-page";
import Head from "next/head";
import axios from "axios";
import toast,{ Toaster } from "react-hot-toast";
import { sessionType } from "@/src/types/session";
import { SessionUserType, UserType } from "@/src/types/user";
import Image from "next/image";
import Badge from "@/components/topography/badge";
import {MdVerified,MdOutlineArticle,MdOutlineComment,MdOutlineRateReview} from "react-icons/md";
import {IoAnalyticsOutline,IoEyeOutline} from "react-icons/io5";
import styled from "styled-components";
import { useRouter } from "next/router";

const UserPageHeader = styled.div`
    text-align: left;
    padding: 1rem;
    border-bottom: 1px solid #eaeaea;
    margin-bottom: 1rem;
    background:var(--card-bg);
    position: relative;
    padding-top: 3rem;
    padding-left: 3rem;
    z-index: 1;
    border-radius: 0.5rem;
    overflow: hidden;
    // box-shadow:0 0 0.5rem rgba(0,0,0,0.1);

    &:before{
        content: "";
        position: absolute;
        inset-inline: 0;
        inset-block-start: 0;
        display: block;
        width: 100%;
        height: 8rem;
        z-index: -1;
        background: var(--theme); /* fallback for old browsers */
        background: linear-gradient(to top, rgba(var(--theme-rgb),0.65), rgba(var(--theme-rgb),1)); 
    }
.profileImage{
    backdrop-filter: blur(20px);
    border: 1px solid var(--border-color);
    border-radius: 50%;
    box-shadow: var(--drop-shadow);
}
.deleteBtn{
    position: absolute;
    inset-inline-end: 0.5rem;
    top:50%;
    cursor: pointer;
    transform: translateY(-50%);    
}
`;
const UserActivityCard = styled.div`
    background:var(--card-bg);
    border-radius: 0.5rem;
    padding: 1rem;
    border: 1px solid #eaeaea;
    flex:0 1 min(100%, 310px);
    .Icon{
        margin-right: 0.5rem;
        padding: 0.125rem 0.5rem;
        border-radius: 50%;
        aspect-ratio: 1/1;
        background: rgba(var(--theme-rgb),0.2);
        font-size: 1.25rem;
        color: rgba(var(--theme-rgb),1);
    }
`;
export default function UserPage({ username, user, currentUser }: { username: string, user: UserType & {
    appsUsage? : number,
    reviews? : number,
    comments? : number,
}, currentUser: SessionUserType }) {
    // Render post...
    console.log(user);
    const router = useRouter()

    const deleteUser = new Promise(async(resolve, reject) => {
        await axios.delete(`/api/users/${user._id}/delete`)
            .then((res) => {
                resolve(res);
                router.push('/dashboard/admin/users');
            }).catch((err) => {
                reject(err.response);
            })

    })
    return (<>
        <Head>
            <title>{username} | {process.env.NEXT_PUBLIC_WEBSITE_NAME}</title>
        </Head>
        <DashboardPage
            user={currentUser}
            headerChildren={<span className="h6">Username : {username}</span>}>
            <UserPageHeader>
                <Image
                    src={user.profileURL}
                    alt={user.username}
                    width={100}
                    height={100}
                    className="profileImage"
                />
            <span className="h5">{user.name}</span> 
            <p>@{user.username}</p>
            <p>
                    <Badge nature={user.verified === true ? "success" : "warning"} className="g-0">
                        {user.verified === true ? "Verified" : "Email not verified"}<MdVerified />
                    </Badge>
                    <Badge nature="info" className="g-0">
                        {user.role}
                    </Badge>
            </p>
            <Badge>Joined on {new Date(user.createdAt).toLocaleDateString('en-US',{
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })}</Badge>
               {user.role !== "admin" && <Badge nature="danger" className="deleteBtn" onClick={() =>{
                    if(!confirm("Are you sure you want to delete this user?"))
                        return;
                    toast.promise(deleteUser,{
                        loading: "Deleting user",
                        success: "User deleted successfully",
                        error: "Error deleting user"
                    })
                }}>
                    Delete
                </Badge>}
            </UserPageHeader>
            <div className="d-flex flex-wrap g-1">
                <UserActivityCard>
                    <div className="d-flex flex-wrap align-items-center  g-1">
                        <div className="Icon">
                            <MdOutlineArticle />
                        </div>
                        <span className="h5">Posts</span>
                        <Badge nature="info" className="h5 ms-auto me-2">{user.posts.length}</Badge>

                    </div>
                </UserActivityCard>
                <UserActivityCard>
                    <div className="d-flex flex-wrap align-items-center  g-1">
                        <div className="Icon">
                            <MdOutlineComment />
                        </div>
                        <span className="h5">Comments</span>
                        <Badge nature="info" className="h5 ms-auto me-2">{user?.comments}</Badge>
                    </div>
                </UserActivityCard>
                {/* <UserActivityCard>
                    <div className="d-flex flex-wrap align-items-center  g-1">
                        <div className="Icon">
                            <IoEyeOutline />
                        </div>
                        <span className="h5">Visits</span>
                        <Badge nature="info" className="h5 ms-auto me-2">{user?.visits}</Badge>

                    </div>
                </UserActivityCard> */}
                <UserActivityCard>
                    <div className="d-flex flex-wrap align-items-center  g-1">
                        <div className="Icon">
                            <IoAnalyticsOutline />
                        </div>
                        <span className="h5">App Usage</span>
                        <Badge nature="info" className="h5 ms-auto me-2">{user?.appsUsage}</Badge>
                    </div>
                </UserActivityCard>
                <UserActivityCard>
                    <div className="d-flex flex-wrap align-items-center  g-1">
                        <div className="Icon">
                            <MdOutlineRateReview />
                        </div>
                        <span className="h5">App Reviews</span>
                        <Badge nature="info" className="h5 ms-auto me-2">{user?.reviews}</Badge>
                    </div>
                </UserActivityCard>
            </div>

        </DashboardPage>
        <Toaster />
    </>
    );

}
export async function getServerSideProps(context: GetSessionParams & {
    query: {
        username: string
    }
}) {


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

    // Call an external API endpoint to get user
    const username = context.query.username as string;

    const response = await axios({
        url: `https://kkupgrader.eu.org/api/users/${username}/profile`,
        method: 'get',
        headers: {
            "x-authorization": `Bearer ${process.env.NEXT_AUTH_SECRET}`,
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        return res;
    }).catch((err) => {
        return err.response;
    });


    if (response.data.success === true && response.data.user && response.data.user.username === username) {

        return {
            props: {
                username,
                user: response.data.user,
                currentUser: session.user
            }
        }
    }
    else if (response.data.success === false) {
        // not found, return
        return {
            notFound: true,
        }
    }


}