"use client";
import React from "react";
import Header from "@/components/Header";
import SectionLoader from "@/components/loaders/SectionLoader";
import useApp from "@/context/useApp";
import EditorSidebar from "@/Editor/components/EditorSidebar";
import { EditorProvider } from "@/context/EditorProvider";

export default function App({ children }: { children: React.ReactNode }) {
  const { isLoading } = useApp();
  return (
    <EditorProvider>
      <div className="app-wrapper">
        {isLoading ? (
          <SectionLoader />
        ) : (
          <>
            <Header />
            <div className="editor-main-layout">
              <EditorSidebar />
              <div className="editor--content-inner">{children}</div>
            </div>
          </>
        )}
      </div>
    </EditorProvider>
  );
}
