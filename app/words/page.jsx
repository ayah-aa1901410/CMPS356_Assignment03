"use client";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useStore } from "../../store/store.js";
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import {useState, useEffect, useTransition} from "react"
import { Button } from "@mui/material";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import WordsTable from "../../components/Table.js"
import { useRouter } from "next/navigation";


const queryClient = new QueryClient()

function WordsPage(props) {
  const router = useRouter()
  const store = useStore();
  const query = props.searchParams.query
  console.log(query);
  const [searchInput, setSearchInput] = useState("")

  const [highlight, setHighlight] = useState("");
  const [isPending, startTransition] = useTransition()
  const remove = useStore((state) => state.remove)

  useEffect(()=>{
    if(query != undefined){
      store.setQuery(query)
    }else{
      store.setQuery("")
    }
  }, [query])

  useEffect(()=>{
    if(searchInput){
      window.history.replaceState("","",`/words?query=${searchInput}`)
      // router.push(
      //   {pathname: '/words',
      //   query: {query: searchInput}}
      //   , undefined, { shallow: true }
      // )
    }else{
      router.push('/words')
    }
  }, [searchInput])


  const wordsList = useQuery({ queryKey: ['words', store.query], queryFn: ()=> fetchWords(store.query) });

  const suggestsList= useQuery({ queryKey: ['suggestions', store.query], queryFn: ()=> fetchSuggestions(store.query) });

  const queryChange = async(event) => {
    event.preventDefault()
    store.setSuggestWord(event.target.value);
    store.setSuggests(suggestsList.data);
    store.setQuery(event.target.value);
    store.setWords(wordsList.data);
    startTransition(() => setHighlight(event.target.value))
    if(event.target.value != ""){
      setSearchInput(event.target.value)
    }
    else{
      setSearchInput("")
    }
    
  };

  const removeWord = (params) => {
    remove(params)
  }

  async function fetchWords(word){
    return await fetch(`http://api.datamuse.com/words?ml=${word}`, {cache: 'no-store'}).then(res => res.json());
  }
  
  async function fetchSuggestions (word){
    return await fetch(`http://api.datamuse.com/sug?s=${word}`, {cache: 'no-store'}).then(res => res.json());
  }

  const clearQuery = () => {
    store.setQuery("");
    store.setSuggestWord('u');
    store.setWords([]);
    router.push('/words')
  };

  return (
        <div style={{ marginRight: "15px", marginLeft: "15px", marginTop: "10px" }}>
          <div style={{display: "flex", flexDirection: "column", lineHeight: "1.5", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "5px"}}>
            <FormControl>
              <FormLabel>Search</FormLabel>
              <fieldset aria-hidden="true" style={{ cursor: "text", borderRadius: "10px", color: suggestsList.isLoading || wordsList.isLoading? "red" : "grey" , margin: "0", padding: "0 8px", borderStyle: "solid", borderWidth:"1px"}} >
                <Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: "290", boxShadow: "0 0 0 0",}}>
                    <IconButton color="primary"  sx={{ p: "10px" }} aria-label="directions" disabled >
                        <SearchIcon />
                    </IconButton>
                    <InputBase onChange={queryChange} style={{height: "35px", width: "250px", outline: "none", outlineColor: "white",}} label="Search" value={store.query} autoFocus sx={{backgroundColor: isPending? "yellow": "white"}}/>
                    <legend style={{borderRadius: "10px", color: suggestsList.isLoading || wordsList.isLoading? "red" : "grey",display: "block",visibility: "hidden", height: "11px", dataLpignore: "true"}}>
                      <span style={{ color: suggestsList.isLoading || wordsList.isLoading? "red" : "grey" }}>
                        Search
                      </span>
                    </legend>
                    {store.query && (
                          <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions" onClick={clearQuery} >
                            <ClearIcon />
                          </IconButton>
                    )}
                  </Paper>
                </fieldset>
            </FormControl>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center", flexWrap: "wrap", gap: "5px", marginTop: "10px"}} >
              {suggestsList.isLoading ? (
                    <p style={{color: "blue", fontWeight: "bold"}}>Loading ...</p>
              ) : suggestsList.isError ? (
                <b style={{ color: "red", fontWeight: "bold" }}>
                  There's an error: {errorSuggests.message}
                </b>
              ) : (
                suggestsList.data?.map((word) => (
                  <Button key={word.id} size="small" onClick={queryChange} value={word.word} sx={{color: "grey", outlineColor: "white", borderRadius: "10px", fontSize: "12px", textDecoration: "underline"}}>{word.word}</Button>
                ))
              )}
            </div>
          </div>
          <hr style={{width:"100%", size: "3", noshade: true }}></hr>
          <div style={{padding: "10px", margin: "10px", display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center", flexWrap: "wrap", gap: "5px"}}>
                {
                  store.starredWords?.map(word => 
                  <div key={word.id} style={{borderRadius: "10px", border: "1px solid grey"}}>
                    <Button key={word.id} size="small" value={word.word} onClick={queryChange} sx={{borderRadius: "10px", fontSize: "12px", outlineColor: "white"}}>
                      {word.word}
                    </Button>
                    <IconButton key={word.id} color="primary" sx={{ p: "2px" }} aria-label="directions" onClick={()=>removeWord({word: word.word})} >
                      <ClearIcon />
                    </IconButton>
                  </div>
                )}
          </div>
          <div>
            {store.words && (
              <WordsTable wordsList={wordsList}></WordsTable>
            )}
          </div>
        </div>
  );
}


// Higher order function
const hof = (WrappedComponent) => {
  // Its job is to return a react component warping the baby component
  return (props) => (
      <QueryClientProvider client={queryClient}>
          <WrappedComponent {...props} />
      </QueryClientProvider>
  );
};

export default hof(WordsPage);