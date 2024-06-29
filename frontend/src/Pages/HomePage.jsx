import React from "react";
import SearchBox from "../Components/SearchBox";

function HomePage() {
  return (
    <>
      <div>HomePage</div>
      {window.localStorage.getItem("user") === null && <SearchBox />}
    </>
  );
}

export default HomePage;
