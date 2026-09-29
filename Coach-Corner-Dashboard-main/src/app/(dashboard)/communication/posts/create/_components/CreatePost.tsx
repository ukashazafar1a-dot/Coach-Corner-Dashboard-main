import React from "react";
import CreatePostForm from "./CreatePostForm";
import TopBar from "@/components/TopBar";

type Props = {};

function CreatePost({}: Props) {
  return (
    <>
      <TopBar title="Create New Post" />
      <div className="my-6">
        <CreatePostForm />
      </div>
    </>
  );
}

export default CreatePost;
