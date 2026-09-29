"use client";
import React, { useEffect } from "react";

function PlayEditor() {
  useEffect(() => {
    const libraryScript = document.createElement("script");
    const appScript = document.createElement("script");
    const paperScript = document.createElement("script");
    libraryScript.src = "/js/paper.js";
    appScript.src = "/editor/chunk-vendors.js";
    paperScript.src = "/js/paperScript.js";
    paperScript.defer = true;
    paperScript.type = "text/paperscript";
    paperScript.setAttribute("canvas", "play-canvas-frame-1");
    document.body.appendChild(appScript);
    // document.body.appendChild(libraryScript);
    // document.body.appendChild(paperScript);
  }, []);
  return (
    <>
      {/* <Script src="/js/paper.js" type="text/JavaScript"/> */}
      {/* <Script type="text/paperscript" canvas="play-canvas-frame-1" src="/js/paperScript.js"/> */}
      {/* <Script src="/editor/js/app.js" defer/> */}
      {/* <Script src="/editor/chunk-vendors.js"/> */}
      <div id="app"></div>
    </>
  );
}

export default PlayEditor;
