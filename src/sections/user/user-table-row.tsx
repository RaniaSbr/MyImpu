import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export type UserProps = {
  id: string;
  name: string;
  role: string;
  status: string;
  company: string;
  avatarUrl: string;
  chargevar?: string;
 chargefixe?: string;
  status3?: string;
  status4?: string;
  status44?: string;
  status5?: string;
  status55?: string;
  status66?: string;
  status7?: string;
  status8?: string;
};
const getMbColor = (status: string) =>
  status === 'Mali' ? 'green' : status === 'Boni' ? 'red' : 'gray';

const getDiffColor = (status: string) => {
  const numericStatus = parseFloat(status);

  if (numericStatus==0) return 'gray';  // Si pas un nombre, gris.

  return numericStatus > 0 ? 'green' : 'red';
};


// Fonction pour déterminer la couleur de fond en fonction du statut
const getStatusBackgroundColor = (status: string) => {
  const statusValue = parseFloat(status);


  // Fonction pour déterminer la couleur du texte selon Boni ou Mali


  // Vérifier si le statut est un nombre valide
  if (isNaN(statusValue)) {
    return 'gray'; // Valeur par défaut si le statut n'est pas un nombre
  }

  if (statusValue > 1) {
    return 'red'; // Rouge pour les valeurs négatives
  } else if (statusValue === 1) {
    return 'orange'; // Orange pour la valeur égale à 1
  } else {
    return 'green'; // Vert pour les autres valeurs positives
  }
};

type UserTableRowProps = {
  row: UserProps;

};

export function UserTableRow({ row }: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);
  

  return (
    <>
      <TableRow hover tabIndex={-1} >
      <TableCell padding="checkbox" />


        <TableCell component="th" scope="row">
          <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
            <Avatar alt={row.name} src={row.avatarUrl} />
            {row.name}
          </Box>
        </TableCell>

        <TableCell>{row.company}</TableCell>

        <TableCell>{row.role}</TableCell>

        <TableCell>
          <Label>
            <span
              style={{
                backgroundColor: getStatusBackgroundColor(row.status),
                color: 'white', // Texte en blanc pour un meilleur contraste
                padding: '1em', // Un peu de padding autour du texte
                borderRadius: '4px', // Pour arrondir les coins du fond
                opacity: 1, // Appliquer l'opacité de 30%
              }}
            >
              {row.status}
            </span>
          </Label>
        </TableCell>

        {/* Vous pouvez continuer avec les autres cellules de manière similaire */}
        <TableCell>{row.chargevar }</TableCell>
         <TableCell>{row.chargefixe }</TableCell>
        <TableCell>{row.status3 }</TableCell>
        <TableCell>{row.status4}</TableCell>
        <TableCell>{row.status44 }</TableCell>
        <TableCell>{row.status5 }</TableCell>
        <TableCell>{row.status55 }</TableCell>

        <TableCell>
  <span style={{ color: getDiffColor(row.status66 || '') }}>
    {row.status66 || 'j'}
  </span>
</TableCell>
<TableCell>
  <span style={{ color: getMbColor(row.status7 || '') }}>
    {row.status7 || 'j'}
  </span>
</TableCell>


                <TableCell>{row.status8}</TableCell>



        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem onClick={handleClosePopover}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem onClick={handleClosePopover} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
