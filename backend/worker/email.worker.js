const Email = require('../email/email.model');
const redis = require('../redis');
const schedule = require("node-schedule");

/**
 * SMEMBER do redis para ler todos os valores que estão dentro da chave “sendEmail”
 * se ok a chave será removida do redis com o comando SREM
 * 
 * POR HORA AINDA NÃO ARRUMEI PARA SALVAR NO BANCO, MAS JA ESTÁ FAZENDO O JOB
 */
const saveDAta = () => {
    redis.smembers("sendEmail", (err, emails) => { 
        if(!err){

            let utc = new Date().toJSON().slice(0,25).replace(/-/g,'/');

            if(emails && emails.length>0){
                for (let data of emails) {
                    let email = JSON.parse(data);    
                    //Salva no banco
                    Email.create(email);

                    // Limpa o redis
                    redis.SREM("sendEmail",JSON.stringify(email));   

                    console.log(`Processing email sending: ${email.subject}, hour: ${utc}`);
                }
            } else {
                console.log('No email entered! Standby Processing...');
            }
        } else {
            console.log('An error occurred while attempting to execute Redis "sendEmail" key: ' + err);
        }  
    }); 
}

schedule.scheduleJob("0-59/5 * * * * *", async (date) => {
    saveDAta();
});
