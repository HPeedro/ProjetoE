'use strict'

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const User = mongoose.model('User');
const url = require('url');
const dbuser = require('../dbusuario') 

router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Node api",
        version: "0.0.1"
    });
});

router.get('/index/carrinho',(req,res,next)=>{
    let user = dbuser.getUsuario();
    let type = dbuser.getType();
   res.redirect('http://localhost:3000/pedido/ped');
});

router.get('/index', (req, res, next) => {
    User
        .find({
            type: "loja"
        }, /*'title price slug'*/ )
        .then(data => {
            let user = dbuser.getUsuario();
            let type = dbuser.getType();
            //console.log(data);
            // res.status(200).send(data);
            res.render('index.ejs', {
                lista: data , user, type
            });
        }).catch(e => {
            res.status(400).send({
                e
            });
        });
});


router.get('/usuario', (req, res, next) => {
    let usuario = req.query;
    console.log(req.query);
            // res.status(200).send(data);
            let user = dbuser.getUsuario();
            let type = dbuser.getType();
            res.render('usuario.ejs', {
                 user, type
            });

});

router.get('/index/products', (req, res, next) => {
    Product
        .find({
            active: true
        }, /*'title price slug'*/ )
        .then(data => {
            // res.status(200).send(data);
            let user = dbuser.getUsuario();
            let type = dbuser.getType();
            res.render('products.ejs', {
                lista: data ,user, type
            });
        }).catch(e => {
            res.status(400).send({
                e
            });
        });
});

router.get('/products/:loja', (req, res, next) => {
    Product
        .find({
            active: true,
            loja: req.params.loja
        }, /*'title price slug'*/ )
        .then(data => {
            // res.status(200).send(data);
            let user = dbuser.getUsuario();
            let type = dbuser.getType();
            res.render('products.ejs', {
                lista: data ,user, type
            });
        }).catch(e => {
            res.status(400).send({
                e
            });
        });
});

router.get('/product/:id', (req, res, next) => {
    Product
        .find({
            _id: req.params.id,
            active: true
        })
        .then(data => {
            let user = dbuser.getUsuario();
            let type = dbuser.getType();
            console.log(user);
             res.render('product.ejs', {
                 lista: data, user, type
             });
        }).catch(e => {
            res.status(400).send({
                e
            });
        });
});

router.get('/index/login',(req,res,next)=>{
    res.render('novoLogin.ejs');
});

router.get('/index/unautorized',(req,res,next)=>{
    res.render('wrongUser.ejs');
});

router.get('/index/logout',(req,res,next)=>{
    let user = dbuser.getUsuario();
    let type = dbuser.getType();
    dbuser.doLogout();
    res.render('logout.ejs',{
        user, type
    });
});

router.get('/cadastrousuario',(req,res)=>{
    res.render('cadastroUsuario.ejs');
});

router.get('/cadastroproduto',(req,res)=>{
    res.render('cadastroProduto.ejs');
});

router.get('/sucesso',(req,res)=>{
    let user = dbuser.getUsuario();
    let type = dbuser.getType();
    res.render('realizadoComSucesso.ejs',{
        user, type
    });
});
module.exports = router;