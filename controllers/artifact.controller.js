import { createArtifactService, getArtifactsService } from "../services/artifact.service.js";
import cloudinary from "../config/cloudinary.js";

export const createArtifact = async (req, res) => {
  try {
    let mediaUrl = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload_stream(
        { folder: "artifacts" },
        async (error, result) => {
          if (error) {
            throw new Error("Cloudinary upload failed");
          }

          const artifact = await createArtifactService({
            title: req.body.title,
            content: req.body.content,
            userId: req.user.id,
            media: result.secure_url
          });

          return res.status(201).json({
            success: true,
            artifact
          });
        }
      );

      result.end(req.file.buffer);
    } else {
      const artifact = await createArtifactService({
        title: req.body.title,
        content: req.body.content,
        userId: req.user.id,
        media: null
      });

      return res.status(201).json({
        success: true,
        artifact
      });
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getArtifacts = async (req, res) => {
  try {
    const artifacts = await getArtifactsService({
      userId: req.user.id,
      role: req.user.role
    });

    res.status(200).json({
      success: true,
      artifacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
