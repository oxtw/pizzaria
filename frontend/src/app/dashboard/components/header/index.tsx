"use client";

import Link from "next/link";
import styles from "./styles.module.scss";
import Image from "next/image";
import logoImg from "/public/logo.svg";
import { LogOutIcon } from "lucide-react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export function Header() {
  
  const router = useRouter();

  //fução para fazer logout deletando o cookie que tem o token do usuário e redirecionando.
  async function handleLogout() {
    deleteCookie("session", { path: "/" });

    router.replace("/");
  }

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard">
          {/* adicionando a logo */}
          <Image
            alt="Logo Sujeito Pizza"
            src={logoImg}
            width={190}
            height={60}
            priority={true}
            quality={100}
          />
        </Link>

        {/*Menu de navegação  */}
        <nav>
          <Link href="/dashboard/category">Categoria</Link>
          <Link href="/dashboard/product">Produto</Link>

          <form action={handleLogout}>
            <button type="submit">
              {/* Utilizando icone de logout da lucid-react */}
              <LogOutIcon size={24} color="#FFF" />
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
