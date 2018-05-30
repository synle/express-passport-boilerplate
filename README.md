# express-passport-boilerplate

## Special thanks to Scotch.io
Source: https://scotch.io/tutorials/easy-node-authentication-setup-and-local


## SQL Commands
```
sqlite3 db.sqlite3

.tables
user_facebooks  user_googles    user_locals     user_twitters

echo "select * from user_locals" | sqlite3 db.sqlite3;
echo "select * from user_googles" | sqlite3 db.sqlite3;
```


## Demo
```
https://express-passport-boilerplate.herokuapp.com/
```



## Google Authentication Config
More info can be found here: https://github.com/jaredhanson/passport-google-oauth2

- Register your app at Google API Console: https://console.developers.google.com/apis/dashboard
- Make sure oauth callback url ends with `/login/google/callback`
- Must enable `Google+ API` at https://console.cloud.google.com/apis/library/people.googleapis.com/?q=profile

### Required Env Params
```
export GOOGLE_CLIENT_ID='...'
export GOOGLE_CLIENT_SECRET='...'
export GOOGLE_CALLBACK_URL='https://express-passport-boilerplate.herokuapp.com/oauth/google'
```
