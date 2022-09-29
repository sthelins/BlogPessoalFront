import React, { useState } from 'react'
import { AppBar, Tab, Tabs, Typography } from '@material-ui/core'
import { Box } from '@mui/material'
import { TabContext, TabPanel } from '@material-ui/lab'
import ListaPostagem from '../listapostagem/ListaPostagem'
import './TabPostagem.css'

function TabPostagem() {
  const [value, setValue] = useState('1')

  function handleChange(event: React.ChangeEvent<{}>, newValue: string) {
    setValue(newValue)
  }

  return (
    <>
      <TabContext value={value}>
        <AppBar position="static" className="appBar">
          <Tabs centered indicatorColor="secondary" onChange={handleChange}>
            <Tab label="Todas as postagens" value="1" className="titulo" />
            <Tab label="Sobre mim" value="2" className="titulo" />
          </Tabs>
        </AppBar>
        <TabPanel value="1" className="txtSobre">
          <Box display="flex" flexWrap="wrap" justifyContent="center">
            <ListaPostagem />
          </Box>
        </TabPanel>
        <TabPanel value="2" className="txtSobre">
          <Typography
            variant="h5"
            gutterBottom
            color="textPrimary"
            component="h5"
            align="center"
            className="titulo"
          ></Typography>
          <Typography
            variant="body1"
            gutterBottom
            color="textPrimary"
            align="justify"
          >
            Olá, meu nome é Sthefany, atualmente tenho 19 anos, moro em São
            Bernardo do Campo - SP e sigo carreira na área de programação.{' '}
            <br /> Criei esse blog pessoal durante o bootcamp da Generation
            Brasil para pessoa desenvolvedora web. O back-end foi feito em Java
            + spring boot e o front-end em React com material ui.
          </Typography>
        </TabPanel>
      </TabContext>
    </>
  )
}
export default TabPostagem
