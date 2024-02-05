import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = () => {
  return (
    <div
      style={{
        backgroundColor: "#D9D9D9",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        gap: "16px",
      }}
    >
      <AiOutlineSearch size="20px" />
      <input
        style={{
          border: "none",
          outline: "none",
          width: "100%",
          backgroundColor: "transparent",
        }}
        placeholder="Buscar..."
      />
    </div>
  );
};

export default SearchBar;
