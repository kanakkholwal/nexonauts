import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";


const Body = styled.div`
display:flex;
justify-content:flex-start;
align-items:flex-start;
flex-direction:column;
h6{
    font-weight: 500;
    font-size: 1rem;
    line-height: 1.5rem;
    a{
        color:var(--text-color);
        &:hover{
            color:rgba(var(--blog-theme-rgb),1);
        }
    }
}
span{
    font-weight: 400;
font-size: 0.8125rem;
line-height: 1.25rem;
color: #969696;

&.Tag{
    letter-spacing: 0.04em;
text-transform: uppercase;
font-weight: 600;
font-size: 0.625rem;
line-height: 1rem;
    margin-inline-end:0.5rem;
    padding-right:0.5rem;
    border-right:1px solid rgba(var(--grey-rgb),0.2);
}
}
`;

export default function SideBarPostCard({ post }) {


    return (
        <div class="group flex justify-between items-start gap-4 md:gap-6 mx-2 sm:mx-4 w-full min-w-[300px] py-2 mb-4 last:mb-0 border-b border-border last:border-b-0">
                <Image src={post.image} width={80} height={80} alt={post.title} className="h-20 w-20 object-cover rounded-md border border-border" />
            <div>
            {/* <div className="flex items-center gap-2">
                <Image src={post.author.profileURL} width={16} height={16} alt={post.author.name} className="w-4 h-4 rounded-full" />
                <span className="font-medium text-sm text-primary">{post.author.name}</span>
            </div> */}
                <div>
                    <h6 title={post.title} className="group-hover:text-primary"> <Link href={"/blog/posts/"+ post.slug}>{post.title}</Link></h6>
                    <div>
                    {/* <p className="font-medium text-sm text-primary/80 uppercase">{post.labels[0]}</p> */}
                        <p className="font-medium text-xs text-slate-500 mt-3">On {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            month: 'long', // Full month name (e.g., September)
                            day: 'numeric', // Day of the month (e.g., 29)
                            year: 'numeric', // 4-digit year (e.g., 2021)
                        })}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
