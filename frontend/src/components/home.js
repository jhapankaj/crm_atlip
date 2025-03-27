import React from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import { Home, Work, FormatListNumbered, Watch, Language, SupervisorAccount } from "@mui/icons-material";

const HomePage = () => {
  const userName = JSON.parse(localStorage.getItem("user_data"))?.username || "Guest";

  return (
    <Box sx={{ padding: "20px", marginTop: "100px" }}>
      <Container>
        
        {/* Feature Grid */}
        <Grid container spacing={4} justifyContent="center">
          {/* Services item 1 */}
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", boxShadow: 3, padding: "20px", borderRadius: "8px" }}>
              <Home sx={{ fontSize: 75, color: "#274472", marginRight: 2 }} />
              <Box>
                <Typography variant="h6" gutterBottom>
                  <a href="/search/top_10" style={{ textDecoration: "none", color: "#274472" }}>
                    RECENT MATTERS
                  </a>
                </Typography>
                <Typography variant="body2" align="left">
                  List of 10 recently modified or added cases and IP titles.
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Services item 2 */}
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", boxShadow: 3, padding: "20px", borderRadius: "8px" }}>
              <Work sx={{ fontSize: 75, color: "#274472", marginRight: 2 }} />
              <Box>
                <Typography variant="h6" gutterBottom>
                  <a href="/portfolio" style={{ textDecoration: "none", color: "#274472" }}>
                    PORTFOLIO
                  </a>
                </Typography>
                <Typography variant="body2" align="left">
                  Access, search, and edit cases and IP titles data.
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Services item 3 */}
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", boxShadow: 3, padding: "20px", borderRadius: "8px" }}>
              <FormatListNumbered sx={{ fontSize: 75, color: "#274472", marginRight: 2 }} />
              <Box>
                <Typography variant="h6" gutterBottom>
                  <a href="/search/to_do_cases" style={{ textDecoration: "none", color: "#274472" }}>
                    TO DO
                  </a>
                </Typography>
                <Typography variant="body2" align="left">
                  List of 10 cases with fast approaching deadlines.
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Services item 4 */}
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", boxShadow: 3, padding: "20px", borderRadius: "8px" }}>
              <Watch sx={{ fontSize: 75, color: "#274472", marginRight: 2 }} />
              <Box>
                <Typography variant="h6" gutterBottom>
                  <a href="/search/deadline_patent" style={{ textDecoration: "none", color: "#274472" }}>
                    DEADLINES
                  </a>
                </Typography>
                <Typography variant="body2" align="left">
                  List of 10 IP titles with fast approaching deadlines.
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Services item 5 */}
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", boxShadow: 3, padding: "20px", borderRadius: "8px" }}>
              <Language sx={{ fontSize: 75, color: "#274472", marginRight: 2 }} />
              <Box>
                <Typography variant="h6" gutterBottom>
                  <a href="/search/report" style={{ textDecoration: "none", color: "#274472" }}>
                    OVERVIEW
                  </a>
                </Typography>
                <Typography variant="body2" align="left">
                  Portfolio stats and worldwide protection map.
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Admin Block - First Admin */}
          {JSON.parse(localStorage.getItem("user_data"))?.is_superuser && (
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ display: "flex", alignItems: "center", boxShadow: 3, padding: "20px", borderRadius: "8px" }}>
                <SupervisorAccount sx={{ fontSize: 75, color: "#274472", marginRight: 2 }} />
                <Box>
                  <Typography variant="h6" gutterBottom>
                    <a href="/admin_dash" style={{ textDecoration: "none", color: "#274472" }}>
                      ADMIN DASHBOARD
                    </a>
                  </Typography>
                  <Typography variant="body2" align="left">
                    Manage user access and other login credentials.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          )}

          
        </Grid>

        
      </Container>
    </Box>
  );
};

export default HomePage;