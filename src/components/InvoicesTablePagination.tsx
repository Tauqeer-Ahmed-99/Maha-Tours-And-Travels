import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import GroupMenu from "@src/components/GroupMenu";
import TableWrapper from "./TableWrapper";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const InvoicesTablePagination = ({
  page,
  rowsPerPage,
  rowsCount,
  totalNumberOfPages,
  currentShowingMin,
  currentShowingMax,
  handleChangePage,
  handleChangeRowsPerPage,
}: {
  page: number;
  rowsPerPage: number;
  rowsCount: number;
  totalNumberOfPages: number;
  currentShowingMin: number;
  currentShowingMax: number;
  handleChangePage: (page: number) => void;
  handleChangeRowsPerPage: (rowsPerPage: number) => void;
}) => {
  return (
    <TableWrapper>
      <Box
        mt={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Button
          variant="soft"
          startDecorator={<ArrowBackIosRoundedIcon />}
          disabled={page === 1 || rowsCount === 0}
          onClick={() => handleChangePage(page - 1)}
        >
          Prev
        </Button>
        <Box>
          <Typography width={300} level="body-sm" mr={2}>
            Showing Results{" "}
            {`${rowsCount === 0 ? 0 : currentShowingMin} - ${
              currentShowingMax < rowsCount ? currentShowingMax : rowsCount
            } of ${rowsCount}`}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography width={150} mr={2} level="body-sm">
            Page Size:
          </Typography>
          <GroupMenu
            options={["5", "10", "15", "20"]}
            selectedOption={rowsPerPage.toString()}
            setSelectedOption={(option) => handleChangeRowsPerPage(+option)}
          />
        </Box>
        <Button
          variant="soft"
          endDecorator={<ArrowForwardIosRoundedIcon />}
          disabled={page === totalNumberOfPages || rowsCount === 0}
          onClick={() => handleChangePage(page + 1)}
        >
          Next
        </Button>
      </Box>
    </TableWrapper>
  );
};

export default InvoicesTablePagination;
