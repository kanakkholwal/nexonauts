import { ImageResponse } from '@vercel/og'
import { randomIntFromInterval } from '@/scripts/customFunction'
import { VscTools } from "react-icons/vsc";

export const config = {
  runtime: 'edge',
}
const Palette = [
  {
    bg: "#0093E9 linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
    txt: "",
  },
  {
    bg: "#85FFBD linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)",
    txt: "",
  },
  {
    bg: "#D9AFD9 linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)",
    txt: "",
  },
  {
    bg: "#8BC6EC linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)  ",
    txt: "",
  },
  {
    bg: "#FBAB7E linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)",
    txt: "",
  },
  {
    bg: "#8EC5FC linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
    txt: "",
  },
  {
    bg: "#08AEEA linear-gradient(0deg, #08AEEA 0%, #2AF598 100%)",
    txt: "",
  },
  {
    bg: " #FF9A8B linear-gradient(90deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%)    ",
    txt: "",
  },
  {
    bg: "#F4D03F linear-gradient(132deg, #F4D03F 0%, #16A085 100%)    ",
    txt: "",
  },
  {
    bg: "#FAACA8 linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%)",
    txt: "",
  },
  {
    bg: "#74EBD5 linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%) ",
    txt: "",
  },
]

export default async function handler(req) {

  const { searchParams } = req.nextUrl;
  const image = searchParams.get('image');
  const Text = [...image.toString()].shift().join("");


  if (!image) {
    return new ImageResponse(<>
      {'No Image Found!!"'}
    </>, {
      width: 1200,
      height: 630,
    })
  }
  const index = randomIntFromInterval(0, 10)
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          color: Palette[index].txt ?? "#262626",
          background: Palette[index].bg,
          width: '100%',
          height: '100%',
          paddingTop: 50,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          borderRadius: "8px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}



        {(() => {

          switch (Text) {
            case Text.includes("tools"):
              <div><VscTools /></div>
              break;

            default:
              null
              break;
          }
        })()}


        <p>{Text}</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}