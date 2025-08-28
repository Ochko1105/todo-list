"use client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  Inputfield,
  Toggle,
  Characterfield,
  Todo,
  Changecolor,
  Filtersearch,
  Dragandrop,
} from "@/components";

const Home = () => {
  const [lists, setLists] = useState([]);
  const [inputvalue, setInputvalue] = useState("");
  const handleonchange = (event) => {
    setInputvalue(event.target.value);
  };
  const handleonclick = () => {
    const newlist = [
      ...lists,
      { title: inputvalue, isDone: false, id: uuidv4() },
    ];
    setLists(newlist);
    setInputvalue("");
  };
  const handleoncheck = (event) => {
    setLists((prev) =>
      prev.map((element) => {
        if (element.id === lists.id) {
          element.isDone = event.target.checked;
        }
        return element;
      })
    );
  };
  return (
    <div>
      <div>
        <input type="text" value={inputvalue} onChange={handleonchange} />
        <button onClick={handleonclick}>Add</button>
      </div>
      <div>
        {lists.map((list) => (
          <div key={list.id} className="text-white flex gap-4">
            <input
              key={list.id}
              onChange={handleoncheck}
              checked={list.isDone}
              type="checkbox"
            />
            <div>{list.title}</div>
            {list.isDone && (
              <button className="text-white bg-red-500">delete</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
