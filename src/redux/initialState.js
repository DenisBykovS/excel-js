import {storage} from '@core/utils';
import {defaultStyle} from '@/constants';

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  tableTitleState: 'Title table',
  currentStyles: defaultStyle
}

const normalize = state => ({
  ...state,
  currentStyles: defaultStyle,
  currentText: ''
})

export const initialState = storage('excel-state')
  // ? normalize(storage('excel-state'))
  ? storage('excel-state')
  : defaultState
