import { useState, useEffect } from "react";
import { Button, Form, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import { API_URL } from "utils/url";
import { map } from "lodash";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { getSession } from "next-auth/react";

const NewExperience = () => {
  const [value, setValue] = useState("");
  const [newData, setNewData] = useState({
    title: "",
    year: "",
    description: "",
  });

  const nameEndpoint = "experience";
  const { query, push } = useRouter();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [width, setWidth] = useState("60%");

  const getData = async () => {
    const res = await fetch(`${API_URL}/api/${nameEndpoint}/` + query.id);
    const data = await res.json();
    setNewData({
      year: data.year,
      title: data.title,
      description: data.description,
    });
  };

  useEffect(() => {
    if (query.id) getData();
    if (window.screen.width > 1000) {
      setWidth("50%");
    } else {
      setWidth("80%");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let err = validate();
    Object.keys(err);
    if (Object.keys(err).length === 0) {
      setIsSubmitting(true);
      if (query.id) {
        await updateForm();
      } else {
        await createForm();
      }

      await push("/");
    }
  };

  const handleChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    var err = {};
    map(newData, (element, index) => {
      if (element === "") {
        err[index] = `${index} is required`;
      }
    });
    setErrors(err);
    return err;
  };

  const createForm = async () => {
    try {
      await fetch(`${API_URL}/api/${nameEndpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
    } catch (error) {
      console.error(error);
    }
  };
  const updateForm = async () => {
    try {
      await fetch(`${API_URL}/api/${nameEndpoint}/` + query.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDescription = async (e) => {
    setValue(e);
    setNewData({ ...newData, description: value });
  };

  return (
    <div className="form-container" style={{ textAlign: "center" }}>
      <h1>{!query.id ? `Create ${nameEndpoint}` : `Update ${nameEndpoint}`}</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {isSubmitting ? (
          <Loader active inline="centered" />
        ) : (
          <Form onSubmit={handleSubmit} style={{ width: width }}>
            {map(newData, (element, index, i) =>
              index !== "description" ? (
                <>
                  <Form.Input
                    key={i}
                    label={index}
                    placeholder={index}
                    name={index}
                    onChange={handleChange}
                    value={element}
                    autoFocus
                  />
                  {
                    <p key={i} style={{ color: "red" }}>
                      {errors[index]}
                    </p>
                  }{" "}
                </>
              ) : (
                <>
                  <p style={{ fontWeight: "bold" }}>{index}</p>
                  <ReactQuill
                    name={index}
                    value={value}
                    onChange={(e) => handleDescription(e)}
                    modules={{
                      toolbar: {
                        container: [
                          [{ header: [1, 2, 3, 4, 5, 6, false] }],
                          ["bold", "italic", "underline"],
                          [{ list: "ordered" }, { list: "bullet" }],
                          [{ align: [] }],
                          ["link", "image"],
                          ["clean"],
                          [{ color: [] }],
                        ],
                      },
                    }}
                    placeholder="Add a description of your event"
                    id="txtDescription"
                  />
                </>
              )
            )}

            <Button type="submit" primary>
              {query.id ? "Update" : "Save"}
            </Button>
          </Form>
        )}
      </div>
    </div>
  );
};

export default NewExperience;
export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session?.user.name !== process.env.NEXT_PUBLIC_NAME_ID) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}
