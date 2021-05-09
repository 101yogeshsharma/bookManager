// import { useState, useEffect } from 'react'
import { useParams, useHistory } from "react-router";
import '../index.css'
import { useState, useEffect } from "react";
import { Card, Row } from 'react-bootstrap'
// const StarRatings = require('react-star-ratings');

export default function Details() {

    const { id } = useParams<{ id: string }>();;

    const [book, setBook] = useState({
        _id: "",
        title: "",
        cover: "",
        author: "",
        price: "",
        rating: "",
        description: ""
    })

    useEffect(() => {
        fetch("http://localhost:4000/bookManager/bookInfo/" + id, {
            method: "POST",
            mode: 'cors'
        })
            .then(response => response.json())
            .then(data => setBook({ ...data }));
    }, [])

    console.log(book);


    return (
        <Card className="m-lg-4" id="bookDetails">
            <Row>
                <div className="m-lg-4">
                    <Card.Img className="img-fluid" style={{ height: "50vh", width: "20vw", borderRadius: "20px" }} variant="top" src={book.cover} />
                </div>
                <div className="m-lg-4" style={{ display: "flex", flexDirection: "column", paddingLeft: "10px" }}>
                    <Row className="m-lg-2">
                        <Card.Title style={{ fontSize: "2rem" }}>Title : </Card.Title>
                        <Card.Text className="display-1 ml-4" style={{ fontSize: "2rem" }} >{book.title}</Card.Text>
                    </Row>
                    <Row className="m-lg-2">
                        <Card.Title style={{ fontSize: "2rem" }}>Author : </Card.Title>
                        <Card.Text className="display-1 ml-4" style={{ fontSize: "2rem" }} >{book.author}</Card.Text>
                    </Row>
                    <Row className="m-lg-2">
                        <Card.Title style={{ fontSize: "2rem" }}>Price : </Card.Title>
                        <Card.Text className="display-1 ml-4" style={{ fontSize: "2rem" }} >{book.price}</Card.Text>
                    </Row>
                    <Row className="m-lg-2">
                        <Card.Title style={{ fontSize: "2rem" }}>Rating : </Card.Title>
                        <Card.Text className="display-1 ml-4" style={{ fontSize: "2rem" }} >{book.rating}</Card.Text>
                    </Row>
                    <Row className="m-lg-2">
                        <Card.Title style={{ fontSize: "2rem" }}>Buy : </Card.Title>
                        <a className="ml-4" href={"https://www.amazon.in/s?k=" + book.title.replaceAll(" ", "+")}><button className="btn btn-warning">Amazon</button>
                        </a>
                        <a className="ml-4" href={"https://www.goodreads.com/search?utf8=%E2%9C%93&query=" + book.title.replaceAll(" ", "+")}><button className="btn btn-secondary">Good Reads</button>
                        </a>
                        <a className="ml-4" href={"https://www.scribd.com/search?query=" + book.title.replaceAll(" ", "%")}><button className="btn btn-info">Scribd</button>
                        </a>
                    </Row>
                </div>
            </Row>
            <Card.Body>
                <Card.Text>
                    <Row className="display-h1 m-4" style={{ fontSize: "3rem" }}>
                        Description :
                    </Row>
                    <Row className="m-lg-4">
                        <p>{book.description}</p>
                    </Row>
                </Card.Text>
            </Card.Body>
        </Card >
    )
}


 // const DeleteBook = async (_id: any) => {
    //     let data: any = localStorage.getItem('token')

    //     let bookdata = await fetch('http://localhost:4000/books/' + _id,
    //         {
    //             method: 'DELETE',
    //             headers: { 'auth': data }
    //         })
    //     if (bookdata.status === 403) {
    //         window.alert('To delete you need to login first')
    //         history.push('/Login')
    //     }
    //     else {
    //         window.alert('book deleted successfully...')
    //         gotoHome()
    //     }
