"use client";

import { useCallback, useState } from "react";
import { UploadButton, UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "~/app/api/uploadthing/core";

interface FileUploadProps {
  endpoint: keyof OurFileRouter;
  onUploadComplete?: (url: string) => void;
  className?: string;
}

// Check if UploadThing is configured
const isUploadThingConfigured = process.env.NEXT_PUBLIC_UPLOADTHING_URL !== undefined;

export const FileUpload = ({
  endpoint,
  onUploadComplete,
  className = "",
}: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  
  const handleComplete = useCallback(
    (res: { fileUrl: string }[]) => {
      setIsUploading(false);
      if (res?.[0]?.fileUrl && onUploadComplete) {
        onUploadComplete(res[0].fileUrl);
      }
    },
    [onUploadComplete]
  );

  if (!isUploadThingConfigured) {
    return (
      <div className={`${className} p-4 border border-dashed rounded-md text-center`}>
        <p className="text-gray-500">File uploads are disabled.</p>
        <p className="text-sm text-gray-400">UploadThing is not configured.</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* @ts-ignore - Type arguments issue */}
      <UploadDropzone
        endpoint={endpoint}
        onUploadBegin={() => setIsUploading(true)}
        onClientUploadComplete={handleComplete}
        onUploadError={(error: Error) => {
          setIsUploading(false);
          console.error(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
};

export const FileUploadButton = ({
  endpoint,
  onUploadComplete,
  className = "",
}: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  
  const handleComplete = useCallback(
    (res: { fileUrl: string }[]) => {
      setIsUploading(false);
      if (res?.[0]?.fileUrl && onUploadComplete) {
        onUploadComplete(res[0].fileUrl);
      }
    },
    [onUploadComplete]
  );

  if (!isUploadThingConfigured) {
    return (
      <div className={`${className} p-2 border border-dashed rounded-md text-center`}>
        <p className="text-sm text-gray-500">File uploads are disabled</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* @ts-ignore - Type arguments issue */}
      <UploadButton
        endpoint={endpoint}
        onUploadBegin={() => setIsUploading(true)}
        onClientUploadComplete={handleComplete}
        onUploadError={(error: Error) => {
          setIsUploading(false);
          console.error(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
}; 