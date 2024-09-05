"use client"

import styles from "./styles.module.scss";
import { useFormStatus } from "react-dom";

interface Props {
  name: string;
}

export function Button({ name }: Props) {
    const { pending } = useFormStatus();
  
    return (
    <button type="submit" disabled={pending} className={styles.button}>
      {/* Se estiver pendente, eu quero mostrar o texto, se não eu quero mostrar o name */}
      {pending ? "Carregando...": name}
    </button>
  );
}
