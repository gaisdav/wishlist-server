import 'reflect-metadata';
import * as HyperExpress from 'hyper-express';
import dotenv from 'dotenv';
import PassportGoogleOAuth from 'passport-google-oauth20';
import passport from 'passport';
import { bootstrap } from './bootstrap';
import cors from 'cors';

dotenv.config();
const { Strategy } = PassportGoogleOAuth;

const app = new HyperExpress.Server();

app.use(cors());

passport.use(
  // TODO: fix any
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  new Strategy(
    {
      clientID: 'clientID',
      clientSecret: 'clientSecret',
      // use TODO  auth/google/callback https://dev.to/ngl4/setting-up-passportjs-google-oauth20-possible-causes-of-internal-server-error-2i33
      callbackURL: 'http://localhost:5173/auth',
      userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
      scope: ['email', 'profile'],
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log('!!!!');
      console.log(accessToken);
      console.log(profile);
      cb(null, profile);
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
    },
  ),
);

// TODO: fix any
app.get(
  '/auth/google/new',
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  passport.authenticate('google', { scope: ['profile'] }),
);
app.get('/auth', (request, response) => {
  console.log(request);
  console.log(response);
});

void bootstrap(app).then((server) => {
  server
    .listen(80)
    .then(() => {
      console.log('Webserver started on port 80');
    })
    .catch((error: unknown) => {
      console.log('Failed to start server on port 80', error);
    });
});
