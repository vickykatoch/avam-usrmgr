import React, { FC } from "react";
// import { makeStyles, createStyles, Theme } from "@material-ui/styles";
import { createStyles, fade, Theme, makeStyles } from "@material-ui/core/styles";
import { InputBase, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";

interface IViewProps {
  title?: string;
  onNew: () => void;
  onSearchTextChange: (evt: any) => void;
}

//#region HELPERS
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto"
      }
    },
    searchIcon: {
      width: theme.spacing(7),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    inputRoot: {
      color: "inherit"
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: 200
      }
    }
  })
);
//#endregion

const Header: FC<IViewProps> = (props: IViewProps) => {
  const classes = useStyles();
  const { onNew, onSearchTextChange, title } = props;

  return (
    <div className="d-flex align-items-center no-shrink pl-1 pr-1">
      <div className="flex-fill">
        <strong>{title}</strong>
      </div>
      <div className="no-shrink d-flex justify-content-end">
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            inputProps={{ "aria-label": "search" }}
            onChange={onSearchTextChange}
          />
        </div>
        <Fab color="primary" aria-label="add" size="small" onClick={() => onNew()}>
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
};

export default Header;
