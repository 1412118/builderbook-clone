import { Avatar, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

function MenuWithAvatar({ options, src, alt }: any) {
  const [anchorEl, setAnchorEl] = useState();
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Avatar
        aria-controls={anchorEl ? "simple-menu" : null}
        aria-haspopup="true"
        onClick={handleClick}
        src={src}
        alt={alt}
        style={{ margin: "0px 20px 0px auto", cursor: "pointer" }}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
      >
        {options.map((option) => (
          <div id="wrappingLink" key={option.text}>
            {option.anchor ? (
              <MenuItem
                onClick={(event) => {
                  event.preventDefault();
                  window.location.href = option.href;
                  handleClose();
                }}
              >
                {option.text}
              </MenuItem>
            ) : (
              <Link href={option.href} as={option.as || option.href}>
                <MenuItem>{option.text}</MenuItem>
              </Link>
            )}
          </div>
        ))}
      </Menu>
    </div>
  );
}

export default MenuWithAvatar;
