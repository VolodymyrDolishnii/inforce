import { CommentType } from "./CommentType"

export type Product = {
     id : number,
     imageUrl : string,
     name : string,
     count : string,
     size : {
     width : number,
     height : number
    },
     weight :  string ,
     comments : Array<CommentType>
}
    