import React from "react";
import SearchBox from "../Components/SearchBox";
import Intro from "../Components/Intro";

function HomePage() {
  return (
    <>
      <Intro />
      {window.localStorage.getItem("user") === null && <SearchBox />}
    </>
  );
}

export default HomePage;
