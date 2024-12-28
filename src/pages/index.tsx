import Head from "next/head"
import styles from '../../styles/home.module.css'
import Image from "next/image"
import heroImg from '../../public/assets/hero.png'

export default function Home(){
  return(
    <div className={styles.container}>
      <Head>
        <title>
          Tarefas+ | Organize suas tarefas de forma fácil
        </title>
      </Head>
      <main className={styles.main}>
        <div className={styles.logoContent}>
          <Image
          className={styles.hero}
          alt="Logo Tarefas+"
          src={heroImg}
          priority
          />
        </div>
        <h1>
          Sistema feito para você organizar seus estudos e tarefas
        </h1>
      </main>
    </div>
  )
}