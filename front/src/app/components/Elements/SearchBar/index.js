import React from 'react'
import { Input } from 'antd'
import { ReactComponent as SearchIcon } from './search-icon.svg'

const { Search } = Input
const StyledSearchBar = (props, ref) => {
  const searchClassExt = props.styleType === 'underline' ? 'cstm-search--underline' : ''
  return (
    <Search
      placeholder={props.placeholder}
      className={`cstm-search ${searchClassExt}`}
      prefix={<SearchIcon />}
      allowClear
      onChange={props.onChange}
      ref={ref}
    />
  )
}

export const SearchBar = React.forwardRef(StyledSearchBar)
