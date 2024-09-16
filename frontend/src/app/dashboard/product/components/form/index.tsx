"use client";

import { ChangeEvent, useState } from "react";
import styles from "../form/styles.module.scss";
import { UploadCloud } from "lucide-react";
import Image from "next/image";
import { Button } from "@/app/dashboard/components/button";

export function Form() {
  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState("");

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type !== "image/jpeg" && image.type !== "image/png") {
        console.log("FORMATO PROIBIDO!!!");
        return;
      }

      setImage(image);
      setPreviewImage(URL.createObjectURL(image));
    }
  }

  return (
    <main className={styles.container}>
      <h1>Novo produto</h1>

      <form className={styles.form}>
        <label className={styles.labelImage}>
          <span>
            <UploadCloud size={24} color="#FFF" />
          </span>

          <input
            type="file"
            accept="image/png, image/jpeg"
            required
            onChange={handleFile}
          />

          {previewImage && (
            <Image
              alt="Imagem de preview"
              src={previewImage}
              className={styles.preview}
              fill={true}
              quality={100}
              priority={true}
            />
          )}
        </label>

        <select name="category">
          <option key={1} value={1}>
            Pizzas
          </option>
          <option key={1} value={1}>
            Massas
          </option>
        </select>
        <input
          type="text"
          name="name"
          placeholder="Digite o nome do produto..."
          className={styles.input}
        />
        <input
          type="text"
          name="price"
          placeholder="Preço do produto..."
          className={styles.input}
        />
        <textarea
          name="description"
          placeholder="Digite a descrição do produto..."
          className={styles.input}
        />

        <Button name="Cadastrar produto" />
      </form>
    </main>
  );
}
