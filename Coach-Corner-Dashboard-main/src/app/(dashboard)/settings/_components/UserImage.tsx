import React, { useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
type props = {
  onChange: (file: any) => void;
  label: string;
  image?: string | null;
};
const UserImage = ({ onChange, label, image }: props) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    image ? image : null
  );
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

  useEffect(() => {
    if(image) {
      setSelectedImage(image)
    }
  }, [image])
  
  return (
    <div className="flex items-center justify-start gap-3 relative">
      <div
        className="w-16 h-16 rounded-full overflow-hidden bg-stone-200 flex items-center justify-center"
        onClick={handleChangeIconClick}
      >
        {selectedImage ? (
          <img
            src={
              selectedImage ||
              "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1727099653/cc-site-assets/dashboard-assets/27470334_7309681_tndh4k.jpg"
            }
            alt="Selected Icon"
            className="w-16 h-16 rounded"
          />
        ) : (
          <FaUser className="w-8 h-8 fill-gray-700" />
        )}
      </div>
      <p className="text-blue-400 underline" onClick={handleChangeIconClick}>
        Upload picture
      </p>
      <input
        type="file"
        accept="image/*"
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        ref={fileInputRef}
        onChange={handleImageChange}
        style={{ display: "none" }} // Hide the file input
      />
    </div>
  );
};

export default UserImage;
