import styles from "./_ProgressBar.module.scss";
import React, { useState, useEffect } from "react";
function ProgressBar({ CurrentValue }) {

    const [type, SetType] = useState("var(--primary)");

    CurrentValue = CurrentValue.toFixed(2);
    useEffect(() => {
        if (CurrentValue >= 60 && CurrentValue <= 90) {
            SetType("var(--warning)")
        }
        else if (CurrentValue >= 90) {
            SetType("var(--success)")
        }
        else if (CurrentValue <= 60 && CurrentValue >= 25) {
            SetType("var(--primary)")
        }
        else {
            SetType("var(--primary-hvr)")
        }
    }, [CurrentValue]);


    return (
        <>
            <div className={styles.Progress}>
                <div className={styles.ProgressBar} style={{ width: `${CurrentValue}%`, background: type }}></div>
            </div>
            <span className={styles.ProgressMeter}>{CurrentValue + "% Uploaded"}</span>
        </>
    )
}

export default ProgressBar;