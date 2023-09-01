import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FaEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'

export default function About() {
    const [val, setVal] = useState([]);
    const [name,setName] = useState('');
    const [sub1,setSub1] = useState();
    const [sub2,setSub2] = useState();
    const [sub3,setSub3] = useState();
    const [sub4,setSub4] = useState();
    const [sub5,setSub5] = useState();
    const [setId,seteditId] = useState('');

    /*Add Data */
    const handleSubmit = () => {
        axios.post(`http://localhost:5000/${setId}`, {
            name: name,
            sub1: sub1,
            sub2: sub2,
            sub3: sub3,
            sub4: sub4,
            sub5: sub5
        })
            .then(function (response) {
                console.log(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    /*view Data */
    useEffect(() => {
        axios.get(`http://localhost:5000/all`)
            .then(function (response) {
                console.log(response.data.data);
                setVal(response.data.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])
    /*Update data */
    const handleData = (n) => {
        var id = n;
        axios.get(`http://localhost:5000/single/${id}`)
        .then(function (response) {
            console.log(response.data.data);
            setName(response.data.data.name)
            setSub1(response.data.data.sub1)
            setSub2(response.data.data.sub2)
            setSub3(response.data.data.sub3)
            setSub4(response.data.data.sub4)
            setSub5(response.data.data.sub5)
            seteditId(id);
        })
        .catch(function(error) {
            console.log(error);
        })
    } 
    /*Delete Data */
    const handleDelete = (_id) => {
        var id = _id;
        axios.delete(`http://localhost:5000/delete/${id}`)
        .then(function (response) {
            console.log(response.data)
        })
        .catch(function(error) {
            console.log(error);
        })
        axios.get(`http://localhost:5000/all`)
        .then(function (response) {
            console.log(response.data.data);
            setVal(response.data.data)
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    /*Max Marks */
    const highestData = () => {
        axios.get(`http://localhost:5000/max`)
        .then(function (response) {
            console.log(response.data)
            setVal(response.data.maximum)
        })
        .catch(function (error) {
            console.log(error)
        })
    }
    /*Min Marks */
    
    const lowestData = () => {
        axios.get(`http://localhost:5000/min`)
        .then(function (response) {
            console.log(response.data)
            setVal(response.data.minimum)
        })
        .catch(function (error) {
            console.log(error)
        })
    }
    /*Pass student */
    const passStudent = () =>{
        axios.get(`http://localhost:5000/pass`)
        .then(function (response) {
            console.log(response.data)
            setVal(response.data.data)
        })
        .catch(function (error) {
            console.log(error)
        })
    }
    /*Fail Student */
    const failStudent = () =>{
        axios.get(`http://localhost:5000/fail`)
        .then(function (response) {
            console.log(response.data)
            setVal(response.data.data)
        })
        .catch(function (error) {
            console.log(error)
        })
    }
    /*Atct Student */
    const atctStudent = () =>{
        axios.get(`http://localhost:5000/atct`)
        .then(function (response) {
            console.log(response.data)
            setVal(response.data.data)
        })
        .catch(function (error) {
            console.log(error)
        })
    }
    /*Search Student */
    const handleSearch = (key) =>{
        axios.get(`http://localhost:5000/search/${key}`,{
             key:'name'
        })
        .then(function (response) {
            console.log(response.data.data)
            setVal(response.data.data)
        })
        .catch(function (error) {
            console.log(error)
        })
    }
        return (
        <>
            <div style={{ textAlign: 'center' }}>
                <h1>Student Result</h1>
                <table style={{marginBottom:'50px'}} className='mx-auto'>
                    <tr>
                        <th>Name:</th>
                        <td>
                            <input type="text" value={name} onChange={(e) =>{ setName(e.target.value) }}/>
                        </td>
                    </tr>
                    <tr>
                        <th>Sub1 :</th>
                        <td>
                            <input type="number" value={sub1} id="" onChange={(e) =>{ setSub1(e.target.value) }} />
                        </td>
                    </tr>
                    <tr>
                        <th>Sub2 :</th>
                        <td>
                            <input type="number" value={sub2} id="" onChange={(e) =>{setSub2(e.target.value) }} />
                        </td>
                    </tr>
                    <tr>
                        <th>Sub3 :</th>
                        <td>
                            <input type="number" value={sub3} id="" onChange={(e) =>{ setSub3(e.target.value)
                            }} />
                        </td>
                    </tr>
                    <tr>
                        <th>Sub4 :</th>
                        <td>
                            <input type="number" value={sub4} id="" onChange={(e) => { setSub4(e.target.value) }} />
                        </td>
                    </tr>
                    <tr>
                        <th>Sub5 :</th>
                        <td>
                            <input type="number" value={sub5} id="" onChange={(e) =>{ setSub5(e.target.value) }} />
                        </td>
                    </tr>
                        <tr>
                            <td colSpan={2}>
                                <input type="button" value="Submit" onClick={handleSubmit}  className='btn btn-info'/>
                            </td>
                        </tr>
                </table>
                <div className='mb-5'>
                    <button className='btn btn-info me-3' onClick={highestData}>Max Value</button>
                     <button className='btn btn-info me-3' onClick={lowestData}>Min Value</button>
                    <button className='btn btn-info me-3' onClick={passStudent}>Pass Student</button>
                    <button className='btn btn-info me-3' onClick={failStudent}>Fail Student</button>
                    <button className='btn btn-info' onClick={atctStudent}>Atct Student</button> 
                </div>
                
                Search: <input type='search' onChange={(e) => handleSearch(e.target.value)} className='w-50 my-3' ></input>
                <table className='mx-auto result' width={"50%"}>
                    <tr>
                        <th>Name</th>
                        <th>Sub1</th>
                        <th>Sub2</th>
                        <th>Sub3</th>
                        <th>Sub4</th>
                        <th>Sub5</th>
                        <th>Total</th>
                        <th>Result</th>
                        <th>Per</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    {
                        val.map((mark) => {
                            return (
                                <>
                                    <tr>
                                        <td>{mark.name}</td>
                                        <td>{mark.sub1}</td>
                                        <td>{mark.sub2}</td>
                                        <td>{mark.sub3}</td>
                                        <td>{mark.sub4}</td>
                                        <td>{mark.sub5}</td>
                                        <td>{mark.total}</td>
                                        <td>{mark.result}</td>
                                        <td>{mark.per}</td>
                                        <td onClick={() => handleData(mark._id)}>
                                                <FaEdit />    
                                        </td>
                                        <td onClick={() => handleDelete(mark._id)}>
                                            <MdDeleteForever />
                                        </td>
                                    </tr>
                                </>
                            )
                        })
                    }
                </table>
            </div>
        </>
    )
}
