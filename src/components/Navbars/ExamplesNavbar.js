// import React from "react";
// import { Link } from "react-router-dom";
// // reactstrap components
// import {
//   Collapse,
//   NavbarBrand,
//   Navbar,
//   NavItem,
//   NavLink,
//   Nav,
//   Container
// } from "reactstrap";

// function ExamplesNavbar() {
//   const [navbarColor, setNavbarColor] = React.useState("info");
//   const [collapseOpen, setCollapseOpen] = React.useState(false);
//   React.useEffect(() => {
//     const updateNavbarColor = () => {
//       if (
//         document.documentElement.scrollTop > 399 ||
//         document.body.scrollTop > 399
//       ) {
//         setNavbarColor("info");
//       } else if (
//         document.documentElement.scrollTop < 400 ||
//         document.body.scrollTop < 400
//       ) {
//         setNavbarColor("info");
//       }
//     };
//     window.addEventListener("scroll", updateNavbarColor);
//     return function cleanup() {
//       window.removeEventListener("scroll", updateNavbarColor);
//     };
//   });
//   return (
//     <>
//       {collapseOpen ? (
//         <div
//           id="bodyClick"
//           onClick={() => {
//             document.documentElement.classList.toggle("nav-open");
//             setCollapseOpen(false);
//           }}
//         />
//       ) : null}
//       <Navbar className={"fixed-top " + navbarColor} color="info" expand="lg">
//         <Container>
//           <div className="navbar-translate">
//             <NavbarBrand
//               id="navbar-brand"
//             >
//               Propstory
//             </NavbarBrand>
//             <button
//               className="navbar-toggler navbar-toggler"
//               onClick={() => {
//                 document.documentElement.classList.toggle("nav-open");
//                 setCollapseOpen(!collapseOpen);
//               }}
//               aria-expanded={collapseOpen}
//               type="button"
//             >
//               <span className="navbar-toggler-bar top-bar"></span>
//               <span className="navbar-toggler-bar middle-bar"></span>
//               <span className="navbar-toggler-bar bottom-bar"></span>
//             </button>
//           </div>
//           <Collapse
//             className="justify-content-end"
//             isOpen={collapseOpen}
//             navbar
//           >
//             <Nav navbar>
//               <NavItem>
//                 <NavLink to="/index" tag={Link}>
//                   Back to Home
//                 </NavLink>
//               </NavItem>
//             </Nav>
//           </Collapse>
//         </Container>
//       </Navbar>
//     </>
//   );
// }

// export default ExamplesNavbar;

// import React from "react";
// // reactstrap components
// import {
//   // Button,
//   Collapse,
//   NavbarBrand,
//   Navbar,
//   NavItem,
//   NavLink,
//   Nav,
//   Container,
//   UncontrolledTooltip
// } from "reactstrap";

// import { Link } from "react-router-dom";


// function IndexNavbar() {
//   const [navbarColor, setNavbarColor] = React.useState("navbar");
//   const [collapseOpen, setCollapseOpen] = React.useState(false);
//   React.useEffect(() => {
//     const updateNavbarColor = () => {
//       if (
//         document.documentElement.scrollTop > 399 ||
//         document.body.scrollTop > 399
//       ) {
//         setNavbarColor("");
//       } else if (
//         document.documentElement.scrollTop < 400 ||
//         document.body.scrollTop < 400
//       ) {
//         setNavbarColor("navbar-transparent");
//       }
//     };
//     window.addEventListener("scroll", updateNavbarColor);
//     return function cleanup() {
//       window.removeEventListener("scroll", updateNavbarColor);
//     };
//   });
//   return (
//     <>
//       {collapseOpen ? (
//         <div
//           id="bodyClick"
//           onClick={() => {
//             document.documentElement.classList.toggle("nav-open");
//             setCollapseOpen(false);
//           }}
//         />
//       ) : null}
//       <Navbar className={"fixed-top " + navbarColor} expand="lg" color="info">
//         <Container>
//           <div className="navbar-translate">
//             <NavbarBrand
//               href="#"
//               // target="_blank"
//               id="navbar-brand"
//             >
//               <span style={{fontSize:"25px", fontWeight:'bold'}}>Propstory</span>
//             </NavbarBrand>
//             <button
//               className="navbar-toggler navbar-toggler"
//               onClick={() => {
//                 document.documentElement.classList.toggle("nav-open");
//                 setCollapseOpen(!collapseOpen);
//               }}
//               aria-expanded={collapseOpen}
//               type="button"
//             >
//               <span className="navbar-toggler-bar top-bar"></span>
//               <span className="navbar-toggler-bar middle-bar"></span>
//               <span className="navbar-toggler-bar bottom-bar"></span>
//             </button>
//           </div>
//           <Collapse
//             className="justify-content-end"
//             isOpen={collapseOpen}
//             navbar
//           >
//             <Nav navbar>
//               <NavItem>
//                 <NavLink
//                 to="/index"
//                 outline
//                 size="lg"
//                 tag={Link}
//                 >
//                   <p style={{fontSize:'14px'}}>Back to Home</p>
//                 </NavLink>
//               </NavItem>
              
//               <NavItem>
//                 <NavLink
//                   href="#"
//                   target="_blank"
//                   id="twitter-tooltip"
//                 >
//                   <i className="fab fa-twitter"></i>
//                   <p className="d-lg-none d-xl-none">Twitter</p>
//                 </NavLink>
//                 <UncontrolledTooltip target="#twitter-tooltip">
//                   Follow us on Twitter
//                 </UncontrolledTooltip>
//               </NavItem>
//               <NavItem>
//                 <NavLink
//                   href="#"
//                   target="_blank"
//                   id="facebook-tooltip"
//                 >
//                   <i className="fab fa-facebook-square"></i>
//                   <p className="d-lg-none d-xl-none">Facebook</p>
//                 </NavLink>
//                 <UncontrolledTooltip target="#facebook-tooltip">
//                   Like us on Facebook
//                 </UncontrolledTooltip>
//               </NavItem>
//               <NavItem>
//                 <NavLink
//                   href="#"
//                   target="_blank"
//                   id="instagram-tooltip"
//                 >
//                   <i className="fab fa-instagram"></i>
//                   <p className="d-lg-none d-xl-none">Instagram</p>
//                 </NavLink>
//                 <UncontrolledTooltip target="#instagram-tooltip">
//                   Follow us on Instagram
//                 </UncontrolledTooltip>
//               </NavItem>
//             </Nav>
//           </Collapse>
//         </Container>
//       </Navbar>
//     </>
//   );
// }

// export default IndexNavbar;
