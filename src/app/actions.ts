"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import fs from 'fs';
import path from 'path';

export async function addGame(data: FormData) {
  const name = data.get("name") as string;
  const description = data.get("description") as string;
  const category = data.get("category") as string;
  const price = parseFloat(data.get("price") as string);
  const minPlayers = parseInt(data.get("minPlayers") as string);
  const maxPlayers = parseInt(data.get("maxPlayers") as string);
  const minAge = parseInt(data.get("minAge") as string);
  const playtime = parseInt(data.get("playtime") as string);
  
  let image = data.get("imageUrl") as string || undefined;

  const imageFile = data.get("imageFile") as File;
  if (imageFile && imageFile.size > 0) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const filename = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    fs.writeFileSync(path.join(uploadDir, filename), buffer);
    image = `/uploads/${filename}`;
  }

  await prisma.game.create({
    data: {
      name, description, category, price, minPlayers, maxPlayers, minAge, playtime, image
    }
  });

  revalidatePath("/");
  revalidatePath("/admin/games");
}

export async function updateGame(data: FormData) {
  const id = data.get("id") as string;
  const name = data.get("name") as string;
  const description = data.get("description") as string;
  const category = data.get("category") as string;
  const price = parseFloat(data.get("price") as string);
  const minPlayers = parseInt(data.get("minPlayers") as string);
  const maxPlayers = parseInt(data.get("maxPlayers") as string);
  const minAge = parseInt(data.get("minAge") as string);
  const playtime = parseInt(data.get("playtime") as string);
  
  let image = data.get("imageUrl") as string || undefined;

  const imageFile = data.get("imageFile") as File;
  if (imageFile && imageFile.size > 0) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const filename = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    fs.writeFileSync(path.join(uploadDir, filename), buffer);
    image = `/uploads/${filename}`;
  }

  const updateData: any = { name, description, category, price, minPlayers, maxPlayers, minAge, playtime };
  if (image) updateData.image = image;

  await prisma.game.update({ where: { id }, data: updateData });

  revalidatePath("/");
  revalidatePath("/admin/games");
}

export async function deleteGame(id: string) {
  await prisma.game.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/games");
}

export async function addRental(data: FormData) {
  const gameId = data.get("gameId") as string;
  const clientName = data.get("clientName") as string;
  const clientPhone = data.get("clientPhone") as string;
  const expectedEndDate = new Date(data.get("expectedEndDate") as string);

  await prisma.rental.create({
    data: {
      gameId,
      clientName,
      clientPhone,
      expectedEndDate
    }
  });

  revalidatePath("/admin/rentals");
}

export async function returnRental(id: string) {
  await prisma.rental.update({
    where: { id },
    data: { 
      status: "RETURNED",
      returnDate: new Date()
    }
  });

  revalidatePath("/admin/rentals");
}
