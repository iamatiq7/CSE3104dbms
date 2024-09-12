## Guidelines to setup development environment
- Clone this repo into your local machine using this command `git clone https://github.com/Kingkon963/open_opd.git`
- Install Nodejs if you don't have from [here](https://nodejs.org/en/). Download the LTS version (16.17.0)
- Then create a database in MSSQL Studio
- Update the credentials in [this](https://github.com/Kingkon963/open_opd/blob/9526d60713a20ee55ffa9c41c266cce8b28ce700/src/main/main.ts) file to connect the database properly with our application
```
  const sqlConfig = {
      user: 'sa',                 // change to yours
      password: '123456',         // change to yours. Can be changed by opening Security -> Logins -> sa in the left panel pf MSSQL Studio
      database: 'open_opd',       // change this to the name you've given during creating the database
      server: 'NAIM\\SQLEXPRESS', // change this to your server name. Can be found in database property
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    };
 ```
- Open the project in VS Code
- Open terminal and run `npm install`
- Then run `npm run start`

