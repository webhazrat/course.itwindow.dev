import fs from "fs";
import path from "path";
import crypto from "crypto";
import multer from "multer";

export const generateOTP = () => {
  return crypto.randomInt(1000, 10000).toString();
};

export const uId = () => {
  const randdomString = crypto.randomBytes(6).toString("hex");
  return `${Date.now()}-${randdomString}`;
};

export async function sendOtpToPhone(phone, otp) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
}

export function multerStorage(name) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadsDir = path.join(process.cwd(), "public/uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir);
      }
      cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, name + ext);
    },
  });

  const upload = multer({ storage });
  return upload;
}

export const unlinkPhoto = (image) => {
  const currentPhotoPath = path.join(process.cwd(), "public/uploads", image);
  fs.unlink(currentPhotoPath, (error) => {
    if (error) {
      return;
    }
    return true;
  });
};
