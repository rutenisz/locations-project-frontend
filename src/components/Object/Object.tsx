import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";

type ObjectType = {
  _id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  photo_url: string;
};

type ObjectComponentType = {
  object: ObjectType;
};

const Object: React.FC<ObjectComponentType> = ({ object }) => {
  return (
    <Link className={styles.link} href={`/object/${object._id}`}>
      <div className={styles.wrapper}>
        <img className={styles.photo} src={object.photo_url} />
        <div className={styles.cardTextContent}>
          <div>{object.title}</div>
          <div>{object.description}</div>
          <div className={styles.coordinates}>
            {object.latitude}
            <span>°</span> {object.longitude}
            <span>°</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Object;
