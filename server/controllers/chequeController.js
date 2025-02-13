const User = require("../models/User");
const Cheque = require("../models/Cheque");
const Ledger = require("../models/Ledger");
const upload = require("../middlewares/upload");

// Create Cheque
exports.createCheque = async (req, res) => {
  try {
    const { bankName, checkNo } = req.body;
    const chequeImage = req.file ? `uploads/${req.file.filename}` : null; // Get uploaded file path

    // console.log("Received Image:", req.file); // Debugging log

    // Check if checkNo already exists
    const existingCheque = await Cheque.findOne({ checkNo });
    if (existingCheque) {
      return res.status(400).json({ message: "Cheque already exists" });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cheque = new Cheque({
      bankName,
      checkNo,
      user: req.userId,
      chequeImage, // Save filename
    });

    await cheque.save();

    // Construct full image URL
    const imageUrl = chequeImage
      ? `${req.protocol}://${req.get("host")}/uploads/${chequeImage}`
      : null;

    res.status(201).json({
      message: "Cheque created successfully",
      cheque: { ...cheque._doc, chequeImage: imageUrl },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get All Cheques of User
exports.getAllCheques = async (req, res) => {
  try {
    const cheques = await Cheque.find({ user: req.userId });

    const bankIdCounterMap = new Map();

    // Get the list of cheque numbers used in ledger
    const usedChequeNumbers = new Set(await Ledger.distinct("chequeNo"));

    // Filter out cheques that are used in ledger
    const filteredCheques = cheques.filter(
      (cheque) => !usedChequeNumbers.has(cheque.checkNo)
    );

    const formattedCheques = [];

    filteredCheques.forEach((cheque) => {
      const { bankName, checkNo, _id, created_at, chequeImage } = cheque;

      // console.log("Cheque Image:", chequeImage);

      // Generate full image URL if chequeImage exists
      const imageUrl = chequeImage
        ? `${req.protocol}://${req.get("host")}/${chequeImage}`
        : null;

      // If the bank is not yet added, initialize it
      if (!bankIdCounterMap.has(bankName)) {
        bankIdCounterMap.set(bankName, 1);
      }

      const existingBankIndex = formattedCheques.findIndex(
        (item) => item.bankName === bankName
      );

      if (existingBankIndex === -1) {
        formattedCheques.push({
          bankName,
          chequeNo: [
            {
              chequeId: _id,
              chequeNo: checkNo,
              created_at,
              chequeImage: imageUrl, // Store full image URL
            },
          ],
        });
      } else {
        formattedCheques[existingBankIndex].chequeNo.push({
          chequeId: _id,
          chequeNo: checkNo,
          created_at,
          chequeImage: imageUrl, // Store full image URL
        });
      }

      // Increment bank counter
      bankIdCounterMap.set(bankName, bankIdCounterMap.get(bankName) + 1);
    });

    // Assign unique IDs to formatted cheques
    formattedCheques.forEach((obj, index) => {
      obj.id = index + 1;
    });

    res.json(formattedCheques);
  } catch (error) {
    console.error("Error fetching cheques:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




// Get Cheque by ID
exports.getChequeById = async (req, res) => {
  const chequeId = req.params.id;

  try {
    const cheque = await Cheque.findOne({ _id: chequeId, user: req.userId });

    if (!cheque) {
      return res.status(404).json({ message: "Cheque not found" });
    }

    res.json(cheque);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Cheque
exports.updateCheque = async (req, res) => {
  const chequeId = req.params.id;
  const { bankName, checkNo } = req.body;

  try {
    const cheque = await Cheque.findOne({ _id: chequeId, user: req.userId });

    if (!cheque) {
      return res.status(404).json({ message: "Cheque not found" });
    }

    cheque.bankName = bankName;
    cheque.checkNo = checkNo;

    const updatedCheque = await cheque.save();

    res.json({ message: "Cheque updated successfully", cheque: updatedCheque });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Cheque
exports.deleteCheque = async (req, res) => {
  const chequeId = req.params.id;

  try {
    const cheque = await Cheque.findOne({ _id: chequeId, user: req.userId });

    if (!cheque) {
      return res.status(404).json({ message: "Cheque not found" });
    }

    const isExistInLedger = await Ledger.findOne({ chequeNo: cheque.chequeNo });

    if (isExistInLedger) {
      return res.json({
        message: "Cannot delete this cheque because this is present in ledger.",
      });
    }
    await Cheque.findByIdAndDelete(chequeId);

    // console.log("List Of Cheque", cheque);

    // Check if any other cheques are associated with the same bank
    const chequesInBank = await Cheque.findOne({ bank: cheque.bank });

    if (!chequesInBank) {
      // No cheques left for this bank, delete the bank
      await Bank.findByIdAndDelete(cheque.bank);
    }

    res.json({ id: chequeId, message: "Cheque deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Cheques by Bank Name
exports.getChequesByBank = async (req, res) => {
  // const bankName = req.params.bankName;
  const { bankName, selectedUserId } = req?.body;

  try {
    // Get all cheques for the bank
    const cheques = await Cheque.find({ user: selectedUserId, bankName });

    if (!cheques || cheques.length === 0) {
      return res
        .status(404)
        .json({ message: "No cheques found for the specified bank" });
    }
    // Get the list of cheque numbers used in ledger
    const usedChequeNumbers = await Ledger.distinct("chequeNo");

    // Filter out cheques that are used in ledger
    const filteredCheques = cheques.filter(
      (cheque) => !usedChequeNumbers.includes(cheque.checkNo)
    );
    const bankIdCounterMap = new Map();
    const formattedCheques = [];

    filteredCheques.forEach((cheque) => {
      const { bankName, checkNo, _id, created_at } = cheque;

      if (!bankIdCounterMap.has(bankName)) {
        bankIdCounterMap.set(bankName, 1);
      }

      const bankIdCounter = bankIdCounterMap.get(bankName);

      const existingBankIndex = formattedCheques.findIndex(
        (item) => item.bankName === bankName
      );

      if (existingBankIndex === -1) {
        formattedCheques.push({
          bankName,
          chequeNo: [{ chequeId: _id, chequeNo: checkNo, created_at }],
        });
      } else {
        const existingBank = formattedCheques[existingBankIndex];
        existingBank.chequeNo.push({ id: _id, chequeNo: checkNo, created_at });
      }

      bankIdCounterMap.set(bankName, bankIdCounter + 1);
    });

    formattedCheques.forEach((obj, index) => {
      obj.id = index + 1;
    });

    res.json(formattedCheques);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Cheque Error", error);
  }
};

// Get Cheques of All Users
exports.getAllChequesForAllUsers = async (req, res) => {
  try {
    const cheques = await Cheque.find({})
      .select("bankName checkNo user -_id")
      .populate("user", "username -_id");

    if (cheques.length === 0) {
      return res.status(404).json({ message: "No cheques found for any user" });
    }

    const formattedData = cheques.map((cheque) => ({
      id: cheque._id,
      bankName: cheque.bankName,
      checkNo: cheque.checkNo,
      username: cheque.user.username,
      created_at: cheque.created_at,
    }));

    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
