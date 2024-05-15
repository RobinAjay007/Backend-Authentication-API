const multer = require('multer');
const path = require('path');
const User = require('../models/User');


let counts=0;



const getProfile = async (req, res) => {
    try {
        console.log(req.user.username)
        const user = await User.findOne({ username: req.user.username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const uploadToFolder= multer.diskStorage({
    destination: function(req,res,cb) {
        // path operation insert and get 
        cb(null, path.join(__dirname,'../../upload/images'));
    },
    filename:function (req,file ,cb){
        let ext = path.extname(file.originalname);
        console.log(ext,"filefunction")
        counts++;
        cb(null,Date.now()+ counts.toString()+ ext);
    },
});


const   upload = multer({
    storage:uploadToFolder,

    fileFilter:function (req, file, callback){
        if(
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"||
            file.mimetype == "image/webp"
        ){
            callback(null,true);
        }
        else{
            callback(null,false);
        }
    },

    limits:{
        fileSize: 5024 * 5024 * 5,
    },
});

const uploadPhoto =async (req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:4898/picture/${req.file.filename}`
    })
}

const uploadImage= async(req,path)=>{
    let id = req.params.id;
    console.log(path)
    let getUserID=await User.findById(id);
    if(!getUserID){
       console.log("user not found")
    }
    else{
      const uploadprofile = await User.findByIdAndUpdate({_id:id},{photo:`http://localhost:4898/picture/${path}`},{new:true});
      return uploadprofile;
    }
  }

  const updateImage= async (req,res)=>{
    data=req.file;
    console.log(data)
    if(data){
      // let path="/public"
      let fileName = data.filename
      console.log(fileName,"Controller")
      const userData = await uploadImage(req,fileName)
      res.send(userData);
    }
    else{
      res.status(400).send("upload Failed");
    }
  }


const editProfile = async (req, res) => {
    try {
        const { username, password, photo, bio, phone, email, privacy } = req.body;
        const user = await User.findOne({ username: req.user.username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (username) user.username = username;
        if (password) user.password = password;
        if (photo) user.photo = photo;
        if (bio) user.bio = bio;
        if (phone) user.phone = phone;
        if (email) user.email = email;
        // if (privacy) user.privacy = privacy;
        await user.save();
        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const getPublicProfiles = async (req, res) => {
    try {
        
        // Find public profiles in the database
        const publicProfiles = await User.find({ privacy: 'public' }).select('-password');
        res.json({ profiles: publicProfiles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




module.exports = { getProfile, editProfile,upload ,uploadPhoto, updateImage,getPublicProfiles, };
