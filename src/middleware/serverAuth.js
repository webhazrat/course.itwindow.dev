import { getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import connectDB from "../lib/connect";
import userModel from "../models/userModel";
import enrollModel from "../models/enrollModel";
import paymentModel from "../models/paymentModel";
import { total } from "../lib/utils";

export async function checkAdmin(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    await connectDB();
    const user = await userModel.findById(session.user._id).select("role");
    if (user.role === "Admin") {
      return Promise.resolve(session);
    } else {
      return Promise.reject({ message: "Unauthorized route" });
    }
  }
  return Promise.reject({ message: "Unauthorized route" });
}

export async function checkLogin(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    return Promise.resolve(session);
  }
  return Promise.reject({ message: "Unauthorized route" });
}

export async function checkEnroll(req, res, enrollIds) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    await connectDB();
    const user = await userModel.findById(session.user._id).select("role");
    if (user.role === "Admin") {
      return Promise.resolve(session);
    } else {
      const enrolls = await enrollModel
        .find({ userId: session.user._id })
        .select("_id");
      const enrollIdsInc = enrollIds.some((id) =>
        enrolls.some((enroll) => enroll._id.toString() === id)
      );
      if (enrollIdsInc) {
        return Promise.resolve(session);
      } else {
        return Promise.reject({ message: "Unauthorized route" });
      }
    }
  }
  return Promise.reject({ message: "Unauthorized route" });
}

export async function checkEnrollPayment(enrollId) {
  await connectDB();
  const fee = await enrollModel
    .findById(enrollId)
    .populate({ path: "courseId", select: "fee" });

  const totalFee = fee && fee.courseId.fee;
  const payments = await paymentModel.find({
    enrollId,
  });
  const totalPaid = total(payments, "Approved");
  const totalPending = total(payments, "Pending");
  const totalDue = totalFee - totalPaid;
  const totalRequest = totalDue - totalPending;
  return Promise.resolve({
    totalFee,
    totalPaid,
    totalPending,
    totalDue,
    totalRequest,
  });
}
