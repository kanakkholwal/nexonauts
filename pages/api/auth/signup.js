import User from 'models/user';
import dbConnect from 'lib/dbConnect';
import handler from 'lib/handler';


handler
    .post(createUser)

async function createUser(req, res) {

    const { name, email, password } = req.body;
    try {
        await dbConnect();

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }
        const isEmail = (email) => {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        if (!isEmail(email)) {
            return res.status(400).json({ message: 'Please enter a valid email' });
        }


        const user = await User.findOne({ email: email });



        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        // if (req.body.role && !req.body.role.includes("user")) {
        //     return res.status(400).json({ message: 'Role must be user' });
        // }
        // if (req.body.role.includes("admin") && !isAdminMiddleware(req, res)) {
        //     return res.status(401).json({ message: 'Not authorized' });
        // }
        const newUser = await User.create({ name, email, password, role: "user" });

        res.status(201).json({ message: 'Created user!', user: newUser });

    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }


}

export default handler;