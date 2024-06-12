import { Request, Response, RequestHandler } from 'express';
import { v4 as uid } from 'uuid';
import { sqlConfig } from '../config/index.js';
import { Category,CategoryRequest } from '../Models/CategoryRequest.ts.js';
import mssql from 'mssql';

export const addCategory = async (req: CategoryRequest, res: Response) => {
    try {
        const id = uid();
        const { CATEGORYNAME, CATEGORY } = req.body;
        const pool = await mssql.connect(sqlConfig);
        await pool.request()
            .input("CATEGORYID", id)
            .input("CATEGORY", CATEGORY)
            .input("CATEGORYNAME", CATEGORYNAME)
            .execute('addCategory');
        res.status(201).json({ message: "Category Created" });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getCategories: RequestHandler = async (req, res) => {
    try {
        const pool = await mssql.connect(sqlConfig);
        const categories = (await pool.request().execute('getCategories')).recordset as Category[];
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getCategory = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const pool = await mssql.connect(sqlConfig);
        const category = (await pool.request()
            .input("CATEGORYID", req.params.id)
            .execute('getCategory')).recordset[0] as Category;
        if (category && category.CATEGORYID) {
            return res.status(200).json(category);
        }
        return res.status(404).json({ message: "Category Not Found" });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const updateCategory = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const pool = await mssql.connect(sqlConfig);
        const category = (await pool.request()
            .input("CATEGORYID", req.params.id)
            .execute('getCategory')).recordset[0] as Category;
        if (category && category.CATEGORYID) {
            const { CATEGORY, CATEGORYNAME } = req.body;
            await pool.request()
                .input("CATEGORYID", req.params.id)
                .input("CATEGORY", CATEGORY)
                .input("CATEGORYNAME", CATEGORYNAME)
                .execute('updateCategory');
            return res.status(200).json({ message: "Category updated" });
        }
        return res.status(404).json({ message: "Category Not Found" });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteCategory = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const pool = await mssql.connect(sqlConfig);
        const category = (await pool.request()
            .input("CATEGORYID", req.params.id)
            .execute('getCategory')).recordset[0] as Category;
        if (category && category.CATEGORYID) {
            await pool.request()
                .input('CATEGORYID', req.params.id)
                .execute('deleteCategory');
            return res.status(200).json({ message: "Category Deleted" });
        }
        return res.status(404).json({ message: "Category Not Found" });
    } catch (error) {
        res.status(500).json(error);
    }
};
