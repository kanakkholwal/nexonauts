import Input from "@/components/form-elements/Input";
import Button from "@/components/buttons";
import classes from "@backend/styles/_Login.module.scss";
import { FormElement, Label } from "@/components/form-elements";
import { useRef } from "react";
// import { getProviders, getSession, signIn } from "next-auth/react"
// import { authOptions } from "../../../pages/api/auth/[...nextauth]"


export default function LoginCard({ providers }) {
    const email = useRef("");
    const password = useRef("");



    return (
        <div className={classes.body}>
            <div>
                <form onSubmit={(e) => e.preventDefault()} >
                    <FormElement>
                        <Input type="email" placeholder="Enter your Email" outlined
                            onChange={(e) => (email.current = e.target.value)}
                            id="email" required />
                        <Label>Enter Your Email</Label>
                    </FormElement>
                    <FormElement>
                        <Input type="password" placeholder="Enter your Password" outlined v
                            onChange={(e) => (password.current = e.target.value)}
                            id="password" required />
                        <Label>Enter Your Password</Label>
                    </FormElement>
                    <div className="d-flex justify-content-center align-items-center">
                        <Button type="submit" nature="primary" onClick={() => signIn("credentials", {
                            email: email.current, password: password.current,
                        })}>Login as Admin</Button>
                    </div>

                </form>
            </div>
        </div>)
}
// export async function getServerSideProps(context) {
//     const { req } = context;
//     const session = await getSession(req, res, authOptions);
//     const providers = await getProviders()
//     if (session) {
//         return {
//             redirect: { destination: "/auth/dashboard" },
//         };
//     }
//     return {
//         props: {
//             providers,
//         },
//     }
// }