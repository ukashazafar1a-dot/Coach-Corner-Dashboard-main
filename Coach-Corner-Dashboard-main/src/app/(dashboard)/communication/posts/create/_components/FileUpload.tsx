import React, { useRef, useState } from "react";

interface FileUploadProps {
  onFileSelect: (file: File | null) => void; // Callback when a file is selected
  acceptedFileTypes?: string; // Accepted file types (e.g., "image/png, image/jpeg")
  maxSize?: number; // Max file size in MB
  label?: string; // Custom label for the button
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  acceptedFileTypes = "image/png, image/jpeg, image/gif",
  maxSize = 10,
  label = "Select from Gallery",
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      // Optional: Check file size
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File size should not exceed ${maxSize}MB.`);
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Create a preview URL for the image
      onFileSelect(file);
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className="mt-2 flex items-center justify-start gap-3 rounded-lg border border-dashed border-gray-900/25 px-6 py-6 relative cursor-pointer hover:bg-gray-50 flex-wrap"
      onClick={triggerFileInput}
    >
      {previewUrl && (
        <div className="mt-4">
          <img src={previewUrl} alt="Preview" className="w-32 h-32 object-cover rounded-md" />
        </div>
      )}
      <div className={`text-center basis-auto flex-grow ${previewUrl ? 'border p-4' : ''}`}>
        <svg
          className="mx-auto h-12 w-12 text-gray-300"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="file"
          accept={acceptedFileTypes}
          onChange={handleFileChange}
          ref={fileInputRef}
          className="cursor-pointer opacity-0 appearance-none absolute inset-0 w-100 h-100 z-1"
        />
        <div className="mt-4 flex items-center justify-center text-sm leading-6 text-gray-600 flex-col">
          <label
            htmlFor="file"
            className="cursor-pointer relative z-2 rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
          >
            <span>{label}</span>
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs leading-5 text-gray-600">
          {acceptedFileTypes} up to {maxSize}MB
        </p>
      </div>
      
    </div>
  );
};

export default FileUpload;
