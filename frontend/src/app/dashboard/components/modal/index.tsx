"use client"

import styles from "./styles.module.scss";
import { X } from "lucide-react";
import { use } from "react";
import { OrderContext } from "@/providers/order";

export function ModalOrder() {
  const { onRequestClose } = use(OrderContext);

  return (
    <dialog className={styles.dialogContainer}>
      <section className={styles.dialogContent}>
        <button 
        className={styles.dialogButton}
        onClick={onRequestClose}
        >
          <X size={40} color="#FF3f4b" />
        </button>

        <article className={styles.container}>
          <h2>Detalhes do pedido</h2>
          <span className={styles.table}>
            Mesa <b>36</b>
          </span>

          <section className={styles.item}>
            <span>
              1 - <b>Pizza catupiry</b>
            </span>
            <span className={styles.description}>
              Pizza de frango com catupiry
            </span>
          </section>

          <section className={styles.item}>
            <span>
              1 - <b>Pizza catupiry</b>
            </span>
            <span className={styles.description}>
              Pizza de frango com catupiry
            </span>
          </section>

          <button className={styles.submitButton}>Concluir pedido</button>
        </article>
      </section>
    </dialog>
  );
}
