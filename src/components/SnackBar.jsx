import { useEffect, useState } from "react";
import classes from "./_Snackbar.module.scss";

export default function SnackBar({ Message, ActionName, ActionFunction, open }) {

    const [isOpen, SetOpen] = useState(open);


    const Action = () => {
        ActionFunction() || SetOpen(false);
    }
    useEffect(() => {
        SetOpen(open)
    }, [open]);

    return (
        <div className={classes.SnackBarContainer}>
            <div className={classes.SnackBar + (isOpen ? (" " + classes.Show) : "")}>
                <div className={classes.Message}>
                    {Message ?? "Your Message"}
                </div>
                <div className={classes.Actions}>
                    {ActionName && <button className={classes.Action} onClick={() => Action()}>{ActionName}</button>}
                    <button className={classes.Dismiss} onClick={() => SetOpen(false)}><svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z" /></svg>
                    </button>
                </div>
            </div>
        </div>)
}