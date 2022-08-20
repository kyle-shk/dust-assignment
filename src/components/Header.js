import React, { useState } from "react";

const Header = () => {
  const [data, setData] = useState();
  return (
    <header>
      <select>
        <option value="1">1</option>
        <option value="2">2</option>
      </select>
    </header>
  );
};

export default Header;
