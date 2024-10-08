import { Request, Response } from "express"
import { wishlistSchema } from "../schema/wishlistSchema"
import { PrismaClient } from "@prisma/client"

const prismaClient = new PrismaClient()

export const AddWishlistHandler = async (req:Request,res:Response)=>{
      const userId = req.user.id
      const request = wishlistSchema.parse(req.body)

      const ExistingWishlist = await prismaClient.wishList.findFirst({
         where:{
            AND:[
                {userId:userId},
                {productId:request.productId}
            ]
         }
      })

      if(ExistingWishlist){
         const removeWIshlist = await prismaClient.wishList.delete({
             where:{id:ExistingWishlist.id},
             include:{
                product:true
             }
         })

         return res.status(200).json({wishlist:removeWIshlist,message:"Removed from wishlist!"})
      }else{
         const wishlist = await prismaClient.wishList.create({
             data:{
                 userId:userId,
                 productId:request.productId 
             },
             include:{
                product:true
             }
         })

         return res.status(201).json({wishlist,message:"Added to wishlist!"})
      }
}

export const RemoveWishlist = async (req:Request,res:Response)=>{
   const wishlistId = req.params.id
    const removeWIshlist = await prismaClient.wishList.delete({
        where:{id:+wishlistId},
        include:{
           product:true
        }
    })
    return res.status(200).json({wishlist:removeWIshlist,message:"Removed from wishlist!"})
}

