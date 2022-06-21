import Drawer from '@mui/material/Drawer';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AddIcon from '@mui/icons-material/Add';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandableItem from './ExpandableItem';
import Collapse from '@material-ui/core/Collapse';
import Selector from './Selector';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';

import { outerTheme } from './HomePageTheme';
export default function SideBar() {
  return (
    <ThemeProvider theme={outerTheme}>
      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: '#274E87',
            color: 'primary.contrastText',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ pl: 3 }}>
          <img
            src={'/images/budgetly_dark.png'}
            loading="lazy"
            width="226px"
            height="150px"
          />
        </Box>
        <Box sx={{ p: 2 }}>
          <Selector />
        </Box>
        <List>
          <Box sx={{ p: 2, borderTop: 1, borderBottom: 1 }} bgcolor="#183867">
            <Typography variant="h6" color="white" align="center">
              Categories
            </Typography>
          </Box>
          <ListItem key="Overview" disablePadding>
            <ListItemButton>
              <ListItemIcon>{<DashboardIcon />}</ListItemIcon>
              <ListItemText primary="Overview" />
            </ListItemButton>
          </ListItem>
          <ExpandableItem
            render={(xprops) => (
              <>
                <ListItem button onClick={() => xprops.setOpen(!xprops.open)}>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText primary="Food" />
                  {xprops.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={xprops.open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button>
                      <ListItemText primary="Supermarket" />
                    </ListItem>
                    <ListItem button>
                      <ListItemText primary="Restaurant" />
                    </ListItem>
                    <ListItem button>
                      <ListItemText primary="Lieferando" />
                    </ListItem>
                  </List>
                </Collapse>
              </>
            )}
          />
          <ExpandableItem
            render={(xprops) => (
              <>
                <ListItem button onClick={() => xprops.setOpen(!xprops.open)}>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText primary="Hobby" />
                  {xprops.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={xprops.open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button>
                      <ListItemText primary="Tennis" />
                    </ListItem>
                    <ListItem button>
                      <ListItemText primary="Sailing" />
                    </ListItem>
                  </List>
                </Collapse>
              </>
            )}
          />
          <ListItem key="Uncategorized" disablePadding>
            <ListItemButton>
              <ListItemIcon>{<ReceiptIcon />}</ListItemIcon>
              <ListItemText primary="Uncategorized" />
            </ListItemButton>
          </ListItem>
        </List>
        <Box sx={{ px: 6, py: 2, borderTop: 1 }}>
          <Button variant="contained" color="secondary" startIcon={<AddIcon />}>
            NEW CATEGORY
          </Button>
        </Box>
      </Drawer>
    </ThemeProvider>
  );
}
