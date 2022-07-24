import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Container from "../../components/Container";
import ListView from "../../components/ListView";
import baseAxios from "../../utils/axios";

function Courses() {
  const [forceRefetch, setForceRefetch] = useState(0);
  const navigate = useNavigate();

  const actions = [
    {
      label: "Edit",
      onClick: (courses) => navigate(`/courses/${courses.id}`),
    },
    {
      label: "Remove",
      onClick: (courses) =>
        baseAxios
          .delete(`/courses/${courses.id}`)
          .then(() => {
            toast.success(`Course ${courses.name} removed with success`);
            setForceRefetch(new Date().getTime())
          })
          .catch(() =>
            toast.error(`Course ${courses.name} failed to remove`)
          ),
    },
  ];

  return (
    <Container title="Courses">
      <ListView
        addButton={
          <Link className="btn btn-primary float-right" to="/courses/new">
            Add Courses
          </Link>
        }
        actions={actions}
        columns={[
          {
            key: "id",
            label: "ID",
          },
          {
            key: "name",
            label: "Name",
          },
        ]}
        endpoint="/courses"
        forceRefetch={forceRefetch}
      />
    </Container>
  );
}

export default Courses;
