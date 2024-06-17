import { Request, Response, RequestHandler } from 'express';
import { v4 as uid } from 'uuid';
import { sqlConfig } from '../config/index.js';
import { Category,CategoryRequest } from '../Models/CategoryRequest.ts.js';
import mssql from 'mssql';
import { DbHelper } from '../DatabaseHelpers/index.js';

const dbInstance = new DbHelper
export const addCategory = async (req: CategoryRequest, res: Response) => {
    try {
        const id = uid();
        const { CATEGORYNAME, CATEGORY } = req.body;
        // const pool = await mssql.connect(sqlConfig);
        // await pool.request()
        //     .input("CATEGORYID", id)
        //     .input("CATEGORY", CATEGORY)
        //     .input("CATEGORYNAME", CATEGORYNAME)
        //     .execute('addCategory');
        await  dbInstance.exec("addCategory",{CATEGORYID:id,CATEGORY:CATEGORY,CATEGORYNAME:CATEGORYNAME})

        res.status(201).json({ message: "Category Created" });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getCategories: RequestHandler = async (req, res) => {
    try {
        // const pool = await mssql.connect(sqlConfig);
        // const categories = (await pool.request().execute('getCategories')).recordset as Category[];

        const categories = (await dbInstance.exec('getCategories',{})) .recordset as Category[];
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getCategory = async (req: Request<{ id: string }>, res: Response) => {
    try {
        // const pool = await mssql.connect(sqlConfig);
        // const category = (await pool.request()
        //     .input("CATEGORYID", req.params.id)
        //     .execute('getCategory')).recordset[0] as Category;
        const category = (await dbInstance.exec('getCategory',{CATEGORYID:req.params.id})).recordset[0] as Category;
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
        const { CATEGORY, CATEGORYNAME } = req.body;

        // Check if the category exists
        const result = await dbInstance.exec('getCategory', { CATEGORYID: req.params.id });
        const category = result.recordset[0] as Category;

        if (category) {
            // Update the category
            await dbInstance.exec('updateCategory', {
                CATEGORYID: req.params.id,
                CATEGORY,
                CATEGORYNAME
            });
            return res.status(200).json({ message: "Category updated" });
        }

        return res.status(404).json({ message: "Category Not Found" });
    } catch (error) {
        res.status(500).json({ error});
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
