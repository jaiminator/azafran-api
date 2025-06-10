const { User } = require("../models/users");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const login = async (req, res) => {
    try {
        //Recibir usuario y password
        const { username, password } = req.body;

        //Validar si hay usuario o password
        if (!username || !password) {
            res.status(404).send("Missing username or password");
            return;
        }
        //Busca y comprueba si existe el usuario introducido en el body
        const user = await User.findOne({ username: username });

        //Validar que el usuario exista
        if (!user) {
            res.status(404).send({msg: "INVALID_CREDENTIALS"});
            return;
        }

        //Comprueba si el password del usuario sea el mismo que el recibido en el body
        const isPasswordMatch = bcryptjs.compareSync(password, user.password);
        if (!isPasswordMatch) {
            res.status(404).send({msg: "INVALID_CREDENTIALS"});
            return;
        }

        //Genera un token con el userId para el usuario en el payload .sign()
        const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET);

        res.status(201).send({accessToken: accessToken});
        console.log('User logged');
        
    } catch (error) {
        res.status(500).send("Internal server error", error);
        console.log(error);
    }  
}

const register = async (req, res) => {

    const { username, password } = req.body;

    //Validar usuario y contraseña
    if (!username || !password) {
        res.status(404).send("Missing username or password");
        return;
    }

    //Hasheamos la contraseña
    const hashedPassword = bcryptjs.hashSync(password);

    //Creamos y registramos el usuario en la db
    try {
        const user = new User({username: username, password: hashedPassword});
        await user.save();
        res.status(201).send("User registered");
    
    } catch (error) {
        if(error.errorResponse.errmsg){
            res.status(500).send(error.errorResponse.errmsg);
            console.log(error);
        } else {
            res.status(500).send("Unexpected register error", error);
        }
    } 
}

module.exports = { login, register };