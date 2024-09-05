import styles from "./styles.module.scss";
import { Button } from "@/app/dashboard/components/button/";

export default function Category() {
  
    async function handleRegisterCategory(){
        "use server"

        console.log('teste')
    }

    return (
    <main className={styles.container}>
      <h1>Nova Categoria</h1>
      <form action={handleRegisterCategory} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Nome da categoria, ex: Pizzas"
          className={styles.input}
        />

        <Button name="Cadastrar" />
      </form>
    </main>
  );
}
