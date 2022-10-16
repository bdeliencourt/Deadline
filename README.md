# Deadline API 

## post("/update-profile")
Protected by Bearer Token
* Update the current user profile
* Input: email : string, address : string

## post("/login")
Protected by passport local session strategy middleware
* Perform the user connexion using persistent sessions stored in MongoDB database 
* Input: username : string, password : string

## get("/get-profile")
Protected by Bearer Token
* Return the user profile.
* Output: username : string, firstname : string, lastname: string, phone: string, email: string, address: string

## get("/logout")
Protected by passport local session strategy middleware
* Log out the user and delete the corresponding session 

## get("/get-user")
Protected by passport local session strategy middleware
* Sign a new token for the current user session
* Output: token : string

## delete("/delete-account")
Protected by Bearer Token
* Delete the user in the database
