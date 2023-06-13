import Link from 'next/link';
import styled from 'styled-components';
import toast ,{Toaster} from 'react-hot-toast';
import {useState,useEffect} from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp ,FaPinterestP,FaTelegramPlane,FaRedditAlien} from 'react-icons/fa';
import { IoMailOutline} from 'react-icons/io5';
import { BiShareAlt} from 'react-icons/bi';
import { LuCopy} from 'react-icons/lu';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    margin-block: 20px;
    padding: 20px 10px;
    border-radius: 10px;
    background: var(--card-bg);
    box-shadow: var(--card-shadow);
    .shareIcons{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        flex-wrap: wrap;
    }
    .CopyLink,.share{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        border-radius: 0.5rem;
        --color-rgb: var(--secondary-rgb);
        background: rgba(var(--color-rgb), 1);
        box-shadow: var(--shadow-position-1) rgba(var(--color-rgb), 0.1);
        transition: all 0.2s ease-in-out;
        color:#fff;
        &:hover{
            transform: scale(1.05);
        }
    }
    .share{
        --color-rgb: var(--primary-rgb);
    }
    a{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        border-radius: 0.5rem;
        --color-rgb: 255, 255, 255;
        background: rgba(var(--color-rgb), 1);
        box-shadow: var(--shadow-position-1) rgba(var(--color-rgb), 0.1);
        transition: all 0.2s ease-in-out;
        color:#fff;
        &:hover{
            transform: scale(1.05);
        }
        &.facebook{
            --color-rgb: 59, 89, 152;
        }
        &.twitter{
            --color-rgb: 29, 161, 242;
        }
        &.linkedin{
            --color-rgb: 0, 119, 181;
        }
        &.whatsapp{
            --color-rgb: 37, 211, 102;
        }
        &.pinterest{
            --color-rgb: 189, 8, 28;
        }
        &.telegram{
            --color-rgb: 29, 161, 242;
        }
        &.reddit{
            --color-rgb: 255, 69, 0;
        }
        &.email{
            --color-rgb: var(--grey-rgb);
        }

    }
`;

export default function ShareUI({post}){
    const copyLink =  async () => {
        await navigator.clipboard.writeText(`https://kkupgrader.eu.org/blog/posts/${post.slug}`);
    }
    const [isShareNavigatorAvailable, setIsShareNavigatorAvailable] = useState(false);
    useEffect(() => {
        if (navigator.share) {
            setIsShareNavigatorAvailable(true);
        }
    }, []);
    


    return (<>
        <Wrapper id="share_wrapper">
            <h4>Share this post</h4>
            <div className="shareIcons">
                {
                    isShareNavigatorAvailable && (
                        <button onClick={() => {
                            navigator.share({
                                title: post.title,
                                url: `https://kkupgrader.eu.org/blog/posts/${post.slug}`,
                            });
                        }
                        } className='share'>
                            <BiShareAlt/>
                        </button>)
                }
                <button onClick={() =>{
                         toast.promise(copyLink(),{
                        loading: 'Copying link...',
                        success: <p> Link copied</p>,
                        error: <p>Failed to copy link</p>
                })
                }
           
                } target="_blank" rel="noopener noreferrer" className='CopyLink'>
                    <LuCopy/>
                </button>
                <Link href={`https://www.facebook.com/sharer/sharer.php?u=https://kkupgrader.eu.org/blog/posts/${post.slug}`} target="_blank" rel="noopener noreferrer" className='facebook'>
                    <FaFacebookF />
                </Link>
                <Link href={`https://twitter.com/intent/tweet?url=https://kkupgrader.eu.org/blog/posts/${post.slug}&text=${post.title}`} target="_blank" rel="noopener noreferrer"  className='twitter'>
                    <FaTwitter />
                </Link>
                <Link href={`https://www.linkedin.com/shareArticle?mini=true&url=https://kkupgrader.eu.org/blog/posts/${post.slug}&title=${post.title}`} target="_blank" rel="noopener noreferrer"  className='linkedin'>
                    <FaLinkedinIn />
                </Link>
                <Link href={`https://api.whatsapp.com/send?text=https://kkupgrader.eu.org/blog/posts/${post.slug}`} target="_blank" rel="noopener noreferrer"  className='whatsapp'>
                    <FaWhatsapp />
                </Link>
                <Link href={`https://pinterest.com/pin/create/button/?url=https://kkupgrader.eu.org/blog/posts/${post.slug}&media=${post?.image}&description=${post.title}`} target="_blank" rel="noopener noreferrer"  className='pinterest'>
                    <FaPinterestP />
                </Link>
                <Link href={`https://t.me/share/url?url=https://kkupgrader.eu.org/blog/posts/${post.slug}&text=${post.title}`} target="_blank" rel="noopener noreferrer"  className='telegram'>
                    <FaTelegramPlane />
                </Link>
                <Link href={`https://www.reddit.com/submit?url=https://kkupgrader.eu.org/blog/posts/${post.slug}&title=${post.title}`} target="_blank" rel="noopener noreferrer"  className='reddit'>
                    <FaRedditAlien />
                </Link>
                <Link className='email' href={`mailto:?subject=${post.title}&body=https://kkupgrader.eu.org/blog/posts/${post.slug}`} target='_blank' rel="noopener noreferrer"  > 
                    <IoMailOutline />
                </Link>



            </div>
        </Wrapper>
        <Toaster
            position="bottom-center"
        />
    </>)

}