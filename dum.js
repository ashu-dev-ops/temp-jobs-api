const token = jwt.sign({ userId: user._id, name: user.name }, "", {
    expiresIn: "30d",
  });
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });

  // // always use function dec;aration
// UserSchema.pre("save", async function (next) {
//   // here pre ("save" ) means before save document fire this function
//   const salt = await bcrypt.genSalt(10);
//   // here this refer to our this document
//   this.password = await bcrypt.hash(this.password, salt);
// //   pass next( important)
//   next();
// });

// in newer version without next works
// always use function dec;aration
// UserSchema.pre("save", async function (next) {
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// UserSchema.pre("save", async function () {
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });
// UserSchema.methods.createJwt = function () {
//   // console.log("hi");
//   return jwt.sign({ userId: this._id, name: this.name }, "jwt", {
//     expiresIn: "30d",
//   });
// };
  // email: {
  //   type: String,
  //   required: [true, "please provide email"],
  //   match: [
  //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  //     "Please provide a valid email",
  //   ],
  //   unique: true,
  // },