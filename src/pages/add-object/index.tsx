import React, { useState } from "react";
import styles from "./styles.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import axios from "axios";
import { useRouter } from "next/router";
import Button from "@/components/Button/Button";
import Cookie from "js-cookie";
import PageTemplate from "@/components/PageTemplate.tsx/PageTemplate";

const AddObject = () => {
  const [isLoading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
  const [photo, setPhoto] = useState("");

  const router = useRouter();

  const [validationError, setValidationError] = useState<string | null>(null);

  const validateForm = () => {
    if (!title || !description || !latitude || !longitude || !photo) {
      alert("All fields are reguired.");
      return false;
    }

    const latitudeRegex = /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$/;
    const longitudeRegex =
      /^-?([1-9]?[0-9]|1[0-7][0-9]|[1-8][0-9]\.{1}\d{1,6}|180\.{1}0{1,6})$/; // Modify as needed

    if (
      !latitudeRegex.test(String(latitude)) ||
      !longitudeRegex.test(String(longitude))
    ) {
      alert("Invalid latitude or longitude");
      return false;
    }

    const photoUrlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!photoUrlRegex.test(photo)) {
      alert("Invalid photo URL");
      return false;
    }

    setValidationError(null);
    return true;
  };

  const onAddObject = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const object = {
      title: title,
      description: description,
      latitude: latitude,
      longitude: longitude,
      photo_url: photo,
    };

    const headers = {
      authorization: Cookie.get("jwt_token"),
    };

    const response = await axios.post("http://localhost:3001/objects", object, {
      headers,
    });

    setLoading(false);

    if (response.status === 200) {
      setTimeout(() => {
        router.push("/");
      }, 5000);
    }
  };

  return (
    <div>
      <PageTemplate>
        <div className={styles.formWrapper}>
          <h1 className={styles.formTitle}>Add Location:</h1>

          <div className={styles.form}>
            <label className={styles.label}>Add title:</label>
            <input
              className={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label className={styles.label}>Add description:</label>
            <textarea
              className={styles.textarea}
              name="textarea"
              id="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <label className={styles.label}>Add latitude:</label>
            <input
              className={styles.input}
              value={latitude}
              onChange={(e) => {
                const number = Number(e.target.value);
                setLatitude(number);
              }}
            />

            <label className={styles.label}>Add longitude:</label>
            <input
              className={styles.input}
              value={longitude}
              onChange={(e) => {
                const number = Number(e.target.value);
                setLongitude(number);
              }}
            />

            <label className={styles.label}>Add photo url:</label>
            <input
              className={styles.input}
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
            />

            {validationError && (
              <p className={styles.validationError}>{validationError}</p>
            )}

            <Button
              className={styles.button}
              onClick={onAddObject}
              isLoading={isLoading}
              text="Add Object"
            />
          </div>
        </div>
      </PageTemplate>
    </div>
  );
};

export default AddObject;
