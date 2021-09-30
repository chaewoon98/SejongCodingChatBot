import { CHANGE_HEADER_INVERSE, CHANGE_VER_NAV_ITEM } from './viewTypes';
import { BASE_URL } from '../../contents/utils/Constant';

const intialViewState = {
  isMain: true,
  clickedNavNum: 0,
};

const viewReducer = (state = intialViewState, action) => {
  const currentUrl = decodeURI(window.location.href);

  switch (action.type) {
    case CHANGE_HEADER_INVERSE:
      let isNowMain = false;
      if (currentUrl === BASE_URL + '/') isNowMain = true;
      else isNowMain = false;

      return {
        ...state,
        isMain: isNowMain,
      };

    case CHANGE_VER_NAV_ITEM:
      let num = 0;

      switch (currentUrl) {
        case BASE_URL + '/botchatroom':
          num = 1;
          break;

        case BASE_URL + '/tachatroom':
          num = 2;
          break;

        case BASE_URL + '/curri':
          num = 3;
          break;

        case BASE_URL + '/qa':
          num = 4;
          break;

        default:
          num = 0;
          break;
      }
      return {
        ...state,
        clickedNavNum: num,
      };

    default:
      return state;
  }
};
export default viewReducer;
