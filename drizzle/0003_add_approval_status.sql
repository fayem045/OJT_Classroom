-- Add the approval_status enum type
CREATE TYPE "approval_status" AS ENUM ('pending', 'approved', 'rejected');

-- Add the approval_status column to the user table
ALTER TABLE "ojtclassroom-finalproj_user" 
ADD COLUMN "approval_status" "approval_status" DEFAULT 'pending';

-- Update existing records to have 'approved' status by default
UPDATE "ojtclassroom-finalproj_user" 
SET "approval_status" = 'approved'; 