import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiOutlineUpload } from "react-icons/hi";
import { AiOutlineFile } from "react-icons/ai";
import useApp from "@/context/useApp";
import fetchClient from "@/hooks/fetchClient";
import SubmitButton from "@/components/SubmitButton";
type user = {
  fName: string;
  lName: string;
  email: string;
};
type props = {
  onChange: (value: any) => void;
};
const UploadFile = ({ onChange }: props) => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { setToaster } = useApp();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [users, setUsers] = useState<user[] | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event?.target.files) return;
    const file = event?.target.files[0];
    // Check file type
    if (
      file &&
      (file.type === "text/csv" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    ) {
      setSelectedFile(file);
    } else {
      setToaster("error", "Please upload a CSV or XLSX file.");
    }
  };

  const handleImportClick = async () => {
    if (!selectedFile) {
      setToaster("error", "Please upload a file first.");
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      const res = await fetchClient(`/api/FileManager/ImportUsers`, {
        method: "POST",
        body: formData,
      });
      if (res && res?.succeeded) {
        onChange(res?.data);
        setOpen(false);
        setSelectedFile(null);
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
      <DialogTrigger className="btn btn--primary text-sm px-3 py-1">
        Import CSV
      </DialogTrigger>
      <DialogContent className="max-w-screen-sm">
        <DialogHeader>
          <DialogTitle className="m-0 mb-2">Import CSV</DialogTitle>
          <DialogDescription className="m-0 mb-2 !mt-0">
            Download a{" "}
            <a
              href="https://res.cloudinary.com/ddkdvh5ps/raw/upload/v1731498880/cc-site-assets/dashboard-assets/InviteUserSample_k25rxp.csv"
              download="template.csv"
              target="_blank"
              className="text-blue-600"
            >
              sample CSV template
            </a>{" "}
            to see an example of the format required.
          </DialogDescription>
          <div className="p-4 flex items-center justify-center min-h-40 w-full bg-[#f4f4f4] rounded mb-4">
            <div className="flex items-center justify-center gap-2 flex-col cursor-pointer relative w-full h-full">
              {selectedFile ? (
                <>
                  <AiOutlineFile className="w-6 h-6 text-gray-600 mx-auto" />
                  <p className="text-gray-600">{selectedFile?.name}</p>
                </>
              ) : (
                <>
                  <HiOutlineUpload className="w-6 h-6 fill-gray-600 mx-auto" />
                  <p className="text-gray-600">Upload File</p>
                </>
              )}
              <input
                type="file"
                accept=".csv, .xlsx"
                onChange={handleFileChange}
                className="absolute w-full h-full opacity-0 inset-0"
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 pt-3">
            <p>Need any help?</p>
            <SubmitButton
              loading={loading}
              disabled={!selectedFile || loading}
              type="button"
              className="btn btn--primary"
              onClick={handleImportClick}
            >
              Extract
            </SubmitButton>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UploadFile;
