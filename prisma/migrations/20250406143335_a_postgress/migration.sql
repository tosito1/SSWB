-- CreateEnum
CREATE TYPE "ROL" AS ENUM ('USUARIO', 'ADMINISTRADOR');

-- CreateTable
CREATE TABLE "Obra" (
    "id" SERIAL NOT NULL,
    "título" TEXT NOT NULL,
    "imágen" TEXT NOT NULL,
    "descripción" TEXT NOT NULL,
    "procedencia" TEXT NOT NULL,
    "comentario" TEXT NOT NULL,

    CONSTRAINT "Obra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "correo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" "ROL" NOT NULL DEFAULT 'USUARIO',

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("correo")
);

-- CreateIndex
CREATE UNIQUE INDEX "Obra_título_key" ON "Obra"("título");
