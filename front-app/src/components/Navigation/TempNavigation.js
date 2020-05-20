import React from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import PersonIcon from "@material-ui/icons/Person";
import styles from './mystyle.module.scss';

export default function Navigation(props) {

    return (
        <div>
            <React.Fragment>
              <div className={styles.div__customNav}>
                <div className={styles.div__iconBox}>
                  <ChevronLeftIcon className={styles.icon}/>
                </div>
                <p className={styles.p}>발바닥</p>
                <div className={styles.div__iconBox}>
                  <PersonIcon className={styles.icon}/>
                </div>
              </div>
            </React.Fragment>
            <main>
                {props.children}
            </main>
        </div>
    );
}
