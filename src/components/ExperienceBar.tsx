
import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar(){
    return(
        <header className={styles.xxxBar}>
            <span>0 xp</span>
            <div>
                <div className={styles.progressBar} style={{ width: '60%'}}/>
                <span className={styles.currentXp} style={{ left: '60%'}}>450 XP</span>
            </div> 
            <span>600 xp</span>
        </header>
    )
}