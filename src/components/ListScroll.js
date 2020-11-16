import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
import "./ListScroll.css"


const ListScroll = (props) => {

  const { result } = props
  const useKeyPress = function (targetKey) {
    const [keyPressed, setKeyPressed] = useState(false);

    function downHandler({ key }) {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    }

    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };

    useEffect(() => {
      window.addEventListener("keydown", downHandler);
      window.addEventListener("keyup", upHandler);

      return () => {
        window.removeEventListener("keydown", downHandler);
        window.removeEventListener("keyup", upHandler);
      };
    });

    return keyPressed;
  };


  const ListItem = ({ item, active, setSelected, setHovered }) => (
    <div
      className={`item ${active ? "active" : ""}`}
      onClick={() => setSelected(item)}
      onMouseEnter={() => setHovered(item)}
      onMouseLeave={() => setHovered(undefined)}
    >

      <img className="gify__image" src={item.images.fixed_height_small.url} />
      <div className="gify__details">
        <h3>{item.title}</h3>
        <button className="button-inp" onClick={() => navigator.clipboard.writeText(item.url)}> Link Copy</button>
        <button className="button-inp" onClick={() => window.location.href = item.url}> Link Redirect </button>
      </div >
    </div >
  );

  const [selected, setSelected] = useState(undefined);
  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");
  const enterPress = useKeyPress("Enter");
  const [cursor, setCursor] = useState(0);
  const [hovered, setHovered] = useState(undefined);

  useEffect(() => {
    if (result.length && downPress) {
      setCursor(prevState =>
        prevState < result
          .length - 1 ? prevState + 1 : prevState
      );
    }
  }, [downPress], result);
  useEffect(() => {
    if (result.length && upPress) {
      setCursor(prevState => (prevState > 0 ? prevState - 1 : prevState));
    }
  }, [upPress], result);
  useEffect(() => {
    if (result.length && enterPress) {
      setSelected(result[cursor]);
    }
  }, [cursor, enterPress, result]);
  useEffect(() => {
    if (result.length && hovered) {
      setCursor(result.indexOf(hovered));
    }
  }, [hovered, result]);

  return (
    <div>

      {/* <span>Selected: {selected ? selected.name : "none"}</span> */}
      {result.map((item, i) => (
        <ListItem
          key={item.id}
          active={i === cursor}
          item={item}
          setSelected={setSelected}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
};


export default ListScroll