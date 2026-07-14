import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

const SESSION_COOKIE = "admin_session";

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, 10);
}

export function verifyPassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}

export async function setSession(hash: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, hash, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value;
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) redirect("/admin/login");

  if (!verifyPassword(adminPassword, session)) {
    await clearSession();
    redirect("/admin/login");
  }
}

export function getSessionPasswordHash() {
  return hashPassword(process.env.ADMIN_PASSWORD || "admin");
}
