export const errorhandler = (req,res,next)=>{
    res.status(404).json({
        success:false,
        message:"Route Not Found",
    });
}