import { Button } from "./input";

export const RenderTask = ({ itemListData, setItemListData, displayList }) => {
  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete ?");
    confirm &&
      setItemListData((items) =>
        items.filter((item) => (id === item.id ? !item.id : item))
      );
  };

  const handleChecked = (taskId, checked) => {
    setItemListData((items) =>
      items.map((item) =>
        item.id === taskId ? { ...item, isChecked: checked } : item
      )
    );
  };

  const handleDeleteAll = () => {
    const confirm = window.confirm("Are you sure you want to delete All");
    confirm && setItemListData([]);
  };

  const handleDeleteAllSort = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete all completed task "
    );
    confirm &&
      setItemListData((item) =>
        item.filter((filteredItem) => !filteredItem.isChecked)
      );
  };

  return (
    <ul>
      <h1 className='body-heading'>My Task</h1>
      {displayList.map((taskItem) => (
        <TaskList
          taskItem={taskItem}
          key={taskItem.id}
          onChecked={handleChecked}
          onDelete={handleDelete}
        />
      ))}
      <div className='render-btn'>
        <div className='delete-render-btn'>
          {itemListData.length > 1 && (
            <Button onDelete={handleDeleteAll}>Clear All</Button>
          )}
        </div>
        <div className='delete-render-btn'>
          {itemListData.some((item) => item.isChecked) && (
            <Button onDelete={handleDeleteAllSort}>Delete All Done Task</Button>
          )}
        </div>
      </div>
    </ul>
  );
};

export const TaskList = ({ taskItem, onChecked, onDelete }) => {
  const handleChecked = (e) => {
    const { checked } = e.target;

    onChecked(taskItem.id, checked);
  };

  return (
    <li>
      <div className={taskItem.isChecked ? "is-checked" : "list-checked"}>
        <div>
          <input
            type='checkbox'
            value={taskItem.isChecked}
            onChange={handleChecked}
            className='checked'
          />
        </div>
        <div>
          <div>
            <strong>Title: {taskItem.title}</strong>
          </div>
          <div>
            <small>Summary: {taskItem.summary}</small>
          </div>
        </div>
      </div>
      <div>
        <button className='btn' onClick={() => onDelete(taskItem.id)}>
          ❌
        </button>
      </div>
    </li>
  );
};
