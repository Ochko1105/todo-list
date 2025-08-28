"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Button, Task } from "@/components";

function Home() {
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("All");
  const [inputValue, setInputValue] = useState("");
  const [draggingItem, setDraggingItem] = useState(null);
  function handleDragOver(index) {
    if (draggingItem === null) return;
    if (draggingItem === index) return;
    const newItems = [...todos];
    const draggingItemValue = newItems[draggingItem];
    newItems.splice(draggingItem, 1);
    newItems.splice(index, 0, draggingItemValue);

    setDraggingItem(index);
    setTodos(newItems);
  }
  function handleDragStart(index) {
    setDraggingItem(index);
  }
  function handleDragEnd() {
    setDraggingItem(null);
  }

  const handleOnchange = (event) => {
    setInputValue(event.target.value);
  };

  const handleOnClick = () => {
    if (inputValue !== "") {
      setTodos([...todos, { title: inputValue, isDone: false, id: uuidv4() }]);
      setInputValue("");
    } else {
      alert("input empty");
    }
  };

  const handlekeydown = (event) => {
    if (event.key === "Enter") {
      if (inputValue !== "") {
        setTodos([
          ...todos,
          { title: inputValue, isDone: false, id: uuidv4() },
        ]);
        setInputValue("");
      } else {
        alert("Ymar negen alert");
      }
    }
  };

  const completedbutton = () => {
    setStatus("Completed");
  };

  const activebutton = () => {
    setStatus("Active");
  };

  const allbutton = () => {
    setStatus("All");
  };

  const Clearcomplete = () => {
    const newtodos = todos.filter((todo) => !todo.isDone);
    setTodos(newtodos);
    alert("alert");
  };

  const filteredData = todos.filter((todo) => {
    if (status === "All") return true;
    if (status === "Active") return !todo.isDone;
    return todo.isDone;
  });

  return (
    <div className=" flex justify-center items-center flex-col pt-15 bg-white h-screen">
      <div className="h-fit w-[400px] bg-white border-3 ">
        <div className="flex justify-center mt-6 text-black font-semibold text-[20px]">
          To-Do List
        </div>
        <div className="flex justify-center gap-[6px] mt-4 ">
          <input
            value={inputValue}
            onChange={handleOnchange}
            onKeyDown={handlekeydown}
            type="text"
            className="border rounded-[6px] border-black w-[280px] text-[#71717A]"
            placeholder=" Add a new task..."
          />

          <Button
            onClick={handleOnClick}
            className="border border-[#E4E4E7] text-[#71717A] bg-[#3C82F6]"
            title="Add"
            setStatus={true}
          />
        </div>
        <div className="flex  gap-[6px] mt-5  w-[32px] ml-4 text-[12px]">
          <Button
            setStatus={status === "All"}
            title="All"
            onClick={allbutton}
            height="32px"
          />
          <Button
            setStatus={status === "Active"}
            title="Active"
            onClick={activebutton}
            height="32px"
          />
          <Button
            setStatus={status === "Completed"}
            title="Completed"
            onClick={completedbutton}
            height="32px"
          />
        </div>

        <div className="px-4 ">
          {filteredData.map((todo, index) => (
            <Task
              id={todo.id}
              todos={todos}
              setTodos={setTodos}
              key={todo.id}
              taskText={todo.title}
              isDone={todo.isDone}
              onDragStart={() => handleDragStart(index)}
              onDragOver={() => handleDragOver(index)}
              onDragEnd={handleDragEnd}
            ></Task>
          ))}
          {todos.length === 0 ? (
            <div className="text-[#6B7280] flex justify-center pt-4 ">
              {" "}
              <p>No tasks yet. Add one above!</p>
            </div>
          ) : (
            ""
          )}
          {todos.isDone === 0 ? (
            <div className="text-[#6B7280] flex justify-center pt-4 ">
              {" "}
              <p>No tasks yet. Add one above!</p>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="flex justify-between px-[20px] mt-5">
          <div className="text-[#6B7280]">
            {todos.filter((todo) => todo.isDone).length} of {todos.length} tasks
            completed
          </div>

          <div className="text-[#EF4444]" onClick={Clearcomplete}>
            Clear completed
          </div>
        </div>
        <div className="text-[12px] flex justify-center p-1 mt-10">
          <p className="text-gray-400">Powered by</p>
          <a className="text-blue-500 pl-1">Pinecone academy</a>
        </div>
      </div>
    </div>
  );
}
export default Home;
