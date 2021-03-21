// import {storage} from '@core/utils';
import {defaultStyle} from '@/constants';
import {clone} from '@core/utils';

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  title: 'Title table',
  currentStyles: defaultStyle,
  openDate: new Date().toJSON()
}

const normalize = state => ({
  ...state,
  currentStyles: defaultStyle,
  currentText: ''
})

// export const initialState = storage('excel-state')
//   ? normalize(storage('excel-state'))
//   // ? storage('excel-state')
//   : defaultState

export function normalizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState)
}
