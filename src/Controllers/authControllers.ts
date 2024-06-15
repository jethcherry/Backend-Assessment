import { Request, Response } from "express";
import { v4 as uid } from "uuid";
import { sqlConfig } from "../config";
import mssql from 'mssql';
import { RegisterShema } from "../Helper";
import Bcrypt from 'bcrypt';
import { User } from "../Models/authModel";
import { Payload  } from "../Models/authModel";
import jwt from "jsonwebtoken";


export const registerUser = async (req: Request, res: Response) => {
    try {
        const id = uid();
        const { Name, Email, Password } = req.body;
        
        const { error } = RegisterShema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const hashedPassword = await Bcrypt.hash(Password, 10);

        let pool = await mssql.connect(sqlConfig);
        await pool.request()
            .input('Id', id)
            .input('Name', Name)
            .input('Email', Email)
            .input('Password', hashedPassword)
            .execute('addUser');

        return res.status(201).json({ message: "User was added successfully!" });
    } catch (error) {
        return res.status(500).json(error)
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { Email, Password } = req.body;
        let pool = await mssql.connect(sqlConfig);
        let user = (await pool.request()
            .input("Email", Email)
            .execute('getUser')).recordset as User[];

    //     if (!user) {
    //         return res.status(404).json({ message: "User not found" });
    //     }

    //     const validPassword = await bcrypt.compare(Password, user.Password);
    //     if (!validPassword) {
    //         return res.status(401).json({ message: "Invalid password" });
    //     }

    //     return res.status(200).json({ message: "Login successful", user });
    // } catch (error) {
    //     return res.status(500).json(error)
    // }
    // if(user.Email=='' && user.Id) {
if(user.length!==0) {
    
    const isValid = await Bcrypt.compare(Password,user[0].Password)
    if(isValid)
        {
            const payload:Payload={
                Sub:user[0].Id,
                Name:user[0].Name

            }
            const token = await jwt.sign(payload,process.env.SECRET as string,{expiresIn:'2h'})
            return res.status(200).json({message:"Login Successful",token})

        }
    }
        return res.status(200).json({message:"Invalid Credentials"})
    
    
}
    catch(error)
    {

    }
};
