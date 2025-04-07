import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
      }
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
userSchema.methods.isPasswordCorrect = async function(password) {
   return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("user", userSchema);

export default userModel;