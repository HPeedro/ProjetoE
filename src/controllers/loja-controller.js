'use strict'

const mongoose = require('mongoose');
const Loja = mongoose.model('Loja');
const ValidationContract = require('../validators/fluent-validator');

exports.post = (req, res, next) => {
    var loja = new Loja(req.body);
    loja
        .save()
        .then(x => {
            res.status(201).send({
                message: 'produto cadastrado com sucesso'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao cadastrar o produto',
                data: e
            });
        });
};
exports.get = (req, res, next) => {
    Loja
        .find({
            active: true
        }, /*'title price slug'*/)
        .then(data => {
            console.log("HERE #2");
            console.log(data);
            //console.log(res);
            res.status(200).send(data);
        }).catch(e => {
            console.log("HERE #3");
            res.status(400).send({
                e
            });
        });
};
exports.getById = (req, res, next) => {
    Loja
        .find({
            _id: req.params.id,
            active: true
        })
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send({
                e
            });
        });
};
exports.getByTag = (req, res, next) => {
    Loja
        .find({
            tags: req.params.tag,
            active: true
        })
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send({
                e
            });
        });
};
exports.put = (req, res, next) => {
    Loja
       .findByIdAndUpdate(req.params.id, {
           $set: {
              title: req.body.title,
              description: req.body.description,
              price: req.body.price
          }
         }).then(x => {
        res.status(200).send({
            message: 'produto a atualizado com sucesso!'
        });
        }).catch(e => {
        res.status(400).send({
            message: 'falha ao atualizar produto',
            data: e
            });
        });
};
exports.delete = (req, res, next) => {
    Loja
        .findOneAndRemove(req.body.id)
        .then(x=>{
            res.status(200).send({
                message:'produto removido com sucesso'
            });
        }).catch(e=>{
            res.status(400).send({
                message:'falha ao remover produto',
                data:e
            });
        });
};