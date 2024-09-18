"use client";

import { ChangeEvent, useState } from "react";
import styles from "../form/styles.module.scss";
import { UploadCloud } from "lucide-react";
import Image from "next/image";
import { Button } from "@/app/dashboard/components/button";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieCliente";

interface CategoryProps {
  id: string;
  name: string;
}

interface Props {
  categories: CategoryProps[];
}

export function Form({ categories }: Props) {
  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState("");

  async function handleRegisterProduct(formData: FormData) {
    const categoryIndex = formData.get("category");
    const name = formData.get("name");
    const price = formData.get("price");
    const description = formData.get("description");

    if (!name || !categoryIndex || !price || !description || !image) {
      return;
    }

    // console.log(categories[Number(categoryIndex)]);

    const data = new FormData();

    data.append("name", name);
    data.append("price", price);
    data.append("description", description);
    data.append("category_id", categories[Number(categoryIndex)].id);
    data.append("file", image);

    const token = getCookieClient();

    await api
      .post("/product", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        console.log(err);
        return;
      });

    console.log("CADASTRADO COM SUCESSO!");
  }

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

      <form className={styles.form} action={handleRegisterProduct}>
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
          {categories.map((category, index) => (
            <option key={category.id} value={index}>
              {category.name}
            </option>
          ))}
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
