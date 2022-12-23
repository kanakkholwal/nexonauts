import Input from "@/components/form-elements/Input";
import Button from "@/components/buttons";
import classes from "@backend/styles/_Login.module.scss";
import { FormElement, Label } from "@/components/form-elements";

export default function LoginCard({ ...props }) {

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target)
    }

    return (
        <div className={classes.body}>
            <div>
                <form onSubmit={handleSubmit} >
                    <FormElement>
                        <Input type="email" placeholder="Enter your Email" outlined />
                        <Label>Enter Your Email</Label>
                    </FormElement>
                    <FormElement>
                        <Input type="password" placeholder="Enter your Password" outlined />
                        <Label>Enter Your Password</Label>
                    </FormElement>
                    <div className="d-flex justify-content-center align-items-center"><Button type="submit" nature="primary" >Login as Admin</Button></div>

                </form>
            </div>
        </div>)
}