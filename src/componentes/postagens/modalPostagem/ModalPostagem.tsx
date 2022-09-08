import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Modal from '@mui/material/Modal'
import { Button } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import './ModalPostagem.css'
import CadastroPost from '../cadastroPost/CadastroPostagem'
import { Box } from '@mui/material'

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}
