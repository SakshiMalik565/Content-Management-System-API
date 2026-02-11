import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null,"uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "-" + path.extname(file.originalname));
    },
});

const fileFilter=(req,file,cb)=>{
    if(file.mimetype.startsWith("image/") || file.mimetype=== "application/pdf"){
        cb(null,true);
    }else{
        cb(Error("Only images and pdf files are allowed"),false);
    }
}

export const upload = multer({storage,
    fileFilter,
    limits:{
        fileSize: 1024 * 1024 * 5 //5mb
    }
});