import styles from "./_Loader.module.scss";

export default function Loader({ size }) {


    return (
        <div className={styles.loader}>
            <svg className={styles.circular} width={size} height={size} viewBox="25 25 50 50">
                <circle className={styles.path} cx={50} cy={50} r={20} fill="none" strokeWidth={2} strokeMiterlimit={10} />
            </svg>
        </div>

    )
}