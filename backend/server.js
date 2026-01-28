const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const db = require("./db"); // MySQL Connection

const app = express();

// middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(`[REQUEST] ${req.method} ${req.url}`);
    next();
});

// Debug Middleware: Log all requests
app.use((req, res, next) => {
    console.log(`[REQUEST] ${req.method} ${req.url}`);
    console.log('Body:', req.body);
    next();
});

// ----- Auth Routes -----

// Email Configuration
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vamsimuppagowni@gmail.com', // User provided
        pass: 'tntn nqbe qdpv sgdr'        // User provided App Password
    }
});

// Temporary OTP Store (In-memory)
const otpStore = new Map(); // email -> { otp, expires }

app.post("/api/auth/forgot-password", async (req, res) => {
    const { email } = req.body;
    try {
        const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (users.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Store OTP (valid for 10 mins)
        otpStore.set(email, { otp, expires: Date.now() + 10 * 60 * 1000 });

        // Send Email
        const mailOptions = {
            from: 'vamsimuppagowni@gmail.com',
            to: email,
            subject: 'Password Reset OTP - M-5 Farming',
            text: `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Email send error:", error);
                return res.status(500).json({ message: "Failed to send email" });
            }
            console.log('Email sent: ' + info.response);
            res.json({ message: "OTP sent successfully" });
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

app.post("/api/auth/reset-password", async (req, res) => {
    const { email, otp, newPassword } = req.body;

    const record = otpStore.get(email);
    if (!record) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    if (record.otp !== otp) {
        return res.status(400).json({ message: "Incorrect OTP" });
    }

    if (Date.now() > record.expires) {
        otpStore.delete(email);
        return res.status(400).json({ message: "OTP expired" });
    }

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await db.query("UPDATE users SET password = ? WHERE email = ?", [hashedPassword, email]);

        otpStore.delete(email); // Clear OTP
        res.json({ message: "Password reset successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

app.post("/api/auth/verify-otp", (req, res) => {
    const { email, otp } = req.body;

    const record = otpStore.get(email);
    if (!record) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    if (record.otp !== otp) {
        return res.status(400).json({ message: "Incorrect OTP" });
    }

    if (Date.now() > record.expires) {
        otpStore.delete(email);
        return res.status(400).json({ message: "OTP expired" });
    }

    res.json({ message: "OTP verified successfully" });
});

app.post("/api/register", async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        // Check if user exists
        const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (existing.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Insert new user
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", [
            name, email, hashedPassword, role
        ]);

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

app.post("/api/login", async (req, res) => {
    const { email, password, role } = req.body; // Role optional in check if we just check email/pass
    try {
        const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

        if (users.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const user = users[0];

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Optional: specific role check?
        // if (role && user.role !== role) ... 

        res.json({
            message: "Login successful",
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// ----- Temporary in-memory data (Phase-1) -----

let schemes = [
    {
        id: 1,
        name: "PM-KISAN",
        eligibility: "Small and marginal farmers",
        benefit: "₹6000 per year"
    },
    {
        id: 2,
        name: "Crop Insurance Scheme",
        eligibility: "All registered farmers",
        benefit: "Insurance against crop loss"
    }
];

let payments = [
    {
        farmerId: 101, // Mock farmer ID
        amount: 12000,
        status: "Paid",
        date: "2024-03-12"
    },
    {
        farmerId: 101,
        amount: 4500,
        status: "Received",
        date: "2024-01-15"
    }
];

let tips = [
    {
        id: 1,
        month: "June",
        type: "Tip",
        message: "Ensure proper irrigation during early monsoon"
    },
    {
        id: 2,
        month: "July",
        type: "Warning",
        message: "Watch out for pest attacks due to excess humidity"
    },
    {
        id: 3,
        month: "November",
        type: "Tip",
        message: "Best time to sow wheat is Nov 1st to Nov 15th."
    }
];

// test route
app.get("/api/schemes", (req, res) => {
    res.json(schemes);
});

app.get("/api/payments/:farmerId", (req, res) => {
    const farmerId = req.params.farmerId;
    const farmerPayments = payments.filter(
        payment => payment.farmerId == farmerId
    );
    res.json(farmerPayments);
});

app.get("/api/tips", (req, res) => {
    res.json(tips);
});

// ----- SMS Simulation Routes -----

// 1. Receive SMS from Farmer (e.g. "PRICE RICE")
app.post("/api/sms/receive", (req, res) => {
    const { from, message } = req.body;
    console.log(`[SMS-GATEWAY] Inbound SMS from ${from}: "${message}"`);

    let reply = "Invalid Command. Try: PRICE <CROP_NAME>";
    const cleanMsg = message.trim().toUpperCase();

    if (cleanMsg.startsWith("PRICE")) {
        const crop = cleanMsg.split(" ")[1];
        if (crop) {
            // Mock price lookup logic
            const price = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
            reply = `Mandi Prices: ${crop} is currently trading at ₹${price}/quintal in your area.`;
        }
    } else if (cleanMsg === "HELP") {
        reply = "Commands: PRICE <CROP>, STATUS <ORDER_ID>, WEATHER";
    }

    console.log(`[SMS-GATEWAY] Auto-Reply to ${from}: "${reply}"`);
    res.json({ status: "success", reply });
});

// 2. Send SMS to Farmer (Trade Updates, Reminders)
app.post("/api/sms/send", (req, res) => {
    const { to, message } = req.body;
    console.log(`[SMS-GATEWAY] Outbound SMS to ${to}: "${message}"`);
    res.json({ status: "success", message: "SMS Queued" });
});

// start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
