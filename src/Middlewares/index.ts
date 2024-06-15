import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import path from 'path';
import dotenv from 'dotenv';
import { Payload } from '../Models/authModel';

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export interface ExtendedRequest extends Request {
    info?: Payload;
}

export function verifyTokens(req: ExtendedRequest, res: Response, next: NextFunction) {
    try {
        const token = req.headers['token'] as string;
        if (!token) {
            return res.status(401).json({ message: "Forbidden!" });
        }

        const decodeData = jwt.verify(token, process.env.SECRET as string) as Payload;
        req.info = decodeData;
    } catch (error) {
        return res.status(500).json({ message: "Invalid token", error });
    }

    next();
}

export const welcomePage = (req: ExtendedRequest, res: Response) => {
    try {
        res.status(200).send(`<h1>Welcome! ${req.info?.Name}</h1>`);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};
