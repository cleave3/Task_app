import app from "./server";
import { PORT } from "./config/credentials";

app.listen(PORT, () => console.log(`App is running on ${PORT}`));