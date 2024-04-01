import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./styles/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Park Cloud</Link>
      </div>

      <div className={`navbar-menu ${menuOpen ? "active" : ""}`}>
        <ul>
          <li>
            <NavLink exact="true" to="/" activeclassname="active-link">
              Home
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/booking" activeclassname="active-link">
              Booking
            </NavLink>
          </li> */}
          <li>
            <NavLink to="/service" activeclassname="active-link">
              Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" activeclassname="active-link">
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" activeclassname="active-link">
              Login
            </NavLink>
          </li>
        </ul>
        <div className="menu-icon" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



//////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import "./styles/Navbar.css";
// import profileImg from "../component/Assets/profile-02.png";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-logo">
//         <Link to="/">Park Cloud</Link>
//       </div>

//       <div className={`navbar-menu ${menuOpen ? "active" : ""}`}> 
//         <ul>
//           <li>
//             <NavLink exact to="/" activeClassName="active-link">
//               Home
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/booking" activeClassName="active-link">
//               Booking
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/service" activeClassName="active-link">
//               Services
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/about" activeClassName="active-link">
//               About
//             </NavLink>
//           </li>
//           <li className="profile">
//             <NavLink to="/login" activeClassName="active-link">
//               <img src={profileImg} alt="" />
//             </NavLink>
//           </li>
//         </ul>
//         {/* <div className="menu-icon" onClick={toggleMenu}>
//           <div className="bar"></div>
//           <div className="bar"></div>
//           <div className="bar"></div>
//         </div> */}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;






// import * as React from "react";
// import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// // import Button from "@mui/material/Button";
// import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// // import MailIcon from "@mui/icons-material/Mail";
// import MenuIcon from "@mui/icons-material/Menu";
// import "./Navbar.css";
// import HomeIcon from "@mui/icons-material/Home";
// import InfoIcon from "@mui/icons-material/Info";
// import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";

// const Navbar = () => {
//   const [state, setState] = React.useState({
//     top: false,
//     get top() {
//       return this.top;
//     },
//     set top(value) {
//       this._top = value;
//     },
//     left: false,
//     bottom: false,
//     right: false,
//   });

//   const toggleDrawer = (anchor, open) => (event) => {
//     if (
//       event.type === "keydown" &&
//       (event.key === "Tab" || event.key === "Shift")
//     ) {
//       return;
//     }

//     setState({ ...state, [anchor]: open });
//   };

//   const list = (anchor) => (
//     <Box
//       sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
//       role="presentation"
//       onClick={toggleDrawer(anchor, false)}
//       onKeyDown={toggleDrawer(anchor, false)}
//     >
//       <List>
//         {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//                     <ListItem key={text} disablePadding>
//                         <ListItemButton>
//                             <ListItemIcon>
//                                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                             </ListItemIcon>
//                             <ListItemText primary={text} />
//                         </ListItemButton>
//                     </ListItem>
//                 ))} */}

//         <ListItem disablePadding>
//           <ListItemButton>
//             <ListItemIcon>
//               <HomeIcon />
//             </ListItemIcon>
//             <ListItemText primary={"Home"} />
//           </ListItemButton>
//         </ListItem>
//         <ListItem disablePadding>
//           <ListItemButton>
//             <ListItemIcon>
//               <InfoIcon />
//             </ListItemIcon>
//             <ListItemText primary={"About"} />
//           </ListItemButton>
//         </ListItem>
//         <ListItem disablePadding>
//           <ListItemButton>
//             <ListItemIcon>
//               <PermContactCalendarIcon />
//             </ListItemIcon>
//             <ListItemText primary={"Contact"} />
//           </ListItemButton>
//         </ListItem>
//       </List>
//       <Divider />
//       <List>
//         <ListItem disablePadding>
//           <ListItemButton>
//             <ListItemIcon>
//               <InboxIcon />
//             </ListItemIcon>
//             <ListItemText primary={"inbox"} />
//           </ListItemButton>
//         </ListItem>
//       </List>
//     </Box>
//   );

//   return (
//     <div className="Navbar">
//       {/* {['left', 'right', 'top', 'bottom'].map((anchor) => (
//                 <React.Fragment key={anchor}>
//                     <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
//                     <Drawer
//                         anchor={anchor}
//                         open={state[anchor]}
//                         onClose={toggleDrawer(anchor, false)}
//                     >
//                         {list(anchor)}
//                     </Drawer>
//                 </React.Fragment>
//             ))} */}

//       <MenuIcon onClick={toggleDrawer("left", true)} />

//       <Drawer
//         anchor={"left"}
//         open={state["left"]}
//         onClose={toggleDrawer("left", false)}
//       >
//         {list("left")}
//       </Drawer>
//     </div>
//   );
// };

// export default Navbar;
