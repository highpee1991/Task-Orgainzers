import React from "react";

export const Input = ({ inputItems, setInputItems, handleSubmit, warning }) => {
  const handleOnchange = (e) => {
    const { value, name } = e.target;

    setInputItems((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <input
        type='text'
        onChange={handleOnchange}
        name='title'
        value={inputItems.title}
        placeholder='Title'
        required
      />
      <input
        type='text'
        onChange={handleOnchange}
        name='summary'
        value={inputItems.summary}
        placeholder='Summary'
        required
      />
      <Button>Submit</Button>
    </form>
  );
};

export const Button = ({ children, onDelete }) => {
  return (
    <button className='button' onClick={onDelete}>
      {children}
    </button>
  );
};
