const Cheque = require("../models/Cheque");
const Company = require("../models/Company");
const User = require("../models/User");

// Create Company
exports.createCompany = async (req, res) => {
  const {
    companyName,
    address,
    natureOfWork,
    rateOfTax,
    underSection,
    ntn,
    showToAdmin,
    userId,
    accessToDeleteLedger,
  } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Check if companyName already exists
    const existingCompany = await Company.findOne({
      companyName: { $regex: new RegExp(companyName, "i") },
    });

    if (existingCompany) {
      return res
        .status(400)
        .json({ message: "Company with the given name already exists" });
    }

    const company = new Company({
      companyName,
      address,
      natureOfWork,
      rateOfTax,
      underSection,
      ntn,
      showToAdmin,
      user: userId,
      accessToDeleteLedger,
    });

    // Add the new company to the user's companies array
    user.companies.push(company._id);

    // Save both the user and company
    await Promise.all([user.save(), company.save()]);

    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Companies
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find({ user: req.userId }).select(
      "_id companyName showToAdmin ntn accessToDeleteLedger"
    );
    const sortedCompanies = companies.sort((a, b) =>
      a.companyName.localeCompare(b.companyName)
    );

    res.json({ companies: sortedCompanies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Company for logged in user
exports.getMyCompany = async (req, res) => {
  try {
    const companies = await Company.find({ user: req.userId });
    if (companies.length == 0) {
      return res.status(404).json({ message: "Company not found" });
    }
    console.log("COMPANIES");
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Company
exports.getSingleCompany = async (req, res) => {
  try {
    const companies = await Company.findOne({ user: req.userId });
    if (companies.length == 0) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Company
exports.getCompany = async (req, res) => {
  const companyId = req.params.id;

  try {
    const company = await Company.findOne({ _id: companyId });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Find distinct bank names associated with the user in the Cheque collection
    const bankNames = await Cheque.distinct("bankName", { user: company.user });

    console.log("Bank Names", bankNames);

    // Add the bankNames array to the company object
    const companyWithBankNames = {
      ...company._doc, // Spread the existing company document
      bankNames, // Add the bankNames array
    };

    // Return the company with the bankNames included
    res.json(companyWithBankNames);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Company
exports.updateCompany = async (req, res) => {
  const companyId = req.params.id;
  const {
    companyName,
    address,
    natureOfWork,
    rateOfTax,
    underSection,
    ntn,
    showToAdmin,
    accessToDeleteLedger,
  } = req.body;

  try {
    // Find the company to be updated

    // let company;
    // console.log("User Type",req.type)
    // // Check if the logged-in user is an admin
    // if (req.type === "superAdmin") {
    //   // Allow admin to find any company by ID
    //   company = await Company.findOne({ _id: companyId });
    // } else {
    //   // Find the company associated with the user
    //   company = await Company.findOne({ _id: companyId, user: req.userId });
    // }

    // // const company = await Company.findOne({ _id: companyId, user: req.userId });
    // console.log("COMPANY NAME", company)
    // if (!company) {
    //   return res.status(404).json({ message: "Company not found" });
    // }

    const company = await Company.findOne({ _id: companyId }).populate("user");

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    if (company.user.type === "admin" || company.user.type === "superAdmin") {
      // Allow admin or superAdmin actions
      console.log("Admin or SuperAdmin Access");
    } else {
      // Regular user actions
      console.log("Regular User Access");
    }

    // Check if companyName already exists
    const existingCompany = await Company.findOne({
      companyName: { $regex: new RegExp(companyName, "i") },
    });

    if (existingCompany && existingCompany.id != company.id) {
      return res
        .status(400)
        .json({ message: "Company with the given name already exists" });
    }
    // Update the company fields
    company.companyName = companyName;
    company.address = address;
    company.natureOfWork = natureOfWork;
    company.rateOfTax = rateOfTax;
    company.underSection = underSection;
    company.ntn = ntn;
    company.showToAdmin = showToAdmin;
    company.accessToDeleteLedger = accessToDeleteLedger;

    // Save the updated company
    const updatedCompany = await company.save();

    // Response with the updated company details
    res.json(updatedCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Company
exports.deleteCompany = async (req, res) => {
  const companyId = req.params.id;

  try {
    // Find the company to be deleted
    const company = await Company.findOne({ _id: companyId});

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Find the user and remove the company from their companies array
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is either the owner of the company or an admin
    if (company.user.toString() !== req.userId && user.type !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this company" });
    }

    // Remove the company from the user's companies array
    user.companies = user.companies.filter(
      (userCompanyId) => userCompanyId.toString() !== companyId
    );

    // Save the updated user
    await user.save();

    // Delete the company
    await Company.deleteOne({ _id: companyId });

    res.json({ id: companyId, message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Users with their Companies
exports.getAllUsersAndCompanies = async (req, res) => {
  try {
    const usersWithCompanies = await User.find({}).populate(
      "companies",
      "companyName showToAdmin _id ntn accessToDeleteLedger"
    );
    const formattedData = usersWithCompanies.map((user) => ({
      username: user.username,
      companies: user.companies.map((company) => ({
        companyName: company.companyName,
        showToAdmin: company.showToAdmin,
        companyId: company._id,
        ntn: company.ntn,
        accessToDeleteLedger: company.accessToDeleteLedger,
      })),
    }));

    // Sort the companies based on companyName
    formattedData.forEach((user) => {
      user.companies.sort((a, b) => {
        const nameA = a.companyName.toUpperCase();
        const nameB = b.companyName.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    });

    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update ShowToAdmin Status
exports.updateShowToAdminStatus = async (req, res) => {
  const companyId = req.params.id;
  const { showToAdmin } = req.body;

  try {
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Update the showToAdmin status
    company.showToAdmin = showToAdmin;

    // Save the updated company
    await company.save();

    res.json({ message: "ShowToAdmin status updated successfully", company });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
