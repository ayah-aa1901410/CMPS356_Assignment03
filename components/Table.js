import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { useStore } from "../store/store.js";

export default function WordsTable({wordsList}){
  
  const store = useStore()

  const increase = useStore((state) => state.increase)

  const addWord = (params) => {
    const word = store.starredWords.findIndex((wd) => wd.word === params.word)
    if(word === -1){
      increase(params)
    }
    console.log(params);
  }

    return (
        <TableContainer component={Paper} sx={{ margin: "20px" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" sx={{ fontWeight: "700" }}>
                    Word
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: "700" }}>
                    Score
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: "700" }}>
                    Tags
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {wordsList.isLoading ? (
                    <TableRow><TableCell sx={{color: "blue", fontWeight: "bold"}}>Loading ...</TableCell></TableRow>
                ) : wordsList.isError ? (
                  <b style={{ color: "red", fontWeight: "bold" }}>
                    There's an error: {errorWords.message}
                  </b>
                ) :
                wordsList.data?.map((word) => (
                    <TableRow
                      key={word.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 },":hover": {backgroundColor: "lightgray"} }}
                      onClick={() => addWord({word: word.word})}
                    >
                      <TableCell key={word.id} align="left">
                        {word.word}
                      </TableCell>
                      <TableCell key={word.id} align="left">
                        {word.score}
                      </TableCell>
                      <TableCell key={word.id} align="left">
                        <Stack direction="row" spacing={1}>
                          {word.tags?.map((tag) =>
                            tag.includes("results_type:") ? 
                              <Chip
                                key={tag.id}
                                label={tag.replace("results_type:", '')}
                                variant="outlined"
                                sx={{
                                  color: "green",
                                  outlineColor: "green",
                                  fontWeight: "bold",
                                }}
                              />
                             : 
                              <Chip
                                key={tag.id}
                                label={tag}
                                variant="outlined"
                              />
                          )}
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
    )
}