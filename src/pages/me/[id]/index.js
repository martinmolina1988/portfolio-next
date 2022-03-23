import React, { useState } from "react";
import { useRouter } from "next/router";
import { Confirm, Button, Loader, Grid } from "semantic-ui-react";
import Error from "next/error";
import { API_URL } from "utils/url";

const Project = ({ data, error }) => {
  const nameEndpoint = "me";
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { query, push } = useRouter();

  const deleteProject = async () => {
    const { id } = query;
    try {
      await fetch(`${API_URL}/api/${nameEndpoint}/${id}`, {
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
    <Grid
      centered
      verticalAlign="middle"
      columns="1"
      style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>{data.name}</h1>
          <p>{data.description}</p>
          <div>
            <Button color="red" onClick={open} loading={isDeleting}>
              Delete
            </Button>
          </div>
        </Grid.Column>
      </Grid.Row>

      {/* Confirm modal */}
      <Confirm
        content={`Are you sure to delete the task ${task._id}`}
        header="Please confirm"
        open={confirm}
        onConfirm={handleDelete}
        onCancel={close}
      />
    </Grid>
  );
};

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`${API_URL}/api/${nameEndpoint}/${id}`);

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
