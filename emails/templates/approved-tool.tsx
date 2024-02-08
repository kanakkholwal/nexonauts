import {
    Button,
    Font, Head,
    Heading,
    Html, Preview,
    Section,
    Tailwind,
    Text
} from "@react-email/components";
import tailwindConfig from "@root/tailwind.config";

type Payload = {
    name: string;
    email: string;
    publishedLink: string;
}

export default function ApprovedTool({ payload }: { payload: Payload }) {
    return (
        <Html>
            <Head>
                <Font
                    fontFamily="DM Sans"
                    fallbackFontFamily={["Arial", "Helvetica", "sans-serif"]}
                    webFont={{
                        url: "https://fonts.gstatic.com/s/dmsans/v14/rP2Yp2ywxg089UriI5-g7M8btVsD8Ck0q7u6-K6h9Q.woff2",
                        format: "woff2",
                    }}
                    fontWeight={500}
                    fontStyle="normal"
                />
            </Head>

            <Preview>{`🌟 Your Tool has been published `} </Preview>

            <Tailwind config={tailwindConfig}>
                <Section className="max-w-screen-md mx-auto p-8 bg-white dark:bg-slate-900 rounded-md shadow-md" style={{
                    fontFamily: "DM Sans, sans-serif",
                }}>
                    <Heading as="h3">Hi {payload.name},</Heading>

                    <Text className="text-gray-600 mb-6">
                    We're pleased to inform you that your app has been approved!
                    </Text>
                    <Text className="text-lg italic text-gray-700">
                        "Congratulations! Your tool is now live and ready to be used."
                    </Text>
                    <Text className="text-gray-600 text-center mb-6">
                        Click the link below to visit your tool:
                    </Text>
                    <Section className="w-full flex items-center justify-center p-4" key="verify-email">
                        <Button
                            href={payload.publishedLink}
                            className={`inline-flex items-center justify-center px-5 py-3 text-base mx-auto font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-[0.5rem] transition-duration-300   bg-blue-500 dark:bg-blue-500  text-white hover:bg-blue-500/90`}
                        >
                            Visit your Tool
                        </Button>
                    </Section>
                    <Text className="text-gray-600 mt-2">
                        Best regards,
                    </Text>
                    <Text className="text-gray-600">
                        The Nexonauts Team
                    </Text>

                </Section>
            </Tailwind>
        </Html >
    );
}