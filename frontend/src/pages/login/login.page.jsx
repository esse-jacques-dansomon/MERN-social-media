import {Box, Typography, useMediaQuery, useTheme} from "@mui/material";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const navigate = useNavigate();

    return <>
        <Box>
            <Box width={"100%"} backgriundColor={theme.palette.background.alt}
                 p={"1rem 6%"}  textAlign={"center"}>
                <Typography
                    fontWeight="bold"
                    fontSize="32px"
                    color="primary"
                    onClick={() => navigate("/home")}>
                </Typography>
            </Box>

            <Box width={"100%"} backgriundColor={theme.palette.background.alt} >
                
            </Box>
        </Box>
    </>
}

export default LoginPage;