import { Form, Card, Row, Col } from 'react-bootstrap';
import { useState } from 'react'
import '../index.css'


export default function AddBook() {

    const [addStatus, setStatus] = useState("");

    if (!localStorage.getItem('token')) {
        window.location.assign('/login')
    }

    function handleFormData(event: any) {

        event.preventDefault();
        const book = {
            "title": event.target.title.value,
            "author": event.target.author.value,
            "price": event.target.price.value,
            "cover": event.target.cover.value,
            "rating": event.target.rating.value
        }
        fetch('http://localhost:4000/bookManager/addBook', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Auth': localStorage.getItem('token')!,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(book)
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    if (data.status === true)
                        setStatus('Successfully deleted')
                    else if (data.status === false)
                        window.location.assign('/login')
                } else {
                    setStatus("Unable to Add Book");
                }
            })

        event.target.reset();
    }
    return (
        <Form onSubmit={e => handleFormData(e)}>
            <Card className="text-center" id="card">
                <Card.Header className="display-4">Add Book</Card.Header>
                <Card.Body >
                    <Row>
                        <Col>
                            <Card.Title>Title</Card.Title>
                            <Form.Control type="text" id="title" />
                        </Col>
                        <Col>
                            <Card.Title>Author</Card.Title>
                            <Form.Control type="text" id="author" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card.Title>Rating</Card.Title>
                            <Form.Control type="text" id="rating" />
                        </Col>
                        <Col>
                            <Card.Title>Price</Card.Title>
                            <Form.Control type="text" id="price" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card.Title>Cover URL</Card.Title>
                            <Form.Control type="text" id="cover" />
                        </Col>
                        <Card.Title>Description</Card.Title>
                        <Form.Control type="text" id="cover" />
                        <Col>
                        </Col>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <button className="btn btn-primary m-lg-4" type="submit">Add Book</button>
                    <Card.Text>{addStatus}</Card.Text>
                </Card.Footer>
            </Card>
        </Form>
    )
}



















// import React,{useState,useEffect} from 'react'



// export default function AddBook() {



//    let [booksData, setState] = useState<any>({

//         Btitle:'',
//         Bauthor:'',
//         Brating:'',
//         Bprice:'',
//         Bcover:'',

//    })
// //    let [bookItems,setBookItems]=useState([])



//     const handleChanges=(event:any)=>{

//         const{value,name}=event.target;
//         // console.log(value);
//         // console.log(name);

//         setState((prevdata:any)=>{
//             // console.log(prevdata);

//             if(name==='title')
//             {
//                 return{
//                 Btitle: value,
//                 Bauthor:prevdata.Bauthor,
//                 Brating:prevdata.Brating,
//                 Bprice:prevdata.Bprice,
//                 Bcover:prevdata.Bcover
//                 };
//             }
//             else if(name==='author')
//             {
//                 return{
//                 Btitle: prevdata.Btitle,
//                 Bauthor:value,
//                 Brating:prevdata.Brating,
//                 Bprice:prevdata.Bprice,
//                 Bcover:prevdata.Bcover
//                 }
//             }
//             else if(name==='rating')
//             {
//                 return{
//                 Btitle: prevdata.Btitle,
//                 Bauthor:prevdata.Bauthor,
//                 Brating:value,
//                 Bprice:prevdata.Bprice,
//                 Bcover:prevdata.Bcover,
//                 }

//             }
//             else if(name==='price')
//             {
//                 return{
//                 Btitle: prevdata.Btitle,
//                 Bauthor:prevdata.Bauthor,
//                 Brating:prevdata.Brating,
//                 Bprice:value,
//                 Bcover:prevdata.Bcover
//                 }
//             }
//             else if(name==='cover')
//             {
//                 return{
//                 Btitle: prevdata.Btitle,
//                 Bauthor:prevdata.Bauthor,
//                 Brating:prevdata.Brating,
//                 Bprice:prevdata.Bprice,
//                 Bcover:value
//                 }
//             }
//         })




//     }

//     const handleFormData=(e:any)=>{

//         console.log('clicked...');
//         e.preventDefault();
//         // setBookItems(booksData)
//         console.log(booksData);



//     }







//     return (
//         <div className="AddBookForm">
//             <form onSubmit={handleFormData}>
//                     <label>Enter Book Title:</label><br />
//                      <input type="text" name="title" value={booksData.Btitle} onChange={handleChanges} /><br />
//                      <label>Enter Book Auther</label><br />
//                      <input type="text" name="author" value={booksData.Bauthor} onChange={handleChanges} /><br />
//                      <label>Enter Book Rating</label><br />
//                      <input type="text" name="rating" value={booksData.Brating} onChange={handleChanges} /><br />
//                      <label>Enter Book Price</label><br />
//                      <input type="text" name="price"value={booksData.Bprice} onChange={handleChanges} /><br />
//                      <label>Add Book Cover</label><br />
//                      <input type="text" name="cover" value={booksData.Bcover} onChange={handleChanges} /><br /><br />
//                      <button type="submit">Add Book</button>

//             </form>

//         </div>
//     )
// }








