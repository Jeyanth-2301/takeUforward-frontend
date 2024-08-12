import { alpha, createTheme } from "@mui/material/styles";
import { Amaranth } from "next/font/google";

const amarnath = Amaranth({
    weight: ["400", "700"],
    subsets: ["latin"]
});

const theme = createTheme({
    palette:{
        background: {
            default: ""
        }
    }
})

export default theme;