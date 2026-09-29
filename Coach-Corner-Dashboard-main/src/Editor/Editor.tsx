import React from "react";
import dynamic from "next/dynamic";

const DynamicPlayEditor = dynamic(() => import("./components/PlayEditor"), {
  ssr: false,
});

const Editor = () => {
  return <DynamicPlayEditor />;
};

export default Editor;
