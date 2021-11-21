<<<<<<< HEAD
import { CHANGE_HEADER_INVERSE, CHANGE_VER_NAV_ITEM } from './viewTypes';
=======
import { CHANGE_HEADER_INVERSE, CHANGE_VER_NAV_ITEM, CHANGE_LOADING_STATE, CHAGNE_FIRST_RENDERING } from './viewTypes';
>>>>>>> upstream/master
import { BASE_URL } from '../../contents/utils/Constant';

const intialViewState = {
  isMain: true,
<<<<<<< HEAD
=======
  isLoading: false,
  isFirstRendering: true,
>>>>>>> upstream/master
  clickedNavNum: 0,
};

const viewReducer = (state = intialViewState, action) => {
<<<<<<< HEAD
=======
  const { type, data } = action;
>>>>>>> upstream/master
  const currentUrl = decodeURI(window.location.href);

  switch (action.type) {
    case CHANGE_HEADER_INVERSE:
      let isNowMain = false;
<<<<<<< HEAD
=======

>>>>>>> upstream/master
      if (currentUrl === BASE_URL + '/') isNowMain = true;
      else isNowMain = false;

      return {
        ...state,
        isMain: isNowMain,
      };

<<<<<<< HEAD
=======
    case CHAGNE_FIRST_RENDERING:
      return {
        ...state,
        isFirstRendering: data.isFirstRendering
      }

    case CHANGE_LOADING_STATE:
      return {
        ...state,
        isLoading: data.isLoading,
      };


>>>>>>> upstream/master
    case CHANGE_VER_NAV_ITEM:
      let num = 0;

      switch (currentUrl) {
        case BASE_URL + '/botchatroom':
          num = 1;
          break;

        case BASE_URL + '/tachatroom':
          num = 2;
          break;

<<<<<<< HEAD
        case BASE_URL + '/curri':
=======
        case BASE_URL + '/codingEditor':
>>>>>>> upstream/master
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
