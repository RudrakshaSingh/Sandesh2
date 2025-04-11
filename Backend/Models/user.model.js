import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
   {
      fullname: {
         firstname: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
         },
         lastname: {
            type: String,
            trim: true,
            lowercase: true,
         },
      },
      email: {
         type: String,
         required: true,
         unique: true,
         trim: true,
         lowercase: true,
      },
      password: {
         type: String,
         required: true,
         trim: true,
      },
      mobileNumber: {
         type: String,
         trim: true,
      },
      address: {
         type: String,
         trim: true,
      },
      refreshToken: {
         type: String,
      },profileImage: {
         type: String,
         required: true,
      },
      forgotPasswordToken: {
         type: String,
      },
      forgotPasswordExpiry: {
         type: Date,
      },
   },
   {
      timestamps: true,
   }
);

// Pre-save hook to hash password before saving
userSchema.pre("save", async function(next) {
   // Only hash the password if it's modified (or new)
   if (!this.isModified("password")) return next();
       
   try {
      // Generate a salt
      const salt = await bcrypt.genSalt(10);
      
      // Hash the password with the salt
      this.password = await bcrypt.hash(this.password, salt);
      next();
   } catch (error) {
      next(error);
   }
});

// Method to compare password
userSchema.methods.comparePassword = async function(password) {
   return await bcrypt.compare(password, this.password);
};

// Method to generate access token
userSchema.methods.generateAccessToken = function() {
   return jwt.sign(
      {
         _id: this._id,
         email: this.email,
         fullname: this.fullname
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
         expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d"
      }
   );
};

// Method to generate refresh token
userSchema.methods.generateRefreshToken = function() {
   return jwt.sign(
      {
         _id: this._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
         expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d"
      }
   );
};

// Method to generate password reset token
userSchema.methods.generatePasswordResetToken = async function() {
   // Generate a random token
   const resetToken = crypto.randomBytes(32).toString("hex");
   
   // Hash the token and store it in the database
   this.forgotPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
   
   // Set expiry time - 15 minutes
   this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000;
   
   // Return the unhashed token (will be sent to user's email)
   return resetToken;
};

const userModel = mongoose.model("user", userSchema);

export default userModel;