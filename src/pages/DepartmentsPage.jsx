import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Button, Link } from 'react-floating-action-button'
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar'


export default function DepartmentsPage() {

  const [depts, setDepts] = useState([])

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/add-department`;
    navigate(path);
  }

  useEffect(() => {
    axios.get('http://localhost:8000/api/departments')
      .then((response) => {
        if (response.status === 200) {
          setDepts(response.data);
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])



  return (
    <div>
      <Navbar></Navbar>
      <div className='container container-fluid'>
      <h3>Departments Page</h3>
      <table  className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Building</th>
            <th scope="col">Budget</th>
          </tr>
        </thead>
        <tbody>

          {depts.map((ele, ind) => <tr>
            <th key={ind} scope="row">{ind + 1}</th>
            <td>{ele.dept_name}</td>
            <td>{ele.building}</td>
            <td>{ele.budget}</td>
          </tr>)}

        </tbody>
      </table>
      <Container>
        <Button
          tooltip="Click here to add department"
          icon="fa fa-plus"
          rotate={true}
          onClick={routeChange}
        />
      </Container>
    </div>
    </div>
  )
}
