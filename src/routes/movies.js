const {Router}=require("express")
const router=Router()
const _ =require("underscore")


const movies=require("./sample.json")
console.log(movies)

router.get("/",(req,res)=>{
    res.send(movies)
})
router.post("/",(req,res)=>{
//    console.log(req.body)
   const{title,director,category,year,ranking}=req.body
   if(title && director && category && year && ranking){
    const id= movies.length+1
    //console.log(id)
    const newMovie={id,...req.body}
    console.log(newMovie)
    //res.json("SAVE")
    movies.push(newMovie)
    res.json(movies)
   }else{
    // res.send("Wrong Request")
    res.status(500).json({error:"There was an error."})
   }
   
})
router.put("/:id",(req,res)=>{
    const {id}=req.params
    const{title,director,category,year,ranking}=req.body
    if(title && director && category && year && ranking){
        _.each(movies,(movie,i)=>{
            if(movie.id==id){
                movie.title=title,
                movie.director=director,
                movie.category=category,
                movie.year=year,
                movie.ranking=ranking
            }
        })
        res.json(movies)
       }else{
        res.status(500).json({error:"There was an error."})
       }
})
router.delete("/:id",(req,res)=>{
    const {id}=req.params
    _.each(movies,(movie, i)=>{
        if(movie.id==id){
            movies.splice(i,1)
        }
    })
   res.send(movies)
})

module.exports=router