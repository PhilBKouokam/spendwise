// backend/controllers/uploadController.js
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../config/aws.js";
import Transaction from "../models/Transaction.js";

export const uploadReceipt = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                message: "No file uploaded",
                receivedFiles: req.file,
                receivedBody: req.body 
            });
        }

        const file = req.file;
        const transactionId = req.params.id;

        const fileName = `receipts/${transactionId}-${Date.now()}-${file.originalname}`;

        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        await s3Client.send(new PutObjectCommand(uploadParams));

        const receiptUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

        const transaction = await Transaction.findByIdAndUpdate(
            transactionId,
            { receiptUrl },
            { new: true }
        );

        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.json({
            message: "Receipt uploaded successfully",
            receiptUrl,
            transaction
        });

    } catch (err) {
        console.error("Upload Error:", err);
        res.status(500).json({ message: "Failed to upload receipt" });
    }
};