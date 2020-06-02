'use strict'

const mongoose = require('mongoose');
const Pedido = mongoose.model('Pedido');
const dbuser = require('../dbusuario'); 

exports.get = async (req, res, next) => {

    Pedido.find({})
    .populate('customer','name')
    .populate('items.product','title')
    .then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send({
            e
        });
    });
    
 };


 exports.getById = async (req, res, next) => {
    let userid = dbuser.getId();
    let user = dbuser.getUsuario();
    let type = dbuser.getType();
    Pedido.find({
        customer: userid
    })
    .populate('customer','name')
    .populate('items.product')
    .then(data => {
        var preco =0;
        //console.log(data);
        data.forEach(function(value){
           preco=preco+ value.items[0].product.price;
        });
        

        res.render('carrinho.ejs',{
            userid,user,lista:data,preco,type
        });

      //  res.status(200).send(data);
    }).catch(e => {
        res.status(400).send({
            e
        });
    });
    
 };

exports.post = async(req, res, next) => {
    let userid = dbuser.getId();
    let type = dbuser.getType();
   let pedidoC ={
        "customer":userid,
        "items":[{
                "product":req.params.id
        }]
    }
    console.log(userid,req.params.id);
    var pedido = new Pedido(pedidoC);
    pedido.save()
    .then(x=>{
        let user = dbuser.getUsuario();
        res.render('pedido.ejs', {
            user, type
       });
    }).catch(e =>{
        res.render('novoLogin');
        res.status(400).send({
            message:'Falha ao cadastrar pedido ',
            data:e
        });
    });
    
};

