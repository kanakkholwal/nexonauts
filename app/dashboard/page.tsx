import { authOptions } from "app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";



export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    console.log(session)
    
    return (<div>
        
        
    </div>)
}