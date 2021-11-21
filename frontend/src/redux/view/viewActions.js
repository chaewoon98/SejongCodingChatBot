<<<<<<< HEAD
import { CHANGE_HEADER_INVERSE,CHANGE_VER_NAV_ITEM } from "./viewTypes"
=======
import { CHANGE_HEADER_INVERSE,CHANGE_VER_NAV_ITEM,CHANGE_LOADING_STATE,
CHAGNE_FIRST_RENDERING } from "./viewTypes"
>>>>>>> upstream/master

export const headerViewer = () => {
    return {
        type: CHANGE_HEADER_INVERSE
    }
}

export const clickedNavItem = () => {
    return {
        type:CHANGE_VER_NAV_ITEM,
    }
<<<<<<< HEAD
=======
}

export const changeLoadingState = (props) => {
    return {
        type: CHANGE_LOADING_STATE,
        data:{isLoading : props},
      };
}

export const changeFirstRendering = (props) => {
    return {
        type: CHAGNE_FIRST_RENDERING,
        data : {isFirstRendering : props}
    }
>>>>>>> upstream/master
}