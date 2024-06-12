import {Request} from 'express'

export interface CategoryRequest extends Request
{
    body:{
        
        CATEGORYNAME :string
        CATEGORY:string
    }
}

export interface Category
{
    CATEGORYID:number
    CATEGORYNAME :string
    CATEGORY:string
}