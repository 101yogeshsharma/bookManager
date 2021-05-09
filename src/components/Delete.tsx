import { Card, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import '../index.css'

const Delete = () => {

    const history = useHistory();

    const [deleteStatus, setStatus] = useState("");

    useEffect(() => {
        if(!localStorage.getItem('token')) {
            history.push('/login')
        }
    }, [])

    const deleteBook = (e: any) => {
        e.preventDefault();

        const keyword = {
            title: e.target.keyword.value
        }

        let token = localStorage.getItem('token')!
        console.log(token);

        fetch('http://localhost:4000/bookManager/deleteBook/', {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                "auth" : token,
                "content-type": "application/json"
            },
            body: JSON.stringify(keyword)
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    if (data.status === true)
                        setStatus("Successfully Deleted");
                    else if (data.status === false)
                        window.location.assign('/login')
                } else {
                    setStatus("Unable to Delete Book");
                }
            })
            .catch(err => {
                history.push('/login')
            })

    }
    return (
        <Form onSubmit={e => deleteBook(e)}>
            <Card className="text-center" id="card">
                <Card.Header as="h5">Delete Book</Card.Header>
                <Card.Body>
                    <Card.Title>Enter Book Name</Card.Title>
                    <Form.Control type="text" id="keyword" />
                    <Button className="btn btn-primary m-lg-4" type="submit">Delete Book</Button>
                    <Card.Text>{deleteStatus}</Card.Text>
                </Card.Body>
            </Card>
        </Form>
    )
}

export default Delete;