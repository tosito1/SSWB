/*
  Warnings:

  - You are about to drop the column `descripción` on the `Obra` table. All the data in the column will be lost.
  - You are about to drop the column `imágen` on the `Obra` table. All the data in the column will be lost.
  - You are about to drop the column `título` on the `Obra` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[titulo]` on the table `Obra` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `descripcion` to the `Obra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagen` to the `Obra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titulo` to the `Obra` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Obra_título_key";

-- AlterTable
ALTER TABLE "Obra" DROP COLUMN "descripción",
DROP COLUMN "imágen",
DROP COLUMN "título",
ADD COLUMN     "descripcion" TEXT NOT NULL,
ADD COLUMN     "imagen" TEXT NOT NULL,
ADD COLUMN     "titulo" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Obra_titulo_key" ON "Obra"("titulo");
