import express from "express";
import crypto from "crypto";
import querystring from "querystring";
import axios from "axios";

const CLIENT_SECRET = process.env.CLIENT_SECRET;
const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;
const FRONTEND_URI = process.env.FRONTEND_URI;

const router = express.Router();

const stateKey = "spotify_auth_state";

/**
 TODO add comments
 */
router.get("/login", (req, res) => {
  const state = crypto.randomBytes(20).toString("hex");
  res.cookie(stateKey, state);

  const scope = ["user-read-private", "user-read-email", "user-top-read"].join(" ");

  const queryParams = querystring.stringify({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    state: state,
    scope: scope,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

router.get("/callback", async (req, res) => {
  console.log("callback");

  // get the code, using this code we can get the access token
  const code = req.query.code || null;

  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code: code?.toString(),
    redirect_uri: REDIRECT_URI,
  });
  try {
    const response = await axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      data: params,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
      },
    });

    if (response.status === 200) {
      const { access_token, refresh_token, expires_in } = response.data;

      res.redirect(
        `${FRONTEND_URI}/?access_token=${access_token}&refresh_token=${refresh_token}&expires_in=${expires_in}`
      );
    } else {
      res.redirect(`/?error=invalid_token`);
    }
  } catch (error) {
    console.log(error);

    res.send(error);
  }
});

router.get("/refresh_token", (req, res) => {
  const { refresh_token } = req.query;

  const params = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refresh_token.toString(),
  });

  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: params,
    headers: {
      "content-type": "routerlication/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

export default router;
