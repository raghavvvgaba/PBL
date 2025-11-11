-- RemoveRoleFromUser
ALTER TABLE "User" DROP COLUMN "role";

-- Drop the Role enum
DROP TYPE "Role";