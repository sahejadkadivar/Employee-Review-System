// Importing necessary modules 
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import flash from 'connect-flash';
import passportLocal from './config/passport-local-strategy.js';
import db from './config/mongoose.js';
import customMware from './config/notymiddleware.js'
import router from './routes/index.js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve('config/.env') });

// Assigning port to run the server
const port  =process.env.PORT || 8000;

// Create an Express.js application (a framework for building web applications in Node.js)
const app = express();

//Set up the view engine
app.set('view engine', 'ejs');  // Setting EJS as the view engine
app.set('views', './views');  // Setting the views directory

//MongoStore is used to store the session cookie in the DB
app.use(session(
    {
        name: 'employee_review',
        secret: process.env.SECRET || "Aabra_ka_dabra",
        saveUninitialized: false,
        resave: false,
        cookie:
        {
            maxAge: (1000 * 60 * 100)
        }
    }
))


// Serving static files 
app.use(express.static('./assets'))  // Serve static files from the 'assets' directory
app.use(expressLayouts);  // Use express-ejs-layouts for layout support
app.use(cookieParser());  // Parse cookies

//Extract styles and scripts from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// middleware to allow program to use data from req.body
app.use(express.urlencoded({ extended: true }));


app.use(passport.initialize());  // Initialize Passport for authentication
app.use(passport.session());  // Use Passport to manage session
 
app.use(passport.setAuthenticatedUser);  // Set authenticated user in response locals

app.use(flash());   // Use connect-flash for flash messages
app.use(customMware);  // Use custom middleware for flash messages

// Redirecting requests to routes
app.use('/', router);

// run server on port
app.listen(port,function(error)
{
    if(error)
    {
        console.log(`Error in runnin the server. Error: ${error}`)
    }

    console.log(`Server is running on port: ${port}`)
})