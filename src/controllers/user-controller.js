'use strict'

const mongoose = require('mongoose');
const User = mongoose.model('User');
const querystring = require('querystring');   
const dbuser = require('../dbusuario'); 

exports.post = (req, res, next) => {
    let type = dbuser.getType();
    var user = new User(req.body);
    user
        .save()
        .then(x => {
                res.redirect('http://localhost:3000/index/login');
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao cadastrar usuario',
                data: e
            });
        });

}
exports.get = (req, res, next) => {
    let type = dbuser.getType();
    User
        .find({})
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send({
                e
            });
        });
};

exports.getByCpf = (req, res, next) => {
    let type = dbuser.getType();
    User
        .find({
            cpf: req.params.cpf
        })
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send({
                e
            });
        });
};

exports.doLogin = (req, res, next) => {
    let type = dbuser.getType();
    User.findOne({
        email: req.query.email,
        senha: req.query.senha
    }).then(data => {
      if(data === null){
        res.render('wrongUser.ejs', {
            type
        });

      }else{
        const query = querystring.stringify({
            "nome":data.name,
            "cpf":data.cpf,
            "id":data._id+'',
            "type":data.type
        });
        dbuser.saveUsuario(data.name,data.id,data.cpf,data.type);
        res.redirect('http://localhost:3000/index');
      }
    }).catch(e => {
        res.send(e);
    });
}