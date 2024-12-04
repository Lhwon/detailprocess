import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

export const useAlertCheck = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({
    title: '',
    content: '',
    onConfirm: () => {},
  });

  const openDialog = (title: string, content: string, onConfirm: () => void) => {
    setDialogConfig({ title, content, onConfirm });
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const AlertCheck = (
    <Dialog open={dialogOpen} onClose={closeDialog}>
      <DialogTitle>{dialogConfig.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogConfig.content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>취소</Button>
        <Button
          onClick={() => {
            dialogConfig.onConfirm()
            closeDialog()
          }}
          autoFocus
        >
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );

  return { openDialog, AlertCheck };
}