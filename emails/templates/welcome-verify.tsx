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
    verifyUrl: string;
};


export default function WelcomeEmail({ payload }: { payload: Payload }) {
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

            <Preview>{`🌟 Welcome to ${process.env.NEXT_PUBLIC_WEBSITE_NAME} - Verify Your Account! 🌟 `} </Preview>

            <Tailwind config={tailwindConfig}>
                <Section className="max-w-screen-md mx-auto p-8 bg-white dark:bg-slate-900 rounded-md shadow-md" style={{
                    fontFamily: "DM Sans, sans-serif",
                }}>
                    {/* <Container className="w-full flex items-center justify-center p-4 bg-slate-700 text-white" key="header">
                        <Button>
                            <Img src="cat.jpg" alt="Cat" width="300" height="300" />
                            </Button>
                    </Container> */}
                    <Heading as="h1" className="text-3xl font-bold text-center text-gray-800 mb-4">Welcome to Nexonauts!</Heading>
                    <Heading as="h3">Dear {payload.name},</Heading>

                    <Text className="text-gray-600 mb-6">
                        You've taken the first step toward a world of coding efficiency, collaboration, and inspiration.
                    </Text>
                    <Text className="text-lg italic text-gray-700">
                        "In the vast universe of code, your possibilities are as limitless as the stars. Welcome to Nexonauts, where innovation knows no bounds."
                    </Text>
                    <Text className="text-gray-600 mb-6">
                        To kick off your Nexonauts adventure, please click the link below to verify your email address
                        and complete your account setup. We can't wait to see what you'll create!  :
                    </Text>
                    <Section className="w-full flex items-center justify-center p-4" key="verify-email">
                        <Button
                            href={payload.verifyUrl}
                            className={`inline-flex items-center justify-center px-5 py-3 text-base mx-auto font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-[0.5rem] transition-duration-300   bg-blue-500 dark:bg-blue-500  text-white hover:bg-blue-500/90`}
                        >
                            Verify Your Email
                        </Button>
                    </Section>
                    <Text className="text-gray-600 mt-6">
                        If you ever need assistance or have questions, don't hesitate to reach out to our stellar support team at{' '}
                        <Button href="mailto:support@nexonauts.com" className="text-blue-500">
                            support@nexonauts.com
                        </Button>
                        . We're here to ensure your journey with Nexonauts is nothing short of extraordinary.
                    </Text>
                    <Text className="text-gray-600 mt-6">
                        Here's to coding greatness, {payload.name}!{' '}  🚀
                    </Text>
                    <Text className="text-gray-600 mt-2">
                        P.S. Remember, "The best way to predict the future is to create it." Let's create something amazing together!{' '} 💻 ✨
                    </Text>

                </Section>
            </Tailwind>
        </Html >
    );
}