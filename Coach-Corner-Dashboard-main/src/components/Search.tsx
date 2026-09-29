import React from "react";
import SearchIcon from "./icons/SearchIcon";
import CloseIcon from "./icons/CloseIcon";

const Search = ({ open, handleToggleSearch }: any) => {
  return (
    <div
      className={` ${
        open
          ? "gap-2 overflow-hidden absolute inset-0 mobileSearch w-full flex items-center justify-center bg-white bg-opacity-90  z-50 px-2"
          : "lg:flex hidden flex-1 items-center justify-center overflow-hidden "
      }`}
    >
      <form
        action=""
        className="bg-themeSecondary rounded-full overflow-hidden items-center border border-white border-opacity-40 py-1 w-96 px-4 flex gap-2  "
      >
        <SearchIcon />
        <input
          type="text "
          name="search"
          id="search"
          placeholder="Search by team members, group..."
          className="border-0 input--field py-1 px-2 text-white w-full outline-none focus:outline-none placeholder:text-white/70"
        />
      </form>

      {open && (
        <div className="text-white text-xl" onClick={handleToggleSearch}>
          <CloseIcon classes="text-black fill-black stroke-black" />
        </div>
      )}
    </div>
  );
};

export default Search;
