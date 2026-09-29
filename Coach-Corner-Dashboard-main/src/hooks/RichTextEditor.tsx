"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";


type Props = {
  type?: "mini" | "half" | "full";
  value: string;
  onChange: (value: string) => void;
};

const formats = [
  "background",
  "bold",
  "color",
  "font",
  "code",
  "italic",
  "link",
  "size",
  "strike",
  "script",
  "underline",
  "blockquote",
  "header",
  "indent",
  "list",
  "align",
  "direction",
  "code-block",
  "formula",
  "image",
  "video",
];

const RichTextEditor = ({ type = "full", value, onChange }: Props) => {
  const [newValue, setNewValue] = useState<any>("");
  const [open, setOpen] = useState(false);
  const reactQuillRef: any = useRef(null);
  const handlePopupClose = () => {
    setOpen(!open);
  };
  const handleChange = (content: string) => {
    onChange(content);
    setNewValue(content);
  };
  const insertImageAtCursor = (imageUrl: string) => {
    if (reactQuillRef?.current) {
      const editor = reactQuillRef?.current?.getEditor();
      const range = editor?.getSelection(); // Get the current selection/cursor position
      if (range) {
        // If there is a current selection (range), we can insert the image
        editor.insertEmbed(range?.index, "image", imageUrl);
      } else {
        // Optionally handle the case where there is no cursor in the editor or it is not focused
        console.log(
          "Editor is not focused or cursor position is not available."
        );
      }
    }
  };
  const handleMediaChange = async (value: string[]) => {
    if (value && value?.length > 0) {
      value?.forEach((value) => {
        insertImageAtCursor(value);
      });
    }
  };

  useEffect(() => {
    setNewValue(value);
  }, [value]);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],

          [{ color: [] }, { background: [] }],
          ["link", "image", "video"],
          ["clean"],
          [{ align: [] }],
        ],
        handlers: {
          image: () => handlePopupClose(),
        },
      },
    }),
    []
  );
  const miniModules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
        ],
      },
    }),
    []
  );
  return (
    <>
      <ReactQuill
        theme="snow"
        defaultValue={value}
        value={newValue}
        onChange={handleChange}
        formats={formats}
        ref={reactQuillRef}
        modules={type == "mini" ? miniModules : modules}
        className="block mb-3"
      />
    </>
  );
};

export default RichTextEditor;