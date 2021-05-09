import { Form, Modal } from 'react-bootstrap';
import { useState } from 'react';
import '../index.css'
const Login = () => {

    const [login, setLogin] = useState(false);
    // const [info, setInfo] = useState(false);

    const toggleLogin = () => {
        setLogin(login ? false : true);
        if (!login) {
            window.location.assign('/')
        }
    }

    // const showInfo = () => {
    //     setInfo(info ? false : true);
    //     setTimeout( function ()  {console.log("wating")},3000);

    // }

    const loginUser = (e: any) => {

        e.preventDefault();

        const loginData = {
            email: e.target.email.value,
            password: e.target.pass.value
        }

        console.log(DataTransfer);

        fetch('http://localhost:4000/bookManager/login', {
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.token) {
                    let token = data.token
                    localStorage.setItem("token", token);
                    toggleLogin();
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            <Modal id="card" className="modal fade bd-example-modal-xl" aria-labelledby="exampleModalCenterTitle" show={toggleLogin} onHide={toggleLogin} centered>
                <Modal.Header>
                    <Modal.Title className="m-auto display-4">Login</Modal.Title>
                </Modal.Header>
                <Form onSubmit={(e) => loginUser(e)}>
                    <Modal.Body>
                        <Form.Label>Email :</Form.Label>
                        <Form.Control type="email" id="email" />
                        <Form.Label>Password</Form.Label>
                        <Form.Control id="pass" type="password" />
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary" type="submit">Login</button>
                        <button className="btn btn-warning" onClick={() => toggleLogin()}>Skip</button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default Login;