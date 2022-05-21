import { useState, createRef, useEffect } from "react";
import Popper from "popper.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { newLoggout } from "../redux/actions/auth.actions";
import { getBox } from "../api/box";
import { toast } from "react-toastify";

export const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const btnDropdownRef = createRef();
  const popoverDropdownRef = createRef();
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const router = useNavigate();
  const loggout = () => {
    if (getBox()) {
      toast.error("Debes cerrar caja!!!");
      return;
    }
    router("/");
    dispatch(newLoggout());
  };
  const openDropdownPopover = () => {
    new Popper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !popoverDropdownRef?.current?.contains(event.target) &&
        !btnDropdownRef?.current?.contains(event.target)
      ) {
        closeDropdownPopover();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popoverDropdownRef, btnDropdownRef]);

  return (
    <div className="App flex flex-col w-screen h-screen justify-center items-center">
      <div className=" w-11/12 bg-white h-90-percent rounded-md p-8 flex flex-col">
        {children}
        <button
          ref={btnDropdownRef}
          onClick={() => {
            dropdownPopoverShow
              ? closeDropdownPopover()
              : openDropdownPopover();
          }}
          style={{ borderRadius: "50%" }}
          className="text-white flex absolute bottom-16 right-32 justify-center items-center text-3xl h-16 w-16 bg-kimoby"
        >
          <FontAwesomeIcon className="p-4" icon={faBars} />
        </button>
        <div
          className={
            (dropdownPopoverShow ? "block " : "hidden ") +
            "text-base mb-96 w-96 h-auto -ml-80 bg-white border-2 p-8 float-left list-none text-left rounded shadow-xl"
          }
          ref={popoverDropdownRef}
        >
          <ul>
            <li className="text-2xl font-semibold text-gradient border-white py-3">
              <Link to="/">Inicio</Link>
            </li>
            <li className="text-2xl font-semibold text-gradient border-white py-3">
              <Link to="/products">Productos</Link>
            </li>
            <li className="text-2xl font-semibold text-gradient border-white py-3">
              <Link to="/sales-history">Historial de ventas</Link>
            </li>
            <li className="text-2xl font-semibold text-gradient border-white py-3">
              <Link to="/finances">Finanzas</Link>
            </li>
            <li
              onClick={loggout}
              className="text-2xl font-semibold cursor-pointer text-gradient border-white py-3"
            >
              Cerrar Sesion
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
