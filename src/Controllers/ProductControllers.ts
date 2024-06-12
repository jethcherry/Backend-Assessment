import {Request,Response,RequestHandler} from 'express'
import {v4 as uid} from 'uuid'
import { sqlConfig } from '../config'
import mssql from 'mssql'
import { Product, ProductRequest } from '../Models/ProductModel'

export const addProduct=async (req:ProductRequest,res:Response)=>{
    try {
        

        const {PRODUCTNAME, PRICE,CATEGORYID}=req.body
        const id=uid()
        let pool= await mssql.connect(sqlConfig)
        await pool.request()
        .input("PRODUCTID",id)
        .input('PRODUCTNAME',PRODUCTNAME)
        .input('PRICE',PRICE)
        .input('CATEGORYID',CATEGORYID)
        .execute('addProduct')
        return res.status(201).send('<h1> Product Added</h1>')
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getProducts=async (req:Request,res:Response)=>{
    try {
        let pool= await mssql.connect(sqlConfig)
        const products= (await pool.request().execute('getProducts')).recordset as Product[]
        return res.status(200).json(products)
       
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

export const getProduct=async (req:Request<{id:string}>,res:Response)=>{
    try {
        let pool= await mssql.connect(sqlConfig)
       const product= (await pool.request()
        .input('CATEGORYID',req.params.id)
        .execute('getProduct')).recordset[0] as Product

        if(product && product.CATEGORYID){
            return res.status(200).json(product)
        }
        return res.status(404).json({Message:'Product not Found!'})
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const updateProduct=async (req:Request<{id:string}>,res:Response)=>{
    try {
        
        let pool= await mssql.connect(sqlConfig)
        const product= (await pool.request()
         .input('CATEGORYID',req.params.id)
         .execute('getProduct')).recordset[0] as Product
 
         if(product && product.CATEGORYID){
            const {PRODUCTNAME,PRICE,CATEGORYID}=req.body
            await pool.request()
            .input('PRODUCTNAME',PRODUCTNAME)
            .input('PRICE',PRICE)
            .input('CATEGORYID',CATEGORYID)
            .execute('updateProduct')
             return res.status(200).json({message:"Product Updated!"})
         }
         return res.status(404).json({Message:'Product not Found!'})
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const deleteProduct=async (req:Request<{id:string}>,res:Response)=>{
    try {
        let pool= await mssql.connect(sqlConfig)
        const book= (await pool.request()
         .input('Id',req.params.id)
         .execute('getBook')).recordset[0] as Product
 
         if(book && book.CATEGORYID){
            await pool.request()
            // .query(`DELETE FROM Book WHERE Id='${req.params.id}'`)
            .input('CATEGORYID', req.params.id)
            .execute('deleteProduct')
             return res.status(200).json({Message:"Product deleted Sucessfully!!"})
         }
         return res.status(404).json({Message:'Product not Found!'})
    } catch (error) {
        return res.status(500).json(error)
    }
}

