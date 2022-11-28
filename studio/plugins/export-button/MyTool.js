import React from 'react'
import { Box, Text, Stack } from '@sanity/ui'


class MyTool extends React.Component {
  render() {
    return (
      <Box padding={4} paddingY={5}>
        <button onClick={() => exportFromProd()}>Export</button>
      </Box>
    )
  }
}


function exportFromProd() {
  return fetch("http://localhost:3000/")
}

export default MyTool
