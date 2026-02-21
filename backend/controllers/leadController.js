import Lead from "../models/Lead.js";

/* =========================
   CREATE LEAD
========================= */
export const createLead = async (req, res) => {
  try {
    const { name, email, source, followUpDate } = req.body;

    const lead = await Lead.create({
      name,
      email,
      source,
      followUpDate,
      activity: [
        {
          text: "Lead created",
          type: "create"
        }
      ]
    });

    res.status(201).json(lead);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   GET ALL LEADS
   With Filtering + Pagination
========================= */
export const getLeads = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const query = status ? { status } : {};

    const leads = await Lead.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Lead.countDocuments(query);

    res.json({
      total: count,
      page: Number(page),
      pages: Math.ceil(count / limit),
      leads
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   GET SINGLE LEAD
========================= */
export const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json(lead);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   UPDATE LEAD STATUS
========================= */
export const updateLeadStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    lead.status = status;

    lead.activity.unshift({
      text: `Status changed to ${status}`,
      type: "status"
    });

    await lead.save();

    res.json(lead);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   ADD NOTE TO LEAD
========================= */
export const addNoteToLead = async (req, res) => {
  try {
    const { text } = req.body;

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    lead.notes.push({ text });

    lead.activity.unshift({
      text: "Note added",
      type: "note"
    });

    await lead.save();

    res.json(lead);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   DELETE LEAD
========================= */
export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    await lead.deleteOne();

    res.json({ message: "Lead removed" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};