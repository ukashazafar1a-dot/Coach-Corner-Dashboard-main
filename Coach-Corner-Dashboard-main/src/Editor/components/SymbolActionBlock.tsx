import IconSymbolArrowUp from "@/components/icons/editor/IconSymbolArrowUp";
import IconSymbolArrowUpLeft from "@/components/icons/editor/IconSymbolArrowUpLeft";
import IconSymbolArrowUpRight from "@/components/icons/editor/IconSymbolArrowUpRight";
import IconSymbolAstrick from "@/components/icons/editor/IconSymbolAstrick";
import IconSymbolBall from "@/components/icons/editor/IconSymbolBall";
import IconSymbolDollar from "@/components/icons/editor/IconSymbolDollar";
import IconSymbolDown from "@/components/icons/editor/IconSymbolDown";
import IconSymbolExclamination from "@/components/icons/editor/IconSymbolExclamination";
import IconSymbolFlag from "@/components/icons/editor/IconSymbolFlag";
import IconSymbolRight from "@/components/icons/editor/IconSymbolRight";
import IconSymbolRightDown from "@/components/icons/editor/IconSymbolRightDown";
import IconSymbolRightF from "@/components/icons/editor/IconSymbolRightF";
import IconSymbolRightGo from "@/components/icons/editor/IconSymbolRightGo";
import IconSymbolStar from "@/components/icons/editor/IconSymbolStar";
import IconSymbolVlc from "@/components/icons/editor/IconSymbolVlc";
import React from "react";

const SymbolActionBlock = () => {
  return (
    <div className="drawer-item pb-3 md:p-4 basis-full">
      <div className="drawer-subitem">
        <div className="drawer-subitem-items flex flex-wrap justify-center  xl:justify-start gap-3">
          <button type="button" className="symbol-button p-2 border border-gray-200 rounded hover:border-gray-400">
            <IconSymbolVlc />
          </button>
          <button type="button" className="symbol-button p-2 border border-gray-200 rounded hover:border-gray-400">
            <IconSymbolAstrick />
          </button>
          <button type="button" className="symbol-button p-2 border border-gray-200 rounded hover:border-gray-400">
            <IconSymbolDollar />
          </button>
          <button type="button" className="symbol-button p-2 border border-gray-200 rounded hover:border-gray-400">
            <IconSymbolExclamination />
          </button>
          <button type="button" className="symbol-button p-2 border border-gray-200 rounded hover:border-gray-400">
            <IconSymbolFlag />
          </button>
          <button type="button" className="symbol-button p-2 border border-gray-200 rounded hover:border-gray-400">
            <IconSymbolBall />
          </button>
          <button type="button" className="symbol-button p-2 border border-gray-200 rounded hover:border-gray-400">
            <IconSymbolStar />
          </button>
          <button type="button" className="symbol-button p-2 border border-gray-200 rounded hover:border-gray-400">
            <IconSymbolDown />
          </button>
          <button type="button" className="symbol-button p-2 border border-gray-200 rounded hover:border-gray-400">
            <IconSymbolArrowUp />
          </button>
          <button type="button" className="symbol-button p-2 border border-gray-200 rounded hover:border-gray-400">
            <IconSymbolRightGo />
          </button>
          <button type="button" className="symbol-button p-2 border border-gray-200 rounded hover:border-gray-400">
            <IconSymbolRightF />
          </button>
          <button type="button" className="symbol-button p-2 border border-gray-200 rounded hover:border-gray-400">
            <IconSymbolRight />
          </button>
          <button type="button" className="symbol-button p-2 border border-gray-200 rounded hover:border-gray-400">
            <IconSymbolRightDown />
          </button>
         
          <button type="button" className="symbol-button p-2 border border-gray-200 rounded hover:border-gray-400">
            <IconSymbolArrowUpLeft />
          </button>
          <button type="button" className="symbol-button p-2 border border-gray-200 rounded hover:border-gray-400">
            <IconSymbolArrowUpRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SymbolActionBlock;
