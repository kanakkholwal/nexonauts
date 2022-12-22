import Input from "@/components/form-elements/Input";
import Button from "@/components/buttons";
import { FormElement, Label } from "@/components/form-elements";

export default function LoginCard({ ...props }) {

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target)
    }

    return (<form onSubmit={handleSubmit} {...props}>

        <div className="Fui_Card">
            <div className="Fui_Card-body">
                <FormElement>
                    <Input type="email" placeholder="Enter your Email" outlined />
                    <Label>Enter Your Email</Label>
                </FormElement>
                <FormElement>
                    <Input type="password" placeholder="Enter your Password" outlined />
                    <Label>Enter Your Password</Label>
                </FormElement>

                <Button type="submit">Login as Admin</Button>
            </div>
        </div>
    </form>)
}