import { Box, List, ListItem, Typography } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { LandingPageTexts } from './text';
import TeamMember from './TeamMember';

function Team() {
  const theme = useTheme();

  return (
    <Box sx={{ pr: 5, pt: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', pr: 5 }} align="right">
        Our Team
      </Typography>
      <List>
        {LandingPageTexts.team.map((member) => (
          <ListItem key={member.name}>
            <TeamMember member={member} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default connect()(Team);
