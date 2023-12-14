import React from "react";
import styles from "./styles.module.css";
import Object from "../Object/Object";

type ObjectsType = {
  objects: Array<any> | null;
};

const Objects: React.FC<ObjectsType> = ({ objects }) => {
  return (
    <div className={styles.wrapper}>
      {objects &&
        objects.map((object) => (
          <div key={object._id}>
            <Object object={object} />
          </div>
        ))}
    </div>
  );
};

export default Objects;
