export default {
    styleOverrides: {
      root: {
        "& .MuiPaper-root": {
          // borderRadius: "6px !important",
          // marginTop: "10px",
          minWidth: 180,
          // backgroundColor: "#F7F9FC",
          boxShadow:
            "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
          "& .MuiMenu-list": {
            padding: "0px",
          },
          "& .MuiMenuItem-root": {
            // borderRadius: "6px !important",
            margin: "5px 0px",
            gap: "10px",
            "& .MuiSvgIcon-root": {
              fontSize: 18,
            },
          },
        },
      },
    },
  };
  