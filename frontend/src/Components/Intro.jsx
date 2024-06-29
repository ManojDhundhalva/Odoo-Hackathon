import * as React from "react";
import { Typography, Container, Box } from "@mui/material";
import image1 from "../images/image1.jpg";

export default function Intro() {
  return (
    <Container maxWidth="xl" sx={{ mb: 2, userSelect: "none" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "60vh",
          width: "100%",
          paddingX: { xs: 1, sm: 2, md: 4 },
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            position: "relative",
            height: "100%",
            width: "100%",
            backgroundImage: `url(${image1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "16px",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: { xs: "50%", md: "28%", lg: "28%", xl: "30%" },
              left: { xs: "50%", md: "4%", lg: "4%", xl: "4%" },
              transform: { xs: "translate(-50%, -50%)", md: "none" },
              textAlign: { xs: "center", sm: "left", md: "left" },
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                lineHeight: "1.2",
                fontWeight: "bold",
              }}
            >
              Our latest products
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                mt: 2,
                width: { xs: "90%", md: "60%" },
                fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
              }}
            >
              Explore our cutting-edge dashboard, delivering high-quality
              solutions tailored to your needs. Elevate your experience with
              top-tier features and services.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
