import { Request } from "express";

export interface Product
{
    PRODUCTID:string
    PRODUCTNAME:string
    PRICE :string
    CATEGORYID:string
}

interface addProduct
{
    PRODUCTNAME:string
    PRICE :string
    CATEGORYID:string

}

export interface ProductRequest extends Request
{
    body:addProduct
}