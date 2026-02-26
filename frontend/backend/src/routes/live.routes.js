const express = require("express");
const jwt = require("jsonwebtoken");


const router = express.Router();


router.post("/token", (req, res) => {
    const  {streamId } = req.body;

        // Mux signing (add your keys to .env later)

        const keyId = process.env.MUX_SIGNING_KEY_ID;
        const secretKey = process.env.MUX_SIGNING_SECRET_KEY;

        if (!keyId || ! secretKey) {
            return res.status(500).json({ error: "Mux signingg keys not configured"});

        }

        const payload = {
            sub: streamId,
            aud: 'v',
            exp: Math.floor(Date.now() / 1000) + (15 * 60),
            kid: keyId,
        };

        const token = jwt.sign(payload, secretKey.replace(/\\n/g, '\n'),
         { algorithm: 'RS256' });


        res.json({token});

    });
module.exports = router;

    