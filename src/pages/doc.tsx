/* eslint-disable perfectionist/sort-imports */
import axios from 'axios';
import { useState, useCallback, useEffect } from 'react';

// Material UI Components
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
/* eslint-enable perfectionist/sort-imports */

// Custom Components
import { Scrollbar } from 'src/components/scrollbar';

interface ApiData {
  _id: string;
  production: number;
  normalActivity: number;
  variableCost: number;
  fixedCost: number;
  coefficient: number;
  fixedCostImputed: number;
  difference: number;
  resultType: string;
  totalCost: number;
  unitCost: number;
  unitVariableCost: number;
  unitFixedCost: number;
  annee: number;
  mois: number;
  createdAt: string;
}

interface ProductionData {
  id: string;
  année: number;
  mois: string;
  moisNumero: number;
  quantiteProduite: number;
  activiteNormale: number;
  cir: number;
  chargesVariables: number;
  chargesFixes: number;
  coutProductionTotal: number;
  coutProductionUnitaire: number;
  coutVariableUnitaire: number;
  chargesFixesImputees: number;
  coutFixeUnitaire: number;
  diff: number;
  maliBoni: string;
}

function getMonthName(monthNumber: number): string {
  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  return months[monthNumber - 1] || `Mois ${monthNumber}`;
}

function safeToFixed(value: number | null): string {
  return value !== null && value !== undefined ? value.toFixed(2) : 'N/A';
}

// Modifier le composant ProductionTableHead pour centrer les en-têtes
function ProductionTableHead({
    order,
    orderBy,
    onSort,
  }: {
    order: 'asc' | 'desc';
    orderBy: string;
    onSort: (id: string) => void;
  }) {
    const headCells = [
      { id: 'année', label: 'Année' },
      { id: 'mois', label: 'Mois' },
      { id: 'quantiteProduite', label: 'Quantité produite' },
      { id: 'activiteNormale', label: 'Activité normale' },
      { id: 'cir', label: "Taux d'imputation" },
      { id: 'chargesVariables', label: 'Charges variables' },
      { id: 'chargesFixes', label: 'Charges fixes' },
      { id: 'coutProductionTotal', label: 'Coût total' },
      { id: 'coutProductionUnitaire', label: 'Coût unitaire' },
      { id: 'coutVariableUnitaire', label: 'Coût variable' },
      { id: 'chargesFixesImputees', label: 'Charges fixes imputées' },
      { id: 'coutFixeUnitaire', label: 'Coût fixe unitaire' },
      { id: 'diff', label: "Différence d'imputation" },
      { id: 'maliBoni', label: 'Mali / Boni' }
    ];
  
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{ fontWeight: 'bold', textAlign: 'center' }} // Ajout de textAlign: 'center'
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={() => onSort(headCell.id)}
                sx={{ justifyContent: 'center' }} // Pour centrer le label de tri
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  // Modifier le composant ProductionTableRow pour centrer le contenu
  function ProductionTableRow({ row }: { row: ProductionData }) {
      const getCIRClass = (cir: number): "error" | "warning" | "success" => {
        if (cir > 1.0) return 'error';
        if (cir < 1.0) return 'success';
        return 'warning';
      };
    
      const getMaliBoniClass = (maliBoni: string): "error" | "success" | "warning" => {
        if (maliBoni === 'Boni de sur-activité') return 'error';
        if (maliBoni === 'Mali de sous-activité') return 'success';
        return 'warning';
      };
    
      return (
        <TableRow hover>
          <TableCell sx={{ textAlign: 'center' }}>{row.année}</TableCell>
          <TableCell sx={{ textAlign: 'center' }}>{row.mois}</TableCell>
          <TableCell sx={{ textAlign: 'center' }}>{row.quantiteProduite}</TableCell>
          <TableCell sx={{ textAlign: 'center' }}>{row.activiteNormale}</TableCell>
          <TableCell sx={{ textAlign: 'center' }}>
            <Chip
              label={safeToFixed(row.cir)}
              color={getCIRClass(row.cir)}
              variant="outlined"
              sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
            />
          </TableCell>
          <TableCell sx={{ textAlign: 'center' }}>{safeToFixed(row.chargesVariables)}</TableCell>
          <TableCell sx={{ textAlign: 'center' }}>{safeToFixed(row.chargesFixes)}</TableCell>
          <TableCell sx={{ textAlign: 'center' }}>{safeToFixed(row.coutProductionTotal)}</TableCell>
          <TableCell sx={{ textAlign: 'center' }}>{safeToFixed(row.coutProductionUnitaire)}</TableCell>
          <TableCell sx={{ textAlign: 'center' }}>{safeToFixed(row.coutVariableUnitaire)}</TableCell>
          <TableCell sx={{ textAlign: 'center' }}>{safeToFixed(row.chargesFixesImputees)}</TableCell>
          <TableCell sx={{ textAlign: 'center' }}>{safeToFixed(row.coutFixeUnitaire)}</TableCell>
          <TableCell sx={{ textAlign: 'center' }}>{safeToFixed(row.diff)}</TableCell>
          <TableCell sx={{ textAlign: 'center' }}>
            <Chip
              label={row.maliBoni}
              color={getMaliBoniClass(row.maliBoni)}
              variant="outlined"
              sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
            />
          </TableCell>
        </TableRow>
      );
    }
  
  // Modifier TableNoData pour centrer le texte
  function TableNoData({ searchQuery }: { searchQuery: string }) {
    return (
      <TableRow>
        <TableCell colSpan={14} align="center" sx={{ textAlign: 'center' }}>
          Aucun résultat trouvé pour &quot;{searchQuery}&quot;
        </TableCell>
      </TableRow>
    );
  }
  
function TableEmptyRows({ height }: { height: number }) {
  return <TableRow style={{ height }} />;
}

function ProductionTableToolbar({
  filterName,
  onFilterName
}: {
  filterName: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <Box sx={{ p: 2 }}>
      <TextField
        fullWidth
        value={filterName}
        onChange={onFilterName}
        placeholder="Rechercher..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Box component="span">🔍</Box>
            </InputAdornment>
          ),
        }}
        sx={{ maxWidth: 500 }}
      />
    </Box>
  );
}

function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('mois');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    rowsPerPage,
    onResetPage,
    onChangePage,
    onChangeRowsPerPage,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: 'asc' | 'desc',
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applyFilter({
  inputData,
  comparator,
  filterName,
}: {
  inputData: ProductionData[];
  comparator: (a: any, b: any) => number;
  filterName: string;
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (item) =>
        item.mois.toLowerCase().includes(filterName.toLowerCase()) ||
        item.année.toString().includes(filterName) ||
        item.maliBoni.toLowerCase().includes(filterName.toLowerCase())
    );
  }

  return inputData;
}

function emptyRows(page: number, rowsPerPage: number, arrayLength: number) {
  return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}

export default function Doc() {
  const table = useTable();
  const [data, setData] = useState<ProductionData[]>([]);
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiData[]>('http://localhost:5000/api/calculations');
        const transformedData: ProductionData[] = response.data.map(item => ({
          id: item._id,
          année: item.annee,
          mois: getMonthName(item.mois),
          moisNumero: item.mois,
          quantiteProduite: item.production,
          activiteNormale: item.normalActivity,
          cir: item.coefficient,
          chargesVariables: item.variableCost,
          chargesFixes: item.fixedCost,
          coutProductionTotal: item.totalCost,
          coutProductionUnitaire: item.unitCost,
          coutVariableUnitaire: item.unitVariableCost,
          chargesFixesImputees: item.fixedCostImputed,
          coutFixeUnitaire: item.unitFixedCost || 0,
          diff: item.difference || 0,
          maliBoni: item.resultType || '',
        }));
        setData(transformedData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData();
  }, []);

  const dataFiltered = applyFilter({
    inputData: data,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;
  const currentEmptyRows = emptyRows(table.page, table.rowsPerPage, data.length);

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(event.target.value);
    table.onResetPage();
  };

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Tableau de suivi de production
        </Typography>
      </Box>

      <Card>
        <ProductionTableToolbar 
          filterName={filterName}
          onFilterName={handleFilterName}
        />
        
        <Scrollbar>
          <TableContainer sx={{ overflow: 'auto', maxWidth: '100%' }}>
            <Table sx={{ minWidth: 1600 }}>
              <ProductionTableHead
                order={table.order}
                orderBy={table.orderBy}
                onSort={table.onSort}
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <ProductionTableRow key={row.id} row={row} />
                  ))}

                {currentEmptyRows > 0 && (
                  <TableEmptyRows height={68 * currentEmptyRows} />
                )}

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={dataFiltered.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </Box>
  );
}