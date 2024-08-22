import styles from "@/app/page.module.scss";
import logoImg from "../../public/logo.svg";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className={styles.containerCenter}>
        {/*Logo*/}
        <Image src={logoImg} alt="Logo da pizzaria" />

        {/* Formulário de login */}
        <section className={styles.login}>
          <form>
            <input
              type="email"
              required
              name="email"
              placeholder="Digite seu e-mail..."
              className={styles.input}
            />

            <input
              type="password"
              required
              name="password"
              placeholder="**********"
              className={styles.input}
            />

            <button type="submit">Acessar</button>

            <Link href="/signup" className={styles.text}>
              Não possui uma conta? Cadastre-se.
            </Link>
          </form>
        </section>
      </div>
    </>
  );
}
