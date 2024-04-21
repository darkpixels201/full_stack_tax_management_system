import { useEffect, useRef, useState } from "react";
import CustomText from "./CustomComponents/CustomText";
import Spacer from "./CustomComponents/Spacer";
import "../Assets/css/DropDown.css";
import { colors } from "../utils/Colors";
import { icons } from "../Assets/Icons";
import { FiSettings } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/authAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { persistor } from "../store/store";
import { PURGE } from "redux-persist";

const DropDownList = ({ SearchArray, Icon, Img }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.userReducer.user);
  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
        // console.log(menuRef.current);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const handleLogout = async () => {
    await dispatch(logout()); // Wait for the logout action to complete
    // await persistor.purge(); // Wait for data to be purged from local storage
    // await dispatch({ type: PURGE, key: "root", result: () => null }); // Purge the Redux store
    console.log("user Reducer From DropDown List", user);
    navigate("/login");
    console.log("CLICKED");
    toast.success("Logged Out Successfully");
  };

  return (
    <div className="App" ref={menuRef}>
      {Icon ? (
        <Icon
          size={28}
          onClick={() => {
            setOpen(!open);
          }}
          style={{ cursor: "pointer", paddingTop: 6 }}
        />
      ) : (
        ""
      )}

      {Img ? (
        <div style={{ paddingTop: 10 }}>
          <img
            onClick={() => {
              setOpen(!open);
            }}
            src={Img}
            style={{
              height: 25,
              width: 25,
            }}
          />
        </div>
      ) : (
        ""
      )}

      <Spacer height={5} />

      <div style={{ display: "flex", justifyContent: "end" }}>
        <div
          className={`dropdown-menu ${open ? "active" : "inactive"}`}
          style={{
            width: 130,
            borderRadius: 10,
            border: "solid",
            borderWidth: 1,
            borderColor: colors.grey,
            padding: 20,
            display: "flex",
            flexDirection: "column",
            cursor: "pointer",
            // justifyContent:"space-evenly"
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <FiSettings style={{ marginLeft: 2 }} color={colors.purple} />
            <Spacer width={15} />
            <CustomText title="Settings" fontSize={14} />
          </div>
          <Spacer height={30} />
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <BiLogOut fontSize={20} color={colors.purple} />
            <Spacer width={15} />
            <CustomText title="Logout" fontSize={14} onClick={handleLogout} />
          </div>
        </div>
      </div>
    </div>
  );
};

function DropdownItem(props) {
  return (
    <div className="dropdownItem">
      <div
        style={{
          display: "flex",
          paddingLeft: 30,
          paddingRight: 30,
          justifyContent: "center",
        }}
      >
        <Spacer width={10} />
        <div style={{}}>
          <Spacer height={26} />
          <CustomText title={props.price} fontSize={8} textAlign="left" />
        </div>
      </div>
    </div>
  );
}

{
  /* function Footer() {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "grey",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 30,
        borderRadius:10
      }}
    >
      <CustomText
        title={"VER TODOS LOS RESULTADOS  (25)"}
        fontSize={9}
        color="grey"
      />
    </div>
  );
} */
}

export default DropDownList;
