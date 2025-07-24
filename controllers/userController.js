const User= require("../models/user");

const GetSearchedUsers=async(req,res)=>
{
    try{
           let query = {};
        const {search,role,isVerified,page=1,limit=10}=req.query;
        const regex= new RegExp(search, 'i');
        if(search)
        {
            query.$or=[
                {name:{$regex:regex}},
                {email:{$regex:regex}}
            ];
        }

        if(role)
        {
            query.role=role;
        }

        if(isVerified=='true' || isVerified=='false')
        {
            query.isVerified=isVerified==="true";
        }

        const totalusers= await User.countDocuments(query);
        const totalpages=Math.ceil(totalusers/limit);
        const currentPage=Number(page);

        const users= await User.find(query)
            .skip((currentPage-1)*limit)
            .limit(Number(limit))
            .select("-password -otp")
            .sort({createdAt:-1});

            return res.status(200).json({
                success:true,
                message:"Users fetched successfully",
                data:users,
                totalUsers:totalusers,
                totalPages:totalpages,
                currentPage
            });


    }
    catch(error)
    {
        console.error("Admin User Fetch Error:", error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message
        });

    }
}

module.exports = {
    GetSearchedUsers            
};