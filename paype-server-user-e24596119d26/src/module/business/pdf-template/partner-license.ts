const moment = require('moment')
import { Business } from "../entities/business.entity"

export const partnerLicense = (business: Business) => {
    return `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div class="main">
        <img class="borderimg" src="https://openclipart.org/image/800px/303309">
        <div class="maincontent">
            <div class="logo">
                <img class="backpaypelogo"
                    src="https://www.paype.co.in/static/media/Logo%20PayPee%20Tech.b37435606e30743a2f92.png" />
            </div>
            <div class="head">
                <div class="headimg">
                    <img class="paype"
                        src="https://www.paype.co.in/static/media/Logo%20PayPee%20Tech.b37435606e30743a2f92.png" />
                    <div class="headercontent">
                        <h2>PAYPE TECHNOLOGIES PVT LTD</h2>
                        <p> No.278.Periyar Nagar,Railway Junction Road,</p>
                        <p>Rajagopalapuram,Pudukkottai-622003,Tamil Nadu</p>
                        <p style="font-weight: bold;">PAN:AAMCP7060K / GSTIN: 33AAMCP7960K1ZU</p>
                        <p style="font-weight: bold;">CIN NO:U74994TN2022PTC151114</p>
                        <p>TEL:0432-227191</p>
                    </div>

                    <img class="startup"
                        src="http://thewriterscommunity.in/wp-content/uploads/2022/05/Asset-1@3x.png" />
                    <img class="badge"
                        src="https://www.nicepng.com/png/full/13-133957_ribbon-png-ribbon-clipart-gold-ribbons-white-seal.png" />

                </div>

                <div class="certificate">
                    <img
                        src="https://see.fontimg.com/api/renderfont4/q6o1/eyJyIjoiZnMiLCJoIjo5MywidyI6MTAwMCwiZnMiOjkzLCJmZ2MiOiIjMDAwMDAwIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/Y2VydGlmaWNhdGU/playball.png" />
                </div>

                <div class="line" style='margin-top:20px ;'>
                    <div>This is to certify that Mr / Mrs / Ms</div>
                    <div class="dash">${" "}${business?.busi_name}</div>
                    <div>has</div>
                </div>

                <div class="line">
                    <div>successfully completed</div>
                    <div class="dash1">${" "}${"Partner and other belonging"}</div>
                    <div>tranings</div>
                </div>

                <div class="line">
                    <div>Programme at</div>
                    <div class="dash2">${" "}${business?.busi_name}</div>
                    <div>during the</div>
                </div>

                <div class="line">
                    <div>period from</div>
                    <div class="dash3">${" "}${moment(business?.created_at).format('DD MMMM, YYYY')}</div>
                    <div>through</div>
                    <div class="dash3">${" "}${moment(business?.created_at).add(1, 'year').format('DD MMMM, YYYY')}</div>
                </div>

                <div class="line">

                    <div class="dash4"></div>

                </div>

                <div class="footer">
                    <div class="bottom">

                        <div class="date">
                            <div>DATE</div>
                            <div style="margin-left: 22px">:</div>
                            <div class="bottomdash">${moment(business?.created_at).format('DD MMMM, YYYY')}</div>
                        </div>

                        <div class="date">
                            <div>PLACE</div>
                            <div style="margin-left: 10px">:</div>
                            <div class="bottomdash">Pudukottai</div>
                        </div>

                    </div>

                    <div class="sign">
                        <div>Co-Founder & CEO</div>
                        <img src="https://www.fillhq.com/wp-content/uploads/2021/11/Handwritten-Signature-.png" />
                        <div>Ramesh Muthuvel </div>

                    </div>
                </div>
            </div>

        </div>

    </div>

    </div>

    </div>

</body>

<style>
    body {
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }

    .main {
        width: 21cm;
        height: 23.3cm;
        padding: 10px;
    }

    .maincontent {
        height: 23.3cm;
        width: 21cm;
        z-index: 1;
        position: relative;
    }

    .backpaypelogo {
        opacity: 0.2;
        position: absolute;
        height: 40rem;
    }

    .head {
        position: absolute;

    }

    .headimg {
        display: flex;
        margin-top: 30px;
    }

    .borderimg {
        width: 21cm;
        height: 23.3cm;
        position: absolute;
        z-index: 2;
    }

    .logo {
        width: 21cm;
        height: 23.3cm;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        background-color: #e8c7507c;
    }

    .paype {
        height: 150px;
    }

    .headercontent {
        text-align: center;
        line-height: 15px;
        width: 400px;
        margin-top: 100px;

    }

    .maincontent .startup {
        height: 18px;
        padding-top: 50px;
        margin-left: 50px;
        z-index: 1;
    }

    .badge {
        height: 170px;
        margin-left: -96px;
    }

    .certificate {
        display: flex;
        justify-content: center;
        width: 21cm;
        margin-top: 20px;
    }

    .line {
        height: 30px;
        width: 16cm;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-left: 5rem;
        margin-top: 5px;

    }

    .dash {
        border-bottom: 1px dotted black;
        width: 20rem;
        margin-top: 10px;
    }

    .dash1 {
        border-bottom: 1px dotted black;
        margin-top: 10px;
        width: 23rem;
    }

    .dash2 {
        border-bottom: 1px dotted black;
        margin-top: 10px;
        width: 25rem;
    }

    .dash3 {
        border-bottom: 1px dotted black;
        margin-top: 10px;
        width: 14rem;

    }

    .dash4 {
        border-bottom: 1px dotted black;
        margin-top: 10px;
        width: 38rem;
    }

    .footer {
        display: flex;
        width: 16cm;
        justify-content: space-between;
        margin-top: 50px;
        margin-left: 5rem;
    }

    .bottom {
        width: 6cm;
    }

    .date {
        display: flex;
        width: 13rem;
        margin-top: 20px;
        justify-content: space-between;
        align-items: baseline;
    }

    .bottomdash {
        width: 8rem;
        border-bottom: 1px solid black;
        margin-left: 15px;
    }

    .sign img {
        height: 5rem;
    }
</style>
</html>
`
}