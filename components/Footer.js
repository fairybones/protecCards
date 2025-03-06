import styles from './Footer.module.css'

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <img src="favicon.ico" alt="Protec Logo" className={styles.logo} />
        <p className='text-sm font-light'>Made with 💛 in Denver, CO by <a className='hover:underline' href="https://aeschalnat.netlify.app/info">Annie Schalnat</a></p>
      </footer>
    </>
  )
}
