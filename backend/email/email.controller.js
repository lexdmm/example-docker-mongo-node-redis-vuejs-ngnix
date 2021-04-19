const redis = require('../redis');

//Create new User
exports.create = async (req, res) => {
    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "Cannot be empty"
        });
    }

    // Create a Email
    const email = JSON.stringify({
        sender: req.body.sender,
        address: req.body.address,
        subject: req.body.subject,
        text: req.body.text
    });

    var retorno = '';

    try {
        // SADD cria uma chave com o nome sendEmail
        await redis.SADD('sendEmail', email, (error, data) => {
            if(!error){
                console.log('Email sent to the processing queue:', email); 
                retorno = { mensagem: 'Email sent to the processing queue' }
            } else {
                //console.log('Email not processing queue:', error);
                retorno = { mensagem: 'Email not processing queue' }
            }
        });

        res.send(retorno);       
    } catch (error) {
       console.log("Email send error: ", error) 
    }


};