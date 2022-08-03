import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import Container from "../../components/Container";
import ListView from "../../components/ListView";
import baseAxios from "../../utils/axios";

const Allocation = () => {
  const [forceRefetch, setForceRefetch] = useState(0);
  const navigate = useNavigate();

  const actions = [
    {
      label: "Edit",
      onClick: (allocation) => navigate(`/allocation/${allocation.id}`),
    },
    {
      label: "Remove",
      onClick: (allocation) =>
        baseAxios
          .delete(`/allocations/${allocation.id}`)
          .then(() => {
            toast.success(`Allocation ${allocation.id} removed with success`);
            setForceRefetch(new Date().getTime());
          })
          .catch(() =>
            toast.error(`Allocation ${allocation.id} failed to remove`)
          ),
    },
  ];

  return (
    <Container title="Allocation">
      <ListView
        addButton={
          <Link className="btn btn-primary float-right" to="/allocation/new">
            Add Allocation
          </Link>
        }
        actions={actions}
        columns={[
          {
            key: "id",
            label: "ID",
          },
          {
            key: "dayOfWeek",
            render: (dayOfWeek) => {
              return <span style={{ color: "blue" }}>{dayOfWeek}</span>;
            },
            label: "Day Of Week",
          },
          {
            key: "startHour",
            label: "Start Hour",
          },
          {
            key: "endHour",
            label: "End Hour",
          },
          {
            key: "course",
            render: (course) => course?.name,
            label: "Course",
          },
          {
            key: "professor",
            render: (professor) => professor?.name,
            label: "Professor",
          },
        ]}
        endpoint="/allocations"
        forceRefetch={forceRefetch}
      />
    </Container>
  );
};

export default Allocation;