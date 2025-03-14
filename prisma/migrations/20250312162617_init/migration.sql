/*
  Warnings:

  - Added the required column `url` to the `Obra` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Obra" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "título" TEXT NOT NULL,
    "imágen" TEXT NOT NULL,
    "descripción" TEXT NOT NULL,
    "procedencia" TEXT NOT NULL,
    "comentario" TEXT NOT NULL,
    "url" TEXT NOT NULL
);
INSERT INTO "new_Obra" ("comentario", "descripción", "id", "imágen", "procedencia", "título") SELECT "comentario", "descripción", "id", "imágen", "procedencia", "título" FROM "Obra";
DROP TABLE "Obra";
ALTER TABLE "new_Obra" RENAME TO "Obra";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
