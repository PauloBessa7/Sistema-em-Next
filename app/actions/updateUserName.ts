"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Definimos o esquema de validação
const updateNameSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres").max(50),
});

export async function updateUsername(formData: FormData) {
  const session = await auth();

  console.log("Updating username for user ID:", session?.user?.id);

  // Segurança 1: Verificar autenticação
  if (!session?.user?.id) {
    return { error: "Você precisa estar logado." };
  }

  // Segurança 2: Validar os dados de entrada
  const validatedFields = updateNameSchema.safeParse({
    name: formData.get("name"),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors.name?.[0] };
  }

  try {
    // Segurança 3: Update no banco via Prisma
    await prisma.user.update({
      where: { id: session.user.id },
      data: { name: validatedFields.data.name },
    });

    // Limpa o cache para mostrar o nome novo na Sidebar/Navbar
    revalidatePath("/");
    console.log("Username updated successfully for user ID:", session.user.id);
    return { success: "Nome atualizado com sucesso!" };
  } catch (e) {
    console.error("Error updating username for user ID:", session.user.id, e);
    return { error: "Erro ao atualizar no banco de dados." };
  }
}