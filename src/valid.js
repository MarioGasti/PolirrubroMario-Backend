exports.missingSignUpData = (req, res, next) => {
    if (!req.body.user) return res.status(404).json({
        ok: false,
        status: 404,
        httpStatus: 404,
        message: 'Ingrese un Nombre de Usuario.',
        references: [
            'username of the person who wants to sign up.'
        ],
        examples: [
            'username = "Mario2647"',
        ]
    });
    if (!req.body.pass) return res.status(404).json({
        ok: false,
        status: 404,
        httpStatus: 404,
        message: 'Ingrese una Contraseña.',
        references: [
            'password of the person who wants to sign up.'
        ],
        examples: [
            'password = "clave1"',
        ]
    });
    if (!req.body.firstname) return res.status(404).json({
        ok: false,
        status: 404,
        httpStatus: 404,
        message: 'Ingrese su Nombre.',
        references: [
            'firstname of the person who wants to sign up.'
        ],
        examples: [
            'firstname = "Orlando"',
        ]
    });
    if (!req.body.lastname) return res.status(404).json({
        ok: false,
        status: 404,
        httpStatus: 404,
        message: 'Ingrese su Apellido.',
        references: [
            'lastname of the person who wants to sign up.'
        ],
        examples: [
            'lastname = "Ferrufino"',
        ]
    });
    if (!req.body.genre) return res.status(404).json({
        ok: false,
        status: 404,
        httpStatus: 404,
        message: 'Elija Sexo.',
        references: [
            'genre of the person who wants to sign up.'
        ],
        examples: [
            'genre = "M"',
        ]
    });
    if (!req.body.age) return res.status(404).json({
        ok: false,
        status: 404,
        httpStatus: 404,
        message: 'Ingrese su edad.',
        references: [
            'age of the person who wants to sign up.'
        ],
        examples: [
            'age = 49',
        ]
    });
    if (!req.body.address) return res.status(404).json({
        ok: false,
        status: 404,
        httpStatus: 404,
        message: 'Ingrese su domicilio.',
        references: [
            'address of the person who wants to sign up.'
        ],
        examples: [
            'address = "Boedo 2647"',
        ]
    });
    if (!req.body.phone && !req.body.email) return res.status(404).json({
        ok: false,
        status: 404,
        httpStatus: 404,
        message: 'Ingrese su teléfono o email.',
        references: [
            'phone of the person who wants to sign up.',
            'email of the person who wants to sign up'
        ],
        examples: [
            'phone = "3515592647"',
            'email = "mario2647@hotmail.com"',
        ]
    });
    // if (!req.body.email) return res.status(404).json({
    //     ok: false,
    //     status: 404,
    //     httpStatus: 404,
    //     message: 'email is needed at body.',
    //     references: [
    //         'email of the person who wants to sign up.'
    //     ],
    //     examples: [
    //         'email = "mario2647@hotmail.com"',
    //     ]
    // });
    next();
};