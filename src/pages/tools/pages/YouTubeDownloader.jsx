import SnackBar from "@/components/SnackBar";
import Button from "@/components/buttons/Button";
import { Input, FormElement, Label } from "@/components/form-elements";
import Loader from "@/components/Loader";
import { FiDownload } from "react-icons/fi";
import { HiVolumeUp, HiVolumeOff, HiOutlineFolderDownload } from "react-icons/hi";
import { HiOutlineVideoCameraSlash, HiOutlineVideoCamera, HiOutlineEye } from "react-icons/hi2";

import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Image from "next/image";

const VideoListContainer = styled.div`
padding-block: 1.5rem;
margin-inline: auto;
display: grid;
gap: 1rem;
@media (min-width: 768px) {
padding: 1.5rem;
grid-template-columns: repeat(2, 5fr);
}

@media (min-width: 992px) {
grid-template-columns: repeat(3, 3.3fr);
}

@media (min-width: 1200px) {
grid-template-columns: repeat(4, 2.5fr);
}
`
const VideoContainer = styled.div`
display: flex;
flex-direction: column;
word-wrap: break-word;
background: var(--card-bg);
box-shadow: var(--card-shadow);
--border-radius: 0.5rem;
border-radius: var(--border-radius,.5rem);
padding:1.5rem;
`

const VideoCard = styled.div`
word-wrap: break-word;
background: var(--card-bg);
box-shadow: var(--card-shadow);
--border-radius: 1rem;
border-radius: var(--border-radius,.5rem);
padding:1.5rem;
max-width:480px;
margin:auto;
margin-block:1rem;
`;
const EmbedImage = styled.div`
padding:0.5rem;
border-radius:0.5rem;
overflow:hidden;
object-fit:contain;
aspect-ratio: 16/9;
`;
const Details = styled.div`
padding:0.5rem;

`;
const Description = styled.p`
display: -webkit-box;
    -webkit-line-clamp: 3;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-box-orient: vertical;`;


export default function YouTubeDownloader() {

    const [value, SetValue] = useState("");
    const [result, SetResult] = useState(null);
    const [loading, SetLoading] = useState(false);
    const [snackObj, SetSnackObj] = useState({ Message: "Some error Occurred", open: false });

    const Download = (url) => {
        SetResult(null)
        if (url.length < 5) {
            SetSnackObj({ open: true, Message: "Enter a valid Video Url" })
            setTimeout(() => {
                SetSnackObj({ open: false, ...snackObj })
            }, 800);
            return
        }
        SetLoading(true);
        axios.post('/api/download/youtube', {
            url: url
        }).then(function (response) {
            console.log(response.data);
            if (response.data) {
                SetResult(response.data)
                SetSnackObj({ open: true, Message: "Video Data Found !!!" })
            }
            else {
                SetSnackObj({ open: true, Message: "Video Not Found !!!" })
            }
        }).catch(function (error) {
            console.log(error);
            SetSnackObj({ open: true, ...snackObj })
        }).finally(() => {
            SetLoading(false);
            setTimeout(() => {
                SetSnackObj({ open: false, ...snackObj })
            }, 800);
        })
    }

    return (
        <>
            <div style={{ maxWidth: "720px", margin: "auto" }}>
                <FormElement>
                    <Input outlined name="ytDownloader" placeholder="Enter YouTube Video Link" value={value} onChange={(e) => SetValue(e.target.value)} />
                    <Label htmlFor="ytDownloader">Enter YouTube Video Link</Label>
                </FormElement>
                <div className="m-auto d-flex flex-wrap justify-content-center align-items-center">

                    <Button nature="primary" onClick={() => {
                        Download(value)
                    }}>
                        Download <FiDownload />
                    </Button>
                </div>
                {loading ? <Loader size="32" /> : null}

                {
                    result?.videoDetails ?
                        <VideoCard>
                            <EmbedImage>
                                <Image alt={result.videoDetails.title} src={result.videoDetails.thumbnails[result.videoDetails.thumbnails.length - 1].url} width={result.videoDetails.thumbnails[result.videoDetails.thumbnails.length - 1].width} height={result.videoDetails.thumbnails[result.videoDetails.thumbnails.length - 1].height} />
                            </EmbedImage>
                            <Details>
                                <h3>{result.videoDetails.title}</h3>
                                <Description>{result.videoDetails.description}</Description>
                                <p><span className="Badge Badge_success"><HiOutlineEye />
                                    {" " + result.videoDetails.viewCount.toLocaleString('en-US', {
                                        maximumFractionDigits: 2,
                                        style: 'currency',
                                    })}</span></p>
                            </Details>
                        </VideoCard> : null
                }
            </div>

            {result?.Downloadable ? <VideoListContainer>

                {
                    result?.Downloadable?.map(({ qualityLabel, quality, container, url, hasAudio, hasVideo }, index) => {
                        return <VideoContainer key={index}>

                            <p> Quality :<span className="Badge Badge_info">{qualityLabel ?? quality}</span></p>
                            <p> File Type :<span className="Badge Badge_info">{container}</span></p>

                            <p>
                                <span className="Badge m-2">{hasAudio ? <HiVolumeUp /> : <HiVolumeOff />}</span>
                                <span className="Badge m-2">{hasVideo ? <HiOutlineVideoCamera /> : <HiOutlineVideoCameraSlash />}</span>
                            </p>
                            <div>
                                <Button as="a" href={url} download nature="primary" size="sm">Download <HiOutlineFolderDownload /></Button>
                            </div>
                        </VideoContainer>
                    })
                }
            </VideoListContainer> : null}

            <SnackBar {...snackObj} />

        </>)
}