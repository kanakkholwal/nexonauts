import ytdl from "ytdl-core";

export default async function YouTubeDownloader(req, res) {
  if (req.method === "POST") {
    const { url } = req.body;
    const output = await ytdl.getInfo(url);

    if (output)
      res.status(200).json({
        details: output.videoDetails,
        outputs: output.formats.sort((a, b) => a.mimeType < b.mimeType),
      });
    else
      res.status(404).json({
        message: "Error occurred",
      });
  } else return res.status(404);
}
