import React, { useState, useRef } from "react";
type props = {
  onChange: (file: any) => void;
  label: string;
  image: string | null | undefined;
};
const ImageBlock = ({ onChange, label, image }: props) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(image ? image : null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<any>(null);

  const handleChangeIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the first selected file
    if (file) {
      setFile(file);
      if (onChange) {
        onChange(file);
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string); // Set the selected image as state
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  return (
    <div className="bg-white p-3 rounded-lg w-full mb-4">
      <p className="mb-2">{label}</p>
      <div className="flex items-center justify-start gap-3">
        <img
          src={
            selectedImage ||
            "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1727099653/cc-site-assets/dashboard-assets/27470334_7309681_tndh4k.jpg"
          }
          alt="Selected Icon"
          className="w-24 h-24 rounded"
        />
        <button
          type="button"
          className="btn btn--primary text-sm px-3 py-1"
          onClick={handleChangeIconClick}
        >
          Change {label}
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ display: "none" }} // Hide the file input
        />
      </div>
    </div>
  );
};

export default ImageBlock;
