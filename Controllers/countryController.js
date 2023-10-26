const Country =require("../Models/Country");
const City =require("../Models/City")
module.exports = {
    addCountry: async (req,res, next)=>{

        const countryNames=req.body.name;
        try{
            await Promise.all(
                countryNames.map(async (name) => {
                  const newCountry = new Country({ name });
                  return await newCountry.save();
                })
        )
        res.status(200).json({status:true,id:req.user.id, message:"Country Added Successfully"})

    }
        catch(err)
        {
            return next(err);
        }

    },

    getCountries: async (req, res, next) => {
      
        try {
          const country = await Country.findAll(
           { attributes: { exclude: ['createdAt', 'updatedAt'] } }
          );
    
          if (!country) {
            return res
              .status(401)
              .json({ status: false, message: "Country does not exist" });
          }
          return res
          .status(200)
          .json(country);
        } catch (error) {
          return next(error);
        }
      },

      getcountrybyid: async (req, res, next) =>{
        try{
            const ids =req.params.id;
           
            const country =await Country.findOne({
                where: { id: ids }, // Find the country by ID
                include: City,
            });
            if (!country) {
                return res
                  .status(401)
                  .json({ status: false, message: "Country does not exist" });
              }
          return   res.status(200).json(country)

        }
        catch(err){
            return next(err);

        }
      }
}