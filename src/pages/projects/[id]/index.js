import React, { useState } from "react";
import { useRouter } from "next/router";
import { Confirm, Button, Loader, Grid, Image } from "semantic-ui-react";
import Error from "next/error";
import { API_URL } from "utils/url";
import { map } from "lodash";
import style from "./Project.module.css";
import Carousels from "../Carousels";
const Project = ({ data, error }) => {
  const { back_technologies, description, front_technologies, title, images } =
    data[0];
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { query, push } = useRouter();
  const deleteProject = async () => {
    const { id } = query;
    try {
      await fetch(`${API_URL}/api/projects/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const open = () => setConfirm(true);
  const close = () => setConfirm(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteProject();
    push("/");
    close();
  };

  if (error && error.statusCode)
    return <Error statusCode={error.statusCode} title={error.statusText} />;

  return (
    <>
      <div
        style={{
          margin: "20px",
          backgroundColor: "rgba(0,0,0,0.5)",
          padding: "20px",
        }}
        className="transparente animate__animated animate__fadeIn"
      >
        <p className="center">
          {" "}
          <strong> {title}</strong>
        </p>
        <p>
          <strong>Tecnologías utilizadas:</strong>
        </p>
        <p>
          <strong>Frontend:</strong> {front_technologies}
        </p>
        <p>
          <strong>Backend:</strong> {back_technologies}
        </p>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>

      <div className="transparente animate__animated animate__fadeIn">
        <div className="galeria">
          <Carousels images={images} />
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`${API_URL}/api/projects/${id}`);

  if (res.status === 200) {
    const data = await res.json();

    return {
      props: {
        data,
      },
    };
  }

  return {
    props: {
      error: {
        statusCode: res.status,
        statusText: "Invalid Id",
      },
    },
  };
}

export default Project;