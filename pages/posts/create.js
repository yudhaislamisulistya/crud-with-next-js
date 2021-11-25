import cookies from 'next-cookies';
import React, { useState } from 'react';
import Router from 'next/router';

export async function getServerSideProps(ctx){
    const allCookie = cookies(ctx);

    if(!allCookie.token)
        return ctx.res.writeHead(302, {
            Location: '/auth/login'
        });

    
    return { 
        props: {
            token: allCookie.token
        }
    }
}

export default function PostCreate(props){

    const [ fields, setFields ] = useState({
        title: '',
        content: ''
    });

    const [ status, setStatus ] = useState('nromal');

    async function createHandler(e){
        e.preventDefault();
        setStatus('loading');
        const {token} = props;

        const create = await fetch('http://localhost:3000/api/posts/create', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(fields) 
        });

        if(!create.ok) return setStatus('error');

        const res = await create.json();
        console.log(res);
        setStatus('success');
        Router.push('/posts')
    }

    function fieldHandler(e){
        const name = e.target.getAttribute('name');

        setFields({
            ...fields,
            [name]: e.target.value
        });
    }

    
    return(
        <div>
            <h1>Create A Post</h1>
            <form onSubmit={createHandler.bind(this)}>
                <input
                onChange={fieldHandler.bind(this)}
                type="text"
                placeholder="Title"
                name="title"
                /><br/>
                <input 
                onChange={fieldHandler.bind(this)}
                type="content"
                placeholder="Content"
                name="content"
                /><br/>
                <button type="submit">Add Post</button>
                <div>Output : {status}</div>
            </form>
        </div>
    );
}