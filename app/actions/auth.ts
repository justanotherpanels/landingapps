"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function registerAction(formData: any) {
    try {
        const { nama_lengkap, username, no_hp, email, password } = formData;

        // 1. Check if user already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { username },
                    { no_hp },
                    { email: email || undefined }
                ]
            }
        });

        if (existingUser) {
            return { error: "Username, Nomor HP, atau Email sudah terdaftar." };
        }

        // 2. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Create user in database
        const newUser = await prisma.user.create({
            data: {
                nama_lengkap,
                username,
                no_hp,
                email: email || null,
                password: hashedPassword,
                level: "Member",
                status: "Active" // Set to active for now (no OTP flow implementation yet)
            }
        });

        return { success: true };
    } catch (error) {
        console.error("Register error:", error);
        return { error: "Terjadi kesalahan saat mendaftarkan akun." };
    }
}

export async function loginAction(identifier: string, password: string) {
    try {
        // 1. Find user by identifier (username/no_hp/email)
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: identifier },
                    { no_hp: identifier },
                    { email: identifier }
                ]
            }
        });

        if (!user) {
            return { error: "Akun tidak ditemukan." };
        }

        // 2. Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return { error: "Password salah." };
        }

        // 3. Create JWT Session
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const session = await encrypt({ 
            userId: user.id, 
            username: user.username,
            level: user.level,
            expires 
        });

        // 4. Set cookie
        const cookieStore = await cookies();
        cookieStore.set("session", session, { 
            expires, 
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/"
        });

        return { success: true };
    } catch (error) {
        console.error("Login error:", error);
        return { error: "Terjadi kesalahan saat masuk ke akun." };
    }
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.set("session", "", { expires: new Date(0) });
    redirect("/auth/login");
}

export async function getUserAction() {
    try {
        const cookieStore = await cookies();
        const sessionToken = cookieStore.get("session")?.value;
        
        if (!sessionToken) return null;

        const { decrypt } = await import("@/lib/auth");
        const payload = await decrypt(sessionToken);
        
        if (!payload || !payload.userId) return null;

        const user = await prisma.user.findUnique({
            where: { id: payload.userId as string },
            select: {
                nama_lengkap: true,
                username: true,
                email: true,
                no_hp: true,
                level: true,
            }
        });

        return user;
    } catch (error) {
        console.error("Get user error:", error);
        return null;
    }
}

