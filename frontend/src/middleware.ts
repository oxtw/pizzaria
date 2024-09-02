import { NextRequest, NextResponse } from "next/server";
import { getCookieServer } from "@/lib/cookieServer";
import { api } from "./services/api";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/_next") || pathname === "/") {
    return NextResponse.next();
  }

  const token = getCookieServer();

  //Se o usuário tentar entrar na rota /dashboard sem um token autenticado ele será redirecionado.
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const isValid = await validateToken(token);

    //se o token não for valido ele vai retornar o usuário para pagina home
    if (!isValid) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

//criando função para validação do token
async function validateToken(token: string) {
  if (!token) return false;

  //requisição para buscar os dados do usuário
  try {
    await api.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
