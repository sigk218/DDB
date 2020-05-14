import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";


import Divider from "@material-ui/core/Divider";




export default function Navigation(props) {

    return (
        <div>
            <header>
                <AppBar>
                    <Toolbar>
                        
                            <MenuIcon />

                        <Typography>
                            발바닥
          </Typography>

                    </Toolbar>

                </AppBar>
            </header>


            <main>
                <div />
                {props.children}
            </main>
        </div>
    );
}
