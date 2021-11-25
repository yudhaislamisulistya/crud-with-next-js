import cookies from 'next-cookies';
import React, { useState } from 'react';


export async function getServerSideProps(ctx){
    const allCookie = cookies(ctx);

    if(allCookie.token)
        return ctx.res.writeHead(302, {
            Location: '/posts'
        });
}

export default function Register(){

    const [fields, setFields] = useState({
        email: '',
        password: ''
    });

    const [status, setStatus] = useState('normal');

    function fieldHandler(e){
        const name = e.target.getAttribute('name');

        setFields({
            ...fields,
            [name]: e.target.value
        });
    }

    async function registerHandler(e){
        e.preventDefault();
        console.log(fields);

        setStatus('loading');

        const registerReq = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(fields),
            headers:{
                "Content-Type": "application/json"
            }
        });
        
        if(!registerReq.ok) return setStatus('error' + registerReq.status);
        const registerRes = await registerReq.json();
        console.log(registerRes);
        setStatus('success');
    }
    
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={registerHandler.bind(this)}>
                <input  
                    name="email"
                    type="text"
                    onChange={fieldHandler.bind(this)}
                    placeholder="Email"/><br/>
                <input
                    name="password" 
                    type="password" 
                    onChange={fieldHandler.bind(this)}
                    placeholder="Password"/><br/>
                <button type="submit">Regsiter</button>
                <div>
                    Output : {status}
                </div>
            </form>
        </div>
    );
}