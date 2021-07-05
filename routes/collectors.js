const express=require('express')
const collector=require('../models/collector');
const router=express.Router();
const Collector=require('../models/collector');

//getting all
router.get('/',async(req,res)=>{
    try{
        const collectors=await Collector.find();
        res.json(collectors);
    }catch(err){
        res.status(500).json({message:err.message});
    }
})

//search page
router.get('/search',async (req,res)=>{
    try{
        const collectors=await Collector.find();
        res.render('search',{collectors:collectors})
    }catch(err){
        res.status(500).json({message:err.message});
    }    
})

//search by numberOfFilters
router.post('/result',getCollector,(req,res)=>{
    res.render('result',{collector:res.collector})
})




//creating one
router.post('/',async(req,res)=>{
    const collector=new Collector({
        title:req.body.title,
        numberOfFilters:req.body.numberOfFilters,
    });
    try{
        const newCollector=await collector.save();
        res.status(201).json(newCollector)
    }catch(err){
        res.status(400).json({message:err.message});
    }
})


async function getCollector(req,res,next){
    let collector 
    try{
        collector=await Collector.find({
            numberOfFilters:req.body.numberOfFilters
        });
        res.collector=collector
    }catch(err){
        return res.status(500).json({message:err.message});
    }
    next()
}
module.exports=router;

