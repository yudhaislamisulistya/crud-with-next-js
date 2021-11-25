import db from "../../../../libs/db";
import authorization from "../../../../middlewares/authorization";

export default async function handler(req, res){
    
    if(req.method !== "DELETE") return res.status(405).end();

    // const auth = authorization(req, res);
    
    const { id } = req.query;


    const deleteRow = await db("posts").where({id: id}).del();

    const deleteRowData = await db("posts").where({id: id});
    res.status(200);
    res.json({ 
        message: "Deleted Post Successuflly",
        data: deleteRowData
    })
}