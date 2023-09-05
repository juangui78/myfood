import styles from "./LandingPage.module.css"
import logo from "../../assets/images/logo.png"
import { Link } from "react-router-dom"
export default function LandingPage () {
    return(
        <>
            <section className={styles.page}>
                <section id="section" className={styles.section}>
                    <div className={styles.sectionContent}>
                        <img width="220px" src={logo} alt="logo-myfood" />
                        <div className={styles.sloganContent}>
                            <h2>Welcome</h2>
                            <h3 className={styles.sloganText}>All recipes in your hands</h3>
                        </div>
                        
                        
                    </div>
                    <div>
                        <Link to="/home" className={styles.buttonStart} type="button">Let's start</Link>
                    </div>
                </section>
            </section>
        
        </>
    )
}