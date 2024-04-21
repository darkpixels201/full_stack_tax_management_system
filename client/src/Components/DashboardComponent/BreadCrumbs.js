import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { GrNext } from "react-icons/gr";
import { FiSkipForward } from "react-icons/fi";
import { BiNews, BiRightArrow, BiSkipNext } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import { colors } from "../../utils/Colors";
import { AiOutlineRight } from "react-icons/ai";
import CustomText from "../CustomComponents/CustomText";
// import HomeIcon from '@mui/icons-material/Home';
// import WhatshotIcon from '@mui/icons-material/Whatshot';
// import GrainIcon from '@mui/icons-material/Grain';

// function handleClick(event) {
//   event.preventDefault();
//   console.info("You clicked a breadcrumb.");
// }

const BreadCrumbs = () => {
  const location = useLocation()

  let currentLink = ''

  const crumbs = location.pathname.split('/')
    .filter(crumb => crumb !== '')
    .map(crumb => {
      currentLink += `/${crumb}`

      return (
        <div className="crumb" key={crumb}>
          <Link to={currentLink}>{crumb}</Link>
        </div>
      )
    })

  return (

//     <div style={{display:"flex", alignItems:"center"}} >
//     <CustomText title="Home" color={colors.textGrey} />
//     <AiOutlineRight />
//     {/* <Link
//       style={{ textDecoration: "none", color: colors.textGrey }}
//       to={currentLink}
//     > */}
//       {/* <CustomText title={crumbs} color={colors.textGrey} /> */}
//       {crumbs}
//     {/* </Link> */}
//     <AiOutlineRight />
//   </div>
<div className="breadcrumbs">
{crumbs}
</div>
    //     <div role="presentation" onClick={handleClick}>
    //     <Breadcrumbs aria-label="breadcrumb">
    //       <Link

    //         underline="hover"
    //         sx={{ display: 'flex', alignItems: 'center' }}
    //         color="inherit"
    //         href="/trophy"
    //       >
    //         <GrNext sx={{ mr: 0.5 }} fontSize="inherit" />
    //         MUI
    //       </Link>
    //       <Link
    //         underline="hover"
    //         sx={{ display: 'flex', alignItems: 'center' }}
    //         color="inherit"
    //         href="/material-ui/getting-started/installation/"
    //       >
    //         <FiSkipForward sx={{ mr: 0.5 }} fontSize="inherit" />
    //         Core
    //       </Link>
    //       <Typography
    //         sx={{ display: 'flex', alignItems: 'center' }}
    //         color="text.primary"
    //       >
    //         <BiNews sx={{ mr: 0.5 }} fontSize="inherit" />
    //         Breadcrumb
    //       </Typography>
    //     </Breadcrumbs>
    //   </div>
    
  );
};

export default BreadCrumbs;
