------- Team Members -------------------------

190204081 - Md. Naimul Islam Kingkon
190204086 - Kazi Atiqur Rahman
190204073 - Intishar Rahman Nafi
190204070 - Faiyaz Ahmed Rabbi

-----------------------------------------


------- Steps to RUN the project ----------------------------------------

1. Configuring the Database
 1.1. CREATE a database named 'open_opd'
 1.2. Please run the SQL located in 'DB/open_opd.sql' to generate the Tables and insert dummy data. 
 1.2. Please open 'src/main/main.ts' file and go to the 124 no. line. There should be the following config object,
	 const sqlConfig = {
      		user: 'sa', <-- Please put your SQL Server username here
      		password: '123456', <-- Please put your user's password here
      		database: 'open_opd',
      		server: 'NAIM\\SQLEXPRESS', <-- Please put your server address here. 
						[If the name contains '\', then please replace that with double backslash '\\']
      		options: {
        		encrypt: false,
        		trustServerCerti: true, // change to true for local dev / self-signed certs
      		},
    	 };
2. Please install the Nodejs environment if you don't have one. 
   [https://nodejs.org/dist/v16.17.0/node-v16.17.0-x64.msi]
3. Open a Terminal/CMD in the project's directory
4. Please run `npm install` (without quotation mark) 
   [It'll install all the dependencies and therefore may take some time. It requires a stable internet connection]
5. Please run `npm run start` to RUN the application


--------Steps to BUILD the project --------------------------------------

1. Please run `npm run package` in the terminal/cmd at the project's root directory
2. An executable file will be generated at the 'release/build/' folder
