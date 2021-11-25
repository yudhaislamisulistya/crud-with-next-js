import db from '../../../../libs/db';
import authorization from '../../../../middlewares/authorization';

export default async function handler(req, res){
    if (req.method !== "PUT") return res.status(405).end();

    const auth = authorization(req,res);
    
    console.log(req.query); 

    const { id } = req.query;
    const { title, content } = req.body 
    const update = await db("posts").where({id})
                    .update({
                        title: title,
                        content: content
                    });
    const updatedData = await db("posts").where({id}).first();

    if(!updatedData) return res.status(401).end();
    res.status(200);
    res.json({ 
        message: "Post Updated Successfully ",
        data: updatedData
    });
}; 