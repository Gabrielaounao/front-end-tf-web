async function sendVerificationEmail(receiver, code) {
    const Mailjet = require('node-mailjet');
    const conn = Mailjet.apiConnect(process.env.EMAIL_API_KEY, process.env.EMAIL_API_SECRET);

    const request = conn
    .post("send", {'version': 'v3.1'})
    .request({
        "Messages":[
            {
            "From": {
                "Email": process.env.SYSTEM_EMAIL,
                "Name": "BANDEJÃO"
            },
            "To": [
                {
                "Email": receiver,
                "Name": "Destinatário"
                }
            ],
            "Subject": "Recuperação de Senha",
            "TextPart": "Seu código de recuperação de senha é: " + code + "\n\nBANDEJÃO - IFNMG",
            "HTMLPart": "<p>Seu código de recuperação de senha é: <b>" + code + "</b><br><small>BANDEJÃO - IFNMG</small>",
            "CustomID": "bandejao"
            }
        ]
    });

    return await request.then((result) => {
        return true;
    }).catch((err) => {
        return false;
    });
}

module.exports = sendVerificationEmail;