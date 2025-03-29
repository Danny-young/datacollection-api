import e, { Router } from 'express';
import { createAgentSchema, agentsTable, loginSchema, changePasswordSchema } from '../../db/agentSchema.js';
import { validateData } from '../../middlewares/validationMiddleware.js';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../db/index.js';
import { eq,or } from 'drizzle-orm';
import nodemailer from 'nodemailer';



// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});


const router =  Router();

router.post('/register', validateData(createAgentSchema), async(req, res) => {
    try {    
        const data = req.cleanBody;
        const { email, phoneNumber } = data;
        const [user] = await db
            .select()
            .from(agentsTable)
            .where(
                or(eq(agentsTable.email, email), eq(agentsTable.phone_number, phoneNumber))
            );

        if (user) {
            if (user.phone_number === phoneNumber) {
                res.status(401).json({error: 'This number is already in use'});
                return;
            } 
            if (user.email === email) {
                res.status(401).json({error: 'This email is already in use'});
                return;
            }
        }

        // Generate random password
        const password = uuidv4().slice(0, 8);
        const hashedPassword = await bcrypt.hash(password, 10);

        // Agent Code generation
        // const agentCount = await db.select({ count: sql<number>`count(*)` }).from(agentsTable);
        // let newCount = Number(agentCount[0].count) + 1;
        // const username = `AG${String(newCount).padStart(3, "0")}`;

        // Insert new agent into the database with a temporary username
        const [newAgent] = await db.insert(agentsTable).values({
            name: data.name,
            email: data.email,
            phone_number: data.phone_number,
            password: hashedPassword,
            user_name: 'TEMP' // Add temporary username during insert
        }).returning({ id: agentsTable.id });

        const user_name = `AG${String(newAgent.id).padStart(3, "0")}`;
        
        // Update the agent with the generated username
        await db.update(agentsTable)
            .set({ user_name })
            .where(eq(agentsTable.id, newAgent.id));
            
       
        res.status(200).json({
            message: "Agent successfully created",
            AgentCode: user_name,
            temporaryPassword: password
        });
        return;

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"});
        return;
    }
});



router.post('/login',validateData(loginSchema), async(req, res) => {

    try {
        const {user_name, password } = req.cleanBody;

        const [user] = await db.select().from(agentsTable).where(eq(agentsTable.user_name,user_name));

        if(!user) {
            res.status(401).json({error: "Authentication failed"});
            return;
        }

        const match = await bcrypt.compare(password,user.password);
        if(!match) {
            res.status(401).json({error: "Authentication failed"});
            return;
        }


        // create a jwt token 
        // const token = jwt.sign({Userid: user.id, role:user.role}, 
        // 'your-secret', { expiresIn: '1h' });


        // @ts-ignore
        // delete user.password;
        // res.status(200).json({token, user});

        res.status(200).json({
            message: "Success!",
            user: {
                user_name: user.user_name,
                first_login: user.first_login,
                // other user data...
            }
        });
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
        
    }
})



router.post('/change-password',validateData(changePasswordSchema),async(req, res) => { // Middleware for validating input
    try {
        // Validate request data
        const { user_name, oldPassword, newPassword } = changePasswordSchema.parse(req.body);
    
        // Check if the user exists
        const [user] = await db.select().from(agentsTable).where(eq(agentsTable.user_name, user_name));
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
    
        // Verify old password
        const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isOldPasswordValid) {
          res.status(401).json({ error: 'Old password is incorrect' });
          return;
        }
    
        // Hash and save the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await db.update(agentsTable).set({ password: hashedNewPassword, first_login: false  }).where(eq(agentsTable.user_name, user_name));
    
        res.status(200).json({ message: 'Password changed successfully' });

     
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"});
        return;
    }
    });
    


    router.post('/Send-email',async(req, res) => { // Middleware for validating input
        try {
            console.log('Received email request:');

        } catch (error) {
            console.log(error);
            res.status(500).json({error: "Internal server error???"});
            return;
        }
    });
  

export default router;
