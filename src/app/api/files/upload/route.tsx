import nextConnect from "next-connect";
import multer from "multer";
import dbConnect from "@/lib/mongodb";
import File from "@/models/file";
import Project from "@/models/project";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  },
});

apiRoute.use(upload.array("files"));

apiRoute.post(async (req: any, res) => {
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

  res.status(201).json(savedFiles);
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apiRoute;
