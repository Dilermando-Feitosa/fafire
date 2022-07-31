import Container from "../../components/Container"
import {Form, Button} from 'react-bootstrap'
import axios from '../../utils/axios'
import {toast} from 'react-toastify'
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect } from "react"

const CourseForm = () => {
    const [courses, setCourses] = useState({
        name: ''
    });
    const navigate = useNavigate();
    const {id} = useParams()

    const isNew = id === "new";

    useEffect(() => {
        if (!isNew) {
            axios.get(`/courses/${id}`)
            .then((response) => setCourses(response.data))
            .catch(console.error)
        }
    }, [])

    const onChange = ({target:{name, value}}) => {
        setCourses({
            ...courses,
            [name]: value
        })
    }

    const onSave = async () => {
        const form = {
            name: courses.name
        }

        try {
            if (isNew) {
                await axios.post('/courses', form);
            } else {
                await axios.put(`/courses/${id}`, form)
            }

            toast.success("Course Saved")
            navigate("/course");
        } catch (error) {
            console.error(error)
            toast.error("Error to Save Course")
        }
    }

    return (
        <Container title={`${isNew ? "Create" : "Update"} Course`}>
           <Form>
            <Form.Group className="mb-4">
                <label>Name</label>
                <Form.Control 
                    name="name" 
                    onChange={onChange} 
                    value={courses.name} 
                    placeholder="Course Name" />
            </Form.Group>

          <div className="w-100">
            <Button 
                variant="secondary" 
                onClick={() => navigate("/course")}>Cancel
            </Button>
            <Button className="mx-2" onClick={onSave}>Save Course</Button>
          </div>
        </Form>
        </Container>
    )
}

export default CourseForm