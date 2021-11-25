export default function handler(req, res){
    res.status(200);
    res.json(
        {
            id: 1,
            title: "Ini Adalah Judul",
            content: "Ini Adalah Hasil"
        }
    );
}