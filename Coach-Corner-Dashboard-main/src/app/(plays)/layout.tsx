import App from "./app";
import Script from "next/script";
import "../../assets/editor.css";
import "../../../public/editor/chunk-vendors.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard--layout">
      <Script src="/editor/js/acorn.js" />
      {/* <Script src="/js/paper.js" type="text/JavaScript"/>
        <Script type="text/paperscript" canvas="play-canvas-frame-1" strategy="lazyOnload" src="/js/paperScript.js"/> */}
      {/* <Script src="/editor/js/app.js" defer/> */}
      {/* <Script src="/editor/chunk-vendors.js"/> */}
      <App>{children}</App>
    </div>
  );
}
