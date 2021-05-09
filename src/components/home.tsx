import { useState } from 'react';
import '../index.css';
import { Card, Form, Navbar, FormControl, Button, Modal, } from 'react-bootstrap';
import { useHistory, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

interface book {
    getBook: Function;
}



export default function Home(props: book) {

    const history = useHistory();

    let nothing: any = false;

    const [states, setState] = useState({ booksData: [], searchKey: "", searchTag: "all", priceRange: 1000 });
    const [showBook, setShow] = useState([false, nothing]);

    const handleClose = () => setShow([false, []]);
    const handleShow = (row: any) => {
        console.log(row);
        let book = [row.title, row.author, row.price, row.cover, row.rating, row._id]
        setShow([true, book]);
    }

    // get tag values from search box
    const [searchResult, getResult] = useState<any | null>(states.booksData);
    // const getTag = (e: any) => setTag(e.target.value);

    const getBooksData = () => {
        const searchData = {
            "tag": states.searchTag,
            "keyword": states.searchKey,
            "range": states.priceRange
        }
        fetch('http://localhost:4000/bookManager/getBookList', {
            method: 'POST',
            mode: 'cors',
            cache: 'default',
            credentials: 'same-origin',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(searchData)
        })
            .then(response => response.json())
            .then(data => getResult(data))
            .catch(err => console.log("unable to get books : ", err));
    }

    // live search
    const search = (e?: any) => {
        getResult([]);
        let newState: any = states;
        newState[e.target.id] = e.target.value;
        setState(newState);
        getBooksData();
        states.booksData.forEach((book: any | null) => {
            for (const key in book) {
                if (states.searchTag !== "all") {
                    if (key === states.searchTag && book[key].toLowerCase().includes(states.searchKey.toLowerCase()) && book.price <= states.priceRange) {
                        getResult([...searchResult, book]);
                    }
                } else {
                    if (book[key].toLowerCase().includes(states.searchKey.toLowerCase()) && book.price <= states.priceRange) {
                        getResult([...searchResult, book]);
                    }
                }
            }
        })
    }

    const showDetails = () => {
        console.log(showBook[1][5]);
        history.push('/Details/' + showBook[1][5])
    }

    return (
        <>
            <div className="searchForm">
                <Navbar style={{ width: "95vw", borderRadius: "20px", }} bg="light" variant="light" className="mt-lg-4 m-auto">
                    <Form className="p-auto" inline>
                        <Form.Group>
                            <Form.Label className="mr-lg-4">Select Tag : </Form.Label>
                            <Form.Control as="select" id="searchTag" defaultValue="all" onChange={(e) => search(e)}>
                                <option value="all">All</option>
                                <option value="author">Author</option>
                                <option value="title">Title</option>
                            </Form.Control>
                        </Form.Group>
                        <FormControl type="text" placeholder="Search" id="searchKey" className="m-lg-3" onChange={e => search(e)} />
                        <Form.Label className="ml-lg-2">Price Range : </Form.Label>
                        <Form.Group controlId="priceRange">
                            <Form.Control className="m-lg-4" type="range" min="100" max="1000" onChange={e => search(e)} />
                        </Form.Group>
                        <span id="currentRange">{states.priceRange}</span>
                    </Form>
                </Navbar>
            </div>

            <div className="booksGrid">

                {searchResult ? searchResult.map((row: any) => {
                    return (
                        <Card className="CardView" style={{ borderRadius: "20px", alignItems: "center" }}>
                            <Card.Header>
                                <Card.Img id="cardImage" variant="top" src={row.cover} height="80%" width="100%" />
                            </Card.Header>
                            <Card.Body>
                                <p style={{ fontSize: "1.1vw", fontStyle: "bold" }}>{row.title}</p>
                                </Card.Body>
                            <Card.Footer style={{backgroundColor: "#ffc101", width:"100%", borderBottomRightRadius:"20px", borderBottomLeftRadius:"20px", display:"flex", justifyContent:"center"}}>
                                <button type="submit" style={{color : "black", fontWeight: "bold", textDecoration: "none"}} className="btn btn-link" onClick={() => handleShow(row)}>Details</button>

                            </Card.Footer>
                        </Card>
                    )

                }) : <h1>No Data Found</h1>
                }
            </div>
            <div>
                <Modal class="modal fade bd-example-modal-xl" aria-labelledby="exampleModalCenterTitle" show={showBook[0]} onHide={handleClose}>
                    <Modal.Body>
                        <div style={{ textAlign: "center" }}>
                            <p className="bookHeading">{showBook[1][0]}</p>
                        </div>
                        <div className="dropdown-divider"></div>
                        <div style={{ float: "left", width: "40%", height: "80%" }}>
                            <img style={{ width: "100%", height: "100%", borderRadius: "10px" }} src={showBook[1][3]} alt="cover not available" />
                        </div>
                        <div className="ml-lg-4" style={{ display: "flex", flexDirection: "column", float: "right", width: "50%", height: "50%" }}>
                            <label id="label">Author : </label>
                            <label> {showBook[1][1]}</label><br />
                            <label id="label">Price : </label>
                            <label> {showBook[1][2]}</label><br />
                            <label id="label">Rating : </label>
                            <label>{showBook[1][4]}</label>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={handleClose}>Close</button>
                        <button className="btn btn-secondary" onClick={() => showDetails()}>See More</button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}



