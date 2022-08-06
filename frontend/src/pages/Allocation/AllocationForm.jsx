import Container from "../../components/Container"
import {Form, Button} from 'react-bootstrap'
import axios from '../../utils/axios'
import {toast} from 'react-toastify'
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect } from "react"

const AllocationForm = () => {
    const [professor, setProfessor] = useState([]);
    const [course, setCourse] = useState([]);
 //   const [professor] = useState([]);
 //   const [course] = useState([]);
    const [allocation, setAllocation] = useState({
        dayOfWeek: '',
        startHour: '',
        endHour: '',
        professorId: '',
        courseId: ''
    });
    const navigate = useNavigate();
    const {id} = useParams()

    const isNew = id === "new";

  //  useEffect(() => {
  //      axios.get("/allocations").then((response) => setAllocation(response.data))
  //  }, [])

    useEffect(() => {
        axios.get("/professor").then((response) => setProfessor(response.data))
    }, [])

    useEffect(() => {
        axios.get("/course").then((response) => setCourse(response.data))
    }, [])

    useEffect(() => {
        if (!isNew) {
            axios.get(`/allocations/${id}`)
            .then((response) => setAllocation(response.data))
            .catch(console.error)
        }
    }, [])

    const onChange = ({target:{id, value}}) => {
        setAllocation({
            ...allocation,
            [id]: value
        })
    }

    const onSave = async () => {
        const form = {
            courseId: allocation.courseId,
            professorId: allocation.professorId,
            dayOfWeek: allocation.dayOfWeek,
            startHour: allocation.startHour,
            endHour: allocation.endHour
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
                    value={allocation.dayOfWeek} 
                    placeholder="Day of Week" />
            </Form.Group>

            <Form.Group className="mb-4">
                <label>StartHour</label>
                <Form.Control 
                    name="allocation" 
                    onChange={onChange} 
                    value={allocation.startHour} 
                    placeholder="Start Hour" />
            </Form.Group>

            <Form.Group className="mb-4">
                <label>EndHour</label>
                <Form.Control 
                    name="allocation" 
                    onChange={onChange} 
                    value={allocation.endHour} 
                    placeholder="End Hour" />
            </Form.Group>

            <Form.Group className="mb-4">
                <label>Professor</label>
                <Form.Select
                    name="professorId" 
                    onChange={onChange} 
                    value={allocation.professorId}>
                        <option value="">Select Professor</option>
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
                    value={allocation.courseId}>
                        <option value="">Select Course</option>
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