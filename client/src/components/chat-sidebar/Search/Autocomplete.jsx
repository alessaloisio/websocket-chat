import React from "react";

const Autocomplete = props => {
  const { data, handleElement } = props;

  return (
    <div className="autocomplete">
      {Object.keys(data).map(key => {
        if (data[key].length > 0) {
          return (
            <>
              <span className="title">{key}</span>
              <ul className={key}>
                {data[key].map(element => (
                  <li
                    key={element._id}
                    onClick={() => handleElement(`${element._id}`)}
                  >
                    <img src={element.info.avatar} alt="Avatar" />
                    <p>{element.info.name}</p>
                  </li>
                ))}
              </ul>
            </>
          );
        }
      })}
    </div>
  );
};

export default Autocomplete;
