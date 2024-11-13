import { ReactElement } from "react";
import { Box, Typography, Link, Stack } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const About = (): ReactElement => {
    return (
        <Box sx={{ padding: "20px", maxWidth: "600px", margin: "auto", textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>
                About Me
            </Typography>
            <Typography variant="body1" component="h3">
                Welcome! This is my final project for the Developers Institute course.
            </Typography>
            <Typography variant="body1" paragraph>
                Connect with me on LinkedIn or check out my GitHub for more of my work.
            </Typography>

            <Stack direction="row" spacing={2} justifyContent="center">
                <Link href="https://www.linkedin.com/in/skibdan" underline="none"
                sx={{display: "flex", flexDirection: "column", alignItems:"center"}}
                >
                    <LinkedInIcon fontSize="large" sx={{ color: "#0e76a8" }} />
                    <Typography variant="subtitle1" component="span" sx={{ ml: 1 }}>LinkedIn</Typography>
                </Link>
                
                <Link href="https://github.com/skibfan/telavivian-map/" underline="none"
                sx={{display: "flex", flexDirection: "column", alignItems:"center"}}
                >
                    <GitHubIcon fontSize="large" sx={{ color: "#333" }} />
                    <Typography variant="subtitle1" component="span" sx={{ ml: 1 }}>GitHub</Typography>
                </Link>
            </Stack>
            <footer style={{textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Typography variant="subtitle2" sx={{ marginTop: 4, position: "fixed", width: "100%", bottom: 0, padding: "10px" }}>
                © 2024 Daniel Skibinskii. All rights reserved.
                </Typography>
            </footer>
        </Box>
    );
}

export default About;
