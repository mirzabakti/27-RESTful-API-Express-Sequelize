const express = require("express")

const { sequelize, hewan} = require('./models')
const HEWAN_MODEL = require('./models').hewan

const port = process.env.PORT || 3000

const app = express()
app.use(express.json())

// get all hewan
app.get("/hewan", async (req, res) => {
     await HEWAN_MODEL.findAll().then(result =>{
        res.status(200).json(result)
    }).catch(error =>{
        res.status(500).json({
            message:  error
        })
    })
})

// 2.a. get hewan by id
app.get("/hewan/:id", async (req, res) =>{
    const id = req.params.id
    await HEWAN_MODEL.findOne({
        where : {
            id : id
        }
    }).then(result =>{
        if(result){
            res.status(200).json(result)
        }else{
            res.status(404).json({
                message : "Hewan not found"
            })
        }
    }).catch(error =>{
        res.status(500).json({
            message:  error
        })
    })
})

// 2.b. post hewan
app.post("/hewan", async (req,res) =>{
    const body = req.body

    const newData = {
        nama : body['nama'], 
        namaSpesies: body['namaSpesies'],
        umur:body['umur']
    }

    await HEWAN_MODEL.create(
        newData
    ).then(result =>{
        res.status(201).json(result)
    }).catch(error =>{
        res.status(500).json({
           message:  error
        })
    })

})

// 2.c. update hewan
app.patch("/hewan/:id", async (req,res) =>{
    const id = req.params.id
    const body = req.body

    const newData = {
        nama : body['nama'], 
        namaSpesies: body['namaSpesies'],
        umur:body['umur']
    }

    await HEWAN_MODEL.update(newData,{
        where : {
            id : id
        }
    }).then(
        res.status(200).json(newData)
    ).catch(error =>{
        res.status(500).json({
            message:  error
        })
    })
})

// 2.d. delete hewan
app.delete("/hewan/:id", async (req,res) =>{
    const id = req.params.id

    await HEWAN_MODEL.destroy({
        where : {
            id : id
        }
    }).then( result =>{
        if(result){
            res.status(200).json({
                message : "Hewan was deleted successfully!"
            })
        }else{
            res.status(404).json({
                message : "Hewan not found!"
            })
        }
    }).catch(error =>{
        res.status(500).json({
            message:  error
        })
    })
})

app.get("/", (req, res) =>{
    const message = `<div style="text-align: center;">
                        <h1>WELCOME TO HEWAN API</h1>
                        <p> /hewan to get all data hewan</p>
                        <p> /hewan/id to get data hewan by id</p>
                     <div>`;
    res.send(message)
})

// 1. koneksikan express - sequelize - mysql
const connectAuth = () =>{
    sequelize
    .authenticate()
    .then(() =>{
        console.log("connection has been established succesfully")
    })
    .then(()=>{
        hewan.sync().then(()=> console.log("table hewan created"))
    })
    .catch(err =>{
        console.error(err)
    })
}

app.listen(port, ()=>{
    console.log(`listening at http://localhost:${port}}`)
    connectAuth()
})