const nodemailer = require('nodemailer');

module.exports ={
    
    send(req, res) {

              if(req.body.email == ''){
                  res.send({
                      success: false,
                      message: 'Necessário precheencer com email'
                  })
              }else{
        
              const output = `
                <div style="margin: 10px auto; max-width: 80%; border: 1px solid black; padding: 0px; font-family: Arial;">
                    <div style="padding: 10px;">
                        <h3>Testing send email</h3>
                    </div>
                </div>
              `
        
              var transporter = nodemailer.createTransport({
                  host: process.env.PUBLIC_SERVICE_HOST_EMAIL_SEVER,
                  port: process.env.PUBLIC_SERVICE_PORT_EMAIL_SEVER,
                  secure: false,
                  auth: {
                      user: process.env.PUBLIC_SERVICE_USER_EMAIL_SEVER,
                      pass: process.env.PUBLIC_SERVICE_PASS_EMAIL_SEVER
                  },
                  tls: {
                      ciphers:'SSLv3'
                  }
              });
              var mailOptions = {
                  from: process.env.PUBLIC_SERVICE_EMAIL_ORIGIN,
                  to: req.body.email,
                  cc: [process.env.PUBLIC_SERVICE_EMAIL_ORIGIN_CC_1, process.env.PUBLIC_SERVICE_EMAIL_ORIGIN_CC_2],
                  subject: 'Digital Horizon: your NFT Order',
                  html: output
              };
        
              transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                  console.log(error);
        
                  res.send({
                      success: false,
                      message: 'Erro ao enviar email'
                  })
        
              } else {
                  console.log('info:' + info.response);
                  res.send({
                      success: true,
                      message: 'Email enviado para ' + req.body.email,
                      info: info
                  })
              }
            });
            }       
        
    },
    
    sendTest(req, res){
        console.log(req.body)

        if(req.body.email == ''){
            res.send({
                success: false,
                message: 'Necessário precheencer com email'
            })
        }else{

        const output = `
            <div style="max-width: 100%; width: 40%; border: 1px solid; display: block; margin-left: auto; margin-right: auto;">
                
            </div>
        `

        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'publicsenderemail@gmail.com',
            pass: 'teste12345@'
        }
        });

        var mailOptions = {
            from: 'publicsenderemail@gmail.com',
            to: req.body.email,
            subject: '[LINK-LEITO] Mensagem de contato',
            html: output
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);

            res.send({
                success: false,
                message: 'Erro ao enviar email'
            })

        } else {
            console.log('info:' + info.response);
            res.send({
                success: true,
                message: 'Email enviado para ' + req.body.email,
                info: info
            })
        }
       });
      }
    }
}