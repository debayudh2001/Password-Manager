import React from "react";
import { useState, useEffect, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArr, setPasswordArr] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArr(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    passwordRef.current.type = "text";
  };

  const savePassword = () => {
    setPasswordArr([...passwordArr, { ...form, id: uuidv4() }]);
    localStorage.setItem(
      "passwords",
      JSON.stringify([...passwordArr, { ...form, id: uuidv4() }])
    );
    setForm({ site: "", username: "", password: "" });
  };

  const deletePassword = (id) => {
    setPasswordArr(passwordArr.filter((item) => item.id !== id));
    localStorage.setItem(
      "passwords",
      JSON.stringify(passwordArr.filter((item) => item.id !== id))
    );
  };

  const editPassword = (id) => {
    setForm(passwordArr.filter((item) => item.id === id)[0]);
    setPasswordArr(passwordArr.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="bg-gray-800 w-[100%] min-h-[87.9vh] flex flex-col items-center p-2 gap-4">
        <h1 className="text-gray-400 font-semibold">
          PassOp&nbsp; - &nbsp;Your own password manager.
        </h1>
        <div className="flex flex-col w-1/2 gap-4 items-center">
          <input
            placeholder="Enter website URL"
            type="text"
            value={form.site}
            name="site"
            onChange={handleChange}
            className="rounded-full w-[70%] px-2 py-1 border-4 border-black outline-none"
          ></input>
          <div className="flex gap-4 w-full items-center">
            <input
              placeholder="Enter Username"
              type="text"
              value={form.username}
              name="username"
              onChange={handleChange}
              className="w-1/2 rounded-full px-2 py-1 border-4 border-black outline-none"
            ></input>
            <input
              ref={passwordRef}
              placeholder="Enter Password"
              type="password"
              value={form.password}
              name="password"
              onChange={handleChange}
              className="w-1/2 rounded-full px-2 py-1 border-4 border-black outline-none"
            ></input>
            <span
              className="material-symbols-outlined text-gray-400 cursor-pointer"
              onClick={showPassword}
            >
              visibility
            </span>
          </div>
          <button
            className="flex gap-2 items-center bg-gray-600 w-fit font-bold rounded-full px-4 py-2 border-[3px] border-black"
            onClick={savePassword}
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
        <h2 className="font-bold text-gray-400 p-2 text-xl">Your Passwords:</h2>
        {passwordArr.length === 0 && (
          <div className="text-gray-400">No passwords to show.</div>
        )}
        {passwordArr.length != 0 && (
          <table className="table-fixed w-[90%] rounded-xl overflow-hidden my-2 md:w-1/2">
            <thead className="bg-gray-700">
              <tr>
                <th className="py-2">Site</th>
                <th className="py-2">Username</th>
                <th className="py-2">Password</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-500">
              {passwordArr.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className=" text-center py-1 font-semibold">
                      <a href={item.site} target="_blanck">
                        {item.site}
                      </a>
                    </td>
                    <td className=" text-center py-1">{item.username}</td>
                    <td className="py-1 text-center">{item.password}</td>
                    <td className="py-1 flex justify-center gap-[7px]">
                      <span
                        className="cursor-pointer"
                        onClick={() => deletePassword(item.id)}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/skkahier.json"
                          trigger="hover"
                          style={{ width: "25px", height: "25px" }}
                        ></lord-icon>
                      </span>
                      <span
                        className="cursor-pointer"
                        onClick={() => editPassword(item.id)}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/wkvacbiw.json"
                          trigger="hover"
                          style={{ width: "25px", height: "25px" }}
                        ></lord-icon>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Manager;
