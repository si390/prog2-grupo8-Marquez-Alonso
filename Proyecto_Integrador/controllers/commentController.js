const { Association } = require('sequelize');
const db = require('../database/models');
const { validationResult } = require("express-validator");
const Product = db.Product;
const Usuario = db.Usuario;
const Comentario = db.Comentario;

const commentController = {
    crearComentario: function(req, res) {
        if (!req.session.user) {
            return res.redirect('/profile/login');
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const { comment } = req.body;
            const productoId = req.params.productoId;
            const userId = req.session.user.id;

            db.Comentario.create({
                texto: comment,
                usuario_id: userId,
                producto_id: productoId,
                created_at: new Date()
            })
           .then(() => {
                res.redirect(`/product/${req.params.productoId}`);
            })
           .catch(error => {
                res.status(500).send(error.message);
            });
        } else {
            return res.render('product', {
                errors: errors.mapped()
            });
        }
    },
}

module.exports = commentController;
