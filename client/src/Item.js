import React from "react";
import { useState } from "react";

const Item = ({ item, handleDelete, handleUpdate }) => {
  //state for delete comment if we delete an item
  const [deleteComment, setDeletedComment] = useState("");

  return (
    <div>
      <h2>{item.name}</h2>
      <p>{"$" + item.price}</p>
      <p>{"Qty: " + item.quantity}</p>
      <p>{"Located: " + item.location}</p>
      <button onClick={() => handleUpdate(item.id)}>Update</button>
      <form>
        {" "}
        {/* Delete comment */}
        <input
          type="text"
          value={deleteComment}
          placeholder="Deletion Comment"
          onChange={(e) => setDeletedComment(e.target.value)}
        />
        <button onClick={() => handleDelete(item.id, deleteComment)}>
          Delete
        </button>
      </form>
    </div>
  );
};

export default Item;
