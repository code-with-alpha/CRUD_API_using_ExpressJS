import express from 'express';

const app = express();
const port = 8000;
app.use(express.json());

let Data = []
let id = 1;

// add Data
app.post('/data', (req, res)=>{
    const {name, role} = req.body
    const newData = {
        id: id++,
        name,               // "name": "alpha",
        role                // "role": "Developer"
    }

    Data.push(newData); // pushing the newData object into the Data array
    res.status(200).send(newData);
})

// get all Data
app.get('/data', (req, res)=>{
    res.status(200).send(Data);
})

// get Data by id
app.get('/data/:id', (req, res)=>{
    const items = Data.find((item) => item.id === parseInt(req.params.id));
    if(!items){
        return res.status(404).send('Data not found');
    }
    res.status(200).send(items);
})

// Update Data
app.put('/data/:id', (req, res)=>{
    const item = Data.find((item) => item.id === parseInt(req.params.id));
    if(!item){
        return res.status(404).send('Data not found');
    }
    const {name, role} = req.body;
    item.name = name;
    item.role = role;

    res.status(200).send(item )
})

// Delete Data
app.delete('/data/:id', (req, res)=>{
    const index = Data.findIndex((item) => item.id === parseInt(req.params.id))
    if(index === -1){
        return res.status(400).send("Data Not Found");
    }
    Data.splice(index, 1);
    return res.status(200).send('Item Deleted');
})


app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`);
})