import express from "express";
import {
  createLead,
  getLeads,
  getLeadById,
  updateLeadStatus,
  addNoteToLead,
  deleteLead
} from "../controllers/leadController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* All routes protected */
router.post("/", protect, createLead);
router.get("/", protect, getLeads);
router.get("/:id", protect, getLeadById);
router.put("/:id/status", protect, updateLeadStatus);
router.post("/:id/notes", protect, addNoteToLead);
router.delete("/:id", protect, deleteLead);

export default router;