import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="flex justify-between p-3 bg-gray-600">
        <div className="font-bold">&lt;PassOp./&gt;</div>
        <ul className="flex gap-6">
          <li className="cursor-pointer font-bold">Home</li>
          <li className="cursor-pointer font-bold">About</li>
          <li className="cursor-pointer font-bold">Contact</li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
