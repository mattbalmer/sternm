import * as React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '@client/reducers';

type ReducerState = StoreState;

type mapStateCallback = (state: ReducerState, ownProps?: any) => any;
type mapDispatchCallback = (dispatch: Function, ownProps?: any) => any;

export function containerize<P = any>(component, mapStateToProps?: mapStateCallback, mapDispatchToProps?: mapDispatchCallback): any {
  return connect(
    mapStateToProps || (() => ({})),
    mapDispatchToProps || (() => ({})),
  )(component);
}

export function map<T extends object>(obj: Record<string, T>, callback: (entry: T, key: string, i: number) => any) {
  return Object.keys(obj).map((key, i) => callback(obj[key], key, i));
}