import connectDB from "@/src/lib/connect";
import { checkAdmin } from "@/src/middleware/serverAuth";
import enrollModel from "@/src/models/enrollModel";
import courseModel from "@/src/models/courseModel";

// all enrollment requests to get a course [path:dashboard/enroll/requests]
export default async function handler(req, res) {
  if (req.method === "GET") {
    const { sortBy, sortOrder, pageIndex, pageSize } = req.query;
    const index = parseInt(pageIndex) || 0;
    const size = parseInt(pageSize) || 10;
    try {
      const session = await checkAdmin(req, res);
      const sort =
        sortBy && sortOrder ? { [sortBy]: sortOrder === "asc" ? 1 : -1 } : {};
      await connectDB();
      const enrolls = await enrollModel
        .find()
        .populate(["userId", "courseId"])
        .sort(sort)
        .skip(index * size)
        .limit(size);

      const total = await enrollModel.countDocuments();
      res.status(200).json({
        data: enrolls,
        total,
        page: Math.ceil(total / size),
        pageSize: size,
      });
    } catch (error) {
      console.log({ enrollsCatch: error });
      return res
        .status(500)
        .json({ status: 500, message: "Internal server error" });
    }
  } else {
    res
      .status(405)
      .json({ status: 405, message: "Request method not allowed" });
  }
}
