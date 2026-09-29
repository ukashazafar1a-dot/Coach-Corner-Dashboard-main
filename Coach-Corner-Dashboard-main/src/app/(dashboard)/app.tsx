"use client";
import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import useApp from "@/context/useApp";
import TokenExpiry from "./TokenExpiry";
import PageLoader from "@/components/loaders/PageLoader";


export default function App({ children }: { children: React.ReactNode }) {
  const { isLoading } = useApp();
  return (
      <div className="app-wrapper">
        {isLoading ? (
          <PageLoader />
        ) : (
          <>
            <Header />
            <div className="page-transition">
              <Sidebar />
              <div className="main--content-inner">{children}</div>
            </div>
          </>
        )}
        <TokenExpiry />
      </div>
  );
}
