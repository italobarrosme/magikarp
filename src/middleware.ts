import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const excludeRoutes = [
    "/login",
    "/register",
    "/api/auth/",
    "/recovery-password",
    "/reset-password",
    "/verify-email",
    "/verify",
  ];

  // Exclui rotas de API de autenticação e páginas públicas
  if (
    excludeRoutes.includes(request.nextUrl.pathname) ||
    request.nextUrl.pathname.startsWith("/api/auth")
  ) {
    return NextResponse.next();
  }

  // Verifica se há um cookie de sessão (sem acessar o banco de dados)
  // O better-auth usa cookies para gerenciar sessões
  const sessionCookie = request.cookies.get("better-auth.session_token");

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!_next|static|favicon.ico|api).*)"],
};
