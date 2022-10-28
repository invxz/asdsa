const multer = require('multer')
const fs = require('fs')
const { setFlagsFromString } = require('v8')

module.exports = (app)=>{
   
    //importar o database
    var database = require('../config/database')

    //importar o model da galeria
    var noticias = require('../model/noticias')
    
    app.get('/admin',async(req,res)=>{
        //conectar database
        database()
        var documentos = await noticias.find().sort({_id:1})
        res.render('admin.ejs', {dados:documentos})
    })
    

var upload = require('../config/multer')


    app.post('/admin', (req,res)=>{
    //upload das imagens
        upload(req, res, async(err)=>{
            if(err instanceof multer.MulterError){
                res.send("arquivo maior de 1000kb")
            }else if(err){
                res.send("tipo de arquivo invalido")
            }else{
                database()
                var documento = await new noticias({
                    titulo:req.body.titulo,
                    texto:req.body.texto,
                    arquivo:req.file.filename
                    }).save()
                    .then(()=>{res.redirect('/admin')})
                    .catch(()=>{res.send('Não foi possível salvar')}) 
    
            }
        })
    })

    
}
