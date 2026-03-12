"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ADMIN FEE ACTIONS
export async function getAdminFees() {
    try {
        const fees = await prisma.adminFee.findMany({
            orderBy: { min_transaksi: 'asc' }
        });
        return fees;
    } catch (error) {
        console.error("Fetch admin fees error:", error);
        return [];
    }
}

export async function addAdminFee(formData: { min_transaksi: number; max_transaksi: number; nilai_persentase: number }) {
    try {
        await prisma.adminFee.create({ data: formData });
        revalidatePath("/admin/admin-fee");
        return { success: true };
    } catch (error) {
        console.error("Add admin fee error:", error);
        return { error: "Gagal menambahkan biaya admin." };
    }
}

export async function updateAdminFee(id: string, formData: { min_transaksi: number; max_transaksi: number; nilai_persentase: number }) {
    try {
        await prisma.adminFee.update({
            where: { id },
            data: formData
        });
        revalidatePath("/admin/admin-fee");
        return { success: true };
    } catch (error) {
        console.error("Update admin fee error:", error);
        return { error: "Gagal memperbarui biaya admin." };
    }
}

export async function deleteAdminFee(id: string) {
    try {
        await prisma.adminFee.delete({ where: { id } });
        revalidatePath("/admin/admin-fee");
        return { success: true };
    } catch (error) {
        console.error("Delete admin fee error:", error);
        return { error: "Gagal menghapus biaya admin." };
    }
}

// USER ACTIONS
export async function getUsers() {
    try {
        const users = await prisma.user.findMany({
            where: { level: "Member" },
            orderBy: { create_at: 'desc' }
        });
        return users;
    } catch (error) {
        console.error("Fetch users error:", error);
        return [];
    }
}

export async function updateUserStatus(id: string, status: string) {
    try {
        await prisma.user.update({
            where: { id },
            data: { status }
        });
        revalidatePath("/admin/user");
        return { success: true };
    } catch (error) {
        console.error("Update user status error:", error);
        return { error: "Gagal memperbarui status pengguna." };
    }
}

export async function deleteUser(id: string) {
    try {
        await prisma.user.delete({ where: { id } });
        revalidatePath("/admin/user");
        return { success: true };
    } catch (error) {
        console.error("Delete user error:", error);
        return { error: "Gagal menghapus pengguna." };
    }
}

// PLATFORM ACTIONS
export async function getPlatforms() {
    try {
        const platforms = await prisma.platform.findMany({
            include: {
                _count: { select: { panduans: true, transaksis: true } }
            },
            orderBy: { name: 'asc' }
        });
        return platforms;
    } catch (error) {
        console.error("Fetch platforms error:", error);
        return [];
    }
}

export async function addPlatform(name: string, image_url?: string) {
    try {
        await prisma.platform.create({ data: { name, image_url } });
        revalidatePath("/admin/platform");
        return { success: true };
    } catch (error) {
        console.error("Add platform error:", error);
        return { error: "Gagal menambahkan platform." };
    }
}

export async function updatePlatform(id: string, name: string, image_url?: string) {
    try {
        await prisma.platform.update({
            where: { id },
            data: { name, image_url }
        });
        revalidatePath("/admin/platform");
        return { success: true };
    } catch (error) {
        console.error("Update platform error:", error);
        return { error: "Gagal memperbarui platform." };
    }
}

export async function deletePlatform(id: string) {
    try {
        await prisma.platform.delete({ where: { id } });
        revalidatePath("/admin/platform");
        return { success: true };
    } catch (error) {
        console.error("Delete platform error:", error);
        return { error: "Gagal menghapus platform." };
    }
}

// PANDUAN ACTIONS
export async function getPanduans() {
    try {
        const panduans = await prisma.panduan.findMany({
            include: { platform: { select: { name: true } } },
            orderBy: { update_at: 'desc' }
        });
        return panduans;
    } catch (error) {
        console.error("Fetch panduans error:", error);
        return [];
    }
}

export async function addPanduan(data: { id_platform: string; name: string; slug: string; content: string }) {
    try {
        await prisma.panduan.create({ data: { ...data, status: "Active" } });
        revalidatePath("/admin/panduan");
        return { success: true };
    } catch (error) {
        console.error("Add panduan error:", error);
        return { error: "Gagal menambahkan panduan. Pastikan slug belum digunakan." };
    }
}

export async function updatePanduan(id: string, data: { id_platform: string; name: string; slug: string; status: string; content: string }) {
    try {
        await prisma.panduan.update({
            where: { id },
            data
        });
        revalidatePath("/admin/panduan");
        return { success: true };
    } catch (error) {
        console.error("Update panduan error:", error);
        return { error: "Gagal memperbarui panduan." };
    }
}

export async function deletePanduan(id: string) {
    try {
        await prisma.panduan.delete({ where: { id } });
        revalidatePath("/admin/panduan");
        return { success: true };
    } catch (error) {
        console.error("Delete panduan error:", error);
        return { error: "Gagal menghapus panduan." };
    }
}

// TRANSACTION ACTIONS
export async function getTransactions() {
    try {
        const transactions = await prisma.transaksi.findMany({
            include: {
                user: { select: { nama_lengkap: true, username: true } },
                platform: { select: { name: true } }
            },
            orderBy: { create_at: 'desc' }
        });
        return transactions;
    } catch (error) {
        console.error("Fetch transactions error:", error);
        return [];
    }
}

export async function updateTransactionStatus(id: string, status: string) {
    try {
        await prisma.transaksi.update({
            where: { id },
            data: { status }
        });
        revalidatePath("/admin/transaksi-gestun");
        return { success: true };
    } catch (error) {
        console.error("Update transaction status error:", error);
        return { error: "Gagal memperbarui status transaksi." };
    }
}

export async function deleteTransaction(id: string) {
    try {
        await prisma.transaksi.delete({ where: { id } });
        revalidatePath("/admin/transaksi-gestun");
        return { success: true };
    } catch (error) {
        console.error("Delete transaction error:", error);
        return { error: "Gagal menghapus transaksi." };
    }
}

// DASHBOARD ACTIONS
export async function getDashboardStats() {
    try {
        const [totalUsers, activeUsers, totalTransactions, successfulTrans] = await Promise.all([
            prisma.user.count({ where: { level: 'Member' } }),
            prisma.user.count({ where: { level: 'Member', status: 'Active' } }),
            prisma.transaksi.count(),
            prisma.transaksi.findMany({
                where: { status: 'Selesai' },
                select: { dana_diterima: true, biaya_admin: true }
            })
        ]);

        const totalRevenue = successfulTrans.reduce((acc, curr) => acc + curr.biaya_admin, 0);
        const totalVolume = successfulTrans.reduce((acc, curr) => acc + curr.dana_diterima, 0);

        return {
            totalUsers,
            activeUsers,
            totalTransactions,
            totalRevenue,
            totalVolume
        };
    } catch (error) {
        console.error("Fetch dashboard stats error:", error);
        return {
            totalUsers: 0,
            activeUsers: 0,
            totalTransactions: 0,
            totalRevenue: 0,
            totalVolume: 0
        };
    }
}

export async function getRecentActivity() {
    try {
        const transactions = await prisma.transaksi.findMany({
            take: 5,
            orderBy: { create_at: 'desc' },
            include: {
                user: { select: { nama_lengkap: true } }
            }
        });
        return transactions;
    } catch (error) {
        console.error("Fetch recent activity error:", error);
        return [];
    }
}

