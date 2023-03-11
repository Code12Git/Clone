import mongoose from "mongoose";

const connectionurl =
  process.env.DATABASE ||
  "mongodb+srv://Sak12:Saxena@cluster0.os363zi.mongodb.net/Netflix?retryWrites=true&w=majority";

mongoose.set("strictQuery", false);
mongoose.set("debug", true);
const connection = async () => {
  try {
    await mongoose.connect(connectionurl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connection established");
  } catch (error) {
    console.log(error);
  }
};
export default connection;
