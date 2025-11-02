import { createRouter } from "next-connect";
import multer from "multer";
import dbConnect from "@/lib/mongodb";
import File from "@/models/file";
import Project from "@/models/project";
import { NextRequest, NextResponse } from "next/server";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  }),
});

const router = createRouter<NextRequest, NextResponse>();

router.use(upload.array("files"));

router.post(async (req: any, res: any) => {
  await dbConnect();
  const { projectId } = req.body;
  const filesData = req.files.map((file: any) => ({
    projectId,
    filename: file.originalname,
    filepath: `/uploads/${file.filename}`,
    mimetype: file.mimetype,
    size: file.size,
  }));

  const savedFiles = await File.insertMany(filesData);
  await Project.findByIdAndUpdate(projectId, { $push: { files: { $each: savedFiles.map(f => f._id) } } });

  return res.status(201).json(savedFiles);
});

export async function POST(req: NextRequest) {
  return router.run(req);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
