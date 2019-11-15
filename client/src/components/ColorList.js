import React, { useState } from "react";
import axios from "axios";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const axiosWithAuth = () => {
  return axios.create({
    headers: {
      authorization: localStorage.getItem('token')
    }
  })
}

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth().put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      updateColors(res.data)
    })
    .catch(err => {
      console.error(err);
    })
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = color => {
    console.log(color);
    axiosWithAuth().delete(`http://localhost:5000/api/colors/${color.id}`)
    .then(res => {
      console.log(res);
      updateColors(res.data)
    })
    .catch(err => {
      console.error(err);
    })
  };

  const addColor = e => {
    e.preventDefault();
    axiosWithAuth().post(`http://localhost:5000/api/colors`, colorToAdd)
    .then(res => {
      console.log(res);
      updateColors(res.data);
    })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              name='name'
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              name='code'
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {/* add color code here */}
            <form onSubmit={addColor}>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToAdd({ ...colorToAdd, color: e.target.value })
              }
              name='name'
              value={colorToAdd.color}
            />
                      <label>
            hex code:
            <input
              onChange={e =>
                setColorToAdd({
                  ...colorToAdd,
                  code: { hex: e.target.value }
                })
              }
              name='code'
              value={colorToAdd.code.hex}
            />
          </label>
          <br/>
          <div className="button-row">
            <button type="submit">Add</button>
          </div>
          </label>
      </form>
      <div className="spacer" />
    </div>
  );
};

export default ColorList;
