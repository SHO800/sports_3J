import {ReactNode} from "react";
import styles from "./ListContainer.module.css";

export const ListContainer = ({children}: { children: ReactNode }) => {
    return (
        <div className={styles.listContainer}>
            {children}
        </div>
    )
}

