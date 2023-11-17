import { useEffect, useState } from "react";
import { Input } from "./input";
import { RenderTask } from "./task";

export const App = () => {
  const savedData = localStorage.getItem("myAppData");
  const [sort, setSort] = useState("input");
  const [itemListData, setItemListData] = useState(JSON.parse(savedData) || []);
  const [inputItems, setInputItems] = useState({
    title: "",
    summary: "",
  });

  useEffect(() => {
    localStorage.setItem("myAppData", JSON.stringify(itemListData));
  }, [itemListData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = crypto.randomUUID();
    const newObject = {
      title: inputItems.title,
      summary: inputItems.summary,
      id: id,
      isChecked: false,
    };
    inputItems.title &&
      inputItems.summary &&
      setItemListData((prevData) => [...prevData, newObject]);

    setInputItems((prev) => ({
      title: "",
      summary: "",
    }));
  };

  const handleOnchnage = (e) => {
    const { value } = e.target;
    setSort(value);
  };

  let displayList;
  const copy = [...itemListData];

  if (sort === "input") displayList = itemListData;
  if (sort === "descriptin")
    displayList = copy.sort((a, b) => a.title.localeCompare(b.title));
  if (sort === "isDone")
    displayList = copy.sort((a, b) => b.isChecked - a.isChecked);

  return (
    <div>
      <header className='header'>
        <h1 className='header-h1'>Organizers</h1>
        <select value={sort} onChange={handleOnchnage}>
          <option value='input'>Sort By Input</option>
          <option value='descriptin'>Sort By Description</option>
          <option value='isDone'>Sort By Task Done</option>
        </select>
      </header>
      <div className='app'>
        <div className='side-bar'>
          <Input
            inputItems={inputItems}
            setInputItems={setInputItems}
            handleSubmit={handleSubmit}
          />
        </div>
        <div className='main-page'>
          <RenderTask
            itemListData={itemListData}
            setItemListData={setItemListData}
            displayList={displayList}
            sort={sort}
            handleOnchnage={handleOnchnage}
          />
        </div>
      </div>
    </div>
  );
};
