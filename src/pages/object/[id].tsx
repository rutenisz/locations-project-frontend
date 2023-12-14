import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookie from "js-cookie";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "./styles.module.css";
import PageTemplate from "@/components/PageTemplate.tsx/PageTemplate";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";

type ObjectType = {
  _id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  photo_url: string;
};

const Object = () => {
  const [object, setObject] = useState<ObjectType | null>(null);
  const [isShowConfirmModal, setShowConfirmModal] = useState(false);

  const router = useRouter();

  const fetchObject = async (id: string) => {
    const object = await axios.get(`http://localhost:3001/objects/${id}`);

    setObject(object.data.object);
    console.log(object.data.object);
  };

  useEffect(() => {
    router.query.id && fetchObject(router.query.id as string);
  }, [router.query.id]);

  const onDeleteObject = async () => {
    const headers = {
      authorization: Cookie.get("jwt_token"),
    };

    const response = await axios.delete(
      `http://localhost:3001/objects/${router.query.id}`,
      {
        headers,
      }
    );

    if (response.status === 200) {
      router.push("/");
    }

    console.log(response);
  };

  return (
    <div>
      <PageTemplate>
        {object && (
          <div className={styles.object}>
            <h1 className={styles.title}>{object.title}</h1>
            <div>
              {object.latitude}
              <span>°</span> {object.longitude}
              <span>°</span>
            </div>
            <img src={object.photo_url} />
            <div>{object.description}</div>
            <Button
              className={styles.button}
              text="Delete Object"
              onClick={() => setShowConfirmModal(true)}
              isLoading={false}
            />
          </div>
        )}
        {isShowConfirmModal && (
          <Modal
            onConfirm={onDeleteObject}
            onCancel={() => setShowConfirmModal(false)}
          />
        )}
      </PageTemplate>
    </div>
  );
};

export default Object;

//  <div className={styles.wrapper}>
// <img className={styles.photo} src={object.photo_url} />
//<div className={styles.cardTextContent}>
// <div>{object.title}</div>
//<div>{object.description}</div>
//<div className={styles.coordinates}>
//{object.latitude}
//<span>°</span> {object.longitude}
//<span>°</span>
//</div>
//</div>
//</div>
