import cookies from "next-cookies";
import Router from 'next/router';

export async function getServerSideProps(ctx){
    const allCookie = cookies(ctx);

    if(!allCookie.token)
        return ctx.res.writeHead(302, {
            Location: '/auth/login'
        });
    const postReq = await fetch('http://localhost:3000/api/posts/read', {
        headers: {
            "Authorization" : "Bearer " + allCookie.token
        }
    });

    const posts = await postReq.json();

    console.log(posts);
    return {
        props:{
            token: allCookie.token,
            posts: posts.data
        }
    }
}
export default function PostIndex(props){
    console.log(props);

    function tambahDataHandler(e){
        e.preventDefault();
        Router.push("/posts/create");
    }
    async function deleteHandler(id, e){
        e.preventDefault();
        const { token } = props;

        console.log(token);
        const ask = confirm("Apakah Data Ini Akan Dihapus");
        
        if(ask){
            const deleteReq = await fetch('http://localhost:3000/api/posts/delete/' + id, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
            });

            const res = await deleteReq.json();
            Router.push('/posts')
            console.log(res);
        }
    }
    return (
        <div>
            <h1>Posts</h1>
            { props.posts.map(post =>(
                    <div key={post.id}>{post.title}
                    <div>
                        <button>Edit</button>
                        <button   onClick={deleteHandler.bind(this, post.id)}>Hapus</button>
                    </div>
                    </div>
            ))}
            <button onClick={tambahDataHandler.bind(this)}>Tambah Data</button>
        </div>
    );
}