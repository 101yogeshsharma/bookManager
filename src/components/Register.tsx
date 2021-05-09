import { Form, Button, Col, Row } from 'react-bootstrap';
// const bcrypt = require('bcrypt');

const Register = () => {

    // const [pass, setPass] = useState("");
    // const [rePass, setRePass] = useState("");
    // const [passMatch, setMatch] = useState("");

    // const getPass = (e: any) => {
    //     setPass(e.target.value);
    // }

    // const getRePass = (e: any) => {
    //     setRePass(e.target.value);
    //     if (pass === rePass) {
    //         setMatch("Matched");
    //     } else {
    //         setMatch("Passwords not Matching");
    //     }
    // }


    // const userNameValidate = (e: any) => {
    //     fetch('http://localhost:4000/bookManager/signup', {
    //         method: "POST",
    //         mode: 'cors',
    //         headers: {
    //             'Content-type': 'application/json',
    //         },
    //         body: JSON.stringify({ "username": e.target.value })
    //     })
    //         .then(response => response.json())
    //         .then(data => console.log(data));
    // }

    const registerUser = async (e: any) => {
        e.preventDefault();
        // const salt = bcrypt.getSale();

        let userData = {
            fname: e.target.fname.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            dob: e.target.dob.value,
            password: e.target.pass.value
        }

        await fetch('http://localhost:4000/bookManager/signup', {
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(response => response.json())
            .then(data => localStorage.setItem('token', data.token))
            .catch(err => console.log(err));
    }


return (
    <div className="m-lg-4" style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Form onSubmit={(e) => registerUser(e)}>
            <Row >
                <Col>
                    <Form.Label>Full Name :</Form.Label>
                    <Form.Control type="text" id="fname" placeholder="Eg. Yogesh" />
                </Col>
                <Col>
                    <Form.Label>Username :</Form.Label>
                    <Form.Control id="uname" type="text" />
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Label>Email</Form.Label>
                    <Form.Control id="email" type="email" placeholder="Eg. someone@example.com" />
                </Col>
                <Col>
                    <Form.Label>Retype Email</Form.Label>
                    <Form.Control id="reemail" type="email" />
                </Col>
            </Row>

            <Col>
                <Form.Label>Password</Form.Label>
                <Form.Control id="pass" type="text" />
            </Col>

            <Col>
                <Form.Label>Retype Password</Form.Label>
                <Form.Control type="password" id="repass" />
                {/* <Form.Label style={passMatch === "Matched" ? { color: "darkgreen" } : { color: "red" }}>{passMatch}</Form.Label> */}
            </Col>

            <Row>
                <Col>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control id="phone" type="number" />
                </Col>

                <Col>
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control id="dob" type="date" />
                </Col>
            </Row>

            <Col>
                <Form.Check type="checkbox" id="tc" label="Agree to Terms and Conditions" />
            </Col>

            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    </div >
)
}

export default Register;
