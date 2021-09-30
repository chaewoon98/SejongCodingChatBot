import { CHANGE_HEADER_INVERSE,CHANGE_VER_NAV_ITEM } from "./viewTypes"

export const headerViewer = () => {
    return {
        type: CHANGE_HEADER_INVERSE
    }
}

export const clickedNavItem = () => {
    return {
        type:CHANGE_VER_NAV_ITEM,
    }
}