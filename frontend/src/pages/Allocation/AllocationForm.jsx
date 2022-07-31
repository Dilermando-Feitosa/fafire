import Container from "../../components/Container"
import {Form, Button} from 'react-bootstrap'
import axios from '../../utils/axios'
import {toast} from 'react-toastify'
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect } from "react"

const AllocationForm = () => {
    const [allocations, setAllocations] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [professor, setProfessor] = useState({
        dayOfWeek: '',
        startHour: '',
        endHour: '',
        courseId: '',
        professorId: ''
    });
    const navigate = useNavigate();
    const {id} = useParams()

    const isNew = id === "new";

    useEffect(() => {
        axios.get("/allocations").then((response) => setAllocations(response.data))
    }, [])

    useEffect(() => {
        if (!isNew) {
            axios.get(`/allocations/${id}`)
            .then((response) => setAllocations(response.data))
            .catch(console.error)
        }
    }, [])

    const onChange = ({target:{name, value}}) => {
        setAllocation({
            ...allocation,
            [id]: value
        })
    }

    const onSave = async () => {
        const form = {
            courseId: course.id,
            professorId: professor.id,
            departmentId: professor.departmentId,
            day: allocations.day,
            startHour: allocations.startHour,
            endHour: allocations.endHour
        }

        try {
            if (isNew) {
                await axios.post('/allocations', form);
            } else {
                await axios.put(`/allocations/${id}`, form)
            }

            toast.success("Allocation Saved")
            navigate("/allocation");
        } catch (error) {
            console.error(error)
            toast.error("Error to Save Allocation")
        }
    }

    return (
        <Container title={`${isNew ? "Create" : "Update"} Allocation`}>
           <Form>
            <Form.Group className="mb-4">
                <label>DayOfWeek</label>
                <Form.Control 
                    name="allocation" 
                    onChange={onChange} 
                    value={allocations.day} 
                    placeholder="Day of Week" />
            </Form.Group>

            <Form.Group className="mb-4">
                <label>StartHour</label>
                <Form.Control 
                    name="allocation" 
                    onChange={onChange} 
                    value={allocations.startHour} 
                    placeholder="Start Hour" />
            </Form.Group>

            <Form.Group className="mb-4">
                <label>EndHour</label>
                <Form.Control 
                    name="allocation" 
                    onChange={onChange} 
                    value={allocations.endHour} 
                    placeholder="End Hour" />
            </Form.Group>

            <Form.Group className="mb-4">
                <label>Professor</label>
                <Form.Select
                    name="professorId" 
                    onChange={onChange} 
                    value={allocations.professorId}>
                        <option value="">Select Allocation</option>
                        {professor.map((professor, index) => (
                            <option key={index} value={professor.id}>{professor.name}</option>
                        ))}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
                <label>Course</label>
                <Form.Select
                    name="courseId" 
                    onChange={onChange} 
                    value={allocations.courseId}>
                        <option value="">Select Allocation</option>
                        {course.map((course, index) => (
                            <option key={index} value={course.id}>{course.name}</option>
                        ))}
                </Form.Select>
            </Form.Group>

          <div className="w-100">
            <Button 
                variant="secondary" 
                onClick={() => navigate("/allocation")}>Cancel
            </Button>
            <Button className="mx-2" onClick={onSave}>Save Allocation</Button>
          </div>
        </Form>
        </Container>
    )
}

export default AllocationForm