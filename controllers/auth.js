const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const User = require('../models/user');



const createUser = async (req ,res = response) => {

    try {

        console.log(req.body);
        const { name, email } = req.body;
        let { password } = req.body;

        /* Validaciones: De formato , veririficar si existe */

        // Se encripta la password
        const salt = bcrypt.genSaltSync();
        password = bcrypt.hashSync(password, salt);


        const user = await User.create({
            name,
            email,
            password
        });

        return res.status(200).json({
            ok: true,
            msg: 'Se ha registrado la cuenta exitosamente.'
        });

        
    } catch (error) {

        return res.status(400).json({
            ok: false,
            msg: "Ha ocurrido un error."
        });
        
    }

}

const loginUser = async (req, res = response) => {

    const { email, password } = req.body;

    const user = await User.findOne({ where: {email} })
    console.log(user);
    
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
        return res.status(400).json({
            ok: false,
            msg: 'Email y/o contraseña incorrecto'
        });
    }

    const token = await generateJWT( user.id, user.name );

    res.json({
        ok: true,
        token: token
    })

}

const renewToken = async (req, res = response) => {

    const {id, name} = req;

    const token = await generateJWT(id, name);

    res.json({
        ok: true,
        token
    })

}

const list = async (req, res = response) => {
    const users = await User.findAll({attributes: ['name', 'email']});


    return res.json({
        ok: true,
        data: users
    });

}



module.exports = {
    createUser,
    loginUser,
    renewToken,
    list
}