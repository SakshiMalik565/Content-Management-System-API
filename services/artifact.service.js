import artifact from "../models/artifact.js";
import cloudinary from "../config/cloudinary.js";
export const createArtifactService = async (data) => {
    const { title, content, userId } = data;
    if(!title || !content) {
        throw new Error("Title and content are required");
    }

    const newArtifact = await artifact.create({
        title,
        content,
        author: userId
    });
    return newArtifact;
};
// export const createArtifactService = async ({
//   let mediaUrl=null
//   if(filePath){
//     const uploadResult=await cloudinary.uploader(
//       filePath,
//       {
//         folder:"cms-artifacts"
//       }
//     );
//     mediaUrl=uploadResult.secure_url

//     FileSystem.unlinkSync(filePath);
//   };
//   console.log("Media url before save",mediaUrl);
  
//   const artifact=await artifact.create({
//     title,
//     content,
//     author:userId,
//     media:mediaUrl || null
//   })
//   return artifact;
// }) ;
export const getArtifactsService = async ({ userId, role }) => {
  if (role === "ADMIN") {
    // Admin sees everything
    return await artifact.find().populate("author", "name email role");
  }

  // Non-admin sees only their own artifacts
  return await artifact.find({ author: userId });
};