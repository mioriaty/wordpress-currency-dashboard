import React, { CSSProperties, FC, ReactNode } from 'react';
import { View } from 'wiloke-react-core';
import { List, AutoSizer, ListRowRenderer, ScrollParams } from 'react-virtualized';
import { CSSProp } from 'wiloke-react-core/dist/hocs/withStyles';
import * as styles from './styles';

export interface VirtualListProps {
  rowHeight: number;
  rowCount: number;
  rowRender: (index: number) => ReactNode;
  gap?: number;
  containerClassName?: string;
  containerStyle?: CSSProperties;
  containerCSS?: CSSProp;
  rowCSS?: CSSProp;
  onScroll?: (params: ScrollParams) => void;
}

export const VirtualList: FC<VirtualListProps> = ({
  rowCount,
  rowHeight,
  rowRender,
  containerClassName = '',
  containerStyle = {},
  containerCSS,
  rowCSS,
  onScroll,
}) => {
  const _rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <View key={key} css={rowCSS} style={{ ...style }}>
        {rowRender(index)}
      </View>
    );
  };

  return (
    <View className={containerClassName} style={containerStyle} css={[styles.container, containerCSS]}>
      <AutoSizer>
        {({ width, height }) => {
          // @ts-ignore
          return <List onScroll={onScroll} width={width} height={height} rowHeight={rowHeight} rowRenderer={_rowRenderer} rowCount={rowCount} />;
        }}
      </AutoSizer>
    </View>
  );
};
