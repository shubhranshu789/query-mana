import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";

import './AdminHome.css'

function report() {



    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const notifyA = (msg) => toast.error(msg);
    const notifyB = (msg) => toast.success(msg);

    const show = () => {
        console.log(data)
    }


    useEffect(() => {
        fetch("/allquery", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setData(result)
            })
            .catch(err => console.log(err))
    }, []);


    const removePost = (postId) => {
        fetch(`/deletePost/${postId}`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json"
            },
        }).then((res) => res.json())
            .then((result) => {
                console.log(result)
                notifyB(result.message)
            })
    }







    return (
        <div className="gallery">
            {
                data.map((posts) => {
                    return (
                        <div className="card11">

                            <p><b>NAME :</b> {posts?.postedBy?.name}</p>
                            <p><b>ADDRESS :</b>{posts?.postedBy?.address}</p>
                            <p><b>PHONE :</b> {posts?.postedBy?.phone}</p>
                            <p><b>QUERY :</b> {posts.body}</p>

                            <button className="primaryBtn5" onClick={() => { removePost(posts._id) }}>Solved</button>

                            <br />
                            <br />

                        </div>
                    )
                })
            }
        </div>
    )
}

export default report